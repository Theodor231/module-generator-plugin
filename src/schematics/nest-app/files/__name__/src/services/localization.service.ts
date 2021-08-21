import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalizationService {
  activeLanguage = 'en';
  readonly LANGUAGES = {
    ru: 'ru',
    ro: 'ro',
    en: 'en',
  } as any;

  messages = {} as any;
  constructor() {
    setTimeout(() => {
      this.loadLocaleMessages().then((r) => r);
    });
  }
  async loadLocaleMessages(): Promise<void> {
    // const locales = await import('./ro.json');

    // const locales = require.context(
    //   '../modules',
    //   true,
    //   /[A-Za-z0-9-_,\s]+\.json$/i,
    // );

    // const globalLocales = require.con text(
    //   '../',
    //   true,
    //   /[A-Za-z0-9-_,\s]+\.json$/i,
    // );

    const messages = {
      en: {},
      ru: {},
      ro: {},
    };

    // locales.keys().forEach((key) => {
    //   const [, lang] = key.match(/([A-Za-z0-9-_]+)\./i) as Array<string>;
    //   messages[lang] = { ...messages[lang], ...locales(key) };
    // });
    //
    // globalLocales.keys().forEach((key) => {
    //   const [, lang] = key.match(/([A-Za-z0-9-_]+)\./i) as Array<string>;
    //   messages[lang] = { ...messages[lang], ...globalLocales(key) };
    // });

    this.messages = messages;
  }

  translate(translate): string {
    const locales = translate.split('.');
    let dict = this.messages[this.activeLanguage];

    for (const key of locales) {
      if (dict && dict[key]) {
        dict = dict[key];
      } else {
        dict = translate;
      }
    }
    return dict;
  }
}
