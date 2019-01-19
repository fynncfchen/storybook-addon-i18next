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

export default [{
  input: './src/preview/index.js',
  output: [{
    file: './dist/preview.js',
    sourcemap: true,
    format: 'cjs',
  }, {
    file: './dist/preview.es.js',
    sourcemap: true,
    format: 'es',
  }],
  plugins,
  external: [
    '@storybook/addons',
    'core-js/modules/es6.function.bind',
    'prop-types',
    'react',
    'react-i18next',
  ],
}, {
  input: './src/manager/index.js',
  output: [{
    file: './dist/manager.js',
    sourcemap: true,
    format: 'cjs',
  }, {
    file: './dist/manager.es.js',
    sourcemap: true,
    format: 'es',
  }],
  plugins,
  external: [
    '@emotion/styled',
    '@storybook/addons',
    '@storybook/components',
    'core-js',
    'prop-types',
    'react',
    'core-js/modules/web.dom.iterable',
    'core-js/modules/es7.object.entries',
    'core-js/modules/es6.array.iterator',
    'core-js/modules/es6.function.bind',
    'core-js/modules/es6.array.map',
  ],
}, {
  input: './src/register.js',
  output: [{
    file: './dist/register.js',
    sourcemap: true,
    format: 'cjs',
  }, {
    file: './dist/register.es.js',
    sourcemap: true,
    format: 'es',
  }],
  plugins,
  external: [
    '@emotion/styled',
    '@storybook/addons',
    '@storybook/components',
    'core-js',
    'prop-types',
    'react',
    'core-js/modules/web.dom.iterable',
    'core-js/modules/es7.object.entries',
    'core-js/modules/es6.array.iterator',
    'core-js/modules/es6.function.bind',
    'core-js/modules/es6.array.map',
  ],
}];
