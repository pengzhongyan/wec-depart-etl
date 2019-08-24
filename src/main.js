import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import iview from "iview";
import "./utils/global.js";
import "iview/dist/styles/iview.css";
import "ivew-comps2/lib/ivew-comps2.css";

import ivewComps2 from "ivew-comps2";
Vue.config.productionTip = false;
Vue.use(iview);
Vue.use(ivewComps2);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
