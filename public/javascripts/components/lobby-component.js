
const LobbyComponent = Vue.component('lobby',{
    data: function() {
        return {
            lobby: this.$root.lobby,
        }
    },
    methods: {
        setNumberOfPlayer: function(n) {
            this.lobby.player.number = n;
        },
        startGame: function() {
            this.$root.sendMessageOverWebsocket('StartGame')
        },
        getReady: function () {
            var clientPlayer = this.lobby.player.find(p => {
                return p.id === this.lobby.clientid;
            })
            clientPlayer.ready = true;
            this.sendPlayerData()
        },
        sendPlayerData: function() {
            const jsPlayer = {
                player: this.lobby.player
            }
            this.$root.sendObjectOverWebsocket(jsPlayer, 'lobby-change')
        }
    },
    template: `
    <div id="lobby" class="container-fluid settings-wrapper">
        <div class="row d-flex justify-content-center">
            <h1>Lobby</h1>
        </div>
        <div class="row">
            <div class="col-lg-8 lobby-panel">
                <h3>Player</h3>
                <player-settings-bar
                v-if="lobby.player.length >= 1"
                :componentid="0"
                :player.sync="lobby.player"
                :enabled.sync="lobby.clientId == 0">
                </player-settings-bar>
                <player-settings-bar
                v-if="lobby.player.length >= 2"
                :componentid="1"
                :player.sync="lobby.player"
                :enabled.sync="lobby.clientId == 1">
                </player-settings-bar>
                <player-settings-bar
                v-if="lobby.player.length >= 3"
                :componentid="2"
                :player.sync="lobby.player"
                :enabled.sync="lobby.clientId == 2">
                </player-settings-bar>
                <player-settings-bar
                v-if="lobby.player.length >= 4"
                :componentid="3"
                :player.sync="lobby.player"
                :enabled.sync="lobby.clientId == 3">
                </player-settings-bar>
                <player-settings-bar
                v-if="lobby.player.length >= 5"
                :componentid="4"
                :player.sync="lobby.player"
                :enabled.sync="lobby.clientId == 4">
                </player-settings-bar>
                <player-settings-bar
                v-if="lobby.player.length >= 6"
                :componentid="5"
                :player.sync="lobby.player"
                :enabled.sync="lobby.clientId == 5">
                </player-settings-bar>
                <player-settings-bar
                v-if="lobby.player.length >= 7"
                :componentid="6"
                :player.sync="lobby.player"
                :enabled.sync="lobby.clientId == 6">
                </player-settings-bar>
            </div>
            <div class="col-lg-3 lobby-panel d-flex flex-column justify-content-center">
                <h3>Settings</h3>
                <div class="player-item">
                    <label>Rounds: 24</label>
                    <br>
                    <label>Max Player: 7</label>
                    <h6>Detective Tickets:</h6>
                    <ul>
                        <li>11 Taxi</li>
                        <li>&nbsp;8 Bus</li>
                        <li>&nbsp;4 Underground</li>
                    </ul>
                        <h6>Mr.X Tickets:</h6>
                    <ul>
                        <li>99 Taxi</li>
                        <li>99 Bus</li>
                        <li>99 Underground</li>
                        <li>&nbsp;2 Black</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col d-flex justify-content-center lobby-panel">
                <div class="d-flex justify-content-center" style="margin: 20px">
                    <button class="standard-button" v-on:click="startGame">Start Game</button>
                </div>
                <div class="d-flex justify-content-center" style="margin: 20px">
                    <button class="standard-button" v-on:click="getReady">Ready</button>
                </div>
            </div>
        </div>
        <link rel="stylesheet" href="/assets/stylesheets/lobby.css"/>
    </div>
    `
})

Vue.component('player-settings-bar', {
    props: {
        componentid: Number,
        player: Array,
        enabled: Boolean
    },
    data: function () {
        return {
            changeName: false,
            colors: [
                {
                    name: 'blue',
                    value: '#0000ff'
                },
                {
                    name: 'green',
                    value: '#1c8c1c'
                },
                {
                    name: 'orange',
                    value: '#de991b'
                },
                {
                    name: 'pink',
                    value: '#ff00ff'
                },
                {
                    name: 'red',
                    value: '#ff0000'
                },
                {
                    name: 'light-blue',
                    value: '#b2dbff'
                },
            ],
        }
    },
    methods: {
        switchView: function() {
            this.changeName = !this.changeName;
            if(this.changeName === false) { // second button press
                const p = this.player
                this.$emit('update:lobby.player', p)
                this.updatePlayer()
            }
        },
        getClientPlayer: function() {
            return this.player[this.componentid];
        },
        updatePlayer: function() {
            this.$parent.sendPlayerData()
        }
    },
    computed: {
        playerNameComputed: {
            get(){
                //this function will determine what is displayed in the input
                return this.getClientPlayer().name;
            },
            set(name){
                //this function will run whenever the input changes
                const p = this.getClientPlayer()
                p.name = name
                this.$emit('update:lobby.player', p)
            }
        },
        readyComputed: {
            get(){
                //this function will determine what is displayed in the input
                return this.getClientPlayer().ready;
            },
            set(rdy){
                //this function will run whenever the input changes
                const p = this.getClientPlayer();
                p.ready = rdy
                this.$emit('update:lobby.player', p);
            }
        },
    },
    template: `<div class="row player-item d-flex justify-content-between align-items-center">
                <div class="player-item-content">
                    <label>Name:</label>
                    <input v-if="changeName" v-model="player[componentid].name" @keyup.enter="switchView" style="width: 20em" type="text" minlength="3" max="30" value="Dt1">
                    <label v-if="!changeName" style="width: 20em">{{playerNameComputed}}</label>
                    <button v-if="enabled" @click="switchView" class="standard-button-small">Change Name</button>
                </div>
                <div class="player-item-content">
                    <label>Player Color:</label>
                    <select v-if="componentid != 0" id="name-select" name="playerIndex">
                    <!-- The $ symbol is escaped with '' because of jQuerry -->
                        <option v-for="color in colors" name="player" v-bind:style="{ color: color.value}" value="color-'$'{index}">
                            {{ color.name }}
                        </option>
                    </select>
                    <label v-else>black</label>
                </div>
                <div class="player-item-content d-flex">
                    <label>Ready:</label>
                    <div v-if="this.getClientPlayer().ready" class="ready-field-green"></div>
                    <div v-else class="ready-field-red"></div>
                </div>
            </div>`
})