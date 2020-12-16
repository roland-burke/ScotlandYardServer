package model

import com.google.inject.Guice
import de.htwg.se.scotlandyard.ScotlandYardModule
import de.htwg.se.scotlandyard.controllerComponent.ControllerInterface
import de.htwg.se.scotlandyard.model.coreComponent.gameInitializerComponent.GameInitializerInterface
import de.htwg.se.scotlandyard.model.playersComponent.{DetectiveInterface, MrXInterface}
import de.htwg.se.scotlandyard.model.tuiMapComponent.TuiMapInterface

object Game {
  val injector = Guice.createInjector(new ScotlandYardModule)

  val controller = injector.getInstance(classOf[ControllerInterface])
  val tuiMap = injector.getInstance(classOf[TuiMapInterface])
  val gameInitializer = injector.getInstance(classOf[GameInitializerInterface])

  gameInitializer.initialize(3)

  var freeIds = List(0, 1, 2, 3, 4, 5, 6)
  var defaultNames = List("MrX", "Dt1", "Dt2", "Dt3", "Dt4", "Dt5", "Dt6")
  var playerList: List[Player] = List()

  /* Lobby:
  data {
    player [
      {
        id: 0,
        name: "MrX",
        color: "#000000",
        ready: false
      },
      {
        id: 1,
        name: "Dt1",
        color: "#0000ff",
        ready: false
      },...
    ]
  }
   */

  def getLobbyPlayerDataModel(id: Int): Player = {
    playerList(id)
  }

  def register(): Int = {
    if(freeIds.length == 0) {
      return -1
    }
    val id = freeIds(0)
    freeIds = freeIds.drop(1)
    val hexColor = "#" + Integer.toHexString(gameInitializer.getColorList()(id).getRGB).substring(2)
    playerList = playerList :+ Player(id, defaultNames(id), hexColor, false)
    id
  }

  def deregister(id: Int): Unit = {
    playerList = playerList.drop(1)
    freeIds = freeIds :+ id
  }

  def GetPlayerDataModel(player: DetectiveInterface): PlayerData = {
    var isCurrent = false
    if (controller.getCurrentPlayer().name.equals(player.name)) {
      isCurrent = true
    }
    var playerData = PlayerData(
      name = player.name,
      station = player.station.number,
      current = isCurrent,
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
case class Player(var id: Int, var name: String, var color: String, var ready: Boolean)

