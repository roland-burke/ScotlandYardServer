window.onload = function() {
    refresh()
}
canvas.addEventListener("dblclick", function(e) {
  movePlayer(e)
});

function refresh() {
    getAllPlayerData()
    getCurrentPlayerAndRound()
    getHistory()
}

function drawMap(playerData) {
    let cnvs = document.getElementById("canvas");
    cnvs.style.position = "absolute";
    ctx = canvas.getContext("2d");

    let img = new Image();
    img.onload = function(){
        ctx.drawImage(img,0,0);
        for (var i = 0; i < playerData.players.length; i++) {
            let player = playerData.players[i];

            ctx.beginPath();
            ctx.arc(player.x, player.y, 23, 0, 2 * Math.PI, false);
            ctx.lineWidth = 8;
            ctx.strokeStyle = player.color;
            ctx.stroke();
        }
      };
    img.src = '/assets/images/map_large.png';
    img.id = 'map'
}

function drawHistory(historyObject) {
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

    document.getElementById('history-wrapper').innerHTML = html.join("")
}


function drawStats(playersData) {
    let html = []
    html.push('<h3>Stats</h3>')

    for (var i = 0; i < playersData.players.length; i++) {
        const player = playersData.players[i]
        html.push('<div class="stats-item">')
        html.push('<div>')
        if(player.name == "MrX") {
            html.push(`<b>${player.name} Last seen: ${player.lastSeen}</b>`)
        } else {
            html.push(`<b><span style='color: ${player.color}'>${player.name}</span> Station: ${player.station}</b>`)
        }
        html.push(`</div>
                               <div>
                                   <div class="stats-ticket">
                                       <img class="ticket-icon-stats" src="/assets/images/taxi_small.svg")">
                                       <div style="min-width: 3em;">
                                       ${player.tickets.taxi}
                                       </div>
                                   </div>
                                   <div class="stats-ticket">
                                       <img class="ticket-icon-stats" src="/assets/images/bus_small.svg")">
                                       <div style="min-width: 3em;">
                                        ${player.tickets.bus}
                                       </div>
                                   </div>
                                   <div class="stats-ticket">
                                       <img class="ticket-icon-stats" src="/assets/images/underground_small.svg")">
                                       <div style="min-width: 3em;">
                                        ${player.tickets.underground}
                                       </div>
                                   </div>
                                   <div class="stats-ticket">`)
        if(player.name == "MrX") {
             html.push('<img class="ticket-icon-stats" src="/assets/images/black_small.svg")">')
             html.push('<div style="min-width: 3em;">')
             html.push(`${player.tickets.black}`)
             html.push('</div>')
        }
        html.push('</div>')
        html.push('</div>')
        html.push('</div>')
    }
     document.getElementById('stats-wrapper').innerHTML = html.join("")
}

function drawHeadLine(currentPlayer, round) {
    const html = `Round: ${round.round} - Current Player:<span style=\'white-space: pre-wrap; color: ${currentPlayer.player.color}\'> ${currentPlayer.player.name}</span>`
    document.getElementById('head-line-wrapper').innerHTML = html
}

function drawTransport(currentPlayer) {
    html = []

    html.push(`<div>
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
                <div>`)

    html.push('<label>')
    if(currentPlayer.player.name === "MrX") {
        html.push('<input class="ticket-radio" type="radio" id="black" value="x" name="transport">')
        html.push('<img class="ticket-icon" src="/assets/images/Black.svg">')
    } else {
        html.push('<input class="ticket-radio" disabled="true" type="radio" id="black" value="x" name="transport">')
        html.push('<img class="ticket-icon" src="/assets/images/Black.svg" style="opacity: 40%">')
    }
    html.push('</label>')
    html.push('</div>')

    document.getElementById('game-controls').innerHTML = html.join("")
}

function getXY(e) {
  var rect = canvas.getBoundingClientRect();
  return {x: e.clientX - rect.left, y: e.clientY - rect.top}
}


function getSelectedTicketType() {
    var radios = document.getElementsByName('transport');
    for (var i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked) {
        return radios[i].value;
      }
    }
}

// -----------------------------------

function movePlayer(e) {
    clickCoords = getXY(e)

    const ticketType = getSelectedTicketType()

    var httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', "/player/", true);
    httpRequest.setRequestHeader("Content-Type", "application/json");
    const data = {
        ticketType: ticketType,
        x: parseInt(clickCoords.x),
        y: parseInt(clickCoords.y)
    }
    httpRequest.onreadystatechange = function() {
       // Add win / lose here
       /*if (this.readyState == 4 && this.status == 187) {
        drawWin()
       }*/
       if (this.readyState == 4 && this.status == 200) {
         refresh()
       }
    };
    httpRequest.send(JSON.stringify(data));
}


function callUndo() {
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', "/undo", true);
    httpRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          refresh()
        }
    };
    httpRequest.send();
}

function callRedo() {
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', "/redo", true);
    httpRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          refresh()
        }
    };
    httpRequest.send();
}

function getAllPlayerData() {
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', "/player", true);
    httpRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const playerData = JSON.parse(httpRequest.responseText)
            drawMap(playerData)
            drawStats(playerData)
        }
    };
    httpRequest.send();
}

function getCurrentPlayerAndRound() {
    var httpRequestCurrentPlayer = new XMLHttpRequest();
    httpRequestCurrentPlayer.open('GET', "/player/current/", true);
    httpRequestCurrentPlayer.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const currentPlayer = JSON.parse(httpRequestCurrentPlayer.responseText);
            drawTransport(currentPlayer)

            var httpRequestRound = new XMLHttpRequest();
            httpRequestRound.open('GET', "/round", true);
            httpRequestRound.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    drawHeadLine(currentPlayer, JSON.parse(httpRequestRound.responseText))
                }
            };
            httpRequestRound.send();
        }
    };
    httpRequestCurrentPlayer.send();
}

function getHistory() {
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', "/history", true);
    httpRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          drawHistory(JSON.parse(httpRequest.responseText))
        }
    };
    httpRequest.send();
}