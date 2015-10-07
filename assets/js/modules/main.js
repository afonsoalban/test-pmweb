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
		$(document).on('click','.abre-calendario', function (e) {
			e.stopPropagation();
			alterarReserva();
			abreCalendario(e.currentTarget);
		});

		$(document).on('click', '.mais', function (e) {
			alterarReserva();
			aumentaQuantidade(e.currentTarget);
		});
		$(document).on('click', '.menos', function (e) {
			alterarReserva();
			diminuiQuantidade(e.currentTarget);
		});

		$(document).on('click', '.botao-reservar', function (e) {
			e.preventDefault();
			fazerReserva();
		});
	}

	function fazerReserva () {
		$('#reserva').addClass('erro');
	}
	function alterarReserva () {
		$('#reserva').removeClass('erro');
	}

	function aumentaQuantidade (botao){
		var $campo = $(botao).parent();
		var valor = parseInt( $campo.find('input').val() );

		valor++;

		$campo.find('input').val( valor );
		atualizaCampo($campo, valor);
	}

	function diminuiQuantidade (botao){
		var $campo = $(botao).parent();
		var valor = parseInt( $campo.find('input').val() );

		if( valor == 1 ){
			return;
		}

		valor--;

		$campo.find('input').val( valor );
		atualizaCampo($campo, valor);
	}

	function atualizaCampo (campo, valor){
		var $campo = campo.find('.valor');
		var v;

		if( valor < 10 ) {
			v = '0' + valor;
		} else {
			v = valor;
		}

		TweenMax.to($campo, .1, {opacity:0, scale: .9, onComplete:function(){
			$campo.text(v);
			TweenMax.fromTo($campo, .1, {scale: 1.1}, {scale: 1, opacity: 1});
		}});
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
			y: '300px',
			opacity: 0
		}, {
			y: '0px',
			opacity: 1,
			delay: 1
		});
	}

	function sm () {
		//chama os scripts de animação de um arquivo separado
		require(['modules/smHome']);
	}

	function rolaTopo () {
		_MAIN.scrollto( $('body') );
	}
		
	init();
	return this;
});