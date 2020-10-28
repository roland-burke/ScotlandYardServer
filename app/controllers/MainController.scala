package controllers

import com.google.inject.Guice
import de.htwg.se.scotlandyard.ScotlandYardModule
import javax.inject._
import de.htwg.se.scotlandyard.aview.tui.{RevealMrX1State, RevealMrX2State, Tui}
import de.htwg.se.scotlandyard.controllerComponent.ControllerInterface
import de.htwg.se.scotlandyard.model.coreComponent.GameMaster
import de.htwg.se.scotlandyard.model.coreComponent.gameInitializerComponent.GameInitializerInterface
import de.htwg.se.scotlandyard.model.tuiMapComponent.TuiMapInterface
import play.api.mvc._

@Singleton
class MainController @Inject()(cc: ControllerComponents)(implicit assetsFinder: AssetsFinder)
  extends AbstractController(cc) {

  val injector = Guice.createInjector(new ScotlandYardModule)

  val controller = injector.getInstance(classOf[ControllerInterface])
  val tuiMap = injector.getInstance(classOf[TuiMapInterface])
  val gameInitializer = injector.getInstance(classOf[GameInitializerInterface])

  GameMaster.initialize()
  val tui = new Tui(controller, tuiMap)

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

  def moveMap(direction: String) = Action {
    tui.evaluateMoveMapInput(direction)
    Ok(views.html.index(tui.toString()))
  }

  def movePlayer(station: String) = Action {
    tui.evaluateNextPositionInput(station)
    Ok(views.html.index(tui.toString()))
  }

  /*
  def moveMapUp() = Action {

  }

  def moveMapDown() = Action {

  }

  def moveMapLeft() = Action {

  }

  def moveMapRight() = Action {

  }

   */
}
