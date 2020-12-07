package controllers

import akka.actor.{Actor, ActorRef, Props}
import com.google.inject.Guice
import de.htwg.se.scotlandyard.controllerComponent.{ControllerInterface, NumberOfPlayersChanged, PlayerMoved, PlayerNameChanged, PlayerWin, StartGame}
import model.{Game, History, PlayerData, Tickets}
import play.api.libs.json.{JsObject, Json}

import scala.collection.mutable.ListBuffer
import scala.swing.Reactor

object GameWebSocketActor {
  def props(clientActorRef: ActorRef) = Props(new GameWebSocketActor(clientActorRef))
}

class GameWebSocketActor(clientActorRef: ActorRef) extends Actor with Reactor{
  val controller: ControllerInterface = Game.controller

  listenTo(controller)
  reactions += {
    case _: PlayerNameChanged =>
      clientActorRef ! Json.obj("event" -> "PlayerNameChanged")
    case _: NumberOfPlayersChanged =>
      clientActorRef ! Json.obj("event" -> "NumberOfPlayersChanged")
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
    println("User connected")
    clientActorRef ! getAllDataObject("Connected")
  }

  def receive: Receive = {
    case "undo"  => println("Received!")
  }

  def getRound(): Int = {
    controller.getTotalRound()
  }

  def getAllDataObject(event: String): JsObject = {
    Json.obj("event" -> event, "player" -> getPlayer(""), "history" -> getHistory(), "round" -> getRound())
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

}

