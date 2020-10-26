package controllers

import com.google.inject.Guice
import de.htwg.se.scotlandyard.ScotlandYardModule
import javax.inject._
import de.htwg.se.scotlandyard.aview.tui.Tui
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
    Ok(tui.toString())
  }

  def player(number: String) = Action {
    controller.initPlayers(number.toInt)
    Ok(tui.toString())
  }

  def start() = Action {
    controller.startGame()
    Ok(tui.toString())
  }
}
