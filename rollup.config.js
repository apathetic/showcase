import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';

export default {
  entry: 'source/js/home.js',
  // format: 'cjs',
  format: 'iife',
  dest: 'dist/js/home.js',
  plugins: [
    babel({
      exclude: [
        'node_modules/**',
        'source/js/lib/**'
      ],
      presets: ['es2015-rollup']
    }),
    resolve({
      jsnext: true,
      main: true,


      // Some package.json files have a `browser` field which specifies alternative files to load for people bundling
      // for the browser. If that's you, use this option, otherwise pkg.browser will be ignored.
      browser: false  // true
    }),
    uglify()
  ]
};