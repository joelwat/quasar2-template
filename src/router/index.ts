import { defineRouter } from '#q-app/wrappers';
import { setupLayouts } from 'virtual:generated-layouts';
import {
    createMemoryHistory,
    createRouter,
    createWebHashHistory,
    createWebHistory,
} from 'vue-router';
import {
    handleHotUpdate,
    routes,
} from 'vue-router/auto-routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

function getHistoryMode() {
    return process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory;
}

export default defineRouter((/* { store, ssrContext } */) => {
    const createHistory = process.env.SERVER
        ? createMemoryHistory
        : getHistoryMode();

    const Router = createRouter({
        scrollBehavior: () => ({ left: 0, top: 0 }),
        routes: setupLayouts([...routes]),

        // Leave this as is and make changes in quasar.conf.js instead!
        // quasar.conf.js -> build -> vueRouterMode
        // quasar.conf.js -> build -> publicPath
        history: createHistory(process.env.VUE_ROUTER_BASE),
    });

    if (import.meta.hot) {
        handleHotUpdate(Router);
    }

    return Router;
});
