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
                this.$emit('update:player', p)
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
                this.$emit('update:player', p)
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
                this.$emit('update:player', p);
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