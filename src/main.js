import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import components from './components/UI/main';
import store from '@/storage';
const app = createApp(App);
components.forEach(components =>{
    app.component(components.name, components)
});
app.use(router).use(store).mount('#app');
