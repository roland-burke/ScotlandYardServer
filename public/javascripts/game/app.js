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
        model: null
    },
    mounted: function () {
        const v = this

        this.websocket = new WebSocket("ws://localhost:9000/ws")
        this.websocket.onmessage = function(rawMessage) {
            const message = jQuery.parseJSON(rawMessage.data)
            if(message.alive == 'pong') {}
            else if (message.event.startsWith('PlayerWin')) {
                const winningPlayerName = message.event.split(" ")[1];
                v.showWinningScreen(winningPlayerName);
            } else {
                v.model = message
                v.refresh(message)
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
        refresh: function(message) {
            this.drawHistory(message.history)
            if(this.model.win) {
                this.disableUndoRedo()
                $('#head-line-wrapper').append('<br><div class="d-flex justify-content-center"><h5>Game finished!</h5></div>')
            } else {
                this.enableUndoRedo()
            }
        },
        showWinningScreen: function(name) {
            $('#winning-background').css('visibility', 'visible')
            $('#winning-row').html('<h1 id="winning-title">' + name + ' Won!!!</h1>')
            $('#winning-dialog').addClass('winning-dialog')
            $('#winning-subtitle').html('<h5>Loading..</h5>')
            $('#win-button').html('<a href="/">\n' +
                '                            <button class="standard-button">Main Menu</button>\n' +
                '                        </a>')
            $('#close-button').html('<button onclick="app.closeWinningScreen()" class="close-button">X</button>')
        
            if(name == 'MrX') {
                $('#win-image').html('<img width=\'250px\' height=\'250px\' src=\'assets/images/mrx-win.PNG\' alt=\'MrX\'>')
            } else {
                $('#win-image').html('<img width=\'250px\' height=\'250px\' src=\'assets/images/detective-win.PNG\' alt=\'Detective\'>')
            }
            fetch("/player/current/", {method: 'GET'}).then(response => {
                return response.json()
            }).then(data => {
                const currentPlayer = data;
                if(name == 'MrX') {
                    $('#winning-subtitle').html('MrX escaped successfully')
                } else {
                    $('#winning-subtitle').html('MrX was caught at Station: ' + currentPlayer.player.station)
                }
            });
        
            let track = this.getRandomInt(3)
            var audio = new Audio('assets/audio/' + track + '.mp3');
            audio.play();
        },
        disableUndoRedo: function() {
            $('#undo').addClass('not-active');
            $('#redo').addClass('not-active');
        },
        enableUndoRedo: function() {
            if (($('#undo').is('.not-active'))) {
                $('#undo').removeClass('not-active');
            }
            if (($('#redo').is('.not-active'))) {
                $('#redo').removeClass('not-active');
            }
        },
        drawHistory: function(historyObject) {
            let html = []
            html.push('<h3>History</h3>')
        
            for (var i = 0; i < historyObject.history.length; i++) {
                 html.push('<div class="history-item d-flex justify-content-center">')
                 let history = historyObject.history[i].ticketType;
                 if(history === "Taxi") {
                    html.push('<img class="ticket-icon" src="/assets/images/Taxi.svg")">')
                 } else if(history === "Bus") {
                    html.push('<img class="ticket-icon" src="/assets/images/Bus.svg")">')
                 } else if(history === "Underground") {
                    html.push('<img class="ticket-icon" src="/assets/images/Underground.svg")">')
                 } else if(history === "Black") {
                    html.push('<img class="ticket-icon" src="/assets/images/Black.svg")">')
                 } else {
                    Invalid
                 }
                html.push('</div>')
            }
        
            document.getElementById('history-wrapper').innerHTML = html.join('')
        },
        callUndo: function() {
            this.sendStringOverWebsocket("undo")
        },        
        callRedo: function() {
            this.sendStringOverWebsocket("redo")
        },
        closeWinningScreen: function() {
            $('#winning-background').css('visibility', 'hidden')
            $('#winning-dialog').css('visibility', 'hidden')
        },
        getRandomInt: function(max) {
            return Math.floor(Math.random() * Math.floor(max));
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
                message: msg,
            }
            if(this.websocket.readyState === WebSocket.OPEN) {
                this.websocket.send(JSON.stringify(obj));
            } else {
                console.log("Could not send data. Websocket is not open.");
            }
        },
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
