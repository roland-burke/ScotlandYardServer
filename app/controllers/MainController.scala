package controllers

import de.htwg.se.scotlandyard.controllerComponent.ControllerInterface
import javax.inject._
import model.Game
import play.api.libs.json.{JsObject, JsValue, Json}
import play.api.mvc._

@Singleton
class MainController @Inject()(cc: ControllerComponents)(implicit assetsFinder: AssetsFinder)
  extends AbstractController(cc) {

  val controller: ControllerInterface = Game.controller

  def index: Action[AnyContent] = Action {
    Ok(views.html.index(controller.getGameRunning()))
  }

  def showRules(): Action[AnyContent] = Action {
    Ok(views.html.main("Scotland Yard")(controller.getGameRunning())(views.html.about("About")))
  }

  def getGameRunning(): Action[AnyContent] = Action { implicit request =>
    var returnObject: JsObject = null
    returnObject = Json.obj("gameRunning" -> controller.getGameRunning())
    Ok(returnObject)
  }
}
