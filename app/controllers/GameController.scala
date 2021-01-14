package controllers

import javax.inject._
import de.htwg.se.scotlandyard.controllerComponent.ControllerInterface
import model.{Game, History, PlayerData, Tickets}
import play.api.libs.json._
import play.api.mvc._
import scala.collection.mutable.ListBuffer


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

  def getCurrentPlayer(): Action[AnyContent] = Action { implicit request =>
    implicit val ticketsListFormat = Json.format[Tickets]
    implicit val playerDataListFormat = Json.format[PlayerData]
    val player = controller.getCurrentPlayer()
    Ok(Json.obj("player" -> model.Game.GetPlayerDataModel(player, 0)))
  }

  def getPlayer(playerName: String): Action[AnyContent] = Action { implicit request =>
    implicit val ticketsListFormat = Json.format[Tickets]
    implicit val playerDataListFormat = Json.format[PlayerData]
    val playerDataListBuffer = new ListBuffer[PlayerData]
    var returnObject: JsObject = null

    if (playerName.isEmpty()) {
      for ((player, i) <- controller.getPlayersList().view.zipWithIndex) {
        if (player == controller.getCurrentPlayer()) {
          playerDataListBuffer += model.Game.GetPlayerDataModel(player, i)
        } else {
          playerDataListBuffer += model.Game.GetPlayerDataModel(player, i)
        }
      }
      returnObject = Json.obj("players" -> playerDataListBuffer.toList)
    } else {
      for ((player, i) <- controller.getPlayersList().view.zipWithIndex) {
        if (player.name.equals(playerName)) {
          returnObject = Json.obj("player" -> model.Game.GetPlayerDataModel(player, i))
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
