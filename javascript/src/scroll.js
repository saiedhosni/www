'use strict';

import Smooth from 'smooth-scrolling';
import {device, body} from './global.js';
import {dot} from './dot.js';

let scrolling;

export function init() {

  // builds the smooth scrolling for non-touch devices or touch devices with no screen rotation (usually touch laptop and desktop)
  if (!device.touch || (device.touch && !device.rotate)) {
    scrolling = new Smooth({
      section: document.querySelector('.smooth-scroll'),
      native: true,
      noscrollbar: true,
      preload: false,
      ease: 0.1
    });

    dot.loop();
  } else {
    body.classList.add('no-smooth');
    body.classList.add('no-dot');
  }

  // prevents the browser from restoring the previous scroll position when using backward/forward arrows
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
}

export function build() {
  if (typeof scrolling !== 'undefined') {
    scrolling.init();
  }
}

export function rebuild() {
  if (typeof scrolling !== 'undefined') {
    scrolling.destroy();
    scrolling.options.section = document.querySelector('.smooth-scroll');
    scrolling = new Smooth(scrolling.options);
    scrolling.init();
  }
}
