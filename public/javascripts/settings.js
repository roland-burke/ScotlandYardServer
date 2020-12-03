player = {
    "number": 3,
    "names": [
        {
            "name": 'MrX'
        },
        {
            "name": 'Dt1'
        },
        {
            "name": 'Dt2'
        },
        {
            "name": 'Dt3'
        },
        {
            "name": 'Dt4'
        },
        {
            "name": 'Dt5'
        },
        {
            "name": 'Dt6'
        }
    ]
}

setNumberOfPlayer(3);

function setName() {
    const newName = $('#name-input').val();
    if (newName.length < 3) {
        $('#alert-invalid-name').alert('Name: "' + newName + '" is to short!');
        return;
    } else if (newName.length > 30) {
        $('#alert-invalid-name').alert('Name: ' + newName + ' is to long!')
        return;
    }
    playerIndex = $('#name-select').val();
    player.names[playerIndex].name = newName;
    updateNames(player.number);
    $('#name-input').val("");
    nameInput();
}

function setNumberOfPlayer(n) {
    player.number = n;
    updateNames(n);
}

function updateNames(n) {
    html = [];
    html.push('<option name="player" disabled="true" value="0">MrX</option>');
    for (i = 1; i < n; i++) {
        html.push('<option name="player" value="' + i + '">' + player.names[i].name + '</option>');
    }
    $('#name-select').html(html);
}

function startGame() {
    const hRefUrl = '/game';
    const postUrl = '/init'
    request = $.ajax({
        url: postUrl,
        type: 'POST',
        data: JSON.stringify(player),
        contentType: 'application/json',
    });

    request.done(function (){
        window.location.href = hRefUrl;
    });
}

function nameInput() {
    text = $('#name-input').val()
    if(text.length > 2 && text.length < 31) {
        text = $('#name-input-button').prop("disabled", false);
    } else {
        text = $('#name-input-button').prop("disabled", true);
    }
}