// import babel from 'rollup-plugin-babel';
import buble from 'rollup-plugin-buble';
import resolve from 'rollup-plugin-node-resolve';
import multiEntry from 'rollup-plugin-multi-entry';
import uglify from 'rollup-plugin-uglify';

export default {
  entry: 'source/js/home.js',
  dest: 'dist/js/home.min.js',
  // format: 'cjs',
  format: 'iife',
  plugins: [
    // multiEntry(),
    resolve({
      jsnext: true,
      main: true,

      // Some package.json files have a `browser` field which specifies
      // alternative files to load for people bundling for the browser. If
      // that's you, use this option, otherwise pkg.browser will be ignored.
      browser: false
    }),
    buble(),
    // babel({
    //   babelrc: false
    //   presets: ['es2015-rollup'],
    //   exclude: [
    //     'node_modules/**',
    //     'source/js/lib/**'
    //   ]
    // }),

    // uglify()
  ]
};
