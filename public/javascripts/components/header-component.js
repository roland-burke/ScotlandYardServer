Vue.component('header-component', {
    props: {
        lobby: Object,
        gamerunning: Boolean,
        gamecomponentactive: Boolean
    },
    methods: {
        callUndo: function() {
            this.$root.sendMessageOverWebsocket("undo")
        },
        callRedo: function() {
            this.$root.sendMessageOverWebsocket("redo")
        },
    },
    template: `
        <nav class="navbar navbar-expand-md navbar-light fixed-top" id="header">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2" id="navbarCollapse">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="/">Main Menu <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item active float-left">
                        <a class="nav-link" href="/about">About</a>
                    </li>
                    <li v-if="gamerunning && gamecomponentactive" class="nav-item active">
                        <a class="nav-link" href="/game">Save Game</a>
                    </li>
                    <li v-if="gamerunning && gamecomponentactive" class="nav-item active">
                        <a id="undo" class="nav-link" v-on:click="callUndo" href="/game">Undo</a>
                    </li>
                    <li v-if="gamerunning && gamecomponentactive" class="nav-item active">
                        <a id="redo" class="nav-link" v-on:click="callRedo" href="/game">Redo</a>
                    </li>
                </ul>
            </div>
        </nav>
    `
})