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
      presets: 'es2015-rollup'
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    uglify()
  ]
};