
function joinGame() {
    request = $.ajax({
        url: '/running',
        type: 'GET',
    });

    request.done(function (response, textStatus, jqXHR){
        const msg = jQuery.parseJSON(jqXHR.responseText)
        gameRunning = msg.gameRunning
        if(!gameRunning) {
            alert("Game is not running!")
        } else {
            window.location.href = "/game";
        }
    });
}
