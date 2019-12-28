'use strict';

import { name, version } from 'root/package.json';
import * as view from 'component/view';
import * as menu from 'component/menu';
import * as event from 'component/event';
import * as preload from 'component/preload';
import * as scroll from 'component/scroll';
import { dot } from 'component/dot';

// web developer console signature
console.log(build.environment === 'production' ? '%cMade with ❤︎️ by Studio MOTIO — Interactive design and creative web studio from La Rochelle — studiomotio.com' : `%c${name} — ${build.environment} build ${version}`, 'background:#000;color:#fff;padding:0.5em 1em;line-height:2;');

// init the barba views
view.init();

// init the mobile menu
menu.init();

// bind some elements
event.bindLogos();
event.bindFooter();
event.bindTabKey();
event.bindLinks();

// init the dot cursor
dot.init();

// init the smooth scroll
scroll.init();

// init the site preload animation
preload.init();
