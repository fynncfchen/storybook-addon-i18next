# Storybook Addon i18next

Storybook Addon i18next allows your stories to be displayed in
different language with [i18next][i18next].

NOTE: It only support React for now.

![Screenshot](https://github.com/fynncfchen/storybook-addon-i18next/blob/master/docs/screenshot.png)

## Installation

Install the following npm module:

```sh
npm i --save-dev storybook-addon-i18next
```

or with yarn:

```sh
yarn add -D storybook-addon-i18next
```

Then, add following content to .storybook/addons.js

```js
import 'storybook-addon-i18next/register';
```

## Decorator

There's only one decorator for configuration.

Import and use the `withI18next` decorator in your `config.js` file.

```js
import { withI18next } from 'storybook-addon-i18next';
```

### i18n : Object

----

An [configuration][i18next-configuration-options] object for [i18next][i18next].

### languages : Object

----

A key-value pair of language codes and display name

Example:

```javascript
{
  en: 'English',
  'zh-TW': '繁體中文',
}
```

## Examples

### Basic Usage

Simply import the Storybook i18next Addon in the `addons.js` file in your `.storybook` directory.

```js
import 'storybook-addon-i18next/register';
```

### Add i18next Configuration

Please refer to [i18next-configuration-options][i18next-configuration-options].

Example in `.storybook/config.js`:

```javascript
import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .init({
    whitelist: ['en', 'zh-TW'],
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

addDecorator(withI18next({
  i18n,
  languages: {
    en: 'English',
    'zh-TW': '繁體中文',
  }
}));
```

[i18next]: https://www.i18next.com/
[i18next-configuration-options]: https://www.i18next.com/overview/configuration-options