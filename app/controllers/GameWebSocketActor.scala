package controllers

import akka.actor.{Actor, ActorRef, Props}
import com.google.inject.Guice
import de.htwg.se.scotlandyard.controllerComponent.{ControllerInterface, NumberOfPlayersChanged, PlayerMoved, PlayerNameChanged, PlayerWin, StartGame}
import model.Game
import play.api.libs.json.Json

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
      clientActorRef ! Json.obj("event" -> "PlayerMoved")
    case _: StartGame =>
      clientActorRef ! Json.obj("event" -> "StartGame")
    case _: PlayerWin =>
      if (controller.getWinningPlayer().name.equals("MrX")) {
        clientActorRef ! Json.obj("event" -> "PlayerWin MrX")
      } else {
        clientActorRef ! Json.obj("event" -> "PlayerWin Detectives")
      }
  }
  def receive: Receive = {
    case x: String =>
      println("Received: " + x)
      clientActorRef ! (Json.obj("event" -> "Unknown"))
  }
}

