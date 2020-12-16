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

  //val tui: Tui = Game.tui
  val controller: ControllerInterface = Game.controller

  // Game endpoints
  def undoMove(): Action[AnyContent] = Action { implicit request =>
    controller.undoValidateAndMove()
    Ok
  }

  def redoMove(): Action[AnyContent] = Action { implicit request =>
    controller.redoValidateAndMove()
    Ok
  }

  def revealMrXPosition(): Action[AnyContent] = Action { implicit request =>
    Ok
  }

  def getCurrentPlayer(): Action[AnyContent] = Action { implicit request =>
    implicit val ticketsListFormat = Json.format[Tickets]
    implicit val playerDataListFormat = Json.format[PlayerData]
    val player = controller.getCurrentPlayer()
    Ok(Json.obj("player" -> model.Game.GetPlayerDataModel(player)))
  }

  def getPlayer(playerName: String): Action[AnyContent] = Action { implicit request =>
    implicit val ticketsListFormat = Json.format[Tickets]
    implicit val playerDataListFormat = Json.format[PlayerData]
    val playerDataListBuffer = new ListBuffer[PlayerData]
    var returnObject: JsObject = null

    if (playerName.isEmpty()) {
      for (player <- controller.getPlayersList()) {
        if (player == controller.getCurrentPlayer()) {
          playerDataListBuffer += model.Game.GetPlayerDataModel(player)
        } else {
          playerDataListBuffer += model.Game.GetPlayerDataModel(player)
        }
      }
      returnObject = Json.obj("players" -> playerDataListBuffer.toList)
    } else {
      for (player <- controller.getPlayersList()) {
        if (player.name.equals(playerName)) {
          returnObject = Json.obj("player" -> model.Game.GetPlayerDataModel(player))
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

}
