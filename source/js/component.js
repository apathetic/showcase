import { StickyNav } from '@apatheticwes/stickynav';
// eslint-disable-next-line no-unused-vars
import * as Prism from './lib/prism.js';

window.addEventListener('DOMContentLoaded', function() {
  new StickyNav({ nav: '#sticky' });
});
