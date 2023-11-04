import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'
import { hiPrintPlugin } from "vue-plugin-hiprint";

const app = createApp(App)
app.use(hiPrintPlugin, "$pluginName");
hiPrintPlugin.disAutoConnect();
app.use(router)
app.use(Vant)
 
app.mount('#app')