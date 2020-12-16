
const MainComponent = Vue.component('main-component', {
    props: {
        lobby: Object,
        model: Object,
        gamerunning: Boolean,
        gamecomponentactive: Boolean
    },
    template: `
        <div>
            <header-component :gamecomponentactive="gamecomponentactive" :gamerunning="gamerunning"></header-component>
            <main role="main" class="d-flex align-items-center justify-content-center">
                <router-view :gamecomponentactive.sync="gamecomponentactive" :gamerunning="gamerunning" :lobby="lobby" :model="model"></router-view>
            </main>
            <footer-component></footer-component>
        </div>
        `
})

const router = new VueRouter({
    routes: [
        {
            path: '/', component: MainComponent, props: true, redirect: '/index',
            children:
                [
                    {
                        path: 'index',
                        component: IndexComponent
                    },
                    {
                        path: 'about',
                        component: AboutComponent
                    },
                    {
                        path: 'lobby',
                        component: LobbyComponent,
                        props: true
                    },
                    {
                        path: 'game',
                        component: GameComponent,
                        props: {

                        }
                    }
                ]
        }],
        
})

var app = new Vue({
    el: '#app',
    data: {
        websocket: null,
        interval: null,
        model: null,
        lobby: {
            maxPlayers: 7,
            interval: null,
            registered: false,
            clientid: 0,
            size: 2,
            player: [],
        },
        gamerunning: false,
        gamecomponentactive: false
    },
    router,
    mounted: function () {
        const v = this

        this.websocket = new WebSocket("ws://localhost:9000/ws")
        this.websocket.onmessage = function (rawMessage) {
            const message = jQuery.parseJSON(rawMessage.data)
            console.log(message);
            if (message.event === 'ModelChanged') {
                v.model = message
            } else if (message.event === 'register') {
                if (!v.lobby.registered) {
                    v.lobby.registered = true
                    v.lobby.clientid = message.id
                    v.$emit('update:lobby', v.lobby)
                }
            } else if (message.event === 'lobby-change') {
                console.log("player: " + JSON.stringify(v.lobby.player))
                v.lobby.player = message.player
                v.$emit('update:lobby.player', v.lobby.player)
                console.log("player_after_update: " + JSON.stringify(v.lobby.player))
            } else if (message.event === 'StartGame') {
                this.gamerunning = true
            } else if (message.event === 'GameFinished') {
                this.gamerunning = false
            }
        }

        this.websocket.onopen = function () {
            v.interval = setInterval(function () {
                v.sendMessageOverWebsocket('ping')
            }, 10000);
            v.sendMessageOverWebsocket('register')
        }
        this.websocket.onclose = function () {
            clearInterval(v.interval)
            v.sendMessageOverWebsocket('deregister')
        }
    },
    methods: {
        sendObjectOverWebsocket: function (json, msg) {
            const obj = {
                event: msg,
                data: json
            }
            if (this.websocket.readyState === WebSocket.OPEN) {
                console.log("send: " + JSON.stringify(obj))
                this.websocket.send(JSON.stringify(obj));
            } else {
                console.log("Could not send data. Websocket is not open.");
            }
        },
        sendMessageOverWebsocket: function (msg) {
            const obj = {
                event: msg,
            }
            if (this.websocket.readyState === WebSocket.OPEN) {
                this.websocket.send(JSON.stringify(obj));
            } else {
                console.log("Could not send data. Websocket is not open.");
            }
        },
        callUndo: function() {
            this.$root.sendMessageOverWebsocket("undo")
        },
        callRedo: function() {
            this.$root.sendMessageOverWebsocket("redo")
        },
    },
    computed: {
        extractCurrentPlayer: function () {
            for (let player of this.model.player.players) {
                if (player.current === true) {
                    return player
                }
            }
        },
    }
})
