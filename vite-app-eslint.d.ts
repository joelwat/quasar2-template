/* eslint-disable @typescript-eslint/no-unused-expressions */
declare module '@quasar/app-vite/eslint' {
  interface PluginQuasar {
    configs: {
      recommended(): Array<{ ignores: string[] }>;
    };
  }
  
  const plugin: PluginQuasar;
  export default plugin;
}
