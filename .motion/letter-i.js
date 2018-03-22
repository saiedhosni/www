'use strict';

(function(){

	// defines some design constants
	const colors = {
		base: '#000',
		vibrant: '#00ffd3',
		contrast: '#fff',
		bright: '#5f5f5f',
		warning: '#f6cc00'
	};

	// custom curves
	const flatCurve = mojs.easing.path('M0, 0 C0, 0 100, 0 100, 0 ');
	const elasticCurve = mojs.easing.path('M0, 0 C0, 0 4.849404450774318, 19.999999999999982 12.791828475731364, 20 C24.190094519338984, 19.428571428571438 29.27028214126006, -5.143614215712348 35, -5 C40.62000858830659, -4.856385784287652 45.232927349299665, 4.978765515972064 50, 5 C54.767072650700335, 5.02123448402794 54.71135836980356, -0.434601857594152 70, 0 C89.43392377726468, 0.14888757187990745 100, 0 100, 0');
	const reboundCurve = mojs.easing.path('M0, 100 C44.9687098810755, 100.46990312590644 32.608640807316306, -112.71428571428571 50, -112.71428571428571 C53.88142541784926, -113 50.5690732831949, -112.77159800612652 53.187808896210875, -112.71428571428571 C69.63942143079312, -112.6569734224449 62.47664961113968, 10.152839571695123 80, 10 C89.59652112056764, 9.84716042830488 89.16196028466256, -9.97870241527512 91.82926829268293, -10 C94.4965763007033, -10.021297584724882 95.18543962777919, -0.4699031259064711 100, 0');
	const scaleCurve = mojs.easing.path('M0, 0 C0, 0 40, 0 40, 0 C40.43668122270742, 13.428571428571429 41.99545637252657, 19.999999999999993 48.25324744707157, 20 C54.51103852161658, 20.000000000000007 65, -20 65, -20 C65, -20 74.54070841137144, 0.10152544552210262 100, 0');

	// creates the curve editor
	const curve = new MojsCurveEditor({
		name: 'custom',
	});

	// creates the timeline
	const timeline = new mojs.Timeline({
		speed: 1,
		delay: 0
	});

	// global options
	const iOptions = {
		fill: 'transparent',
		stroke: colors.vibrant,
		strokeWidth: 70,
		strokeDasharray: '100%',
		strokeDashoffset: { '100%' : 0 },
		duration: 800,
		easing: mojs.easing.path('M0,100 C50,100 50,67.578125 50,50 C50,32.421875 50,0 100,0')
	};

	// letter shape
	let letter = new mojs.Shape(
		mojs.helpers.extend({
			shape: 'line',
			radius: 120,
			y: 0,
			angle: -90
		}, iOptions)
	).then({
		delay: 300,
		y: { 120 : 0 },
		radius: { 120 : 120, curve: elasticCurve },
		easing: elasticCurve
	});

	// dot shape
	let dot = new mojs.Shape(
		mojs.helpers.extend({
			shape: 'circle',
			stroke: 'transparent',
			fill: colors.vibrant,
			radius: { 20 : 37 },
			y: { 35 : -300 },
			delay: 400,
			duration: 400,
			easing: mojs.easing.circ.out
		}, iOptions)
	).then({
		radius: { 37 : 45, curve: flatCurve },
		scaleY: { 1 : 1, curve: scaleCurve },
		delay: 0,
		duration: 700,
		y: -210,
		easing: reboundCurve
	});

	// adds shapes to the timeline
	timeline.add(
		letter,
		dot
	);

	// creates the player
	new MojsPlayer({
		add: timeline,
		isSaveState: true,
		isPlaying: false,
		isRepeat: false,
		isHidden: false
	});
})();