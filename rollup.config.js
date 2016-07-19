import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

export default {
  entry: 'source/js/home.js',
  dest: 'dist/js/home.min.js',
  // format: 'iife',
  plugins: [
    babel({
      exclude: 'node_modules/**',
      presets: 'es2015-rollup'
    }),
    // uglify()
  ]
};