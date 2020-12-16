const AboutComponent = Vue.component('about-component', {
    methods: {
        backToMenu: function() {
            this.$router.push('/')
        },
        backToGame: function() {
            this.$router.push('/game')
        },
    },
    template: `
        <div class="main">
            <div id="about">
                <div class="d-flex justify-content-center">
                    <h1>About</h1>
                </div>
                    <h3 style="font-weight: bold">Description</h3>
                    <p>Scotland Yard is a board game in which a team of players, as police, cooperate to track down a player controlling a criminal around a board representing the streets of London,
                    first published in 1983. It is named after Scotland Yard, the headquarters of London's Metropolitan Police Service. Scotland Yard is an asymmetric board game,
                    with the detective players cooperatively solving a variant of the pursuit-evasion problem. The game is published by Ravensburger in most of Europe and Canada
                    and by Milton Bradley in the United States. It received the "Spiel des Jahres" (Game of the Year) award in 1983.
                    </p>

                    <h3 style="font-weight: bold">Rules</h3>
                    <h4>Object of the game</h4>
                    <p>If you are Mister X,you must stay undercover to escape from your pursuers until the detectives can no longer move.
                    However if you are a detective, your purpose is to catch Mister X by moving onto the playing area where he is currently hiding.</p>

                    <h4>Mr.X starting positions</h4>
                    <p>35, 45, 51, 71, 78, 104, 106, 127, 132, 146, 166, 170 and 172</p>

                    <h4>Setup</h4>
                    <h5>Every detective receives the following tickets when the game begins:</h5>
                    <ul>
                        <li>11 Taxi</li>
                        <li>&nbsp;8 Bus</li>
                        <li>&nbsp;4 Underground</li>
                    </ul>
                    <h5>Mister X gets:</h5>
                    <ul>
                        <li>99 Taxi</li>
                        <li>99 Bus</li>
                        <li>99 Underground</li>
                        <li>&nbsp;2 Black</li>
                    </ul>
                    <button v-on:click="backToMenu" class="standard-button">Back to Main Menu</button>
                    <button v-if="$store.getters.getGameRunning" id="back-to-game" v-on:click="backToGame" class="standard-button">Back to Game</button>
                </div>
                <script src="/assets/javascripts/about.js" type="application/javascript"></script>
            </div>
    `
})