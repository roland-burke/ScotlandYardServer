package controllers

import javax.inject._
import play.api.mvc._

@Singleton
class MapController @Inject()(cc: ControllerComponents)(implicit assetsFinder: AssetsFinder) extends AbstractController(cc) {
  //

}
