const IndexComponent = Vue.component('index-component', {
    template: `
        <div class="main">
        <div class="index-wrapper">
            <div class="row my-3 d-flex justify-content-center">
                <button class="main-menu-button">Start Game</button>
            </div>
            <div class="row my-3 d-flex justify-content-center">
                <label class="main-menu-button">
                    <input type="file"/>
                    Load Game
                </label>
            </div>
            <div class="row d-flex justify-content-center">
                <a href="/about">
                    <button class="main-menu-button">About</button>
                </a>
            </div>
        </div>
        <link rel="stylesheet" href="/assets/stylesheets/index.css"/>
    </div>
    `
})