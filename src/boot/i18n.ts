import { boot } from 'quasar/wrappers';
import {
    createI18n,
    type Locale,
} from 'vue-i18n';
import { useLocalStorage } from '@vueuse/core';
import { parse } from 'yaml';

type LocaleImportFn = () => Promise<{ default: Record<string, string> }>;
type LocaleImportMap = [Locale, LocaleImportFn];
type LocaleImportRecord = Record<Locale, LocaleImportFn>;

import enUS from '../../locales/en-US.yaml';

export const messages: Record<Locale, Record<string, string>> = {
    'en-US': enUS,
};

export const locale = useLocalStorage('locale', 'en-US');

const i18n = createI18n({
    locale: locale.value,
    legacy: false,
    messages,
});

export type MessageLanguages = keyof typeof messages;
// Type-define 'en-US' as the master schema for the resource
export type MessageSchema = typeof messages['en-US'];

// See https://vue-i18n.intlify.dev/guide/advanced/typescript.html#global-resource-schema-type-definition
/* eslint-disable @typescript-eslint/no-empty-interface */
declare module 'vue-i18n' {
    // define the locale messages schema
    export interface DefineLocaleMessage extends MessageSchema { }

    // define the datetime format schema
    export interface DefineDateTimeFormat { }

    // define the number format schema
    export interface DefineNumberFormat { }
}
/* eslint-enable @typescript-eslint/no-empty-interface */

function mapLocale([path, loadLocale]: [string, LocaleImportFn]): LocaleImportMap {
    const fileNameReg = /([\w-]*)\.ya?ml$/;
    const match = fileNameReg.exec(path)?.[1];

    return [match, loadLocale];
}

const localesMap = Object.fromEntries(
    Object.entries(import.meta.glob('../../locales/*.yaml'))
        .map(mapLocale),
) as LocaleImportRecord;

export const availableLocales = Object.keys(localesMap);

const loadedLanguages: string[] = ['en-US'];

function setI18nLanguage(lang: Locale) {
    i18n.global.locale.value = lang;

    if (typeof document !== 'undefined') {
        document.querySelector('html')?.setAttribute('lang', lang);
    }

    return lang;
}

export async function loadLanguageAsync(lang: string): Promise<Locale> {
    // If the same language
    if (i18n.global.locale.value === lang) {
        return setI18nLanguage(lang);
    }

    // If the language was already loaded
    if (loadedLanguages.includes(lang)) {
        return setI18nLanguage(lang);
    }

    // If the language hasn't been loaded yet
    const messages = await localesMap[lang]();

    i18n.global.setLocaleMessage(lang, messages.default);
    loadedLanguages.push(lang);

    return setI18nLanguage(lang);
}

export default boot(({ app }) => {
    // Set i18n instance on app
    app.use(i18n);
});
