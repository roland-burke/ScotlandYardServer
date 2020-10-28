package controllers

import javax.inject._
import model.Game
import play.api.mvc._

@Singleton
class MapController @Inject()(cc: ControllerComponents)(implicit assetsFinder: AssetsFinder) extends AbstractController(cc) {

  val tui = Game.tui

  def moveMap(direction: String) = Action {
    tui.evaluateMoveMapInput(direction)
    Ok(views.html.main("ScotlandYard")(views.html.game(tui.toString())))
  }

}
