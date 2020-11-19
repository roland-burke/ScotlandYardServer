window.onload = function() {
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

function drawNewPlayerPosition() {
    //console.log(getAllCoorinates())
}

function getAllCoorinates() {
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', "/coords", false);
    httpRequest.send();
    return httpRequest.responseText;
}