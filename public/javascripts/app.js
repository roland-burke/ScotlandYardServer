
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        gameRunning: false
    },
    mutations: {
        setGameRunningTrue (state) {
            state.gameRunning = true
        },
        setGameRunningFalse (state) {
            state.gameRunning = false
        },
    },
    getters: {
        getGameRunning: state => {
            return state.gameRunning
        }
    }
})

const router = new VueRouter({
    routes: [
        {
            path: '/', component: MainComponent, props: true,
            children:
                [
                    {
                        path: '/',
                        name: 'Index',
                        component: IndexComponent
                    },

                ]
        },
        {
            path: '/about',
            name: 'About',
            component: AboutComponent
        },
        {
            path: '/lobby',
            name: 'Lobby',
            component: LobbyComponent
        },
        {
            path: '/game',
            name: 'Game',
            component: GameComponent
        }]
        
})

var app = new Vue({
    el: '#app',
    store: store,
    data: {
        websocket: null,
        interval: null,
        model: null,
        lobby: {
            maxPlayers: 7,
            interval: null,
            registered: false,
            clientId: 0,
            player: [],
        },
    },
    router,
    mounted: function () {
        const v = this

        this.websocket = new WebSocket("ws://localhost:9000/ws")
        this.websocket.onmessage = function (rawMessage) {
            const message = jQuery.parseJSON(rawMessage.data)
            console.log(message)
            if (message.event === 'ModelChanged') {
                v.model = message
            } else if (message.event === 'register') {
                v.handleRegister(message.id)
            } else if (message.event === 'lobby-change') {
                console.log("player: " + JSON.stringify(v.lobby.player))
                v.lobby.player = message.player
                v.$emit('update:lobby.player', v.lobby.player)
                console.log("player_after_update: " + JSON.stringify(v.lobby.player))
            } else if (message.event === 'StartGame') {
                console.log(v.$store.getters.getGameRunning)
                store.commit('setGameRunningTrue')
                console.log(v.$store.getters.getGameRunning)
                v.$router.push('/game')
            } else if (message.event === 'GameFinished') {
                store.commit('setGameRunningFalse')
            }
        }

        this.websocket.onopen = function () {
            v.interval = setInterval(function () {
                v.sendMessageOverWebsocket('ping')
            }, 10000);
        }
        this.websocket.onclose = function () {
            clearInterval(v.interval)
            v.sendMessageOverWebsocket('deregister')
        }
    },
    methods: {
        handleRegister: function(messageId) {
            if (!this.lobby.registered) {
                if(this.lobby.clientId !== -1) { // Lobby not full
                    this.lobby.registered = true
                    this.lobby.clientId = messageId
                    this.$emit('update:lobby', this.lobby)
                } else { // Already 7 Player
                    // TODO
                }
            }
        },
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
        }
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
