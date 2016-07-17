import { stickyElement, stickyNav } from '../../components/stickynav/dist/stickynav.es6';
import Prism from './prism.js';

window.addEventListener('DOMContentLoaded', function() {
	stickyNav.init({ nav: '#sticky' });
});
