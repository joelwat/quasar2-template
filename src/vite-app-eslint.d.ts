import { symRoundedCommentsDisabled } from "@quasar/extras/material-symbols-rounded";
import { configs } from "eslint-plugin-vue";

interface Configs {
    configs: {
        recommmended(): { ignores: string[] }[];
    };
}

declare module '@quasar/app-vite/eslint' {
    configs;
};
