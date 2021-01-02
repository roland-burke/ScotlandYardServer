package controllers

import akka.actor.{Actor, ActorRef, Props}
import de.htwg.se.scotlandyard.controllerComponent.{ControllerInterface, LobbyChange, NumberOfPlayersChanged, PlayerColorChanged, PlayerMoved, PlayerNameChanged, PlayerWin, StartGame}
import de.htwg.se.scotlandyard.model.tuiMapComponent.station.Station
import de.htwg.se.scotlandyard.util.TicketType
import model.{Game, History, Player, PlayerData, Tickets}
import play.api.libs.json.{JsArray, JsObject, Json}

import scala.collection.mutable.ListBuffer
import scala.swing.{Point, Reactor}

object GameWebSocketActor {
  def props(clientActorRef: ActorRef) = Props(new GameWebSocketActor(clientActorRef))
}

class GameWebSocketActor(clientActorRef: ActorRef) extends Actor with Reactor{
  val controller: ControllerInterface = Game.controller

  listenTo(controller)
  reactions += {
    case _: PlayerNameChanged =>
      clientActorRef ! getAllDataObject("ModelChanged")
    case _: NumberOfPlayersChanged =>
      clientActorRef ! getAllDataObject("ModelChanged")
    case _: PlayerColorChanged =>
      clientActorRef ! getAllDataObject("ModelChanged")
    case _: PlayerMoved =>
      clientActorRef ! getAllDataObject("ModelChanged")
    case _: StartGame =>
      clientActorRef ! getAllDataObject("StartGame")
    case _: PlayerWin =>
      clientActorRef ! getAllDataObject("ModelChanged")
      clientActorRef ! Json.obj("event" -> "GameFinished")
      Game.resetPlayerList()
    case _: LobbyChange => clientActorRef ! getPlayerLobbyObject("lobby-change")
  }

  override def preStart() = {
    clientActorRef ! getAllDataObject("ModelChanged")
  }

  def receive: Receive = {
    case obj: JsObject =>
      val map = obj.value
      if (map.contains("event")) {
        map("event").asOpt[String].get match {
          case "undo" => controller.undoValidateAndMove()
          case "redo" => controller.redoValidateAndMove()
          case "ping" => clientActorRef ! Json.obj("event" -> "Alive")
          case "move" => movePlayer(map("data").asOpt[JsObject])
          case "register" => notifyPlayerAndRegister()
          case "deregister" => notifyPlayer() // TODO: get deregister id
          case "lobby-change" => 
            updateBackendData(Option(obj))
            startGameIfReady()
            notifyPlayer()
          case "StartGame" => controller.startGame()
          case _ => println("Unknown: event")
        }
      }
  }

  def initGame(): Unit = {
    val nPlayer = Game.playerList.length
    controller.initPlayers(nPlayer)
    for(n <- 0 until nPlayer) {
      controller.setPlayerName(Game.playerList(n).name, n)
      controller.setPlayerColor(Game.playerList(n).color, n)
    }
    controller.startGame()
  }

  def startGameIfReady(): Unit = {
    var allReady = true
    for(p <- Game.playerList) {
      allReady = p.ready && allReady
    }
    if(allReady) {
      initGame()
    }
  }

  def notifyPlayer(): Unit = {
    println("notify player")
    println(getPlayerLobbyObject("lobby-change"))
    controller.updateLobby()
  }

  def getRound(): Int = {
    controller.getTotalRound()
  }

  def getAllDataObject(event: String): JsObject = {
    if (controller.getWin()) {
      Json.obj("event" -> event, "player" -> getPlayer(""), "history" -> getHistory(), "round" -> getRound(), "win" -> controller.getWin(), "winningPlayer" -> controller.getWinningPlayer().name)
    } else {
      Json.obj("event" -> event, "player" -> getPlayer(""), "history" -> getHistory(), "round" -> getRound(), "win" -> controller.getWin())
    }
  }

  def updateBackendData(jsonBody: Option[JsObject]) :Unit = {
    jsonBody.map {
      json =>
        println(json)
        val jsonPlayer = (json \ "data" \ "player").as[JsArray]
        var player: List[Player] = List()
        for(p <- jsonPlayer.value) {
          val id = (p \ "id").get.toString().toInt
          val name = (p \ "name").asOpt[String].get
          val color = (p \ "color").asOpt[String].get
          val ready = (p \ "ready").get.toString().toBoolean
          player = player:::List(Player(id, name, color, ready))
        }
        Game.playerList = player
    }
  }

  def notifyPlayerAndRegister(): Unit = {
    println("register event")
    clientActorRef ! Json.obj("event" -> "register", "id" -> Game.register())
    notifyPlayer()
  }

  def getHistory(): JsObject = {
    implicit val historyListFormat = Json.format[History]

    val historyListBuffer = new ListBuffer[History]
    for (historyEntry <- controller.getMrX().history) {
      historyListBuffer += History(historyEntry.toString)
    }

    Json.obj("history" -> historyListBuffer.toList)
  }

  def getPlayerLobbyObject(event: String): JsObject = {
    implicit val playerListFormat = Json.format[Player]
    val nPlayer = Game.playerList.length
    val playerListBuffer = new ListBuffer[Player]
    var returnObject: JsObject = null
    for (i <- 0 until nPlayer) {
      playerListBuffer += model.Game.getLobbyPlayerDataModel(i)
    }
    returnObject = Json.obj("event" -> event, "player" -> playerListBuffer.toList)
    returnObject
  }

  def getPlayer(playerName: String): JsObject =  {
    implicit val ticketsListFormat = Json.format[Tickets]
    implicit val playerDataListFormat = Json.format[PlayerData]
    val playerDataListBuffer = new ListBuffer[PlayerData]
    var returnObject: JsObject = null

    if (playerName.isEmpty()) {
      for (player <- controller.getPlayersList()) {
        if (player == controller.getCurrentPlayer()) {
          playerDataListBuffer += model.Game.GetPlayerDataModel(player)
        } else {
          playerDataListBuffer += model.Game.GetPlayerDataModel(player)
        }
      }
      returnObject = Json.obj("players" -> playerDataListBuffer.toList)
    } else {
      for (player <- controller.getPlayersList()) {
        if (player.name.equals(playerName)) {
          returnObject = Json.obj("player" -> model.Game.GetPlayerDataModel(player))
        }
      }
    }
    returnObject
  }
  def movePlayer(jsonBody: Option[JsObject]): Unit = {
    jsonBody.map {
      json =>
        val ticketType = (json \ "ticketType").as[String]
        val xPos = (json \ "x").as[Int]
        val yPos = (json \ "y").as[Int]

        val destStation: Station = closestStationToCoords(xPos, yPos)

        if(controller.validateMove(destStation.number, TicketType.of(ticketType))) {
          controller.doMove(destStation.number, TicketType.of(ticketType))
          if (controller.getWin()) {
            controller.winGame()
          }
        }
      }
  }

  def closestStationToCoords(xPos: Int, yPos: Int): Station = {
    var distance = 9999.0
    var guessedStation: Station = controller.getStations().head
    for (station <- controller.getStations()) {
      val clickedPoint = new Point(xPos, yPos)
      if (station.guiCoords.distance(clickedPoint) < distance) {
        distance = station.guiCoords.distance(clickedPoint)
        guessedStation = station
      }
    }
    guessedStation
  }
}

