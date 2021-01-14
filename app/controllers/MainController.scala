package controllers

import de.htwg.se.scotlandyard.controllerComponent.ControllerInterface
import javax.inject._
import model.Game
import play.api.libs.json.{JsObject, Json}
import play.api.mvc._

@Singleton
class MainController @Inject()(cc: ControllerComponents)(implicit assetsFinder: AssetsFinder)
  extends AbstractController(cc) {

  val controller: ControllerInterface = Game.controller

  def index: Action[AnyContent] = Action {
    Redirect("localhost:8080", 301)
  }
}
