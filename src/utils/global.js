import Vue from "vue";
import { Base64 } from "js-base64";

export const BASE64 = Base64;

/**
 * 注册全局的组件
 */
const contexts = require.context("../components/global", false, /[a-z0-9]+\.(vue)$/i);
contexts.keys().forEach(component => {
    const componentEntity = contexts(component).default;
    let componentName = component.replace(/^\.\//, "").replace(/\.\w+$/, "");
    if (componentName.indexOf("/") > -1) {
        if (/\/index$/.test(componentName)) {
            componentName = componentName.replace(/\/index$/, "");
        } else {
            return;
        }
    }
    // 使用内置的组件名称 进行全局组件注册
    Vue.component(componentName, componentEntity);
});
