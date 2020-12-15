

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
            if(app.win) {
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
            this.$root.sendObjectOverWebsocket(data)
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
                drag: function (map) {
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
    <h3>Stats</h3>
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
    <div v-for="history in historyobject.history">
        <div class="history-item d-flex justify-content-center">
            <img v-if="history.ticketType === 'Taxi'" class="ticket-icon" src="/assets/images/Taxi.svg">
            <img v-if="history.ticketType === 'Bus'" class="ticket-icon" src="/assets/images/Bus.svg">
            <img v-if="history.ticketType === 'Underground'" class="ticket-icon" src="/assets/images/Underground.svg">
            <img v-if="history.ticketType === 'Black'" class="ticket-icon" src="/assets/images/Black.svg">
        </div>
    </div>
    </div>`
})