
Vue.component('header-component', {
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
                        <router-link class="nav-link" to="/about">About</router-link>
                    </li>
                    <li v-if="$store.getters.getGameRunning" class="nav-item active">
                        <router-link class="nav-link" to="/game">Save Game</router-link>
                    </li>
                    <li v-if="$store.getters.getGameRunning" class="nav-item active">
                        <a id="undo" class="nav-link" v-on:click="callUndo" href="javascript:void(0)">Undo</a>
                    </li>
                    <li v-if="$store.getters.getGameRunning" class="nav-item active">
                        <a id="redo" class="nav-link" v-on:click="callRedo" href="javascript:void(0)">Redo</a>
                    </li>
                </ul>
            </div>
        </nav>
    `
})