package controllers

import javax.inject._
import de.htwg.se.scotlandyard.aview.tui.{RevealMrX1State, RevealMrX2State}

import model.Game

import play.api.mvc._

@Singleton
class MainController @Inject()(cc: ControllerComponents)(implicit assetsFinder: AssetsFinder)
  extends AbstractController(cc) {

  val tui = Game.tui
  val controller = Game.controller

  def index = Action {
    Ok(views.html.index("Welcome to ScotlandYard!"))
  }

  def showRules() = Action {
    Ok(views.html.main("ScotlandYard")(views.html.rules("Rules")))
  }

  def openGame() = Action {
    Ok(views.html.main("ScotlandYard")(views.html.game(tui.toString())))
  }

  def setNumberOfPlayer(number: String) = Action {
    controller.initPlayers(number.toInt)
    Ok(views.html.main("ScotlandYard")(views.html.game(tui.toString())))
  }

  def startReveal() = Action {
    tui.changeState(new RevealMrX1State(tui))
    Ok(views.html.main("ScotlandYard")(views.html.game(tui.toString())))
  }

  def chooseName(input: String) = Action {
    tui.evaluateNameMenu(input)
    Ok(views.html.main("ScotlandYard")(views.html.game(tui.toString())))
  }

  def enterName(input: String) = Action {
    tui.evaluateEnterName(input)
    Ok(views.html.main("ScotlandYard")(views.html.game(tui.toString())))
  }

  def revealMrXPosition() = Action {
    tui.changeState(new RevealMrX2State(tui))
    Ok(views.html.main("ScotlandYard")(views.html.game(tui.toString())))
  }

  def startGame() = Action {
    Ok(views.html.main("ScotlandYard")(views.html.game(tui.toString())))
  }

  def movePlayer(station: String, ticket: String) = Action {
    tui.evaluateNextPositionInput(station + " " + ticket)
    Ok(views.html.main("ScotlandYard")(views.html.game(tui.toString())))
  }

  def undoMove() = Action {
    controller.undoValidateAndMove()
    Ok(views.html.main("ScotlandYard")(views.html.game(tui.toString())))
  }

  def redoMove() = Action {
    controller.redoValidateAndMove()
    Ok(views.html.main("ScotlandYard")(views.html.game(tui.toString())))
  }
}
