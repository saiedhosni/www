'use strict';

import mojs from 'mo-js';
import {body, device, colors} from './global.js';
import {motio} from './motio.js';

// dot custom cursor properties
export let dot = body.querySelector('.dot');
let mouseX = dot.offsetLeft;
let mouseY = dot.offsetTop;
let tempX = mouseX;
let tempY = mouseY;
let deltaX = 0;
let deltaY = 0;
let ready = false;
let radius = dot.clientWidth / 2;

dot.init = function() {

  // binds the mousemove event to make the dot follow the mouse cursor
  document.addEventListener('mousemove', function(e) {

    // inits the dot on first move
    if (!ready) {
      dot.classList.add('init');
      ready = true;
    }

    // stores the mouse position
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // binds the mousedown event to decrease the dot size on mousedown
  document.addEventListener('mousedown', function() {
    dot.classList.add('down');
  });

  // binds the mouseup event to restore the dot size on mouseup
  document.addEventListener('mouseup', function() {
    dot.classList.remove('down');

    // creates a dot pulse effect on mouseup
    new mojs.Shape({
      className: 'dot-pulse',
      shape: 'circle',
      left: 0,
      top: 0,
      x: mouseX,
      y: mouseY,
      radius: { 6 : 40 },
      fill: device.blend ? colors.contrast : (dot.classList.contains('blend') ? colors.base : colors.contrast),
      opacity: { 0.35 : 0 },
      duration: 500,
      onStart: function() {
        this.el.style.position = 'fixed';
      },
      onComplete: function() {
        this.el.parentNode.removeChild(this.el);
      }
    }).play();
  });
};

// animation frame to follow the mouse cursor on every mouvement
dot.loop = function() {

  // calcultates the new position to follow
  deltaX = mouseX - tempX;
  deltaY = mouseY - tempY;
  tempX += (deltaX - radius) * 0.27;
  tempY += (deltaY - radius) * 0.27;

  // sets the dot position
  dot.style.left = `${Math.round(tempX)}px`;
  dot.style.top = `${Math.round(tempY)}px`;

  // makes this function run at 60fps
  requestAnimationFrame(dot.loop);
};

// method to sets the global dot position and appearance
dot.tune = function(color = body.getAttribute('data-color'), event = null) {

  // gets the bounding coordinates of the dot cursor as reference for the dot transition
  let coordinates = dot.getBoundingClientRect();
  let dotX = coordinates.left + coordinates.width * 0.5;
  let dotY = coordinates.top + coordinates.height * 0.5;

  // stores the latest dot color
  motio.dotPreviousColor = typeof motio.dotPreviousColor === 'undefined' ? color : motio.dotColor;

  // evaluates the color and position of the transition dot
  motio.dotColor = color;
  motio.dotEventX = event !== null && event.pageX !== 0 ? event.pageX : dotX + pageXOffset;
  motio.dotEventY = event !== null && event.pageY !== 0 ? event.pageY : dotY + pageYOffset;

  // evaluates the radius of the transition dot
  if (event !== null) {
    dotX = event.clientX;
    dotY = event.clientY;
  }

  let deltaX = dotX <= window.innerWidth * 0.5 ? window.innerWidth - dotX : dotX;
  let deltaY = dotY <= window.innerHeight * 0.5 ? window.innerHeight - dotY : dotY;
  motio.dotRadius = Math.sqrt(deltaX * deltaX + deltaY * deltaY) + 20;
};
