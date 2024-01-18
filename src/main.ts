import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue';
import App from './App.vue';
import '@arco-design/web-vue/dist/arco.css';
import {createPinia} from "pinia";
import router from "./router";
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import '@kangc/v-md-editor/lib/style/preview.css';
import '@kangc/v-md-editor/lib/theme/style/github.css';
// @ts-ignore
import VMdPreview from '@kangc/v-md-editor/lib/preview';
// @ts-ignore
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
// @ts-ignore
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
// @ts-ignore
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css';

import hljs from 'highlight.js';
import './cssAndJs/golbal.css'

VMdPreview.use(githubTheme, {
    Hljs: hljs,
});
VMdPreview.use(createCopyCodePlugin());
VMdPreview.use(createEmojiPlugin());

const pinia = createPinia();
const app = createApp(App);
pinia.use(piniaPluginPersistedstate)

app.use(ArcoVue);
app.use(ArcoVueIcon);
app.use(router);

app.use(VMdPreview);

app.use(pinia)

app.mount('#app');