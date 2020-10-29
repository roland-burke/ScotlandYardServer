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
    Ok(views.html.main("ScotlandYard")(views.html.rules("Rules")))
  }

  def openGame(): Action[AnyContent] = Action {
    Ok(views.html.main("ScotlandYard")(views.html.game(tui.toString())))
  }

  def setNumberOfPlayer(number: String): Action[AnyContent] = Action {
    controller.initPlayers(number.toInt)
    Ok(views.html.main("ScotlandYard")(views.html.game(tui.toString())))
  }

  def startReveal(): Action[AnyContent] = Action {
    tui.changeState(new RevealMrX1State(tui))
    Ok(views.html.main("ScotlandYard")(views.html.game(tui.toString())))
  }

  def chooseName(input: String): Action[AnyContent] = Action {
    tui.evaluateNameMenu(input)
    Ok(views.html.main("ScotlandYard")(views.html.game(tui.toString())))
  }

  def enterName(input: String): Action[AnyContent] = Action {
    tui.evaluateEnterName(input)
    Ok(views.html.main("ScotlandYard")(views.html.game(tui.toString())))
  }

  def revealMrXPosition(): Action[AnyContent] = Action {
    tui.changeState(new RevealMrX2State(tui))
    Ok(views.html.main("ScotlandYard")(views.html.game(tui.toString())))
  }

  def startGame(): Action[AnyContent] = Action {
    Ok(views.html.main("ScotlandYard")(views.html.game(tui.toString())))
  }

  def movePlayer(station: String, ticket: String): Action[AnyContent] = Action {
    tui.evaluateNextPositionInput(station + " " + ticket)
    Ok(views.html.main("ScotlandYard")(views.html.game(tui.toString())))
  }

  def undoMove(): Action[AnyContent] = Action {
    controller.undoValidateAndMove()
    Ok(views.html.main("ScotlandYard")(views.html.game(tui.toString())))
  }

  def redoMove(): Action[AnyContent] = Action {
    controller.redoValidateAndMove()
    Ok(views.html.main("ScotlandYard")(views.html.game(tui.toString())))
  }
}
