import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

export default {
  entry: 'source/js/main.js',
  dest: 'dist/js/main.min.js',
  // format: 'iife',
  plugins: [
    babel({
      exclude: 'node_modules/**',
      presets: 'es2015-rollup'
    }),
    // uglify()
  ]
};