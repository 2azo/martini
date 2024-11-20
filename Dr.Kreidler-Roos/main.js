(function($) {
	"use strict";
	
	var rafId = null;
	var delay = 150;
	var lTime = 0;
	
	var scrollTop = $(window).scrollTop();
	var scrollEventBound = false;
	var chevron = '<svg data-name="Ebene 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33.4 12.09"><path d="M27.36 12.09h-1l5.67-5.67h-32v-.75h32L26.36 0h1l6 6z" fill="#231f20"/></svg>';
	
	if ($('#visual .inside').children().length > 1) {
		var prev = $(document.createElement('div'));
		var next = $(document.createElement('div'));
		prev.html(chevron);
		next.html(chevron);
		$('#visual').append(prev).append(next);
		$('#visual .inside').slide({
			effect: 'fade',
			controls: $('.visual_controls'),
			nextButton: next,
			prevButton: prev,
		});
	}
	
	$(window).on('load', function() {
		NProgress.done(false);
		$('.loading_screen').addClass('cls_ready');
		$('.loading_screen').delay(1000).fadeOut(500);
	});
	
	$('#top-link > span').click(function() {
		$('body, html').animate({
			scrollTop: 0
		}, 1000);
	});
	
	$('[data-svg]').each(function() {
		svgImage(this, $(this).attr('data-svg'));
	});
	
	$('.ce_gallery').each(function() {
		if ($(this).find('.inside .container').children().length > 1) {
			var prev = $(document.createElement('span'));
			var next = $(document.createElement('span'));
			
			//prev.html('<');
			//next.html('>');
			
			svgImage(prev, 'files/images/chevron.svg');
			svgImage(next, 'files/images/chevron.svg');
			
			$(this).find('.inside .container').slide({
				touch: true,
				autoplay: false,
				pause: 5000,
				centerElements: false,
				prevButton: prev,
				nextButton: next,
				containerHeight: function(elements) {
					var h = 0;
					
					elements.each(function() {
						if ($(this).innerHeight() > h) {
							h = $(this).innerHeight();
						}	
					});
					
					return h;
				}
			});
			
			var controls = $(document.createElement('div'));
			controls.addClass('controls');
			controls.append(prev).append(next);
			$(this).find('.inside .container').append(controls);
		}
	});
	
	var container = $(document.createElement('div'));
	$('.jumpnav').each(function() {		
		var a = $(document.createElement('a'));
		a.attr('href', window.location.href.split('#')[0] + '#' + $(this).attr('id'));
		a.data('hash', $(this).attr('id'));
		a.html($(this).find('h3').html());
		a.click(function(evt) {
			var id = $(this).data('hash');
			
			evt.preventDefault();
			
			$('html, body').animate({
				scrollTop: $('#' + id).offset().top
			}, 600);
			
			window.location.hash = id;
		});		
		container.append(a);
	});
	if (container.children().length > 0) {
		container.attr('id', 'jumpnav');
		$('#visual_container').append(container);
	}
	
	if ($('#gmaps').length > 0) {
		var overlay = $(document.createElement('div'));
		overlay.addClass('overlay');
		
		var overlay_button = $(document.createElement('span'));
		overlay_button.addClass('button');
		overlay_button.html('Karte aktivieren');
		overlay_button.click(function() {
			if (overlay.is(':visible')) {
				overlay.fadeOut('fast');
				overlay_button.html('Karte deaktivieren');
			}
			else {
				overlay.fadeIn('fast');
				overlay_button.html('Karte aktivieren');
			}
		});
		
		$('#gmaps').append(overlay).append(overlay_button);	
	}
	
	$('#main table').each(function() {
		$(this).wrap('<div class="table_container"><div class="inside"></div></div>');
	});
	
	var menuButton = document.createElement('span');
	menuButton.id = 'menu-button';	
	svgImage(menuButton, 'files/images/menu.svg');
	$(menuButton).click(function() {
		$('body').addClass('menu-open');
	});
	
	var closeButton = document.createElement('span');
	closeButton.id = 'menu-close-button';
	closeButton.innerHTML = '×';
	$(closeButton).click(function() {
		$('body').removeClass('menu-open');
	});
	
	$('#main_navigation').append(menuButton);
	$('#main_navigation').append(closeButton);
	
	onResize();	
	$(window).resize(onResize);
	$(window).on('load', function() {
		onResize();
		onScroll();
	});
	
	function onResize() {
		var ww = $(window).innerWidth();
		
		$('#main .table_container > .inside').each(function() {
			if ($(this).get(0).scrollWidth > $(this).get(0).clientWidth) {
				$(this).parent().addClass('scrollable');
			}
			else {
				$(this).parent().removeClass('scrollable');
			}
		});
		
		if (ww >= 960) {
			if ($('#jumpnav').length) {
				$('#jumpnav').css({
					left: $('#main_navigation').offset().left,
					width: $('#main_navigation').outerWidth()
				});
			}
		}
		// else {
			// $('#visual > .inside').css('transform', 'none');
			// $('#visual_container .headline').css('transform', 'none');
		// }
	}
	
	function scroll() {
		var scrollTop = $(window).scrollTop();
		var height = $(window).height()
		var visibleTop = scrollTop + height;
		$('.reveal').each(function() {
			var $t = $(this);
			if ($t.hasClass('reveal_visible')) {
				return;
			}
			var top = $t.offset().top;
			if (top <= visibleTop) {
				if (top + $t.height()/2 < scrollTop) {
					$t.removeClass('reveal_pending').addClass('reveal_visible');
				}
				else {
					$t.addClass('reveal_pending');
					if (!rafId) requestAnimationFrame(reveal);
				}
			}
		});
	}
	
	function reveal() {
		rafId = null;
		var now = performance.now();

		if (now - lTime > delay) {
			lTime = now;
			var $ts = $('.reveal_pending');
			$($ts.get(0)).removeClass('reveal_pending').addClass('reveal_visible');
		}
		if ($('.reveal_pending').length >= 1) {
			rafId = requestAnimationFrame(reveal);
		}
	}
	
	function onScroll() {
		var wh = $(window).innerHeight();
		var ww = $(window).innerWidth();
		var st = $(window).scrollTop();

		window.requestAnimationFrame(onScroll);
		if (st == scrollTop) return;

		if (st >= 300) {
			if (scrollTop <= st) {
				// hide subnav
				$('#jumpnav').addClass('hidden');
			} else {
				// show subnav
				$('#jumpnav').removeClass('hidden');
			}
			$('#header').addClass('thin');
			$('#jumpnav').addClass('thin');
		}
		else {
			$('#header').removeClass('thin');
			$('#jumpnav').removeClass('thin');
			$('#jumpnav').removeClass('hidden');
		}
		
		scrollTop = st;
		
		scroll();
		
		var value = Math.min(25, (st * 25 / wh));
		
		if (ww >= 960) {
			// console.log(ww);
			$('#visual > .inside').css('transform', 'translate(0, ' + value + '%)');
			$('#visual_container .headline').css('transform', 'translate(0, ' + (st * 0.125) + 'px)');
		} else {
			$('#visual > .inside').css('transform', 'none');
			$('#visual_container .headline').css('transform', 'none');
		}
		
	}
	
	function svgImage(element, src, callback) {
		$.ajax({
			url: src,
			dataType: 'text',
			success: function(data) {
				var repl = data.replace(/<\?xml.*?>/, '').replace(/<!DOCTYPE.*?>/, '');								
				$(element).html(repl);
				
				if (callback) {
					callback(element);
				}
			}
		});
	}
	
	$('.hp_close').click(() => {
		$('.hp_cont').fadeOut(250);
		window.sessionStorage.setItem("krh_popup", true);
	});


    // test
    // $('.toggler').click(function() {
    //     // console.log("you clicked .toggler class");
    //     $(this).find('.accordion').slideToggle(300);
    // });

    // test
    // $('.toggler').click(function() {
    //     var targetId = $(this).data('target');
    //     $('#' + targetId).slideToggle(100);
    //     $(this).attr('aria-expanded', function(index, attr) {
    //         return attr === 'false' ? 'true' : 'false';
    //     });
    // });

    // test 2
    // $('.toggler').click(function() {
    //     var targetContent = $(this).next('.content');
    //     $('.content').not(targetContent).slideUp(100);
    //     $('.toggler').not(this).attr('aria-expanded', 'false');
    //     targetContent.slideToggle(100);
    //     $(this).attr('aria-expanded', function(index, attr) {
    //         return attr === 'true' ? 'false' : 'true';
    //     });
    // });

    // test 3
    $('.toggler').click(function() {
        var targetContent = $(this).next('.content');
        $('.content').not(targetContent).slideUp(100);
        $('.toggler').not(this).attr('aria-expanded', 'false');
        targetContent.slideToggle(100);
        $(this).attr('aria-expanded', function(index, attr) {
            return attr === 'true' ? 'false' : 'true';
        });
    
        // Smooth scroll to the clicked toggler
        $('html, body').animate({
            scrollTop: $(this).offset().top - 20  // 20px padding from top
        }, 300);  // 300ms animation duration
    });
    
    
    
    
    
})(jQuery);