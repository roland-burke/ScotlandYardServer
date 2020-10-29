package controllers

import javax.inject._
import play.api.mvc._

@Singleton
class MainController @Inject()(cc: ControllerComponents)(implicit assetsFinder: AssetsFinder)
  extends AbstractController(cc) {

  def index: Action[AnyContent] = Action {
    Ok(views.html.index("Welcome to ScotlandYard!"))
  }

  def showRules(): Action[AnyContent] = Action {
    Ok(views.html.main("ScotlandYard")(views.html.about("About")))
  }

}
