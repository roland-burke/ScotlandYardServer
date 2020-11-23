
var ctx = canvas.getContext("2d");
var isDown = false;        // mouse button is held down
var isMoving = false;      // we're moving (dragging)
var radius = 9 * 9         // radius in pixels, 9 squared
var firstPos;              // keep track of first position


window.onload = function() {
    refresh()
}

function refresh() {
    drawMap()
    drawHistory()
    drawStats()}

function drawMap() {
    const data = JSON.parse(getAllCoorinates());

    let cnvs = document.getElementById("canvas");
    cnvs.style.position = "absolute";

    let img = new Image();
    img.onload = function(){
        ctx.drawImage(img,0,0);
        for (var i = 0; i < data.coordinates.length; i++) {
            let coord = data.coordinates[i];

            ctx.beginPath();
            ctx.arc(coord.x, coord.y, 23, 0, 2 * Math.PI, false);
            ctx.lineWidth = 8;
            ctx.strokeStyle = coord.color;
            ctx.stroke();
        }
      };
    img.src = '/assets/images/map_large.png';
    img.id = 'map'
}

function drawHistory() {
    let html = []
    html.push('<h3 style="padding: 5px 25px 5px 25px;">Mr.X History</h3>')

    const historyObject = JSON.parse(getHistory())

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


function drawStats() {

}

canvas.onmousedown = function(e) {
  firstPos = getXY(e);
  isDown = true;           // record mouse state
  isMoving = false;        // reset move state
};

window.addEventListener("mousemove", function(e) {
  if (!isDown) return;     // we will only act if mouse button is down
  var pos = getXY(e);      // get current mouse position

  // calculate distance from click point to current point
  var dx = firstPos.x - pos.x,
      dy = firstPos.y - pos.y,
      dist = dx * dx + dy * dy;        // skip square-root (see above)

  if (dist >= radius) isMoving = true; // 10-4 we're on the move
});

window.addEventListener("mouseup", function(e) {
  if (!isDown) return;     // no need for us in this case
  isDown = false;          // record mouse state

  if (!isMoving) {
    movePlayer(e)
  }
});

function getXY(e) {
  var rect = canvas.getBoundingClientRect();
  return {x: e.clientX - rect.left, y: e.clientY - rect.top}
}

function movePlayer(e) {
    clickCoords = getXY(e)
    console.log("Clicked at: " +  clickCoords.x + " | " + clickCoords.y)
    console.log(getAllCoorinates())

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
       if (this.readyState == 4 && this.status == 200) {
         refresh()
       }
    };
    httpRequest.send(JSON.stringify(data));

}

function getSelectedTicketType() {
    var radios = document.getElementsByName('transport');
    for (var i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked) {
        return radios[i].value;
      }
    }
}

function getAllCoorinates() {
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', "/coords", false);
    httpRequest.send();
    return httpRequest.responseText;
}

function getHistory() {
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', "/history", false);
    httpRequest.send();
    return httpRequest.responseText;
}