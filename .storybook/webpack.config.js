const path = require('path');
const TSDocgenPlugin = require('react-docgen-typescript-webpack-plugin');

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: ['babel-loader', 'react-docgen-typescript-loader', 'awesome-typescript-loader']
  });
  defaultConfig.resolve.extensions.push('.ts', '.tsx');
  return defaultConfig;
};
