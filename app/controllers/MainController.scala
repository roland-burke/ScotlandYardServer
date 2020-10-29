package controllers

import javax.inject._
import de.htwg.se.scotlandyard.aview.tui.{RevealMrX1State, RevealMrX2State, Tui}
import de.htwg.se.scotlandyard.controllerComponent.ControllerInterface
import model.Game
import play.api.mvc._

@Singleton
class MainController @Inject()(cc: ControllerComponents)(implicit assetsFinder: AssetsFinder)
  extends AbstractController(cc) {

  val tui: Tui = Game.tui
  val controller: ControllerInterface = Game.controller

  def index: Action[AnyContent] = Action {
    Ok(views.html.index("Welcome to ScotlandYard!"))
  }

  def showRules(): Action[AnyContent] = Action {
    Ok(views.html.main("ScotlandYard")(views.html.about("About")))
  }

  // Menu Endpoints

  def openMenu(): Action[AnyContent] = Action { implicit request =>
    returnMenuStatusOk
  }

  def setNumberOfPlayer(number: String): Action[AnyContent] = Action { implicit request =>
    controller.initPlayers(number.toInt)
    returnMenuStatusOk
  }

  def startReveal(): Action[AnyContent] = Action { implicit request =>
    tui.changeState(new RevealMrX1State(tui))
    returnMenuStatusOk
  }

  def chooseName(input: String): Action[AnyContent] = Action { implicit request =>
    tui.evaluateNameMenu(input)
    returnMenuStatusOk
  }

  def enterName(input: String): Action[AnyContent] = Action { implicit request =>
    tui.evaluateEnterName(input)
    returnMenuStatusOk
  }

  def revealMrXPosition(): Action[AnyContent] = Action { implicit request =>
    tui.changeState(new RevealMrX2State(tui))
    returnMenuStatusOk
  }

  // Game endpoints

  def startGame(): Action[AnyContent] = Action { implicit request =>
    returnGameStatusOk
  }

  def movePlayer(station: String, ticket: String): Action[AnyContent] = Action { implicit request =>
    tui.evaluateNextPositionInput(station + " " + ticket)
    returnGameStatusOk
  }

  def undoMove(): Action[AnyContent] = Action { implicit request =>
    controller.undoValidateAndMove()
    returnGameStatusOk
  }

  def redoMove(): Action[AnyContent] = Action { implicit request =>
    controller.redoValidateAndMove()
    returnGameStatusOk
  }

  def returnMenuStatusOk(implicit request: Request[_]): Result = {
    val menuHtml = views.html.main("ScotlandYard")(views.html.menu(tui.toString()))
    Ok(views.html.main("ScotlandYard")(menuHtml))
  }

  def returnGameStatusOk(implicit request: Request[_]): Result = {
    val gameHtml = views.html.game()(views.html.map(tui.toString()))
    Ok(views.html.main("ScotlandYard")(gameHtml))
  }
}
