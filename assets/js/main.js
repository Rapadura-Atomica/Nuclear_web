/*
	Hyperspace by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$sidebar = $('#sidebar');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Hack: Enable IE flexbox workarounds.
		if (browser.name == 'ie')
			$body.addClass('is-ie');

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Forms.

		// Hack: Activate non-input submits.
			$('form').on('click', '.submit', function(event) {

				// Stop propagation, default.
					event.stopPropagation();
					event.preventDefault();

				// Submit form.
					$(this).parents('form').submit();

			});

	// Sidebar.
		if ($sidebar.length > 0) {

			var $sidebar_a = $sidebar.find('a');

			$sidebar_a
				.addClass('scrolly')
				.on('click', function() {

					var $this = $(this);

					// External link? Bail.
						if ($this.attr('href').charAt(0) != '#')
							return;

					// Deactivate all links.
						$sidebar_a.removeClass('active');

					// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
						$this
							.addClass('active')
							.addClass('active-locked');

				})
				.each(function() {

					var	$this = $(this),
						id = $this.attr('href'),
						$section = $(id);

					// No section for this link? Bail.
						if ($section.length < 1)
							return;

					// Scrollex.
						$section.scrollex({
							mode: 'middle',
							top: '-20vh',
							bottom: '-20vh',
							initialize: function() {

								// Deactivate section.
									$section.addClass('inactive');

							},
							enter: function() {

								// Activate section.
									$section.removeClass('inactive');

								// No locked links? Deactivate all links and activate this section's one.
									if ($sidebar_a.filter('.active-locked').length == 0) {

										$sidebar_a.removeClass('active');
										$this.addClass('active');

									}

								// Otherwise, if this section's link is the one that's locked, unlock it.
									else if ($this.hasClass('active-locked'))
										$this.removeClass('active-locked');

							}
						});

				});

		}

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000,
			offset: function() {

				// If <=large, >small, and sidebar is present, use its height as the offset.
					if (breakpoints.active('<=large')
					&&	!breakpoints.active('<=small')
					&&	$sidebar.length > 0)
						return $sidebar.height();

				return 0;

			}
		});

	// Spotlights.
		$('.spotlights > section')
			.scrollex({
				mode: 'middle',
				top: '-10vh',
				bottom: '-10vh',
				initialize: function() {

					// Deactivate section.
						$(this).addClass('inactive');

				},
				enter: function() {

					// Activate section.
						$(this).removeClass('inactive');

				}
			})
			.each(function() {

				var	$this = $(this),
					$image = $this.find('.image'),
					$img = $image.find('img'),
					x;

				// Assign image.
					$image.css('background-image', 'url(' + $img.attr('src') + ')');

				// Set background position.
					if (x = $img.data('position'))
						$image.css('background-position', x);

				// Hide <img>.
					$img.hide();

			});

	// Features.
		$('.features')
			.scrollex({
				mode: 'middle',
				top: '-20vh',
				bottom: '-20vh',
				initialize: function() {

					// Deactivate section.
						$(this).addClass('inactive');

				},
				enter: function() {

					// Activate section.
						$(this).removeClass('inactive');

				}
			});

})(jQuery);

// Bandeirinhas de São João — preenche o varal de forma responsiva.
// Decorativo: gera <i> (triângulos) suficientes para cobrir a largura.
(function () {

	var LARGURA_BANDEIRINHA = 24; // 20px + 2px margin cada lado
	var BANDEIRAS_POR_ARCO = 8;   // bandeirinhas em cada arco do festão
	var AMPLITUDE = 28;           // px de caimento no centro de cada arco

	function popularBandeirinhas() {

		var varal = document.querySelector('.bandeirinhas');
		if (!varal) return;

		var quantidade = Math.ceil(window.innerWidth / LARGURA_BANDEIRINHA) + 1;

		// arredonda para fechar o último arco do festão
		quantidade = Math.ceil(quantidade / BANDEIRAS_POR_ARCO) * BANDEIRAS_POR_ARCO;

		var frag = document.createDocumentFragment();
		var pontosCorda = [];

		for (var i = 0; i < quantidade; i++) {
			var bandeira = document.createElement('i');
			// posição 0..1 dentro do arco; o seno gera o caimento (sobe-desce)
			var t = (i % BANDEIRAS_POR_ARCO) / (BANDEIRAS_POR_ARCO - 1);
			var mt = parseFloat((Math.sin(t * Math.PI) * AMPLITUDE).toFixed(1));
			bandeira.style.marginTop = mt + 'px';
			frag.appendChild(bandeira);

			// topo-centro da bandeirinha = ponto de fixação no cordão
			var cx = (i * LARGURA_BANDEIRINHA + LARGURA_BANDEIRINHA / 2).toFixed(1);
			pontosCorda.push(cx + ',' + mt.toFixed(1));
		}

		varal.innerHTML = '';
		varal.appendChild(frag);

		// cordão SVG acompanhando o festão
		var svgNS = 'http://www.w3.org/2000/svg';
		var svg = document.createElementNS(svgNS, 'svg');
		svg.setAttribute('aria-hidden', 'true');
		svg.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;overflow:visible;pointer-events:none;';

		var linha = document.createElementNS(svgNS, 'polyline');
		linha.setAttribute('points', pontosCorda.join(' '));
		linha.setAttribute('fill', 'none');
		linha.setAttribute('stroke', 'rgba(40,20,10,0.82)');
		linha.setAttribute('stroke-width', '2');
		linha.setAttribute('stroke-linecap', 'round');
		linha.setAttribute('stroke-linejoin', 'round');

		svg.appendChild(linha);
		varal.appendChild(svg);

	}

	var redimensionando;
	function aoRedimensionar() {
		clearTimeout(redimensionando);
		redimensionando = setTimeout(popularBandeirinhas, 150);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', popularBandeirinhas);
	} else {
		popularBandeirinhas();
	}

	window.addEventListener('resize', aoRedimensionar);

})();