const IndexComponent = Vue.component('index-component', {
    template: `
        <div class="main">
        <div class="index-wrapper">
            <div class="row my-3 d-flex justify-content-center">
                <router-link class="main-menu-button" to="/lobby">Start Game</router-link>
            </div>
            <div class="row my-3 d-flex justify-content-center">
                <label class="main-menu-button">
                    <input type="file"/>
                    Load Game
                </label>
            </div>
            <div class="row d-flex justify-content-center">
                <router-link class="main-menu-button" to="/about">About</router-link>
            </div>
        </div>
        <link rel="stylesheet" href="/assets/stylesheets/index.css"/>
    </div>
    `
})