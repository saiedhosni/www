'use strict';

import mojs from '@mojs/core';
import Barba from 'barba.js';
import { body, colors, curves } from './global.js';
import { motio } from './motio.js';
import { dot } from './dot.js';
import * as scroll from './scroll.js';

export function init() {

  // get the preload layout
  const preload = body.querySelector('.preload');

  // create the timeline
  let motioTimeline = new mojs.Timeline();

  // define the base options
  const motioOptions = {
    parent: preload,
    interval: 100,
    fill: 'transparent',
    stroke: colors.base,
    strokeWidth: 10,
    strokeDasharray: '100%',
    strokeDashoffset: { '300%' : '200%' },
    y: -19,
    duration: 500,
    easing: curves.easing
  };

  // define options for the out animation
  const motioOut = {
    delay: 3000,
    duration: 250,
    strokeDashoffset: '100%',
    easing: curves.easing
  };

  // define the base shapes
  class MotioMArc1 extends mojs.CustomShape {
    getShape() { return '<path d="M38.56 50.39c0-5.36 5.17-9.7 11.54-9.7 6.3 0 11.43 4.25 11.53 9.54V64.6"/>'; }
    getLength() { return 47.7; }
  }

  class MotioMArc2 extends mojs.CustomShape {
    getShape() { return '<path d="M38.47 42.75c0-5.35 5.16-9.7 11.53-9.7 6.31 0 11.43 4.26 11.53 9.54v24.36"/>'; }
    getLength() { return 57.7; }
  }

  class MotioO extends mojs.CustomShape {
    getShape() { return '<path d="M50 64.21A14.21 14.21 0 1 0 35.8 50"/>'; }
    getLength() { return 66.9; }
  }

  class MotioT extends mojs.CustomShape {
    getShape() { return '<path d="M42.95 27.4v33.33c.03 6.39 2.56 10.73 7.9 11.64 2.18.37 4.07.17 6.2.17"/>';}
    getLength() { return 55; }
  }

  // add all custom shapes to the library
  mojs.addShape('motio-m-arc1', MotioMArc1);
  mojs.addShape('motio-m-arc2', MotioMArc2);
  mojs.addShape('motio-o', MotioO);
  mojs.addShape('motio-t', MotioT);

  // motio "m" tween
  let motioMVertical = new mojs.Shape(
    mojs.helpers.extend({
      shape: 'line',
      strokeWidth: 10.5,
      radius: 19.4,
      x: -95,
      angle: -90
    }, motioOptions)
  ).then(
    mojs.helpers.extend({
      delay: motioOut.delay - motioOptions.interval * 0.5
    }, motioOut)
  );

  let motioMArc1 = new mojs.Shape(
    mojs.helpers.extend({
      shape: 'motio-m-arc1',
      x: -83.3,
      y: -24.2,
      delay: motioOptions.interval
    }, motioOptions)
  ).then(
    mojs.helpers.extend({
      delay: motioOut.delay - motioOptions.interval * 1
    }, motioOut)
  );

  let motioMArc2 = new mojs.Shape(
    mojs.helpers.extend({
      shape: 'motio-m-arc2',
      x: -60.1,
      y: -16.5,
      delay: motioOptions.interval * 2
    }, motioOptions)
  ).then(
    mojs.helpers.extend({
      delay: motioOut.delay - motioOptions.interval * 1.5
    }, motioOut)
  );

  // motio "o" tween
  let motioOFirst = new mojs.Shape(
    mojs.helpers.extend({
      shape: 'motio-o',
      x: -15.5,
      angle: { 90 : 0 },
      delay: motioOptions.interval * 3
    }, motioOptions)
  ).then(
    mojs.helpers.extend({
      angle: -90,
      delay: motioOut.delay - motioOptions.interval * 2
    }, motioOut)
  );

  // motio "t" tween
  let motioTHorizontal = new mojs.Shape(
    mojs.helpers.extend({
      shape: 'line',
      strokeWidth: 9,
      radius: 13,
      x: 21.5,
      y: -33.8,
      delay: motioOptions.interval * 4
    }, motioOptions)
  ).then(
    mojs.helpers.extend({
      delay: motioOut.delay - motioOptions.interval * 2.5
    }, motioOut)
  );

  let motioTVertical = new mojs.Shape(
    mojs.helpers.extend({
      shape: 'motio-t',
      x: 27.5,
      y: -27.4,
      delay: motioOptions.interval * 5
    }, motioOptions)
  ).then(
    mojs.helpers.extend({
      delay: motioOut.delay - motioOptions.interval * 3
    }, motioOut));

  // motio "i" tween
  let motioIVertical = new mojs.Shape(
    mojs.helpers.extend({
      shape: 'line',
      radius: 9.7,
      x: 47.5,
      y: -28.5,
      angle: -90,
      delay: motioOptions.interval * 6
    }, motioOptions)
  ).then({
    delay: 75,
    y: { '-19' : '-28.5' },
    radius: { 9.7 : 9.7, curve: curves.tencil },
    easing: curves.tencil
  }).then(
    mojs.helpers.extend({
      delay: motioOut.delay - motioOptions.interval * 9.5
    }, motioOut)
  );

  let motioIDot = new mojs.Shape(
    mojs.helpers.extend({
      shape: 'circle',
      stroke: 'transparent',
      fill: colors.base,
      radius: { 5 : 6.3 },
      x: 47.4,
      y: { '-45' : -49.5, curve: curves.bounce },
      delay: motioOptions.interval * 7 + 150
    }, motioOptions)
  ).then(
    mojs.helpers.extend({
      radius: 0,
      delay: motioOut.delay - motioOptions.interval * 5.5
    }, motioOut)
  );

  // motio "o" tween
  let motioOLast = new mojs.Shape(
    mojs.helpers.extend({
      shape: 'motio-o',
      x: 80.5,
      angle: { 180 : 90 },
      delay: motioOptions.interval * 8
    }, motioOptions)
  ).then(
    mojs.helpers.extend({
      angle: 450,
      delay: motioOut.delay - motioOptions.interval * 5
    }, motioOut)
  );

  // add shapes to the timeline
  motioTimeline.add(
    motioMVertical,
    motioMArc1,
    motioMArc2,
    motioOFirst,
    motioTHorizontal,
    motioTVertical,
    motioIVertical,
    motioIDot,
    motioOLast
  );

  // create the "studio" timeline
  let studioTimeline = new mojs.Timeline({
    delay: motioOLast._o.delay + 300
  });

  // define the base options
  const studioOptions = {
    parent: preload,
    interval: 70,
    fill: 'transparent',
    stroke: { 'transparent' : colors.base },
    strokeWidth: 0.71,
    strokeDasharray: '100%',
    strokeDashoffset: { '100%' : '200%' },
    y: -56,
    duration: 500,
    easing: mojs.easing.ease.in
  };

  // define options for the out animation
  const studioOut = {
    opacity: 0,
    duration: 500,
    delay: 1700
  };

  // define the base shapes
  class StudioS extends mojs.CustomShape {
    getShape() { return '<path d="M54.034 48.451c-.076-.852-.473-1.473-1.043-1.89-.633-.459-1.188-.563-2.086-.57-.279-.004-1.143-.021-1.807.368-.492.288-.83.608-1.033 1.105-.207.494-.242.729-.203 1.213.041.482.135.76.338 1.018.205.256.434.438.955.635.514.189 1.398.377 1.988.506a11.68 11.68 0 0 1 1.666.492c.355.137.803.346 1.021.578.248.266.336.441.408.635.055.146.152.523.121 1.029-.021.363-.078.701-.258 1.025-.143.256-.35.57-.742.813-.373.23-.91.514-1.754.572-1.096.078-1.426-.037-1.965-.195a2.968 2.968 0 0 1-1.51-1.07c-.215-.305-.443-.654-.5-1.23"/>'; }
    getLength() { return 27.4; }
  }

  class StudioT extends mojs.CustomShape {
    getShape() { return '<path d="M53.1758 55.6758c-.3281 0-1.4688.1826-2.0215-.004-.8457-.2665-1.0527-.7187-1.2783-1.1591-.2608-.6387-.2217-1.2246-.2295-2.0547V42.0332"/><path d="M47.3389 46.0557h5.7959"/>'; }
    getLength() { return 22.1; }
  }

  class StudioU extends mojs.CustomShape {
    getShape() { return '<path d="M54.579 45.869v6.64c-.094.723-.173 1.064-.554 1.727-.653 1.139-1.829 1.758-3.032 1.777-1.166.02-1.969-.34-2.585-1.006-.609-.658-.993-1.541-1.001-2.5v-6.638m7.172 0v10.304"/>'; }
    getLength() { return 34.71; }
  }

  class StudioD extends mojs.CustomShape {
    getShape() { return '<ellipse cx="51.002" cy="50.99" rx="4.564" ry="5.022"/><path d="M55.566 40.214v15.911"/>'; }
    getLength() { return 46.06; }
  }

  class StudioI extends mojs.CustomShape {
    getShape() { return '<circle cx="51" cy="41.907" r="0.7" stroke="none"/><path d="M50.965 45.97v10.305"/>'; }
    getLength() { return 10.53; }
  }

  class StudioO extends mojs.CustomShape {
    getShape() { return '<ellipse cx="50.999" cy="50.98" rx="4.777" ry="5.025"/>'; }
    getLength() { return 30.8; }
  }

  // add all custom shapes to the library
  mojs.addShape('studio-s', StudioS);
  mojs.addShape('studio-t', StudioT);
  mojs.addShape('studio-u', StudioU);
  mojs.addShape('studio-d', StudioD);
  mojs.addShape('studio-i', StudioI);
  mojs.addShape('studio-o', StudioO);

  // studio "s" tween
  let studioS = new mojs.Shape(
    mojs.helpers.extend({
      shape: 'studio-s',
      x: -97,
    }, studioOptions)
  ).then(studioOut);

  // studio "t" tween
  let studioT = new mojs.Shape(
    mojs.helpers.extend({
      shape: 'studio-t',
      x: -88,
      strokeDashoffset: { '100%' : 0 },
      delay: studioOptions.interval
    }, studioOptions)
  ).then(studioOut);

  // studio "u" tween
  let studioU = new mojs.Shape(
    mojs.helpers.extend({
      shape: 'studio-u',
      x: -79,
      delay: studioOptions.interval * 2
    }, studioOptions)
  ).then(studioOut);

  // studio "d" tween
  let studioD = new mojs.Shape(
    mojs.helpers.extend({
      shape: 'studio-d',
      x: -67,
      delay: studioOptions.interval * 3
    }, studioOptions)
  ).then(studioOut);

  // studio "i" tween
  let studioI = new mojs.Shape(
    mojs.helpers.extend({
      shape: 'studio-i',
      fill: { 'transparent' : colors.base },
      x: -58,
      delay: studioOptions.interval * 4
    }, studioOptions)
  ).then(studioOut);

  // studio "o" tween
  let studioO = new mojs.Shape(
    mojs.helpers.extend({
      shape: 'studio-o',
      x: -49,
      strokeDashoffset: { '100%' : 0 },
      delay: studioOptions.interval * 5
    }, studioOptions)
  ).then(studioOut);

  // stagger effect on the "studio" word
  let diagonalLinesStagger = mojs.stagger(mojs.Shape);
  let diagonalLines = new diagonalLinesStagger({
    parent: preload,
    quantifier: 8,
    shape: 'line',
    stroke: [colors.bright, colors.vibrant],
    strokeWidth: { 'rand(1, 4)' : 0 },
    strokeDasharray: '100%',
    strokeDashoffset: { '100%' : '300%' },
    opacity: { 1 : 0, curve: curves.linear },
    x: 'rand(-110, -20)',
    y: 'rand(-70, -50)',
    radius: 'rand(25, 35)',
    angle: '-45',
    duration: 'rand(250, 700)',
    delay: 'stagger(100, rand(50, 100))'
  });

  // add shapes to the timeline
  studioTimeline.add(
    studioS,
    studioT,
    studioU,
    studioD,
    studioI,
    studioO,
    diagonalLines
  );

  // create the timeline
  let preloadTimeline = new mojs.Timeline({
    playstate: false,
    onStart: function() {
      this._o.playstate = true;
    },
    onComplete: function() {

      // depending on the targetted background color, build a dot transition or simply display the site
      if (body.getAttribute('data-color') === 'base') {

        // tune the dot for the next transition
        dot.tune();

        // create the dot transition
        new mojs.Shape({
          className: 'dot-transition',
          parent: preload,
          shape: 'circle',
          left: 0,
          top: 0,
          x: motio.dotEventX,
          y: motio.dotEventY,
          radius: { 0 : motio.dotRadius },
          fill: colors[motio.dotColor],
          duration: 1700,
          easing: mojs.easing.expo.inout,
          isForce3d: true,
          onComplete: function() {
            preloadComplete();
          }
        }).play();
      } else {
        preloadComplete();
      }

      // method fired when the site preload is complete
      function preloadComplete() {

        // display the header and the media icons
        body.querySelector('header').classList.add('display');
        body.querySelector('.media').classList.add('display');

        // remove the preload layout
        body.removeChild(preload);

        // delay page load
        setTimeout(function() {

          // build the smooth scroll
          scroll.build();

          // start barba js
          Barba.Pjax.start();

          // restore the body scrollbars
          body.classList.remove('no-scroll');
        }, 900);
      }
    }
  });

  // merge timeline
  preloadTimeline.add([
    motioTimeline,
    studioTimeline
  ]);

  // bind the load event to completely wait for the site to load
  window.addEventListener('load', function() {

    // disable the body scrollbars
    body.classList.add('no-scroll');

    // play the preload tween
    preloadTimeline.play();
  });

  // bind the visibilitychange event to replay the timeline if the user have leaving tab focus before the site has completely loading
  document.addEventListener('visibilitychange', function() {

    // exit if the preload has already complete
    if (motio.preloaded) {
      return;
    }

    // replay the preload timeline if the tab get focus back and the preload timeline is not already playing
    if (document.visibilityState === 'visible' && preloadTimeline._o.playstate === false) {
      preloadTimeline.replay();
    }
  });
}
