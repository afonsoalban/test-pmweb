define(['ScrollMagic', 'animation.gsap'], function (ScrollMagic) {
	_MAIN.controller = new ScrollMagic.Controller();
	
	var tweenMenu = new TimelineMax();
	tweenMenu.add([
		TweenMax.to('.logo-combinado .texto', 1, {rotation: 90,opacity: 0 }),
		TweenMax.to('#header .fundo', 1, {opacity: 1}),
		TweenMax.to('#header nav', 1, {lineHeight: "40px"})
	]);

	new ScrollMagic.Scene({
		triggerHook: 0,
		duration: 150
	})
	.setTween(tweenMenu)
	.addTo(_MAIN.controller);

	new ScrollMagic.Scene({
		triggerElement: '#apresentacao'
	})
	.setTween( TweenMax.from('#apresentacao .texto', 1, {
		opacity: 0, 
		y: "+200"
	}) )
	.addTo(_MAIN.controller);

	new ScrollMagic.Scene({
		triggerElement: '#doces',
		triggerHook: .7
	})
	.setTween( TweenMax.staggerFromTo('.lista-doces li', .6, {
		opacity: 0
	}, {
		opacity: 1
	}, .2) )
	//.addIndicators()
	.addTo(_MAIN.controller);

	new ScrollMagic.Scene({
		triggerElement: '#cupcake',
		triggerHook: .5
	})
	.setTween( TweenMax.staggerFromTo('.bloco-feature', .8, {
		opacity: 0,
		scale: .7
	}, {
		opacity: 1,
		scale: 1
	}, .2) )
	.addTo(_MAIN.controller);

	new ScrollMagic.Scene({
		triggerElement: '#cupcake',
		triggerHook: 1,
		duration: $(window).height() + $('#cupcake').height()
	})
	.setTween( TweenMax.fromTo('.cupcake', 1, {y: "50%"}, {y: "0%"}) )
	.addTo(_MAIN.controller);
});