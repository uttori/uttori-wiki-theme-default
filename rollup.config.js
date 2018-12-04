/* eslint no-console: 0 */
const { rollup } = require('rollup');
const babel = require('rollup-plugin-babel');
const json = require('rollup-plugin-json');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const minify = require('rollup-plugin-babel-minify');

rollup({
  input: 'src/scripts/page.js',
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    json({
      exclude: ['node_modules/**'],
    }),
    babel({
      exclude: 'node_modules/**',
      // plugins: ['external-helpers'],
    }),
    minify({
      comments: false,
      sourceMap: true,
    }),
  ],
}).then(bundle => (
  bundle.write({
    format: 'es',
    file: 'public/scripts/page.js',
  })
)).then(() => {
  console.log('page.js bundle created!');
}).catch((e) => {
  console.log(e);
});

rollup({
  input: 'src/scripts/edit.js',
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    json({
      exclude: ['node_modules/**'],
    }),
    babel({
      exclude: 'node_modules/**',
      // plugins: ['external-helpers'],
    }),
    minify({
      comments: false,
      sourceMap: true,
    }),
  ],
}).then(bundle => (
  bundle.write({
    format: 'es',
    file: 'public/scripts/edit.js',
  })
)).then(() => {
  console.log('edit.js bundle created!');
}).catch((e) => {
  console.log(e);
});
