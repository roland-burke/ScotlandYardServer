package controllers

import javax.inject._
import de.htwg.se.scotlandyard.controllerComponent.ControllerInterface
import model.Game
import play.api.mvc._

@Singleton
class LobbyController @Inject()(cc: ControllerComponents)(implicit assetsFinder: AssetsFinder)
  extends AbstractController(cc) {

  val controller: ControllerInterface = Game.controller

  def initGame(): Action[AnyContent] = Action { implicit request =>
    val nPlayer = Game.playerList.length
    controller.initPlayers(nPlayer)
    for(n <- 0 until nPlayer) {
      controller.setPlayerName(Game.playerList(n).name, n)
    }
    controller.startGame()
    Ok
  }

}
