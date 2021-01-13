FROM openjdk:11
ARG SBT_VERSION=1.3.7

# Install sbt
RUN \
  apt-get update && \
  apt-get install -y unzip

WORKDIR /App
ADD ./target/universal/scotland-yard-server-1.0-SNAPSHOT.zip /App
RUN unzip /App/scotland-yard-server-1.0-SNAPSHOT.zip
CMD scotland-yard-server-1.0-SNAPSHOT/bin/scotland-yard-server -Dplay.http.secret.key=ascottyfghijk