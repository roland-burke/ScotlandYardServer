package controllers

import javax.inject._
import de.htwg.se.scotlandyard.aview.tui.Tui
import de.htwg.se.scotlandyard.controllerComponent.ControllerInterface
import de.htwg.se.scotlandyard.model.tuiMapComponent.station.Station
import de.htwg.se.scotlandyard.util.TicketType
import model.Game
import model.Game.controller
import play.api.libs.json._
import play.api.mvc._

import scala.collection.mutable.ListBuffer
import scala.swing.Point

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
    val jsonBody: Option[JsValue] = request.body.asJson
    println(jsonBody)

    jsonBody
      .map { json =>
        val ticketType = (json \ "ticketType").as[String]
        val xPos = (json \ "x").as[Int]
        val yPos = (json \ "y").as[Int]

        val destStation: Station = closestStationToCoords(xPos, yPos)

        if(controller.validateMove(destStation.number, TicketType.of(ticketType))) {
          controller.doMove(destStation.number, TicketType.of(ticketType))
          if (controller.getWin()) {
            controller.winGame()
          }
          Ok
        } else {
          BadRequest("Move unvalid")
        }
      }
      .getOrElse {
        BadRequest("Expected json request body")
      }
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

  def closestStationToCoords(xPos: Int, yPos: Int): Station = {
    var distance = 9999.0
    var guessedStation: Station = controller.getStations().head
    for (station <- controller.getStations()) {
      val clickedPoint = new Point(xPos, yPos)
      if (station.guiCoords.distance(clickedPoint) < distance) {
        distance = station.guiCoords.distance(clickedPoint)
        guessedStation = station
      }
    }
    guessedStation
  }

  def returnGameStatusOk(implicit request: Request[_], mrxStation: String = ""): Result = {
    val gameHtml = views.html.game(controller.getCurrentPlayer(), mrxStation, controller.getMrX().history, controller.getPlayersList(), controller.getTotalRound())
    Ok(views.html.main("Scotland Yard")(true)(gameHtml))
  }
}
