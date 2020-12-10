var gameRunning = false

$(document).ready(function(){
    getGameRunning()
});

function getGameRunning() {
    request = $.ajax({
        url: '/running',
        type: 'GET',
    });

    request.done(function (response, textStatus, jqXHR){
        const msg = jQuery.parseJSON(jqXHR.responseText)
        gameRunning = msg.gameRunning
        setBackToGameButton()
    });
}

function setBackToGameButton() {
    if(gameRunning) {
        $('#back-to-game').show()
    } else {
        $('#back-to-game').hide()
    }
}