import { boot } from 'quasar/wrappers';
import messages from 'src/i18n';
import { createI18n } from 'vue-i18n';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const i18n: any = createI18n({
  locale: 'en-US',
  messages,
});

export default boot(({ app }) => {
  // Set i18n instance on app
  app.use(i18n);
});

export { i18n };
