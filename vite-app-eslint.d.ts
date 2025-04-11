/* eslint-disable @typescript-eslint/no-unused-expressions */
import { configs } from "eslint-plugin-vue";

interface Configs {
    configs: {
        recommmended(): { ignores: string[] }[];
    };
}

declare module '@quasar/app-vite/eslint' {
    configs;
};
