const GameComponent = Vue.component('game', {
    props: {
        model: Object,
    },
    data: function() {
        return {
            audio: null,
            showWinningDialog: true
        }
    },
    watch: { 
        model: function() {
            if (this.model.win) {
                if (this.audio === null) {
                    let track = Math.floor(Math.random() * Math.floor(3));
                    this.audio = new Audio('assets/audio/' + track + '.mp3');
                    this.audio.play();
                }
            } else {
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
    },
    template: `
    <div id="game-wrapper-total" style="position: relative; overflow-x: hidden;">
    
        <div v-if="model !== null && model.win && showWinningDialog" id="winning-background" class="winning-background"></div>
        
        <div v-if="model !== null">
            <game-map
            v-bind:playersdata="model.player"
            ref="gamemap"
            ></game-map>/>
        </div>
    
        <div class="container-fluid" style="overflow: hidden;
            position: absolute;
            top: 0;
            pointer-events: none">
    
            <div class="row">
                <div class="col w-25 d-flex justify-content-center">
                    <div style="padding-top: 40px">
                        <div class="game-round justify-content-center">
                            <div v-if="model !== null">
                                <head-line
                                v-bind:round="model.round"
                                v-bind:color="extractCurrentPlayer.color" 
                                v-bind:name="extractCurrentPlayer.name"
                                v-bind:win="model.win"
                                ></head-line>
                            </div>
                            <div v-else>
                                <h2>Loading..</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-2">
                    <div class="history-wrapper" id="history-wrapper">
                        <div v-if="model !== null">
                            <history
                            v-bind:historyobject="model.history"
                            ></history>
                        </div>
                        <div v-else>
                            <h2>Loading..</h2>
                        </div>
                    </div>
                </div>
                <div id="win" class="col-lg-8 d-flex justify-content-center" style="z-index: 5">
                    <div v-if="model !== null && model.win && showWinningDialog">
                        <div id="winning-dialog" class="winning-dialog col d-flex flex-column justify-content-between">
                            <div id="close-button" class="d-flex justify-content-end">
                                <button v-on:click="showWinningDialog = false" class="close-button">X</button>
                            </div>
                            <div class="row d-flex justify-content-center">
                                <div class="col">
                                    <div class="row d-flex justify-content-center" id="winning-row">
                                        <h1 v-if="model.winningPlayer === 'MrX'" id="winning-title">MrX Won!!!</h1>
                                        <h1 v-else id="winning-title">Detectives Won!!!</h1>
                                    </div>
                                    <div id="winning-subtitle" class="row d-flex justify-content-center">
                                        <div v-if="model.winningPlayer === 'MrX'">MrX escaped successfully</div>
                                        <div v-else>MrX was caught at Station: {{extractCurrentPlayer.station}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="row d-flex justify-content-center" id="win-image">
                                <img v-if="model.winningPlayer === 'MrX'" width="250px" height="250px" src="assets/images/mrx-win.PNG" alt="MrX">
                                <img v-else width="250px" height="250px" src="assets/images/detective-win.PNG" alt="Detective">
                            </div>
                            <div id="win-button" class="row d-flex justify-content-center align-items-center align-self-center">
                                <a href="/">
                                    <button class="standard-button">Main Menu</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2 d-flex justify-content-end">
                    <div class="stats-wrapper" id="stats-wrapper">
                        <div v-if="model !== null">
                            <stats
                            v-bind:playersdata="model.player"
                            ></stats>
                        </div>
                        <div v-else>
                            <h2>Loading..</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row fixed-bottom" style="z-index: 1">
                <div class="col d-flex justify-content-center w-25">
                    <div class="game-controls" id="game-controls" style="pointer-events: all">
                        <div v-if="model !== null">
                            <game-controls
                            v-bind:name="extractCurrentPlayer.name"
                            ></game-controls>
                        </div>
                        <div v-else>
                            <h2>Loading..</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <link rel="stylesheet" href="/assets/stylesheets/game.css"/>
    </div>
    `
})

Vue.component('head-line', {
    props: {
        round: Number,
        color: String,
        name: String,
        win: Boolean
    },
    template: `
    <div>
    Round: {{ round }} - Current Player:<span :style="'white-space: pre-wrap; color: ' + color"> {{ name }}</span><br>
    <div v-if="win" class="d-flex justify-content-center"><h5>Game finished!</h5></div>
    </div>
    `
})

Vue.component('game-map', {
    props: {
        playersdata: Object
    },
    methods: {
        movePlayer: function(event) {
            if(this.$root.model.win) {
                return
            }
            clickCoords = this.getXY(event)
            const ticketType = this.getSelectedTicketType()
        
            const data = {
                event: "move",
                ticketType: ticketType,
                x: parseInt(clickCoords.x),
                y: parseInt(clickCoords.y)
            }
            this.$root.sendObjectOverWebsocket(data, 'move')
            this.redraw()
        },
        getXY: function(event) {
            var rect = canvas.getBoundingClientRect();
            return {x: event.clientX - rect.left, y: event.clientY - rect.top}
        },
        getSelectedTicketType: function() {
            var radios = document.getElementsByName('transport');
            for (var i = 0, length = radios.length; i < length; i++) {
                if (radios[i].checked) {
                    radios[0].checked = true;
                    return radios[i].value;
                }
            }
        },
        handleMapDrag: function() {
            var parent = $("#map-wrapper");
            var childPos = $("#canvas");

            $("#canvas").draggable({
                drag: function (event, map) {
                    const boundaryOffset = 20
                    const headerOffset = document.getElementById("header").offsetHeight
                    const footerOffset = document.getElementById("footer").offsetHeight

                    var mapWrapperWidth = parent.width()
                    var mapWidth = childPos.width()

                    var mapWrapperHeight = parent.height()
                    var mapHeight = childPos.height()

                    var mapBoundaryRight = mapWrapperWidth - mapWidth - boundaryOffset
                    var mapBoundaryBottom = mapWrapperHeight - mapHeight - boundaryOffset - footerOffset

                    // Check for top boundary
                    if (map.position.top > boundaryOffset + headerOffset) {
                        map.position.top = boundaryOffset + headerOffset;
                    }
                    // Check for left boundary
                    if (map.position.left > boundaryOffset) {
                        map.position.left = boundaryOffset;
                    }
                    // Check for bottom boundary
                    if (map.position.top < mapBoundaryBottom) {
                        map.position.top = mapBoundaryBottom;
                    }
                    // Check for right boundary
                    if (map.position.left < mapBoundaryRight) {
                        map.position.left = mapBoundaryRight;
                    }

                },

                scroll: false
            });
        },
        redraw: function() {
            v = this
            let cnvs = document.getElementById('canvas');
            cnvs.style.position = 'absolute';
            ctx = canvas.getContext('2d');
        
            let img = new Image();
            img.onload = function(){
                ctx.drawImage(img,0,0);
                for (var i = 0; i < v.playersdata.players.length; i++) {
                    let player = v.playersdata.players[i];
        
                    ctx.beginPath();
                    ctx.arc(player.x, player.y, 26, 0, 2 * Math.PI, false);
                    ctx.lineWidth = 10;
                    ctx.strokeStyle = player.color;
                    ctx.stroke();
                }
            };
            img.src = '/assets/images/map_large.png';
            img.id = 'map'
        }  
    },
    watch: {
        playersdata: function() {
            this.redraw()
        }
    }, 
    mounted: function() {
        this.handleMapDrag()
        this.redraw()
    },
    template: `
    <div>
        <div id="map-wrapper" class="map-wrapper">
            <canvas id="canvas" v-on:dblclick="movePlayer($event)" width="2570" height="1926"></canvas>
        </div>
    </div>`
})

Vue.component('game-controls', {
    props: {
        name: String
    },
    template: `
    <div>
        <div>
            <label>
                <input class="ticket-radio" type="radio" checked="true" id="taxi" value="t" name="transport">
                <img class="ticket-icon" src="/assets/images/Taxi.svg">
            </label>
        </div>
        <div>
            <label>
                <input class="ticket-radio" type="radio" id="bus" value="b" name="transport">
                <img class="ticket-icon" src="/assets/images/Bus.svg">
            </label>
        </div>
        <div>
            <label>
                <input class="ticket-radio" type="radio" id="underground" value="u" name="transport">
                <img class="ticket-icon" src="/assets/images/Underground.svg">
            </label>
        </div>
        <div>
            <label>
            <div v-if="name == 'MrX'">
                <input class="ticket-radio" type="radio" id="black" value="x" name="transport">
                <img class="ticket-icon" src="/assets/images/Black.svg">
            </div>
            <div v-else>
                <input class="ticket-radio" disabled="true" type="radio" id="black" value="x" name="transport">
                <img class="ticket-icon" src="/assets/images/Black.svg" style="opacity: 40%">
            </div>
            </label>
        </div>
    </div>`
})

Vue.component('stats', {
    props: {
        playersdata: Object
    },
    template: `
    <div>
        <div class="d-flex justify-content-center">
            <h3>Stats</h3>
        </div>
        <div v-for="player in playersdata.players">
            <div class="stats-item">
                <div>
                    <b v-if="player.name === 'MrX'">{{player.name}} Last seen: {{player.lastSeen}}</b>
                    <b v-if="player.name !== 'MrX'"><span :style="'color: ' + player.color">{{player.name}}</span> Station: {{player.station}}</b>
                </div>
                <div>
                    <div class="stats-ticket">
                        <img class="ticket-icon-stats" src="/assets/images/taxi_small.svg">
                        <div style="min-width: 3em;">
                            {{player.tickets.taxi}}
                        </div>
                    </div>
                    <div class="stats-ticket">
                        <img class="ticket-icon-stats" src="/assets/images/bus_small.svg">
                        <div style="min-width: 3em;">
                            {{player.tickets.bus}}
                        </div>
                    </div>
                    <div class="stats-ticket">
                        <img class="ticket-icon-stats" src="/assets/images/underground_small.svg">
                        <div style="min-width: 3em;">
                            {{player.tickets.underground}}
                        </div>
                    </div>
                    <div v-if="player.name === 'MrX'">
                        <div class="stats-ticket">            
                            <img class="ticket-icon-stats" src="/assets/images/black_small.svg">
                            <div style="min-width: 3em;">
                                {{player.tickets.black}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
})

Vue.component('history', {
    props: {
        historyobject: Object
    },
    template: `
    <div>
    <h3>History</h3>
    <div v-for="history in historyobject.history" class="d-flex justify-content-center">
        <div class="history-item">
            <img v-if="history.ticketType === 'Taxi'" class="ticket-icon" src="/assets/images/Taxi.svg">
            <img v-if="history.ticketType === 'Bus'" class="ticket-icon" src="/assets/images/Bus.svg">
            <img v-if="history.ticketType === 'Underground'" class="ticket-icon" src="/assets/images/Underground.svg">
            <img v-if="history.ticketType === 'Black'" class="ticket-icon" src="/assets/images/Black.svg">
        </div>
    </div>
    </div>`
})