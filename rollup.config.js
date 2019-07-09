import babel from 'rollup-plugin-babel';
import { eslint } from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const plugins = [
  eslint(),
  babel({
    exclude: 'node_modules/**',
  }),
  resolve({
    extensions: ['.js', '.jsx'],
    customResolveOptions: {
      moduleDirectory: 'src',
    },
  }),
  commonjs(),
];

export default [
  {
    input: './src/preview.js',
    output: [
      {
        file: './preview.js',
        format: 'cjs',
      },
    ],
    plugins,
    external: [
      '@storybook/addons',
      'core-js/modules/es6.function.bind',
      'prop-types',
      'react',
      'react-i18next',
    ],
  },
  {
    input: './src/manager.js',
    output: [
      {
        file: './manager.js',
        format: 'cjs',
      },
    ],
    plugins,
    external: [
      '@emotion/styled',
      '@storybook/addons',
      '@storybook/core-events',
      '@storybook/components',
      'core-js',
      'prop-types',
      'react',
    ],
  },
];
