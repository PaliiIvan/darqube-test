const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.@(ts|tsx|js|jsx)'],
  addons: [
'@storybook/preset-create-react-app'
  ],
  core: {
    builder: 'webpack5',
  },
  // https://storybook.js.org/docs/react/configure/typescript#mainjs-configuration
  typescript: {
    check: true // type-check stories during Storybook build
  }
};
