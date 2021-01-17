package controllers

import akka.actor.ActorSystem
import forms.ResetPasswordForm
import play.api.{ Environment, Play }
import play.api.i18n.Messages

import javax.inject.{ Inject, Singleton }
import play.api.libs.json.JsValue
import play.api.libs.streams.ActorFlow
import play.api.mvc.{ AbstractController, AnyContent, ControllerComponents, Request, WebSocket }
import utils.route.Calls

import java.io.File
import java.nio.file.NoSuchFileException
import java.util.UUID
import scala.concurrent.{ ExecutionContext, Future }

@Singleton
class ScotlandYardController @Inject() (cc: ControllerComponents)(implicit system: ActorSystem)
  extends AbstractController(cc) {

  def ws = WebSocket.accept[JsValue, JsValue] { requestHeader =>
    ActorFlow.actorRef { actorRef =>
      ScotlandYardWebSocketActor.props(actorRef)
    }
  }
}

class ScotlandYardFrontendController @Inject() (scc: SilhouetteControllerComponents)(implicit ex: ExecutionContext) extends SilhouetteController(scc) {
  def serveFrontend() = Action { implicit request: Request[AnyContent] =>
    try {
      Ok.sendFile(new File("/app/public/ScotlandYardFrontend/index.html"), inline = true)
    } catch {
      case e: NoSuchFileException => Ok.sendFile(new File("./public/ScotlandYardFrontend/index.html"), inline = true)
    }

  }
}
