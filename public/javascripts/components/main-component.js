const MainComponent = Vue.component('main-component', {
    props: {
        lobby: Object,
        model: Object,
    },
    template: `
        <main role="main" class="d-flex align-items-center justify-content-center">
            <router-view :lobby="lobby" :model="model"></router-view>
        </main>
        `
})