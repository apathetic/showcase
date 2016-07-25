import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

// import uglify from 'rollup-plugin-uglify';

export default {
  entry: 'source/js/home.js',
  // format: 'cjs',
  format: 'iife',
  dest: 'dist/bundle2.js',
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
    })
    // uglify()
  ],
  moduleName: 'teststs'
  // targets: [
  //   {
  //     entry: 'source/js/home.js',
  //     dest: 'dist/js/home.js',
  //     format: 'cjs',
  //     moduleName: 'testest',
  //   },
  //   {
  //     entry: 'source/js/component.js',
  //     dest: 'dist/js/component.js',
  //     format: 'es6'
  //   }
  // ]
};