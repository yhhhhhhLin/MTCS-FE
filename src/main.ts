import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue';
import App from './App.vue';
import '@arco-design/web-vue/dist/arco.css';
import {createPinia} from "pinia";
import router from "./router";
import ArcoVueIcon from '@arco-design/web-vue/es/icon';

const pinia = createPinia();
const app = createApp(App);
app.use(ArcoVue);
app.use(ArcoVueIcon);

app.use(router);
app.use(pinia)

app.mount('#app');