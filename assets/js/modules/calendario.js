define(['jquery'], function () {
	var calendario = {},
		$cal,
		meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

	_APP.calendario = _CAL = {
		Calendario: function (opcoes){
			_init( opcoes );
			return novoCalendario();
		},
	}

	function _init (opcoes) {
		calendario.hoje = new Date();
		calendario.mes = ( isNaN(opcoes.mes) || opcoes.mes == null) ? calendario.hoje.getMonth() : opcoes.mes - 1;
		calendario.ano = ( isNaN(opcoes.ano) || opcoes.ano == null ) ? calendario.hoje.getFullYear() : opcoes.ano;

		$cal = 	$('<div id="calendario">' +
					'<div class="header">' +
						'<a href="#" class="mes-anterior"></a>' +
						'<span class="mes"></span>' +
						'<a href="#" class="mes-posterior"></a>' +
					'</div>' +
					'<ul class="semana">' +
						'<li>Dom</li>' +
						'<li>Seg</li>' +
						'<li>Ter</li>' +
						'<li>Qua</li>' +
						'<li>Qui</li>' +
						'<li>Sex</li>' +
						'<li>Sab</li>' +
					'</ul>' +
					'<ul class="dias">' +
					'</ul>' +
				'</div>');

		$cal.on('click', '.mes-anterior', function (e) { 
			e.preventDefault();
			voltaMes();
		});
		$cal.on('click', '.mes-posterior', function (e) { 
			e.preventDefault();
			avancaMes();
		});
	}
	
	function novoCalendario () {
		var d = new Date( calendario.ano, calendario.mes + 1, 0),
			tamanhoMes = d.getDate(),
			primeiroDia = new Date( calendario.ano, calendario.mes, 1),
			diaInicial = primeiroDia.getDay(); // domingo = 0

		var totalQuadros = diaInicial + tamanhoMes,
			sobra = 7 - d.getDay(),
			html = '';

		// itera sobre o total de dias
		for ( var i = 0; i < diaInicial; i++ ){
			html += '<li></li>';
		}
		for ( var i = 1; i <= tamanhoMes; i++ ){
			html += '<li>'+ i +'</li>';
		}
		for ( var i = 0; i < sobra-1; i++ ){
			html += '<li></li>';
		}

		$cal.find('.mes').attr('numero', calendario.mes+1).text(meses[calendario.mes] + ' ' + calendario.ano);
		$cal.find('.dias').html( html );

		return $cal;
	}

	function voltaMes () {
		if( calendario.mes == 0){
			calendario.mes = 12;
			calendario.ano--;
		} else {
			calendario.mes--;
		}

		novoCalendario();
	}
	function avancaMes () {
		if( calendario.mes == 11 ){
			calendario.mes = 0;
			calendario.ano++;
		} else {
			calendario.mes++;
		}

		novoCalendario();
	}

	return this;
});
