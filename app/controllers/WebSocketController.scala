package controllers

import akka.actor.ActorSystem
import javax.inject.{Inject, Singleton}
import play.api.Play.materializer
import play.api.libs.json.JsValue
import play.api.libs.streams.ActorFlow
import play.api.mvc.{AbstractController, ControllerComponents, WebSocket}

@Singleton
class WebSocketController @Inject() (cc: ControllerComponents)(implicit system: ActorSystem)
  extends AbstractController(cc)
{
  def ws = WebSocket.accept[JsValue, JsValue] { requestHeader =>
    ActorFlow.actorRef { actorRef =>
      GameWebSocketActor.props(actorRef)
    }
  }
}
