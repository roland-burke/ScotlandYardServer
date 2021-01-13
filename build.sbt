import com.typesafe.sbt.packager.docker.DockerChmodType
import com.typesafe.sbt.packager.docker.DockerPermissionStrategy
dockerChmodType := DockerChmodType.UserGroupWriteExecute
dockerPermissionStrategy := DockerPermissionStrategy.CopyChown

lazy val root = (project in file("."))
  .enablePlugins(PlayScala)
  .settings(
    name := """scotland-yard-server""",
    version := "1.0-SNAPSHOT",
    scalaVersion := "2.13.0",
    mainClass in assembly := Some("play.core.server.ProdServerStart"),
    fullClasspath in assembly += Attributed.blank(PlayKeys.playPackageAssets.value),
    libraryDependencies ++= Seq(
      guice,
      "de.htwg.se" %% "scotland-yard" % "0.1.0",
      "com.h2database" % "h2" % "1.4.199",
      "org.scalatestplus.play" %% "scalatestplus-play" % "5.0.0" % Test
    ),
    scalacOptions ++= Seq(
      "-feature",
      "-deprecation",
      "-Xfatal-warnings"
    )
  )
 
  assemblyMergeStrategy in assembly := {
    case PathList("META-INF", xs @ _*) => 
      MergeStrategy.discard
    case manifest if manifest.contains("MANIFEST.MF") =>
      // We don't need manifest files since sbt-assembly will create
      // one with the given settings
      MergeStrategy.discard
    case referenceOverrides if referenceOverrides.contains("reference-overrides.conf") =>
      // Keep the content for all reference-overrides.conf files
      MergeStrategy.concat
    case x => 
      MergeStrategy.first
  }