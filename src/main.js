import { createApp } from 'vue'
import App from './App.vue'
//vue-router
import router from '@/router/index.js';
import 'element-plus/dist/index.css'
//公共样式
import '@/common/css/style.css';
//pinia
import { createPinia } from "pinia";
const store = createPinia();
//pinia 持久化存储
import piniaPluginPersist from 'pinia-plugin-persist'
store.use(piniaPluginPersist)
const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');