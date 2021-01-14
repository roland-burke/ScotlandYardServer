package model

import scala.util.Random
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

  // COOKIE HANDLING

  val MAX_PLAYER = 7 // Should be initial length of freeIds
  var freeIds = List(0, 1, 2, 3, 4, 5, 6)
  var defaultNames = List("MrX", "Dt1", "Dt2", "Dt3", "Dt4", "Dt5", "Dt6")
  var playerList: List[Player] = List()
  var idPlayerMap: Map[Int, Int] = Map() // Map id to player Index

  def getRandomId(): Int = {
    val random = Random
    var id = random.nextInt(Int.MaxValue)
    if(id < 0) {
      id = id * (-1)
    }
    println("random id: ")
    println(id)
    id
  }

  /*
    @return id of the new Player or -1 if lobby is full
    Generates a random id and map the id to a player index
   */
  def register(idFromClient: Int): Int = {
    var id = idFromClient // assign to another variable because a method parameter is immutable
    if(playerList.length >= 7) {
      return -2
    }

    if(id == -1) { // client has no id, generate a new one. Otherwise use the existing one
      id = getRandomId()
    }
    if(idPlayerMap.contains(id)) { // client is already registered
      return -1
    }

    // Gets the next unused player
    val playerIndex = freeIds(0)
    freeIds = freeIds.drop(1)

    idPlayerMap += (id -> playerIndex)

    val hexColor = "#" + Integer.toHexString(gameInitializer.getColorList()(playerIndex).getRGB).substring(2)
    playerList = playerList :+ Player(id, defaultNames(playerIndex), hexColor, false)
    id
  }

  def deregister(id: Int): Unit = {
    if(controller.getGameRunning) {
      print("Game running! Deregister skipped..")
      return
    }
    var playerIndex = -1
    println("=== BEFORE DEREGISTER ===")
    println(idPlayerMap)
    println(playerList)
    println(freeIds)
    if(idPlayerMap.contains(id)) {
      playerIndex = idPlayerMap.get(id).get
      println(playerIndex)
      playerList =  playerList.take(playerIndex) ++ playerList.drop(playerIndex + 1) // Remove actual Player from PlayerList
      idPlayerMap = idPlayerMap.removed(id) // remove mapping from id to playerIndex
      if(idPlayerMap.values.exists(_ >= playerIndex)) { // if it is not the last player, the other players should be moved
        // e.g.: Player: 1,2,3,4 -> player 2 leaves -> it should be: 1,2,3
        movePlayerPositionsInLobby(playerIndex)
      }
      freeIds = ((MAX_PLAYER - 1) - freeIds.length) :: freeIds
    }
    println("=== AFTER DEREGISTER ===")
    println(idPlayerMap)
    println(playerList)
    println(freeIds)
  }

  def movePlayerPositionsInLobby(leavingPlayerIndex: Int): Unit = {
    // remember: player already removed!!
    for((key,value) <- idPlayerMap){
      if(key > leavingPlayerIndex) {
        val tmpValue = idPlayerMap.get(key).get
        idPlayerMap = idPlayerMap.removed(key)
        idPlayerMap += key -> (tmpValue - 1)
      }
    }
    if(leavingPlayerIndex == 0) { // MrX left, so the next MrX players name and color needs to be set
      playerList(0).name = "MrX"
      playerList(0).color = "#000000"
    }
  }

  // END COOKIE HANDLING

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

  def getLobbyPlayerDataModel(index: Int): Player = {
    playerList(index)
  }

  def resetPlayerList(): Unit = {
    freeIds = List(0, 1, 2, 3, 4, 5, 6)
    playerList = List()
    idPlayerMap = Map()
  }

  def GetPlayerDataModel(player: DetectiveInterface, index: Int): PlayerData = {
    var isCurrent = false
    if (controller.getCurrentPlayer().name.equals(player.name)) {
      isCurrent = true
    }
    val clientId = idPlayerMap.find(_._2 == index).map(_._1).getOrElse(-1)
    var playerData = PlayerData(
      name = player.name,
      station = player.station.number,
      current = isCurrent,
      String.format("#%02x%02x%02x", player.color.getRed, player.color.getGreen, player.color.getBlue),
      Tickets(taxi = player.tickets.taxiTickets, player.tickets.busTickets, player.tickets.undergroundTickets, player.tickets.blackTickets),
      "", // lastSeen
      0, // lastSeenX
      0, // lastSeenY
      false,
      player.station.guiCoords.x,
      player.station.guiCoords.y,
      id = clientId)

    if (playerData.name.equals("MrX")) {
      playerData.lastSeen = player.asInstanceOf[MrXInterface].lastSeen
      playerData.isVisible = controller.getMrX().isVisible
      if (!controller.getMrX().lastSeen.equals("never")) {
        playerData.lastSeenX = controller.getStations()(controller.getMrX().lastSeen.toInt).guiCoords.x
        playerData.lastSeenY = controller.getStations()(controller.getMrX().lastSeen.toInt).guiCoords.y
      }
    }
    playerData
  }
}

case class Tickets(taxi : Int, bus: Int, underground: Int, black: Int)
case class PlayerData(name: String, station: Int, current: Boolean, color: String, tickets: Tickets, var lastSeen: String, var lastSeenX: Int, var lastSeenY: Int, var isVisible: Boolean, x: Int, y: Int, id: Int)
case class History(ticketType: String)
case class Player(var id: Int, var name: String, var color: String, var ready: Boolean)

