
lazy val ScottyBase = ProjectRef(uri("git://github.com/tim-koehler/ScotlandYard.git#master"), "scotlandYardBase")

lazy val root = (project in file("."))
  .enablePlugins(PlayScala)
  .dependsOn(ScottyBase)
  .aggregate(ScottyBase)
  .settings(
    name := """scotland-yard-server""",
    version := "1.0-SNAPSHOT",
    scalaVersion := "2.13.0",
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
