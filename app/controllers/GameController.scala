package controllers

import javax.inject._
import de.htwg.se.scotlandyard.aview.tui.Tui
import de.htwg.se.scotlandyard.controllerComponent.ControllerInterface
import de.htwg.se.scotlandyard.util.TicketType
import model.Game
import play.api.mvc.{_}

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
      controller.doMove(station.toInt, TicketType.of(transport))
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

  def returnGameStatusOk(implicit request: Request[_]): Result = {
    val gameHtml = views.html.game(controller.getCurrentPlayer(), views.html.map(tui.toString()))
    Ok(views.html.main("ScotlandYard")(gameHtml))
  }
}
