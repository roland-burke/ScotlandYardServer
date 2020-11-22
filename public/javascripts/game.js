
var ctx = canvas.getContext("2d");
var isDown = false;        // mouse button is held down
var isMoving = false;      // we're moving (dragging)
var radius = 9 * 9         // radius in pixels, 9 squared
var firstPos;              // keep track of first position


window.onload = function() {
    drawMap()
}

function drawMap() {
 var data = JSON.parse(getAllCoorinates());

    //var img = document.getElementById("map")
    var cnvs = document.getElementById("canvas");
    cnvs.style.position = "absolute";
    //cnvs.style.left = img.offsetLeft + "px";
    //cnvs.style.top = img.offsetTop + "px";

    var ctx = cnvs.getContext("2d");

    var img = new Image();
      img.onload = function(){
        ctx.drawImage(img,0,0);
        for (var i = 0; i < data.coordinates.length; i++) {
            var coord = data.coordinates[i];

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
         drawMap()
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