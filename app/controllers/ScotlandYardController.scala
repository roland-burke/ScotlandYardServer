package controllers

import akka.actor.ActorSystem
import forms.ResetPasswordForm
import play.api.{Environment, Play}
import play.api.i18n.Messages

import javax.inject.{Inject, Singleton}
import play.api.libs.json.JsValue
import play.api.libs.streams.ActorFlow
import play.api.mvc.{AbstractController, AnyContent, ControllerComponents, Request, WebSocket}
import utils.route.Calls

import java.io.File
import java.util.UUID
import scala.concurrent.{ExecutionContext, Future}

@Singleton
class ScotlandYardController @Inject() (cc: ControllerComponents)(implicit system: ActorSystem)
  extends AbstractController(cc) {

  def ws = WebSocket.accept[JsValue, JsValue] { requestHeader =>
    ActorFlow.actorRef { actorRef =>
      ScotlandYardWebSocketActor.props(actorRef)
    }
  }
}

class ScotlandYardFrontendController @Inject() (scc: SilhouetteControllerComponents,  af: AssetsFinder)(implicit ex: ExecutionContext) extends SilhouetteController(scc) {
  def serveFrontend() = SecuredAction { implicit request: Request[AnyContent] =>
    Ok.sendFile(new File(af.path("ScotlandYardFrontend/index.html")), inline = true)
  }
}
