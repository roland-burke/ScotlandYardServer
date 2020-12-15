
var app = new Vue({
    el: '#lobby',
    data: {
        maxPlayers: 7,
        interval: null,
        registered: false,
        clientid: 0,
        size: 2,
        player: [],
    },
    mounted: function() {
        const v = this
        this.websocket = new WebSocket("ws://localhost:9000/ws")
        this.websocket.onmessage = function(rawMessage) {
            const message = jQuery.parseJSON(rawMessage.data)
            console.log("received: " + JSON.stringify(message))
            if(message.alive == 'pong') {}
            else if(message.event === 'register') {
                if(!this.registered) {
                    v.registered = true
                    v.clientid = message.id
                }
            } else if (message.event === 'lobby-change'){
                console.log("player: " + JSON.stringify(v.player))
                v.player = message.player
                v.$emit('update:player', v.player)
                console.log("player_after_update: " + JSON.stringify(v.player))
            } else if (message.event === 'StartGame') {
                window.location.href = "/game"
            }
        }

        this.websocket.onopen = function() {
            v.interval = setInterval(function() {
                v.sendStringOverWebsocket('ping')
            }, 10000);
            // register on backend, fetch id
            v.sendStringOverWebsocket('register')
        }
        this.websocket.onclose = function() {
            clearInterval(v.interval)
            v.sendStringOverWebsocket('deregister')
        }
    },
    methods: {
        setNumberOfPlayer: function(n) {
            this.player.number = n;
        },
        startGame: function() {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.player),
            };
            fetch("/init", requestOptions)
                .then(response => window.location.href = "/game");
        },
        getReady: function () {
            var clientPlayer = this.player.find(p => {
                return p.id === this.clientid;
            })
            clientPlayer.ready = true;
            this.sendPlayerData()
        },
        sendPlayerData: function() {
            const jsPlayer = {
                player: this.player
            }
            this.sendObjectOverWebsocket(jsPlayer, 'lobby-change')
        },
        sendObjectOverWebsocket: function(json, message) {
            const obj = {
                message: message,
                data: json
            }
            if(this.websocket.readyState === WebSocket.OPEN) {
                console.log("send: " + JSON.stringify(obj))
                this.websocket.send(JSON.stringify(obj));
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
    }
})