/// <reference types="vite/client" />
declare module '*.vue' {
    import { DefineComponent } from "vue";
    // 有一些文档里import的是ComponentOptions,但是版本貌似比较低了
    const component: DefineComponent<{}, {}, any>;
    export default component;
}