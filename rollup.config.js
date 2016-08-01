// import babel from 'rollup-plugin-babel';
import buble from 'rollup-plugin-buble';              // quicker, simpler babel
import resolve from 'rollup-plugin-node-resolve';     // let's us fetch ES6 bundles from node_modules
// import multiEntry from 'rollup-plugin-multi-entry';   // process multiple entry files (rollup, by default, cannot do this)
import uglify from 'rollup-plugin-uglify';            //

export default {
  // entry: 'source/js/*.js',
  // dest: 'dist/js/showcase.min.js',

  entry: `source/js/${process.env.entry}.js`,
  dest: `dist/js/${process.env.entry}.js`,

  moduleName: 'stuffs',
  format: 'iife',
  plugins: [
    // multiEntry(),
    resolve({                                         // this allows us to pull in other modules as ES6 bundles
      jsnext: true,                                   // Look for ES6 first
      main: true,                                     // ... also look for commonJS if no ES6
      browser: false                                  // ... some package.json files have a "browser" field which specifies alternative files to load for people bundling for the browser
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
