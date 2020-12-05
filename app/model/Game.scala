package model

import com.google.inject.Guice
import de.htwg.se.scotlandyard.ScotlandYardModule
import de.htwg.se.scotlandyard.aview.tui.Tui
import de.htwg.se.scotlandyard.controllerComponent.ControllerInterface
import de.htwg.se.scotlandyard.model.coreComponent.GameMaster
import de.htwg.se.scotlandyard.model.coreComponent.gameInitializerComponent.GameInitializerInterface
import de.htwg.se.scotlandyard.model.playersComponent.{DetectiveInterface, MrXInterface}
import de.htwg.se.scotlandyard.model.tuiMapComponent.TuiMapInterface

object Game {
  val injector = Guice.createInjector(new ScotlandYardModule)

  val controller = injector.getInstance(classOf[ControllerInterface])
  val tuiMap = injector.getInstance(classOf[TuiMapInterface])
  val gameInitializer = injector.getInstance(classOf[GameInitializerInterface])

  GameMaster.initialize()
  //val tui = new Tui(controller, tuiMap)

  def GetPlayerDataModel(player: DetectiveInterface): PlayerData = {
    var playerData = PlayerData(
      name = player.name,
      station = player.station.number,
      current = true,
      String.format("#%02x%02x%02x", player.color.getRed, player.color.getGreen, player.color.getBlue),
      Tickets(taxi = player.tickets.taxiTickets, player.tickets.busTickets, player.tickets.undergroundTickets, player.tickets.blackTickets),
      "", // lastSeen
      player.station.guiCoords.x,
      player.station.guiCoords.y)

    if (playerData.name.equals("MrX")) {
      playerData.lastSeen = player.asInstanceOf[MrXInterface].lastSeen
    }
    playerData
  }
}

case class Tickets(taxi : Int, bus: Int, underground: Int, black: Int)
case class PlayerData(name: String, station: Int, current: Boolean, color: String, tickets: Tickets, var lastSeen: String, x: Int, y: Int)
case class History(ticketType: String)

