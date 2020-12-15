/*
{
  "event": "Connected",
  "player": {
    "players": [
      {
        "name": "MrX",
        "station": 140,
        "current": false,
        "color": "#000000",
        "tickets": {
          "taxi": 98,
          "bus": 99,
          "underground": 99,
          "black": 5
        },
        "lastSeen": "never",
        "x": 1356,
        "y": 1228
      },
      {
        "name": "\"Dt1\"",
        "station": 91,
        "current": true,
        "color": "#0000ff",
        "tickets": {
          "taxi": 11,
          "bus": 8,
          "underground": 4,
          "black": 0
        },
        "lastSeen": "",
        "x": 2490,
        "y": 740
      }
    ]
  },
  "history": {
    "history": [
      {
        "ticketType": "Taxi"
      }
    ]
  },
  "round": 1,
  "win": false
}
*/
var app = new Vue({
    el: '#game-wrapper-total',
    data: {
        websocket: null,
        interval: null,
        model: null,
        audio: null
    },
    mounted: function () {
        const v = this

        this.websocket = new WebSocket("ws://localhost:9000/ws")
        this.websocket.onmessage = function(rawMessage) {
            const message = jQuery.parseJSON(rawMessage.data)
            if (message.event === 'ModelChanged') {
                v.model = message
            }
        }

        this.websocket.onopen = function() {
            v.interval = setInterval(function() {
                v.sendStringOverWebsocket('ping')
            }, 10000);
        }
        this.websocket.onclose = function() {
            clearInterval(v.interval)
        }
    },
    methods: {       
        callUndo: function() {
            this.sendStringOverWebsocket("undo")
        },        
        callRedo: function() {
            this.sendStringOverWebsocket("redo")
        },
        sendObjectOverWebsocket: function(jsonMessage) {
            if(this.websocket.readyState === WebSocket.OPEN) {
                this.websocket.send(JSON.stringify(jsonMessage));
            } else {
                console.log("Could not send data. Websocket is not open.");
            }
        },
        sendStringOverWebsocket: function(msg) {
            const obj = {
                event: msg,
            }
            if(this.websocket.readyState === WebSocket.OPEN) {
                this.websocket.send(JSON.stringify(obj));
            } else {
                console.log("Could not send data. Websocket is not open.");
            }
        },
    },
    watch: { 
        model: function() {
            if (this.model.win) {
                $('#undo').addClass('not-active');
                $('#redo').addClass('not-active');
                if (this.audio === null) {
                    let track = Math.floor(Math.random() * Math.floor(3));
                    this.audio = new Audio('assets/audio/' + track + '.mp3');
                    this.audio.play();
                }
            } else {
                if (($('#undo').is('.not-active'))) {
                    $('#undo').removeClass('not-active');
                }
                if (($('#redo').is('.not-active'))) {
                    $('#redo').removeClass('not-active');
                }
                if (this.audio !== null) {
                    this.audio.pause();
                    this.audio = null;
                }
            }
        }
    },
    computed: {
        extractCurrentPlayer: function() {
            for (let player of this.model.player.players) {
                if (player.current === true) {
                    return player
                }
            }
        },
    }
})
