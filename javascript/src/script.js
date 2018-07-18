'use strict';

import * as view from './view.js';
import * as menu from './menu.js';
import * as event from './event.js';
import * as preload from './preload.js';
import * as scroll from './scroll.js';
import {dot} from './dot.js';

(function() {

	// web developer console signature
	console.log('%cMade with ❤︎️ by Studio MOTIO — Interactive design and creative web studio from La Rochelle — studiomotio.com', 'background:#000;color:#fff;padding:0.5em 1em;line-height:2;');

	// inits the barba views
	view.init();

	// inits the mobile menu
	menu.init();

	// binds some elements
	event.bindLogos();
	event.bindFooter();
	event.bindTabKey();
	event.bindLinks();

	// inits the dot cursor
	dot.init();

	// inits the smooth scroll
	scroll.init();

	// inits the site preload animation
	preload.init();
})();