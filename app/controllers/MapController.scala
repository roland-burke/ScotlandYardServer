package controllers

import javax.inject._
import model.Game
import play.api.mvc._

@Singleton
class MapController @Inject()(cc: ControllerComponents)(implicit assetsFinder: AssetsFinder) extends AbstractController(cc) {

  val tui = Game.tui

  def moveMap(direction: String): Action[AnyContent] = Action { implicit request =>
    tui.evaluateMoveMapInput(direction)
    returnGameStatusOk
  }

  def returnGameStatusOk(implicit request: Request[_]): Result = {
    val gameHtml = views.html.game()(views.html.map(tui.toString()))
    Ok(views.html.main("ScotlandYard")(gameHtml))
  }

}
