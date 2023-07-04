const path = require('path');

const ONLY_DEV = process.env.NEXT_PUBLIC_NODE_ENV === 'development';

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
  },
  reloadOnPrerender: ONLY_DEV,
  localePath: path.resolve('./public/locales'),
};
