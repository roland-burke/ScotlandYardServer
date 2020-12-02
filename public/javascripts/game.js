window.onload = function() {
    refresh()
}
canvas.addEventListener('dblclick', function(e) {
  movePlayer(e)
});

function refresh() {
    getAllPlayerData()
    getCurrentPlayerAndRound()
    getHistory()
}

function drawMap(playerData) {
    let cnvs = document.getElementById('canvas');
    cnvs.style.position = 'absolute';
    ctx = canvas.getContext('2d');

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

    document.getElementById('history-wrapper').innerHTML = html.join('')
}


function drawStats(playersData) {
    let html = []
    html.push('<h3>Stats</h3>')

    for (var i = 0; i < playersData.players.length; i++) {
        const player = playersData.players[i]
        html.push('<div class="stats-item">')
        html.push('<div>')
        if(player.name == 'MrX') {
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
     document.getElementById('stats-wrapper').innerHTML = html.join('')
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

    const data = {
        ticketType: ticketType,
        x: parseInt(clickCoords.x),
        y: parseInt(clickCoords.y)
    }

    $.ajax({
        url: '/player/',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
    }).done(function (response, textStatus, jqXHR){
        if (jqXHR.status == 205) {
            showWinningScreen('MrX');
        } else if (jqXHR.status == 206) {
            showWinningScreen('Detectives');
        } else if (jqXHR.status == 200) {
            refresh();
        }
    });
}


function callUndo() {
    request = $.ajax({
        url: '/undo',
        type: 'POST',
    });

    request.done(function (response, textStatus, jqXHR){
        refresh()
    });
}

function callRedo() {
    request = $.ajax({
        url: '/redo',
        type: 'POST',
    });

    request.done(function (response, textStatus, jqXHR){
        refresh()
    });
}

function getAllPlayerData() {
    request = $.ajax({
        url: '/player',
        type: 'GET',
    });

    request.done(function (response, textStatus, jqXHR){
        const playerData = jQuery.parseJSON(jqXHR.responseText)
        drawMap(playerData)
        drawStats(playerData)
    });
}

function getCurrentPlayerAndRound() {

    request = $.ajax({
        url: '/player/current/',
        type: 'GET',
    });

    request.done(function (response, textStatus, jqXHR) {
        if (jqXHR.readyState == 4 && jqXHR.status == 200) {
            const currentPlayer = response;
            drawTransport(currentPlayer);
            request = $.ajax({
                url: '/round',
                type: 'GET',
            });
            request.done(function (response, textStatus, jqXHR) {
                if (jqXHR.readyState == 4 && jqXHR.status == 200) {
                    drawHeadLine(currentPlayer, response);
                }
            });
        }
    });
}

function getHistory() {
    request = $.ajax({
        url: '/history',
        type: 'GET',
    });

    request.done(function (response, textStatus, jqXHR){
        drawHistory(jQuery.parseJSON(jqXHR.responseText))
    });
}

function showWinningScreen(name) {

    $('#winning-background').css('visibility', 'visible')
    $('#winning-row').html('<h1 id="winning-title">' + name + ' Won!!!</h1>')
    $('#winning-dialog').addClass('winning-dialog')
    $('#winning-subtitle').html('<h5>Loading..</h5>')
    $('#win-button').html('<a href="/">\n' +
        '                            <button class="standard-button">Main Menu</button>\n' +
        '                        </a>')

    if(name == 'MrX') {
        $('#win-image').html('<img width=\'250px\' height=\'250px\' src=\'assets/images/mrx-win.PNG\' alt=\'MrX\'>')
    } else {
        $('#win-image').html('<img width=\'250px\' height=\'250px\' src=\'assets/images/detective-win.PNG\' alt=\'Detective\'>')
    }

    request = $.ajax({
        url: '/player/current/',
        type: 'GET',
    });

    request.done(function (response, textStatus, jqXHR){
        if (jqXHR.readyState == 4 && jqXHR.status == 200) {
            const currentPlayer = response;
            if(name == 'MrX') {
                $('#winning-subtitle').html('MrX escaped successfully')
            } else {
                $('#winning-subtitle').html('MrX was caught at Station: ' + currentPlayer.player.station)
            }
        }
    });

    let track = getRandomInt(3)
    var audio = new Audio('assets/audio/' + track + '.mp3');
    audio.play();

}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

$(document).ready(function () {
    var parent = jQuery("#map-wrapper");
    var childPos = jQuery("#canvas");

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
});