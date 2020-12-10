const app = new Vue({
    el: '#settings',
    data: {
        nPlayer: 3,
        player: [
            1, 2, 3, 4, 5, 6, 7
        ],
        test: "vue-test",
        names: [
            {
                name: 'MrX'
            },
            {
                name: 'Dt1'
            },
            {
                name: 'Dt2'
            },
            {
                name: 'Dt3'
            },
            {
                name: 'Dt4'
            },
            {
                name: 'Dt5'
            },
            {
                name: 'Dt6'
            }
        ]
    },
    methods: {
        setNumberOfPlayer: function(n) {
            this.nPlayer = n;
        }
    },
})

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