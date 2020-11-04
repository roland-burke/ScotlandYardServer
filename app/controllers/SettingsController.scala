package controllers

import javax.inject._
import de.htwg.se.scotlandyard.controllerComponent.ControllerInterface
import model.Game
import play.api.mvc._

@Singleton
class SettingsController @Inject()(cc: ControllerComponents)(implicit assetsFinder: AssetsFinder)
  extends AbstractController(cc) {

  val controller: ControllerInterface = Game.controller

  // Settings Endpoints

  def openMenu(): Action[AnyContent] = Action { implicit request =>
    returnMenuStatusOk
  }

  def setNumberOfPlayer(): Action[AnyContent] = Action { implicit request =>
    val selection = request.body.asFormUrlEncoded
    selection.map { args =>
      val number = args("nPlayer").head
      controller.initPlayers(number.toInt)
      returnMenuStatusOk
    }.getOrElse(InternalServerError("Ooopa - Internal Server Error"))
  }

  def setPlayerName(): Action[AnyContent] = Action { implicit request =>
    val selection = request.body.asFormUrlEncoded
    println(selection.toString)
    selection.map { args =>
      val playerName = args("playerName").head
      val playerIndex = args("playerIndex").head
      controller.setPlayerName(playerName, playerIndex.toInt)
      returnMenuStatusOk
    }.getOrElse(InternalServerError("Ooopa - Internal Server Error"))
  }

  def returnMenuStatusOk(implicit request: Request[_]): Result = {
    val menuHtml = views.html.main("ScotlandYard")(views.html.settings("Settings", controller.getPlayersList().length.toString, controller.getPlayersList()))
    Ok(views.html.main("ScotlandYard")(menuHtml))
  }

}