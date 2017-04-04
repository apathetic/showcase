// import stickynav from 'stickynav';
import { StickyNav } from '../../node_modules/@hugeinc/stickynav';
import * as Prism from './lib/prism.js';

window.addEventListener('DOMContentLoaded', function() {
  new StickyNav({ nav: '#sticky' });
});
