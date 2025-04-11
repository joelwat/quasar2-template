interface Configs {
    configs: {
        recommmended(): { ignores: string[] }[];
    };
}

declare module '@quasar/app-vite/eslint' {
    Configs;
};
