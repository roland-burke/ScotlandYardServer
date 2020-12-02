package controllers

import javax.inject._
import de.htwg.se.scotlandyard.aview.tui.Tui
import de.htwg.se.scotlandyard.controllerComponent.ControllerInterface
import de.htwg.se.scotlandyard.model.tuiMapComponent.station.Station
import de.htwg.se.scotlandyard.util.TicketType
import model.{Game, History, PlayerData, Tickets}
import play.api.libs.json._
import play.api.mvc._

import scala.collection.mutable.ListBuffer
import scala.swing.Point

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
            if(controller.getWinningPlayer().name.equals("MrX")) {
              ResetContent
            } else {
              PartialContent
            }
          } else {
            Ok
          }
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
    Ok
  }

  def redoMove(): Action[AnyContent] = Action { implicit request =>
    controller.redoValidateAndMove()
    Ok
  }

  def revealMrXPosition(): Action[AnyContent] = Action { implicit request =>
    returnGameStatusOk(request, controller.getMrX().station.number.toString)
  }

  def getCurrentPlayer(): Action[AnyContent] = Action { implicit request =>
    implicit val ticketsListFormat = Json.format[Tickets]
    implicit val playerDataListFormat = Json.format[PlayerData]
    val player = controller.getCurrentPlayer()
    Ok(Json.obj("player" -> model.Game.GetPlayerModel(player)))
  }

  def getPlayer(playerName: String): Action[AnyContent] = Action { implicit request =>
    implicit val ticketsListFormat = Json.format[Tickets]
    implicit val playerDataListFormat = Json.format[PlayerData]
    val playerDataListBuffer = new ListBuffer[PlayerData]
    var returnObject: JsObject = null

    if (playerName.isBlank) {
      for (player <- controller.getPlayersList()) {
        if (player == controller.getCurrentPlayer()) {
          playerDataListBuffer += model.Game.GetPlayerModel(player)
        } else {
          playerDataListBuffer += model.Game.GetPlayerModel(player)
        }
      }
      returnObject = Json.obj("players" -> playerDataListBuffer.toList)
    } else {
      for (player <- controller.getPlayersList()) {
        if (player.name.equals(playerName)) {
          returnObject = Json.obj("player" -> model.Game.GetPlayerModel(player))
        }
      }
    }

    Ok(returnObject)
  }

  def getHistory(): Action[AnyContent] = Action { implicit request =>
    implicit val historyListFormat = Json.format[History]

    val historyListBuffer = new ListBuffer[History]
    for (historyEntry <- controller.getMrX().history) {
      historyListBuffer += History(historyEntry.toString)
    }

    Ok(Json.obj("history" -> historyListBuffer.toList))
  }

  def getRound(): Action[AnyContent] = Action { implicit request =>
    Ok(Json.obj("round" -> JsNumber(controller.getTotalRound().toInt)))
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
