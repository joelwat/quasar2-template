declare module '@quasar/app-vite/eslint' {
  interface PluginQuasar {
    configs: {
      recommended(): { ignores: string[] }[];
    };
  }
  
  const plugin: PluginQuasar;
  export default plugin;
}
