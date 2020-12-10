package controllers

import akka.actor.{Actor, ActorRef, Props}
import com.google.inject.Guice
import de.htwg.se.scotlandyard.controllerComponent.{ControllerInterface, NumberOfPlayersChanged, PlayerMoved, PlayerNameChanged, PlayerWin, StartGame}
import de.htwg.se.scotlandyard.model.tuiMapComponent.station.Station
import de.htwg.se.scotlandyard.util.TicketType
import model.{Game, History, PlayerData, Tickets}
import play.api.libs.json.{JsObject, JsValue, Json}

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
      clientActorRef ! getAllDataObject("PlayerNameChanged")
    case _: NumberOfPlayersChanged =>
      clientActorRef ! getAllDataObject("NumberOfPlayersChanged")
    case _: PlayerMoved =>
      clientActorRef ! getAllDataObject("PlayerMoved")
    case _: StartGame =>
      clientActorRef ! getAllDataObject("StartGame")
    case _: PlayerWin =>
      if (controller.getWinningPlayer().name.equals("MrX")) {
        clientActorRef ! Json.obj("event" -> "PlayerWin MrX")
      } else {
        clientActorRef ! Json.obj("event" -> "PlayerWin Detectives")
      }
  }

  override def preStart() = {
    clientActorRef ! getAllDataObject("Connected")
  }

  def receive: Receive = {
    case obj: JsObject =>
      val map = obj.value
      if (map.contains("message")) {
        handleMessage(map("message").asOpt[String].get)
      } else {
        movePlayer(Option(obj))
      }
  }

  def handleMessage(message: String): Unit = {
    message match {
      case "undo" => controller.undoValidateAndMove()
      case "redo" => controller.redoValidateAndMove()
      case "ping" => clientActorRef ! Json.obj("alive" -> "pong")
      case _ => println("Unknown: " + message)
    }
  }

  def getRound(): Int = {
    controller.getTotalRound()
  }

  def getAllDataObject(event: String): JsObject = {
    Json.obj("event" -> event, "player" -> getPlayer(""), "history" -> getHistory(), "round" -> getRound(), "win" -> controller.getWin())
  }

  def getHistory(): JsObject = {
    implicit val historyListFormat = Json.format[History]

    val historyListBuffer = new ListBuffer[History]
    for (historyEntry <- controller.getMrX().history) {
      historyListBuffer += History(historyEntry.toString)
    }

    Json.obj("history" -> historyListBuffer.toList)
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
  def movePlayer(jsonBody: Option[JsObject]) :Unit = {
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

