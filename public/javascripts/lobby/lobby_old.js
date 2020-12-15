var app = new Vue({
    el: '#lobby',
    data: {
        maxPlayers: 7,
        player: {
            number: 3,
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
        }
    },
    methods: {
        setNumberOfPlayer: function(n) {
            this.player.number = n;
        },
        startGame: function() {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.player),
            };
            fetch("/init", requestOptions)
                .then(response => window.location.href = "/game");
        },
        nameInput: function() {
            text = $('#name-input').val()
            if(text.length > 2 && text.length < 31) {
                text = $('#name-input-button').prop("disabled", false);
            } else {
                text = $('#name-input-button').prop("disabled", true);
            }
        }
    }
})