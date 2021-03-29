package controllers

import akka.actor.{ Actor, ActorRef, Props }
import de.htwg.se.scotlandyard.controller.{ ControllerInterface, LobbyChange, NumberOfPlayersChanged, PlayerColorChanged, PlayerMoved, PlayerNameChanged, PlayerWin, StartGame }
import de.htwg.se.scotlandyard.model.{ Station, TicketType }
import models.{ Game, History, Player, PlayerData, Tickets }
import play.api.libs.json.{ JsArray, JsObject, Json }

import scala.collection.mutable.ListBuffer
import scala.swing.{ Point, Reactor }

object ScotlandYardWebSocketActor {
  def props(clientActorRef: ActorRef) = Props(new ScotlandYardWebSocketActor(clientActorRef))
}

class ScotlandYardWebSocketActor(clientActorRef: ActorRef) extends Actor with Reactor {
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
    case _: LobbyChange =>
      clientActorRef ! getPlayerLobbyObject("lobby-change")
      clientActorRef ! getAllDataObject("ModelChanged")
  }

  override def preStart() = {
    clientActorRef ! getAllDataObject("ModelChanged")
    clientActorRef ! getPlayerLobbyObject("lobby-change")
  }

  def receive: Receive = {
    case obj: JsObject =>
      val map = obj.value
      if (map.contains("event")) {
        map("event").asOpt[String].get match {
          case "undo" => controller.undoMove()
          case "redo" => controller.redoMove()
          case "ping" => clientActorRef ! Json.obj("event" -> "Alive")
          case "move" => movePlayer(map("data").asOpt[JsObject])
          case "register" => notifyPlayerAndRegister(Option(obj))
          case "deregister" => notifyPlayerAndDeregister(Option(obj))
          case "lobby-change" =>
            updateBackendData(Option(obj))
            startGameIfReady()
            notifyPlayer()
          case "StartGame" => controller.startGame()
          case _ => println("Unknown: event")
        }
      }
  }

  // Lobby methods

  def notifyPlayerAndRegister(jsonBody: Option[JsObject]): Unit = {
    println("register event")
    val id = Game.register(getIdFromJson(jsonBody))

    if (id >= 0) {
      clientActorRef ! Json.obj("event" -> "register", "id" -> id)
      notifyPlayer()
    }
  }

  def notifyPlayerAndDeregister(jsonBody: Option[JsObject]): Unit = {
    println("deregister event")
    val id = getIdFromJson(jsonBody)
    Game.deregister(id)
    notifyPlayer()
  }

  def notifyPlayer(): Unit = {
    println("notify player")
    println(getPlayerLobbyObject("lobby-change"))
    controller.updateLobby()
  }

  def initGame(): Unit = {
    val nPlayer = Game.playerList.length
    controller.initialize(nPlayer)
    for (n <- 0 until nPlayer) {
      controller.setPlayerName(Game.playerList(n).name, n)
      controller.setPlayerColor(Game.playerList(n).color, n)
    }
    controller.startGame()
    clientActorRef ! getAllDataObject("StartGame")
  }

  def startGameIfReady(): Unit = {
    var allReady = true
    for (p <- Game.playerList) {
      allReady = p.ready && allReady
    }
    if (allReady && Game.playerList.length > 1) {
      initGame()
    }
  }

  def updateBackendData(jsonBody: Option[JsObject]): Unit = {
    jsonBody.map {
      json =>
        println(json)
        val jsonPlayer = (json \ "data" \ "player").as[JsArray]
        var player: List[Player] = List()
        for (p <- jsonPlayer.value) {
          val id = (p \ "id").get.toString().toInt
          val name = (p \ "name").asOpt[String].get
          val color = (p \ "color").asOpt[String].get
          val ready = (p \ "ready").get.toString().toBoolean
          player = player ::: List(Player(id, name, color, ready))
        }
        Game.playerList = player
    }
  }

  def getIdFromJson(jsonBody: Option[JsObject]): Int = {
    var id = -1
    jsonBody.map {
      json =>
        id = (json \ "data" \ "id").get.toString().toInt
    }
    id
  }

  def getPlayerLobbyObject(event: String): JsObject = {
    implicit val playerListFormat = Json.format[Player]
    val nPlayer = Game.playerList.length
    val playerListBuffer = new ListBuffer[Player]
    var returnObject: JsObject = null
    for (i <- 0 until nPlayer) {
      playerListBuffer += models.Game.getLobbyPlayerDataModel(i)
    }
    returnObject = Json.obj("event" -> event, "player" -> playerListBuffer.toList)
    returnObject
  }

  // Other Methods

  def getRound(): Int = {
    controller.getTotalRound()
  }

  def getAllDataObject(event: String): JsObject = {
    if (controller.getWin()) {
      Json.obj("event" -> event, "player" -> getPlayer(""), "history" -> getHistory(), "round" -> getRound(), "gameRunning" -> controller.getGameRunning(), "win" -> controller.getWin(), "winningPlayer" -> controller.getWinningPlayer().name)
    } else {
      Json.obj("event" -> event, "player" -> getPlayer(""), "history" -> getHistory(), "round" -> getRound(), "gameRunning" -> controller.getGameRunning(), "win" -> controller.getWin())
    }
  }

  def getHistory(): JsObject = {
    implicit val historyListFormat = Json.format[History]

    val historyListBuffer = new ListBuffer[History]
    for (historyEntry <- controller.getMrX.history) {
      historyListBuffer += History(historyEntry.toString)
    }

    Json.obj("history" -> historyListBuffer.toList)
  }

  def getPlayer(playerName: String): JsObject = {
    implicit val ticketsListFormat = Json.format[Tickets]
    implicit val playerDataListFormat = Json.format[PlayerData]
    val playerDataListBuffer = new ListBuffer[PlayerData]
    var returnObject: JsObject = null

    if (playerName.isEmpty()) {
      for ((player, i) <- controller.getPlayersList().view.zipWithIndex) {
        if (player == controller.getCurrentPlayer) {
          playerDataListBuffer += models.Game.GetPlayerDataModel(player, i)
        } else {
          playerDataListBuffer += models.Game.GetPlayerDataModel(player, i)
        }
      }
      returnObject = Json.obj("players" -> playerDataListBuffer.toList)
    } else {
      for ((player, i) <- controller.getPlayersList().view.zipWithIndex) {
        if (player.name.equals(playerName)) {
          returnObject = Json.obj("player" -> models.Game.GetPlayerDataModel(player, i))
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

        controller.move(destStation.number, TicketType.of(ticketType))
    }
  }

  def closestStationToCoords(xPos: Int, yPos: Int): Station = {
    var distance = 9999.0
    var guessedStation: Station = controller.getStations().head
    for (station <- controller.getStations()) {
      val clickedPoint = new Point(xPos, yPos)
      if (station.guiCoordinates.distance(clickedPoint) < distance) {
        distance = station.guiCoordinates.distance(clickedPoint)
        guessedStation = station
      }
    }
    guessedStation
  }
}

