import { StickyNav } from '@hugeinc/stickynav';
// import { StickyNav } from '../../node_modules/@hugeinc/stickynav';
import polyfill from './lib/polyfills.js';
import * as Prism from './lib/prism.js';

polyfill();

window.addEventListener('DOMContentLoaded', function() {
  new StickyNav({ nav: '#sticky' });
});
