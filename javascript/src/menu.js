'use strict';

import mojs from 'mo-js';
import {colors, curves} from './global.js';

export function init() {

	// mojs options and objects for the "show/hide the close menu button" tween
	const menuOptions = {
		parent: document.querySelector('.menu-button-close'),
		fill: 'transparent',
		stroke: colors.contrast,
		strokeWidth: { 4 : 0 },
		duration: 700
	};

	let menuCircle = new mojs.Shape(
		mojs.helpers.extend({
			shape: 'circle',
			radius: { 0 : 30 },
			opacity: { 1 : 0, curve: curves.linear }
		}, menuOptions)
	);

	let menuCross;
	let stageMenu = mojs.stagger(mojs.Shape);
	let menuBubbles = new stageMenu(
		mojs.helpers.extend({
			shape: 'circle',
			radius: [{ 0 : 10 }, { 0 : 6 }, { 0 : 4 }],
			quantifier: 3,
			x: 'rand(-30, 30)',
			y: 'rand(-40, 40)',
			opacity: { 1 : 0, curve: curves.linear },
			stroke: colors.vibrant,
			delay: 'stagger(400, 150)'
		}, menuOptions)
	);

	let menuSteam = new mojs.Burst({
		degree: 20,
		radius: { 0 : 100 },
		parent: menuOptions.parent,
		children: mojs.helpers.extend({
			shape: 'circle',
			swirlSize: 10,
			swirlFrequency: 'rand(5, 7)',
			pathScale: 'rand(0.3, 1)',
			degreeShift: 10,
			isSwirl: true,
			fill: [colors.contrast, colors.vibrant],
			radius: { 5 : 0 },
			stroke: 'transparent',
			delay: 100,
			duration: 600,
			easing: mojs.easing.cubic.in
		}, menuOptions)
	});

	// binds all open menu buttons to displays the tween when the menu is opened (from white or black section)
	document.querySelector('.menu-button').addEventListener('click', function() {
		menuCross = new mojs.Shape(
			mojs.helpers.extend({
				playstate: false,
				shape: 'cross',
				angle: 45,
				radius: { 0 : 20 },
				strokeWidth: 4,
				easing: mojs.easing.circ.out,
				duration: 800,
				delay: 200,
				onStart: function(isForward) {
					if (isForward) {
						menuCross._props.playstate = true;
					}
				},
				onComplete: function(isForward) {
					if (isForward) {
						menuCross._props.playstate = false;
					}
				}
			}, menuOptions)
		);

		setTimeout(function() {
			menuCircle.play();
			menuCross.play();
			menuBubbles.generate().play();
		}, 1200);
	});

	// binds the close menu button to displays the tween when the menu is closed
	menuOptions.parent.addEventListener('click', function() {
		if (menuCross._props.playstate) {
			menuCross._props.playstate = false;
			menuCross.playBackward();
		} else {
			menuCross.then({
				radius: 0,
				duration: 500,
				delay: 0,
				onComplete: function() {
					this.el.parentNode.removeChild(this.el);
				}
			}).play();
		}

		menuCircle.play();
		menuSteam.generate().play();
	});
}