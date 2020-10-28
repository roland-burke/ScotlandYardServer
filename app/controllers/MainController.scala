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
    Ok(views.html.index(tui.toString()))
  }

  def setNumberOfPlayer(number: String) = Action {
    controller.initPlayers(number.toInt)
    Ok(views.html.index(tui.toString()))
  }

  def startReveal() = Action {
    tui.changeState(new RevealMrX1State(tui))
    Ok(views.html.index(tui.toString()))
  }

  def chooseName(input: String) = Action {
    tui.evaluateNameMenu(input)
    Ok(views.html.index(tui.toString()))
  }

  def enterName(input: String) = Action {
    tui.evaluateEnterName(input)
    Ok(views.html.index(tui.toString()))
  }

  def revealMrXPosition() = Action {
    tui.changeState(new RevealMrX2State(tui))
    Ok(views.html.index(tui.getMrXStartingPositionStringAndStartGame()))
  }

  def startGame() = Action {
    Redirect(routes.MainController.index())
  }

  def movePlayer(station: String, ticket: String) = Action {
    tui.evaluateNextPositionInput(station + " " + ticket)
    Ok(views.html.index(tui.toString()))
  }
}
