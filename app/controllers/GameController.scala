package controllers

import javax.inject._
import de.htwg.se.scotlandyard.aview.tui.Tui
import de.htwg.se.scotlandyard.controllerComponent.ControllerInterface
import de.htwg.se.scotlandyard.util.TicketType
import model.Game
import model.Game.controller
import play.api.libs.json._
import play.api.mvc._

import scala.collection.mutable.ListBuffer

case class Coordinate(current: Boolean, color: String, x: Int, y: Int)

@Singleton
class GameController @Inject()(cc: ControllerComponents)(implicit assetsFinder: AssetsFinder)
  extends AbstractController(cc) {

  val tui: Tui = Game.tui
  val controller: ControllerInterface = Game.controller

  // Game endpoints

  def startGame(): Action[AnyContent] = Action { implicit request =>
    controller.startGame()
    returnGameStatusOk
  }

  def movePlayer(): Action[AnyContent] = Action { implicit request =>
    val selection = request.body.asFormUrlEncoded
    println(selection.toString)
    selection.map { args =>
      val transport = args("transport").head
      val station = args("station").head

      if(controller.validateMove(station.toInt, TicketType.of(transport))) {
        controller.doMove(station.toInt, TicketType.of(transport))
      }
      if (controller.getWin()) controller.winGame()

      returnGameStatusOk
    }.getOrElse(InternalServerError("Ooopa - Internal Server Error"))
  }

  def undoMove(): Action[AnyContent] = Action { implicit request =>
    controller.undoValidateAndMove()
    returnGameStatusOk
  }

  def redoMove(): Action[AnyContent] = Action { implicit request =>
    controller.redoValidateAndMove()
    returnGameStatusOk
  }

  def revealMrXPosition(): Action[AnyContent] = Action { implicit request =>
    returnGameStatusOk(request, controller.getMrX().station.number.toString)
  }

  def moveMap(direction: String): Action[AnyContent] = Action { implicit request =>
    tui.evaluateMoveMapInput(direction)
    returnGameStatusOk
  }



  def getCoords(): Action[AnyContent] = Action { implicit request =>
    implicit val coordsListFormat = Json.format[Coordinate]

    val coordsListBuffer = new ListBuffer[Coordinate]
    for (player <- controller.getPlayersList()) {
      if (player == controller.getCurrentPlayer()) {
        coordsListBuffer += Coordinate(current = true, String.format("#%02x%02x%02x", player.color.getRed, player.color.getGreen, player.color.getBlue), player.station.guiCoords.x, player.station.guiCoords.y)
      } else {
        coordsListBuffer += Coordinate( current = false,String.format("#%02x%02x%02x", player.color.getRed, player.color.getGreen, player.color.getBlue), player.station.guiCoords.x, player.station.guiCoords.y)
      }
    }

    Ok(Json.obj("coordinates" -> coordsListBuffer.toList))
  }

  def returnGameStatusOk(implicit request: Request[_], mrxStation: String = ""): Result = {
    val gameHtml = views.html.game(controller.getCurrentPlayer(), mrxStation, controller.getMrX().history, controller.getPlayersList(), controller.getTotalRound())
    Ok(views.html.main("Scotland Yard")(true)(gameHtml))
  }
}
