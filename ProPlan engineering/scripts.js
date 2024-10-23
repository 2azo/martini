(function($) {
	"use strict";
	
	var rafId = null;
	var delay = 150;
	var lTime = 0;
	var scrollTop = -1;
	
	var page = $('html, body');
	var header = $('.header');
	var menu_button = $('.menu_button');
	var menu = $('.main_menu');
	var sub_menu = $('.sub_menu');
	
	var sub_nav = $(".sub_menu");
	var sub_nav_height = sub_nav.outerHeight();
	var sub_nav_cont = $(".sub_menu_cont");
	var topMenuHeight = header.outerHeight();
	var menuItems = $('.sub_menu').find("a");
	var scrollItems = menuItems.map(function(){
		var href = $(this).attr("href");
		var anchor = href.substring(href.indexOf('#')+1);
		var item = $('[data-anchor="'+anchor+'"]');
		if (item.length) { return item; }
	});
	var pathname = window.location.pathname;
	var pixels_pos = $('.pixels_block');
	var pixels_cont = $('.pixels');	
	var pixels = [];	
	var rand_check = 0;
	var caret = $('.caret');
	
	$(".fw_scroller img").click(function() {
		let parent = $(this).parentsUntil(".fw_picture").parent();
		page.animate({
			scrollTop: parent.offset().top + parent.innerHeight() - 65
		}, 1000);
	});
	
	function randomNumber(num) {
		return Math.floor(Math.random() * num) + 1;
	}
	
	function animatePixels() {
		setInterval(function() {
			var pixelCount = pixels.length - 1;
			var rand = randomNumber(pixelCount);
			if(rand == rand_check) {
				rand = randomNumber(pixelCount);
			}
			var el = pixels[rand][0];
			if($(el).is(":animated")) {
				return;
			}
			$(el).animate({ opacity: 1 }, 6000, function() {
				$(this).animate({ opacity: 0}, 6000);
			});
			rand_check = rand;
		},175);
	}
	
	function generatePixels(num) {
		for(var i = 0; i<num; i++) {
			var span = $('<span/>');
			pixels.push(span);
			pixels_cont.append(span);
		}
		animatePixels();
	}
	
	$(window).on("load", function() {	
		generatePixels(40);
		if (window.location.hash) {
			var v = 0;
			scrollTo(window.location.hash.substring(1),v);
		}
		
		NProgress.done(false);
		$('.loading_screen').addClass('cls_ready');
		$('.loading_screen').delay(1000).fadeOut(500);
		
		$('.option.active').each(function() {
			// setOptionHeight($(this));
			$(this).closest('.selector_cont').find('.col_cont.active').slideDown(400);
		});
		
		if ($(this).data("mwa:slide")) {
			$(this).data("mwa:slide").refresh();
		}
		
		$('.selector_option[data-id="1"]').each(function() {
			$(this).trigger("click");
		});
	});
	
	$(window).on("resize", function() {
		$('.slider_block').each(function() {
			if ($(this).data("mwa:slide")) {
				$(this).data("mwa:slide").refresh();
			}
		});
	});
	
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
				if (top + $t.height() < scrollTop) {
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
	
	function scrollTo(e,v) {
		v = v || 0;
		e = decodeURI(e);
		e = e.toLowerCase();
		var trans = 0;
		// var off_height = header.outerHeight()+v;
		var target = $('[data-anchor="' + e + '"]');
		if(target.length < 1) {
			return;
		}
		if(!target.hasClass('reveal_visible')) {
			trans += 100;
		}
		
		if(target.parent().hasClass('expandable')) {
			target.addClass('active');
			target.find('.hidden').slideDown(300);
		}
		
		var scroll_num = $('[data-anchor="' + e + '"]').offset().top - trans + v;
		page.animate({
			scrollTop: scroll_num
		}, 1200);
	}	

	function svgImage(element, src, callback) {
		$.ajax({
			url: src,
			dataType: 'text',
			success: function(data) {
				var repl = data.replace(/<\?xml.*?>/, '').replace(/<!DOCTYPE.*?>/, '');
				$(element).html(repl);
				if (callback) {
					callback.call(element);
				}
			}
		});
	}
	
	$(".sub_menu a, .sub-menu a, .project-jump-links a").click(function(evt) {
		var href = $(this).attr("href").replace(window.location.origin, "");
		var url = href.substr(0, href.indexOf("#"));
		var hash = href.substr(href.indexOf("#") + 1);
		
		if (url == "" || url == window.location.pathname) {
			menu.fadeOut(400);
			page.removeClass('no_scroll');
			menu_button.removeClass('active');
			// evt.preventDefault();
			scrollTo(hash);
		}
	});
	
	$('[data-svg]').each(function() {
		svgImage(this, $(this).attr('data-svg'));
	});
	
	menu_button.click(function() {
		var self = $(this);
		self.toggleClass('active');
		menu.fadeToggle(400);
		page.toggleClass('no_scroll');
	});
	
	function moveLine(el) {
		if(el.length != 0) {
			var el = el[0];
			var width = el.offsetWidth;
			var left = el.offsetLeft;
			caret.css({'width':width,'left':left});
		} else {
			caret.css({'width':0,'left':0});
		}
	}
	
	window.requestAnimationFrame(onAnimationFrame);
	
	function onAnimationFrame() {
		var st = window.pageYOffset;
		var ww = $(window).innerWidth();
		var wh = $(window).innerHeight();
		
		if (st !== scrollTop) {
			if (ww > 768) {
				$('.slider_block .slide').each(function(e) {
					var viewportOffset = $(this)[0].getBoundingClientRect();
					$(this).children('img').css('transform', 'translate(0, ' + Math.round((viewportOffset.top) * -.1) + 'px)');
					//$(this).find('figcaption').css('transform', 'translate(-50%, calc(-50% +' + Math.round(viewportOffset.top * .1) + 'px))');
				});
			} else {
				$(this).children('img').css('transform', 'none');
				//$(this).find('figcaption').css('transform', 'translate(-50%, -50%)');
			}
		
			if (st >= 80) {
				if(!header.hasClass('shrink')) {
					header.addClass("shrink");
					menu.addClass("shrink");
				}
				if(st > scrollTop) {
					header.addClass('hide');
				} else {
					header.removeClass('hide');
				}
			} else {
				header.removeClass("shrink");
				menu.removeClass("shrink");
			}
			
			if(pixels_pos.length > 0) {
				if(st >= pixels_pos.offset().top) {
					pixels_cont.addClass('fixed');
				} else {
					pixels_cont.removeClass('fixed');
				}
			}
		
			if(sub_nav_cont.length > 0) {
				var sub_nav_offset = sub_nav_cont.offset().top;
				if (st >= sub_nav_offset) {
					if(!sub_nav.hasClass('fixed')) {
						sub_nav.addClass("fixed");
						header.addClass('sticky_sub');
						sub_nav.addClass('hide');
					}
					if(st > scrollTop) {
						sub_nav.addClass('hide');
					} else {
						sub_nav.removeClass('hide');
					}
				} else {
					sub_nav.removeClass("fixed");
					header.removeClass('sticky_sub');
					sub_nav.removeClass('hide');
				}
				var fromTop = st+topMenuHeight+sub_nav_height;
				var cur = scrollItems.map(function(){
					if ($(this).offset().top-100 < fromTop) {
						return this;
					}
				});
				
				cur = cur[cur.length-1];
				var id = cur && cur.length ? cur.data('anchor') : "";
				
				$('.sub_menu li, .sub-menu li').removeClass("active");
				var el = $(".sub-menu").find('a[href="'+pathname+'#'+id+'"]').parent();
				var el2 = $(".sub_menu").find('a[href="'+pathname+'#'+id+'"]').parent();
				el2.addClass("active");
				el.addClass("active");
				moveLine(el2);
			}
			
			$(".fw_image .text").each(function() {
				var self = $(this);
				var offset = self.offset();
				var height = self.innerHeight();
				var window_center = st + wh / 2;
				var element_center = offset.top + height / 2;
				var parallax_factor = -0.07;
				var y = Math.round((window_center - element_center) * parallax_factor);
				
				$(this).css("transform", "translate(-50%, calc(-50% + " + y + "px))");
			});
		
			scrollTop = st;
		}
		
		scroll();
		
		window.requestAnimationFrame(onAnimationFrame);
	}
	
	$('.to_top').click(function() {
		page.animate({
			scrollTop: 0
		}, 1200);
		return false;
	});
	
	$('.slider_block').each(function() {
		if ($(this).find('.slide').length > 1) {
			var first = $(this).find(".slide img").eq(0);
			var self = this;
			
			if (first.get(0).complete) {
				createSlideshow(self);
			} else {
				first.on("load", function() {
					$(this).off("load");
					createSlideshow(self);
				});
			}
		}
	});
	
	function createSlideshow(element) {
		if ($(element).data("mwa:slide")) {
			return;
		}

		var controls = $(element).find('.slide_controls');
		var next = $(document.createElement('div'));
		var prev = $(document.createElement('div'));
		var drag = true;
		var chevron = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48" enable-background="new 0 0 48 48" xml:space="preserve">\
			<circle fill="#ffffff" fill-opacity="0" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" cx="24" cy="24" r="18"></circle>\
			<g>\
				<line fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" x1="27.1" y1="24" x2="22.9" y2="28.2"></line>\
				<line fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" x1="27.1" y1="24" x2="22.9" y2="19.8"></line>\
			</g>\
		</svg>';
		var chevron_new = '<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" viewBox="0 0 446.10001 448" version="1.1" id="svg4" sodipodi:docname="arrow.svg" width="446.10001" height="448" inkscape:version="0.92.3 (2405546, 2018-03-11)"> <metadata id="metadata10"> <rdf:rdf> <cc:work rdf:about=""> <dc:format>image/svg+xml</dc:format> <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"></dc:type> <dc:title></dc:title> </cc:work> </rdf:rdf> </metadata> <defs id="defs8"></defs> <sodipodi:namedview pagecolor="#ffffff" bordercolor="#666666" borderopacity="1" objecttolerance="10" gridtolerance="10" guidetolerance="10" inkscape:pageopacity="0" inkscape:pageshadow="2" inkscape:window-width="1920" inkscape:window-height="1017" id="namedview6" showgrid="false" inkscape:zoom="0.4609375" inkscape:cx="224" inkscape:cy="256" inkscape:window-x="-8" inkscape:window-y="-8" inkscape:window-maximized="1" inkscape:current-layer="svg4"></sodipodi:namedview> <path d="m 3.51525,231.536 7.07,7.071 c 4.686,4.686 12.284,4.686 16.971,0 L 206.05025,60.113 V 436 c 0,6.627 5.373,12 12,12 h 10 c 6.627,0 12,-5.373 12,-12 V 60.113 l 178.494,178.493 c 4.686,4.686 12.284,4.686 16.971,0 l 7.07,-7.071 c 4.686,-4.686 4.686,-12.284 0,-16.97 l -211.05,-211.05 c -4.686,-4.686 -12.284,-4.686 -16.971,0 L 3.51525,214.566 c -4.687,4.686 -4.687,12.284 0,16.97 z" id="path2" inkscape:connector-curvature="0"></path> </svg>';
		
		prev.html(chevron_new);
		next.html(chevron_new);
		
		$(element).append(prev).append(next);
		$(element).slide({
			// effect: 'fade',
			elements: $(element).find('.slide'),
			autoplay: true,
			stopOnManualChange: false,
			duration: 1000,
			pause: 7000,
			touch: drag,
			nextButton: next,
			prevButton: prev,
			containerHeight: function(elements, container, effect) {},
			controls: controls
		});
	}
	
	$('.selector_option').click(function() {
		var self = $(this);
		var id =  self.data('id');
		var cont = self.closest('.selector_cont');
		if(self.hasClass('active')) {
			return;
		}
		cont.find('.selector_option').removeClass('active');
		cont.find('.selector_option[data-id="'+id+'"]').addClass('active');		
		cont.find('.selector_wrap').removeClass('active');
		cont.find('.selector_wrap[data-target="'+id+'"]').addClass('active');
		cont.find('.selector_wrap').stop().slideUp(400);
		cont.find('.selector_wrap[data-target="'+id+'"]').stop().slideDown(400);
	});
	
	$('.read_more,.carreer_title').click(function() {
		var self = $(this);
		var cont = self.closest('.career_item');
		var hidden = cont.find('.hidden');
		if(cont.hasClass('active')) {
			cont.removeClass('active');
			hidden.stop().slideUp(300);
		} else {
			$('.career_item').removeClass('active');
			$('.career_item .hidden').stop().slideUp(300);
			cont.addClass('active');
			hidden.stop().slideDown(300);
		}
	});
	
	$('.news_block.expandable .news_item_title, .news_block.expandable .news_item_rm').click(function(e) {
		e.preventDefault();
		var self = $(this);
		var cont = self.closest('.news_item');
		var hidden = cont.find('.hidden');
		if(cont.hasClass('active')) {
			cont.removeClass('active');
			hidden.stop().slideUp(300);
		} else {
			$('.news_item').removeClass('active');
			$('.news_item .hidden').stop().slideUp(300);
			cont.addClass('active');
			hidden.stop().slideDown(300);
		}
	});
	
	$('#menu-main-menu > li > span').click(function() {
		var self = $(this);
		var parent = self.parent();
		var menu = parent.find('.sub-menu');
		if(parent.hasClass('active')) {
			parent.removeClass('active');
			menu.stop().slideUp(300);
		} else {
			$('#menu-main-menu > li').removeClass('active');
			$('#menu-main-menu > li > .sub-menu').stop().slideUp(300);
			parent.addClass('active');
			menu.stop().slideDown(300);
		}
	});
	
})(jQuery);