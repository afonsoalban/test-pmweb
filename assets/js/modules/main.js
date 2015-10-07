define(['jquery', 'TweenMax'], function(jQuery, TweenMax){
	_APP.main = _MAIN = {
		verificaMobile : function () {
			var mobiles = ["midp", "240x320", "blackberry", "netfront", "nokia", "panasonic", "portalmmm", "sharp", "sie-", "sonyericsson", "symbian", "windows ce", "benq", "mda", "mot-", "opera mini", "philips", "pocket pc", "sagem", "samsung", "sda", "sgh-", "vodafone", "xda", "palm", "iphone", "ipod", "android", "lumia", "ipad"];

			var uagent = navigator.userAgent.toLowerCase();
			//console.log(uagent);
			var ismobile = false;
			for (var d = 0; d < mobiles.length; d += 1) {
				if (uagent.indexOf(mobiles[d]) != -1) {
					ismobile = true;
				}
			}
			return ismobile;
		},
		scrollto: function (target) {
			$('html,body').animate({
				scrollTop: ($(target).offset().top - $('#header').height())
			}, 1000);
		},
	};

	// métodos privados
	function init () {
		main();
		triggers();

		if( _MAIN.verificaMobile() ){
			triggersMobile();
		} else {
			triggersDesktop();
		}
	}

	function main () {
		entrada();

		if( !_MAIN.verificaMobile() ){
			sm();
		}
	}

	function triggers () {
		$(document).on('click', '.logo-rodape', rolaTopo);
	}

	function triggersMobile () {

	}

	function triggersDesktop () {

	}

	function entrada () {
		TweenLite.fromTo('.logo-combinado .texto', 2, {
			opacity: 0,
			rotation: -90
		}, {
			opacity: 1,
			rotation: 0
		});

		TweenLite.fromTo('.logo-combinado .maca', 1, {
			opacity: 0,
			scaleX: .5,
			scaleY: .5
		}, {
			opacity: 1,
			scaleX: 1,
			scaleY: 1,
			delay: .7,
			ease: Back.easeOut
		});

		TweenLite.fromTo('#booking h1', 1.6, {
			opacity: 0,
			scale: 1.5
		}, {
			opacity: 1,
			scale: 1,
			delay: .7,
			ease: Back.easeOut
		});
		TweenLite.fromTo('#reserva-container', 2, {
			y: '300px'
		}, {
			y: '0px',
			delay: 1
		});
	}

	function sm () {
		require(['ScrollMagic', 'animation.gsap'], function (ScrollMagic) {

			_MAIN.controller = new ScrollMagic.Controller({
				loglevel: 2
			});

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
	}

	function rolaTopo () {
		_MAIN.scrollto( $('body') );
	}
		
	init();
	return this;
});