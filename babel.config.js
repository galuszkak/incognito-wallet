const commonPlugins = [
  '@babel/plugin-proposal-optional-catch-binding',
  ['transform-class-properties', { spec: true }],
  '@babel/plugin-proposal-optional-chaining',
  'transform-function-bind',
  '@babel/plugin-proposal-export-default-from',
  '@babel/plugin-proposal-export-namespace-from',
  '@babel/plugin-proposal-nullish-coalescing-operator',
  '@babel/plugin-proposal-throw-expressions',
  [
    'module-resolver',
    {
      alias: {
        '@src': './src',
        '@models': './src/models',
        '@services': './src/services',
        '@utils':'./src/utils',
        '@assets':'./src/assets',
        '@components': './src/components',
        '@screens': './src/screens',
        '@routers':'./src/router'
      }
    }
  ],

  // minify
  'babel-plugin-transform-remove-undefined'
];

const commonPresets = [
  'module:metro-react-native-babel-preset',
  '@babel/preset-flow',
  'module:react-native-dotenv'
];

module.exports = {
  env: {
    development: {
      presets: [...commonPresets],
      plugins: [...commonPlugins]
    },
    test: {
      presets: [...commonPresets],
      plugins: [...commonPlugins]
    },
    production: {
      presets: [...commonPresets],
      plugins: [
        ...commonPlugins,

        // minify
        'babel-plugin-transform-remove-console',
        'babel-plugin-transform-remove-debugger'
      ]
    }
  },
  retainLines: true
};
