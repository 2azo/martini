(function ($) {
	"use strict";

	// When to hide the header (in px)
	const HEADER_HIDE_DISTANCE = 200;
	// After how much scrolling to show the header again (in px)
	const HEADER_SHOW_DISTANCE = 200;

	const audio_full = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
</svg>`;
	const audio_mute = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
</svg>`;
	
	let scrollTop = window.pageYOffset;
	let scrollCounter = 0;
	const parallaxFactor = 0.15;
	let parallaxRange = window.innerHeight * parallaxFactor;
	let parallaxDistance = parallaxRange / 2;

	var rafId = null;
	var delay = 150;
	var lTime = 0;
	var page = $('html, body');
	var header = $('header.site-header');
	var sub_nav = $(".sub_menu");
	var mobMenu = $('.nav-mobile-menu');
	var mobMenuButton = $('.nav_menu_button');
	var sub_nav_cont = $(".sub_menu_cont");
	var sub_nav_height = sub_nav.outerHeight();
	var topMenuHeight = header.outerHeight();
	var menuItems = $('.sub-menu').find("a");
	var scrollItems = menuItems.map(function () {
		var href = $(this).attr("href");
		var anchor = href.substring(href.indexOf('#') + 1);
		var item = $('[data-anchor="' + anchor + '"]');
		if (item.length) {
			return item;
		}
	});
	var pathname = window.location.pathname;
	
	var maximizeIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 176V86.63L246.6 256L416 425.4V336c0-8.844 7.156-16 16-16s16 7.156 16 16v128c0 8.844-7.156 16-16 16h-128c-8.844 0-16-7.156-16-16s7.156-16 16-16h89.38L224 278.6L54.63 448H144C152.8 448 160 455.2 160 464S152.8 480 144 480h-128C7.156 480 0 472.8 0 464v-128C0 327.2 7.156 320 16 320S32 327.2 32 336v89.38L201.4 256L32 86.63V176C32 184.8 24.84 192 16 192S0 184.8 0 176v-128C0 39.16 7.156 32 16 32h128C152.8 32 160 39.16 160 48S152.8 64 144 64H54.63L224 233.4L393.4 64H304C295.2 64 288 56.84 288 48S295.2 32 304 32h128C440.8 32 448 39.16 448 48v128C448 184.8 440.8 192 432 192S416 184.8 416 176z"/></svg>';
	
	
	// function cookieConsentGranted() {
		// const fbPixel = document.createElement("script");
		// fbPixel.innerHTML = `!function(f,b,e,v,n,t,s)
		// {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
			// n.callMethod.apply(n,arguments):n.queue.push(arguments)};
		 // if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
		 // n.queue=[];t=b.createElement(e);t.async=!0;
		 // t.src=v;s=b.getElementsByTagName(e)[0];
		 // s.parentNode.insertBefore(t,s)}(window, document,'script', 'https://connect.facebook.net/en_US/fbevents.js');
		// fbq('init', '5697845623559937');
		// fbq('track', 'PageView');`;
		// document.head.appendChild(fbPixel);

		/*
		var gscript = document.createElement("script");
		gscript.src = "https://www.googletagmanager.com/gtag/js?id=UA-ID-HERE";
		gscript.onload = function() {
			window.dataLayer = window.dataLayer || [];
			function gtag(){dataLayer.push(arguments);}
			gtag('js', new Date());
			gtag('config', 'UA-158866549-1', { 'anonymize_ip': true });
		}
		document.body.appendChild(gscript);
		*/
		// $(".map").each(function() {
			// var frame = document.createElement("iframe");
			// frame.width = "100%";
			// frame.height = 600;
			// frame.frameborder = 0;
			// frame.allowfullscreeen = true;
			// $(frame).css("border", 0);
			// frame.src = $(this).attr("data-map");
			// $(this).find("p").remove();
			// $(this).append(frame);
		// });
	// }
	
	/*
	if (window.sessionStorage.getItem("mwa_cookie_notice") !== "true") {
		$("#cookie-notice").fadeIn(500);
		$("#cookie-notice .button").click(function() {
			$("#cookie-notice").fadeOut(500);
			window.sessionStorage.setItem("mwa_cookie_notice", "true");
			
			if ($(this).hasClass("primary")) {
				window.sessionStorage.setItem("mwa_cookie_consent", "true");
				cookieConsentGranted();
			} else {
				window.sessionStorage.setItem("mwa_cookie_consent", "false");
			}
		});
	} else {
		$("#cookie-notice").remove();
		
		if (window.sessionStorage.getItem("mwa_cookie_consent") === "true") {
			cookieConsentGranted();
		}
	}
	*/

	if ($('.visual figure:first-child').hasClass('color_white')) {
		$('.main_menu').addClass('nav_white');
	}

	if ($('.visual figure:first-child').hasClass('shadow_white')) {
		$('.main_menu').addClass('shadow_white');
	}

	if ($('.visual figure:first-child').hasClass('shadow_black')) {
		$('.main_menu').addClass('shadow_black');
	}

	$('.mob_menu').on('click', function (e) {
		$(this).toggleClass('active');
		$('.menu_cont').toggleClass('show');
	});
	
	$(".content > .wp-block-image").each(function() {
		var sep = $(document.createElement("hr"));
		sep.addClass("wp-block-separator");
		sep.insertBefore(this);
	});

	function scrollTo(e, v) {
		v = v || 0;
		e = decodeURI(e);
		e = e.toLowerCase();
		var trans = 0;
		var off_height = header.outerHeight() + v;
		var target = $('[data-anchor="' + e + '"], #' + e);
		
		if ($(target).length) {
			var scroll_num = $(target).offset().top - off_height - trans;
			page.animate({
				scrollTop: scroll_num
			}, 1200);
		}
	}

	page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function () {
		page.stop();
	});

	$('.acc_toggle').click(function (e) {
		$(this).toggleClass('active');
		$(this).parent().prev('.title').toggleClass('active');
	});

	$('.up-container button').click(function (e) {
		page.animate({
			scrollTop: 0
		}, 1200);
		return false;
	});
	
	var menuButton = $("header .group .site-footer-left").position();
	
	$("#menu-toggle-button").css({
		left: menuButton.left
	});
	
	$('#nav-menu-open, #menu-toggle-button').click(function (e) {
		if ($('body').hasClass('nav-menu-open')){
			$('body').removeClass('nav-menu-open');
			$("body, .menu-outer").css("padding-right", 0);
		} else{
			var old_w = $(window).innerWidth();
			$('body').addClass('nav-menu-open');
			$('body').removeClass('nav-menu-categories-open');
			$('#open-anchor').addClass('item-open');
			$('#active-anchor').addClass('active');
			var new_w = $(window).innerWidth();
			$("body, .menu-outer").css("padding-right", (new_w - old_w));
		}
	});
	
	let scrollbarWidth = 0;
	
	$('#nav-menu-close').click(function (e) {
		$('body').removeClass('nav-menu-open');
	});
	
	$('#nav-menu-categories-open, #menu-item-1331').click(function (e) {
		if ($('body').hasClass('nav-menu-categories-open')){
			$('body').removeClass('nav-menu-categories-open-vehicle');
			$(this).removeClass('close');
			$('body').removeClass('nav-menu-categories-open');
			$('#open-anchor').addClass('item-open');
			$('#active-anchor').addClass('active');
			$("body, .menu-outer").css("padding-right", 0);
			$(".nav-menu-header-categories").css("right", -scrollbarWidth);
		} else {
				$(".nav-menu-header-categories").css("right", 0);
				var old_w = $(window).innerWidth();
				$('body').removeClass('nav-menu-categories-open-vehicle');
				$('body').addClass('nav-menu-categories-open');
				$('body').removeClass('nav-menu-open');
				$(this).addClass('close');
				var new_w = $(window).innerWidth();
				scrollbarWidth = new_w - old_w;
				$("body, .menu-outer").css("padding-right", scrollbarWidth);
		}
	});
	
	$('#nav-menu-categories-open-vehicle').click(function (e) {
		if ($('body').hasClass('nav-menu-categories-open-vehicle')){
			$(this).removeClass('close');
			$('body').removeClass('nav-menu-categories-open-vehicle');
			$('body').removeClass('nav-menu-categories-open');
			$('#open-anchor').addClass('item-open');
			$('#active-anchor').addClass('active');
			$("body, .menu-outer").css("padding-right", 0);
			$(".nav-menu-header-categories-vehicle").css("right", -scrollbarWidth);
		} else {
				$(".nav-menu-header-categories-vehicle").css("right", 0);
				var old_w = $(window).innerWidth();
				$('body').removeClass('nav-menu-categories-open');
				$('body').addClass('nav-menu-categories-open-vehicle');
				$('body').removeClass('nav-menu-open');
				$(this).addClass('close');
				var new_w = $(window).innerWidth();
				scrollbarWidth = new_w - old_w;
				$("body, .menu-outer").css("padding-right", scrollbarWidth);
		}
	});
	
	$('.karte li:first-child').addClass('active');
	
	// $('.karte #fahr').click(function () {
		// $('.karte li').removeClass('active');
		// $(this).addClass('active');
		// $('.map').removeClass('active');
		// $('.map:last-of-type').addClass('active');
	// });
	
	// $('.karte #stahl').click(function () {
		// $('.karte li').removeClass('active');
		// $(this).addClass('active');
		// $('.map').removeClass('active');
		// $('.map:first-child').addClass('active');
	// });
	
	// $('.karte #bad').click(function () {
		// $('.karte li').removeClass('active');
		// $(this).addClass('active');
		// $('.map').removeClass('active');
		// $('.map:nth-child(2)').addClass('active');
	// });
	
	$('.karte li').click(function() {
		let self = $(this);
		let index = self.index();
		
		if(self.hasClass('active')) {
			return;
		} else {
			$('.karte li, .map').removeClass('active');
			self.addClass('active');
			$('.map').eq(index).addClass('active');
		}
	});
	
	$('.wp-block-image.fixed').each(function() {
		var getImageSrc = $(this).children('img').attr('src');
		$(this).css({
		   'background-size' : 'cover',
		   'background-image' : 'url(' + getImageSrc + ')'
		});
	});
	
	$(".c-accordion__title").each(function() {
		$(this).attr("data-title", $(this).text());
		$(this).append('<div><span class="more-icon"></span><span>MEHR ERFAHREN</span></div>');
	})

	$('#small-menu>a').click(function (e) {
		if("#projecte" === $(this).attr("href")){
			e.preventDefault();
			if(header.hasClass('hide')){
				header.removeClass('hide');
			}
			$('body').removeClass('nav-menu-open');
			$('body').addClass('nav-menu-categories-open');
			$('.logo-container').addClass('close');
		}
	});

	$('ul#menu-mainmenu>li>a').click(function (e) {
		if("#projecte" === $(this).attr("href")){
			e.preventDefault();
			$('body').removeClass('nav-menu-open');
			$('.logo-container').addClass('close');
			setTimeout(function () {$('body').addClass('nav-menu-categories-open');},500);
		}
		else if("#" === $(this).attr("href")){
			e.preventDefault();
		}
	});
	// main menu listeners

	$('.nav-menu-header-categories .item, .nav-menu-header-categories-vehicle .item').hover(function (e) {
		if ($(this).hasClass('active')) {
			$(this).parents('.nav-menu-header-categories, .nav-menu-header-categories-vehicle').removeClass('item-open');
			$(this).removeClass('active');
			return;
		}
		$(this).siblings().removeClass('active');
		$(this).parents('.nav-menu-header-categories, .nav-menu-header-categories-vehicle').addClass('item-open');
		$(this).addClass('active');
	});
	
	$(".nav-menu-header-categories-vehicle a").click(function(e) {
		let i = $(this).attr("href").indexOf("#");
		if (i >= 0) {
			e.preventDefault();
			$(this).removeClass('close');
			$('#nav-menu-categories-open-vehicle').removeClass('close');
			$('body').removeClass('nav-menu-categories-open-vehicle');
			$('body').removeClass('nav-menu-categories-open');
			$('#open-anchor').addClass('item-open');
			$('#active-anchor').addClass('active');
			$("body, .menu-outer").css("padding-right", 0);
			$(".nav-menu-header-categories-vehicle").css("right", -scrollbarWidth);
			let hash = $(this).attr("href").substr(i + 1);
			scrollTo(hash);
		}
	});
	
	$('.mob-anchor').click(function() {
		$('body').removeClass('nav-menu-categories-open');
		$('#nav-menu-categories-open').removeClass('close');
	});

	$('[data-svg]').each(function () {
		svgImage(this, $(this).attr('data-svg'));
	});
	
	$(".main p, .main h1, .main h2, .main h3, .main ul, .main ol, .wp-block-image").each(function() {
		if ($(this).parents(".c-accordion__content").length > 0) return;

		$(this).addClass("hidden");
	});

	$(window).on("load", function () {
		NProgress.done(false);
			$('.loading_screen').addClass('cls_ready');
			$('.loading_screen').delay(1800).fadeOut(500);
		$('.loading_screen .st1, .loading_screen .st11').removeClass('slow');
		$('.loading_screen .st1, .loading_screen .st11').addClass('fast');
		$('.loading_screen').delay(2000).fadeOut(500);
		if (window.location.hash) {
			scrollTo(window.location.hash.substring(1));
		}
		$('.visual').each(function () {
			if ($(this).data("mwa:slide")) {
				$(this).data("mwa:slide").refresh();
			}
		});
		
		var menuButton = $("header .group .site-footer-left").position();
	
		$("#menu-toggle-button").css({
			left: menuButton.left
		});
		
		onResize();
	});

	$(window).on("resize", function () {
		$('.visual').each(function () {
			if ($(this).data("mwa:slide")) {
				$(this).data("mwa:slide").refresh();
			}
		});
		
		var menuButton = $("header .group .site-footer-left").position();

		$("#menu-toggle-button").css({
			left: menuButton.left
		});
		
		onResize();
	});

	$('.visual').each(function () {
		//var controls=$(this).next('.visual_controls').find('.slide-controls');
		if ($(this).find('figure').length >= 1) {
			var first = $(this).find("figure img").eq(0);
			var self = this;

			if (first.get(0).complete) {
				createSlideshow(self);
			}
			else {
				first.on("load", function () {
					$(this).off("load");
					createSlideshow(self);
				});
			}
		}
	});
	
	//<div class="text-bg pos-<?= get_field("visual_text_position"); ?>"></div>
	
	$(".cover_image figcaption, .content > .wp-block-image figcaption").each(function() {
		var textBackground = $(document.createElement("div"));
		textBackground.addClass("text-bg");
		
		if ($(this).hasClass("pos-right")) textBackground.addClass("pos-right");
		
		textBackground.insertBefore($(this));
	});
	
	onResize();
	window.requestAnimationFrame(onAnimationFrame);

	function onAnimationFrame() {
		var st = window.pageYOffset;
		var ww = $(window).innerWidth();

		if (sub_nav.length > 0) {
			var sub_nav_offset = sub_nav_cont.offset().top - header.outerHeight();
		}
		
		var menuButton = $("header .group .site-footer-left").position();
		$("#menu-toggle-button").css({
			left: menuButton.left
		});
		
		if ($('body').hasClass('nav-menu-categories-open') || $("body").hasClass("nav-menu-open")) {
			$("header").removeClass("hide");
			$('body').removeClass("header-hide");
		}

		if (st !== scrollTop) {
			if (ww >= 769) {
				$('.visual').each(function (e) {
					var viewportOffset = $(this)[0].getBoundingClientRect();
					$(this).find('img').css('transform', 'translate(0, ' + Math.round((viewportOffset.top) * -.1) + 'px)');
					$(this).find('figcaption').css('transform', 'translate(0, ' + Math.round(viewportOffset.top * .1) + 'px)');
				});
				$('.cover_image.fixed, .wp-block-image.fixed').each(function (e) {
					var viewportOffset = $(this)[0].getBoundingClientRect();
					$(this).find('figcaption').css('transform', 'translate(0, ' + Math.round((viewportOffset.top) * .15) + 'px)');
				});
			}
			else {
				$(this).find('img').css('transform', 'none');
				$(this).find('figcaption').css('transform', 'none');
			}

			if (st > scrollTop && st >= HEADER_HIDE_DISTANCE) {
				// Scrolling down
				document.body.classList.add("scroll-down");
				scrollCounter = 0;
			} else {
				// Scrolling up
				if (scrollCounter >= HEADER_SHOW_DISTANCE || st === 0) {
					document.body.classList.remove("scroll-down");
				} else {
					scrollCounter += scrollTop - st;
				}
			}

			/*
			if (st >= 20) {
				if (!header.hasClass('shrink')) {
					header.addClass("shrink");
					$('body').addClass("header-shrink");
				}
				if (st >= scrollTop && !$("body").hasClass("nav-menu-open")) {
					header.addClass('hide');
					$('body').addClass("header-hide");
				} else {
					header.removeClass('hide');
					$('body').removeClass("header-hide");
				}
			} else {
				header.removeClass("shrink");
				$('body').removeClass("header-shrink");
			}
			*/
			var fromTop = st + topMenuHeight;
			var cur = scrollItems.map(function () {
				if ($(this).offset().top - 100 < fromTop) {
					return this;
				}
			});

			cur = cur[cur.length - 1];
			var id = cur && cur.length ? cur.data('anchor') : "";

			$('.current_page_parent .sub-menu a, .sub_menu a').removeClass("active");
			$('a[href="' + pathname + '#' + id + '"]').addClass("active");

			reveal();
			
			scrollTop = st;
		}

		scroll();

		window.requestAnimationFrame(onAnimationFrame);
	}

	function onResize() {
		var text = $(".cover_image figcaption, .content > .wp-block-image figcaption");
		
		if (text.length) {
			text.each(updateVisualText);
		}
		
		reveal();
		
		let portraitOrientation = window.innerHeight >= window.innerWidth;
		
		parallaxRange = window.innerHeight * parallaxFactor;
		parallaxDistance = parallaxRange / 2;
		
		$(".cover_image figure, .content > .wp-block-image:not(.fixed), .parallax").each(function() {
			$(this).height("auto");
			
			if (portraitOrientation) {
				$(this).find("img").css("margin-top", 0);
				return;
			}
			
			$(this).height($(this).height() - parallaxRange);
			$(this).find("img").css("margin-top", -parallaxDistance);
		});
	}
	
	function reveal() {
		const padding = 40;

		let st = window.pageYOffset;
		let wh = $(window).innerHeight();
		let sb = st + wh;

		$(".hidden").each(function() {
			let pos = $(this).offset();
			
			if (pos.top < sb - padding && pos.top + $(this).innerHeight() > st + padding) {
				$(this).removeClass("hidden");
			}
		});
	}
	
	function updateVisualText(_index, text) {
		var $text = $(text);
		$text.siblings(".text-bg").css({
			width: $text.innerWidth(),
			height: $text.innerHeight()
		});
	}
	
	function createSlideshow(element) {
		if ($(element).data("mwa:slide")) {
			return;
		}

		var controls = $(element).next('.visual_controls').find('.slide-controls');
		var next = $(document.createElement('div'));
		var prev = $(document.createElement('div'));
		var figure = $(element).find("figure");
		var drag = false;
		// var chevron = '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 38">\
			// <g>\
			// <line x1="22.1" y1="19" x2="17.9" y2="23.2" style="fill: none;stroke: #fff;stroke-linecap: square;stroke-miterlimit: 10;stroke-width: 2px"/>\
			// <line x1="22.1" y1="19" x2="17.9" y2="14.8" style="fill: none;stroke: #fff;stroke-linecap: square;stroke-miterlimit: 10;stroke-width: 2px"/>\
			// </g>\
			// <rect x="6" y="6" width="25" height="25" style="fill: none;stroke: #fff;stroke-miterlimit: 10;stroke-width: 1px"></rect>\
			// </svg>';
		var chevron = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48" enable-background="new 0 0 48 48" xml:space="preserve">      
				<circle fill="#ffffff" fill-opacity="0" stroke="#ffffff" stroke-width="1" stroke-miterlimit="10" cx="24" cy="24" r="18"></circle>      
				<g>        
					<line fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" x1="27.1" y1="24" x2="21.5" y2="29.2"></line>        
					<line fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" x1="27.1" y1="24" x2="21.5" y2="18.8"></line>      
				</g>    
			</svg>`;
		prev.html(chevron);
		next.html(chevron);
		if (figure.length > 1) {
			$(element).append(prev).append(next);
			// drag = true;
		}

		$(element).slide({
			effect: 'fade',
			elements: $(element).find('figure'),
			duration: 1000,
			pause: 10000,
			// touch: true,
			nextButton: next,
			prevButton: prev,
			containerHeight: function (elements, container, effect) {
				var first = elements.eq(0).find("img").get(0);
				var w = first.naturalWidth;
				var h = first.naturalHeight;

				return Math.floor(h / w * container.width()) * .9;
			},
			controls: controls,
			beforeChange: function () {
				// this.delay = 2000;
				// $(this.slideshowContainer).find('.line_cont_bg').removeClass('reveal_visible_slider');
				// $(this.slideshowContainer).find('.main-line').removeClass('reveal_visible_slider');
				// $(this.slideshowContainer).find('.sub-line').removeClass('reveal_visible_slider');
				// $(this.slideshowContainer).find('.visual_link').removeClass('reveal_visible_slider');
			},
			afterChange: function () {
				// var index = this.currentIndex;
				var self = $(this.slideshowContainer);
				if (self.find('.active').find('figcaption').text() === 'black') {
					$(element).find('.slide-button').addClass('black');
				} else {
					$(element).find('.slide-button').removeClass('black');
				}
				// setTimeout(function () {
					// self.find('.line_cont_bg').addClass('reveal_visible_slider');
					// self.find('.main-line').addClass('reveal_visible_slider');
					// self.find('.sub-line').addClass('reveal_visible_slider');
					// self.find('.visual_link').addClass('reveal_visible_slider');
				// }, 2000);
			}
		});
	}

	function scroll() {
		var scrollTop = $(window).scrollTop();
		var height = $(window).height()
		var visibleTop = scrollTop + height;
		/*
		$('.reveal').each(function () {
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
		*/
		animate_parallax_multiple(scrollTop);
	}

	/*
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
	*/

	function svgImage(element, src, callback) {
		$.ajax({
			url: src,
			dataType: 'text',
			success: function (data) {
				var repl = data.replace(/<\?xml.*?>/, '').replace(/<!DOCTYPE.*?>/, '');
				$(element).html(repl);
				if (callback) {
					callback.call(element);
				}
			}
		});
	}

	$('.image_cont').each(function () {
		$(this).magnificPopup({
			delegate: 'a',
			type: 'image',
			mainClass: 'mfp-fade',
			image: {
				verticalFit: true,
				titleSrc: function (item) {
					return item.img.attr('alt');
				}
			},
			gallery: {
				enabled: true,
			},
			zoom: {
				enabled: true,
				duration: 500
			},
			fixedContentPos: false,
			callbacks: {
				change: function () {
					if (this.isOpen) {
						this.wrap.addClass('mfp-open');
					}
				}
			}
		});
	});

	$('.sub_menu a, .subnav a, li.current-menu-item a, a.link').click(function (e) {
		if ($(this).parents("section.main").length > 0) {
			// prevent the browser from jumping to target on local jumplinks
			e.preventDefault();
		}

		var href = $(this).attr('href');
		var anchor = href.substring(href.indexOf('#') + 1);
		// var h = sub_nav.outerHeight()+20;
		console.log(anchor);
		
		if ($("body").hasClass("nav-menu-open")) {
			$("#menu-toggle-button").click();
		}
		
		scrollTo(anchor);
	});

	$('.nav_level').click(function () {
		var self = $(this);
		self.toggleClass('active');
		$('.menu').toggleClass('hide');
		// $('.menu li.current-menu-item ul').toggleClass('show');
	});

	// $('.nav-mobile .nav_level').click(function() {
	// $('body').toggleClass('nav-mobile-open');
	// });
	$('.nav-mobile').click(function () {
		// var self = $(this);
		mobMenu.toggleClass('active');
		mobMenuButton.toggleClass('active');
	});

	menuItems.click(function () {
		mobMenu.removeClass('active');
		mobMenuButton.removeClass('active');
	});

	// parallax
	function animate_parallax_multiple() {
		let windowTop = window.pageYOffset;
		let windowHeight = window.innerHeight;
		let windowBottom = windowTop + windowHeight;
		let images = $('.cover_image figure, .content > .wp-block-image:not(.fixed), .parallax');
		
		let portraitOrientation = window.innerHeight >= window.innerWidth;
		
		if (portraitOrientation) {
			images.find('img').css('transform', 'translate(0,0)');
			return;
		}
		
		images.each(function() {
			let imageTop = $(this).offset().top;
			let imageHeight = $(this).outerHeight();
			let imageBottom = imageTop + imageHeight;
		
			let p0 = imageTop + imageHeight;
			let p1 = imageTop - windowHeight;

			if (windowTop > p0 || windowTop < p1) return;
			
			let p = (windowTop - p0) / (p1 - p0);
			let f = 1 - 2 * p;
			
			$(this).find("img").css("transform", "translate(0, " + (f * parallaxDistance) + "px)");
		});
	}
	// parallax
	
	var galleryLinks = document.querySelectorAll(".wp-block-gallery img");
	var i=0;
	for (i; i<galleryLinks.length; i++) {
		var imageLink = galleryLinks[i].src, regex = /-\d*x\d*./;
		galleryLinks[i].setAttribute('src', imageLink.replace(regex, '.'));
		galleryLinks[i].removeAttribute('srcset');
		// console.log(imageLink.replace(regex, '.'));
	}
	
	// var owl_slider = $('.owl-carousel .blocks-gallery-grid');
	var owl_slider = $('.owl-carousel.image-carousel');
	owl_slider.owlCarousel({
		items:1,
		loop: true,
		autoplay: true,
		autoplayTimeout: 5000,
		autoplaySpeed: 2000,
		// autoplayHoverPause: true,
		// navSpeed: 1200,
		touchDrag: false,
		nav: false,
		dots: false,
		rewind: false,
		animateIn: 'fadeIn',
		animateOut: 'fadeOut'
	});
	
	// $('.wp-block-video').click(function() {
		// var self = $(this);
		// var video = self.find('video');
		// self.addClass('playing');
		// video.attr('controls',true);
		// video[0].play();
	// });
	
	const forEach = (items, func) => {
		Array.prototype.forEach.call(items, func);
	};
	const get = (query, parent) => {
		if (!parent) parent = document;
		return parent.querySelector(query);
	};
	const getAll = (query, parent) => {
		if (!parent) parent = document;
		return parent.querySelectorAll(query);
	};
	
	document.addEventListener("click", (el) => {
		if(!$(el.target).hasClass('select')) {
			forEach(getAll(".fo-select"), (item) => {
				item.classList.remove("open");
			});
		}
	});
	
	forEach(getAll("select"), (item) => {
		let el = document.createElement("div");
		let elValueContainer = document.createElement("div");
		let elValue = document.createElement("span");
		let elArrow = document.createElement("span");
		let elOptions = document.createElement("div");
		let label = document.createElement("label");

		el.classList.add("fo-select");
		item.parentNode.insertBefore(el, item);
		item.parentNode.insertBefore(label, item);
		el.append(item);
		el.append(elValueContainer);
		el.append(elOptions);

		elValueContainer.classList.add("fo-value-container");	
		elValueContainer.append(elValue);
		elValueContainer.append(elArrow);

		elArrow.classList.add("fo-arrow");

		elValue.classList.add("fo-value");	
		elValue.textContent = item.options[item.selectedIndex].textContent;
		label.htmlFor = item.id;
		label.textContent = item.options[0].textContent;
		
		let clickEv = (ev) => {
			ev.stopPropagation();
			forEach(getAll(".fo-select"), (item) => {
				item.classList.remove("open");
			});
			el.classList.add("open");
		};
		
		elValueContainer.addEventListener("click", clickEv);
		label.addEventListener("click", clickEv);

		elOptions.classList.add("fo-option-list");

		for (let i = 0; i < item.options.length; ++i) {
			let opt = document.createElement("div");
			opt.classList.add("fo-option");
			opt.textContent = item.options[i].textContent;
			opt.dataset.index = i;
			opt.addEventListener("click", (ev) => {
				elValue.classList.add('selected');
				el.nextElementSibling.classList.add('active');
				for (let k = 0; k < item.options.length; ++k) {
					if (k == ev.currentTarget.dataset.index) {
						item.options[k].setAttribute("selected", "selected");
					} else {
						item.options[k].removeAttribute("selected");
					}
				}
				let changeEvent = new Event("change", { "bubbles": true, "cancelable": true });
				item.dispatchEvent(changeEvent);
				el.classList.remove("open");
			});
			elOptions.append(opt);
		}
		
		let close = document.createElement("div");
		close.classList.add('fo-option-list-close');
		close.addEventListener("click", (ev) => {
			el.classList.remove("open");
		});
		elOptions.append(close);

		item.setAttribute("aria-hidden", true);
		item.addEventListener("change", (ev) => {
			elValue.textContent = ev.currentTarget.options[ev.currentTarget.selectedIndex].textContent;
			el.classList.add('selected');
		});
	});
	
	var modal = $('#mail_modal');
	$(".cf_form").each(function() {
		var qty = $(this).find('.questions select').length;
		var required = $(this).find(".required");
		$(this).on("submit", function(e) {
			e.preventDefault();
			var self = $(this);
			var overlay = $('.mail_pending');
			var message = modal.find('.ajax_message');
			var invalid = false;
			var bchk = self.find('#bchk').val();
			if(bchk !== '') {
				invalid = false;
			}
			required.each(function() {
				var el = $(this);
				var input = el.find('input,select');
				// var el_parent = el.parent();
				if ($.trim(input.val()).length == 0) {
					invalid = true;
					el.addClass('field_error');
				} else {
					el.removeClass('field_error');
				}
			});
			
			if (invalid) {
				// show_toast('Es wurden nicht alle Felder ausgefüllt');
				message.text('Es wurden nicht alle Felder ausgefüllt');
				modal.fadeIn(400);
				return false;
				// } else if (!dts) {
				// show_toast("Bitte bestätigen Sie, dass Sie die Datenschutzhinweise zur Kenntnis genommen haben.");
				// message.text('Bitte bestätigen Sie, dass Sie die Datenschutzhinweise zur Kenntnis genommen haben.');
				// modal.fadeIn(400);
				// return false;
			} else {
				overlay.fadeIn(300);
				
				var contact_form = self[0];
				var data = new FormData(contact_form);
				
				const job = $(contact_form).parentsUntil(".c-accordion__item").parent().find(".c-accordion__title").attr("data-title");
				console.log(job);
				
				data.append("job", job);
				data.append("qty",qty);
				data.append("action", "send_mail");
				
				$.ajax({
					type: "POST",
					url: "/wp-admin/admin-ajax.php",
					contentType : false,
					processData : false,
					data: data,
					success: function(msg) {
						if(msg == "success") {
							message.text('E-Mail erfolgreich gesendet!');
							modal.fadeIn(400);
							$(".input_cont").each(function() {
								$(this).find('input[type=text],input[type=tel],input[type=email],textarea').val('');
							});
							
							if (fbq) {
								fbq('track', 'SubmitApplication', { content_name: job });
							}
						} else {
							message.text('Error!');
							modal.fadeIn(400);
							console.log("Error: " + msg);
						}
					}, 
					error: function(msg){
						message.text("Error: " + msg);
						modal.fadeIn(400);
						console.log("Error: " + msg);
					}
				});
				
				overlay.fadeOut(300);
			}
		});
	});
	
	$('.mail_modal_close_button').click(function() {
		modal.fadeOut(300);
	});
	
	
	$('.wp-block-video').each(function() {
		var self = $(this);
		var video = $(this).find('video')[0];
		var progress = $('<span>');
		var progressTime = $('<div class="time">.0 sec</div>');
		var progressBar = $('<div class="bar"></div>').append(progress);
		var doc = document.documentElement;
		
		// Create Play button
		var playButton = $('<div class="play"></div>').click(function() {
			if (video.paused) {
				self.addClass('active');
				video.play();
				self.find('.video_play').fadeOut(300);
			} else {
				self.removeClass('active');
				video.pause();
			}
		});
	
		// Create Mute/Unmute button
		var muteButton = $('<div class="mute"></div>').click(function() {
			if (video.muted) {
				video.muted = false;
				$(this).removeClass('mute-icon').addClass('unmute-icon'); // Change shape to unmute
				muteButton.html(audio_full);
			} else {
				video.muted = true;
				$(this).removeClass('unmute-icon').addClass('mute-icon'); // Change shape to mute
				muteButton.html(audio_mute);
			}
		});
		muteButton.html(audio_full);
	
		// Set the initial state of the button based on the video's muted status
		if (video.muted) {
			muteButton.addClass('mute-icon'); // Video starts muted, show mute icon
			muteButton.html(audio_mute);
		} else {
			muteButton.addClass('unmute-icon'); // Video starts unmuted, show unmute icon
			muteButton.html(audio_full);
		}
	
		function play() {
			self.addClass('active');
			video.play();
			self.find('.video_play').fadeOut(300);
		}
		
		function pause() {
			video.pause();
		}
	
		video.addEventListener("play", progressLoop);        
		video.addEventListener("pause", () => {
			window.clearInterval(progressLoop);
			self.removeClass('active');
		});
	
		video.addEventListener("click", () => {
			if (video.paused) {
				play();
			} else {
				pause();
			}
		});
	
		progressBar.click(e => {
			const rect = e.currentTarget.getBoundingClientRect();
			const x = e.originalEvent.pageX - rect.left;
			progress.width(`${x / rect.width * 100}%`);
			video.currentTime = x / rect.width * video.duration;
			progressTime.text("." + Math.round(video.currentTime) + " sec");
		});
	
		function openFullscreen() {
			const el = self.get(0);

			if (el.requestFullscreen) {
				el.requestFullscreen();
			} else if (el.webkitRequestFullscreen) { // For Safari
				el.webkitRequestFullscreen();
			} else if (el.msRequestFullscreen) { // For IE/Edge
				el.msRequestFullscreen();
			}
		}
	
		function progressLoop() {
			setInterval(function () {
				progress.width(Math.round((video.currentTime / video.duration) * 100) + "%");
				progressTime.text("." + Math.round(video.currentTime) + " sec");
	
				if (video.currentTime === video.duration) {                    
					self.removeClass('active');
					window.clearInterval(progressLoop);
				}
			}, 100);
		}
	
		var progressCont = $('<div class="progress">')
			.append(progressBar)
			.append(progressTime);
	
		$('<div class="video_play">').click(function() {
			self.addClass('active');
			video.play();
			$(this).fadeOut(200);
		}).appendTo(self);
	
		var maximize = $('<div class="maximize">' + maximizeIcon + '</div>').click(function() {
			openFullscreen();
		});
	
		var wrapper = $('<div class="wrapper" />')
			.append(progressCont)
			.append(maximize);
		
		// Add the mute/unmute button with initial state check
		$('<div class="video_interface">')
			.append(playButton)
			.append(muteButton) // Add the Mute/Unmute button here
			.append(wrapper)
			.appendTo(self);
	});
	
	
	
	
	
	var video_carousel = $('.video_carousel > .wp-block-group__inner-container');
	video_carousel.addClass('owl-carousel');
	video_carousel.owlCarousel({
		items: 1,
		loop: false,
		autoplay: false,
		mouseDrag: false,
		// navSpeed: 1200,
		touchDrag: true,
		nav: true,
		dots: false,
		rewind: false,
		onChange: onChange,
		onChanged: onChanged,
		onInitialized: onInitialized
	});
	
	function dotClicked(index) {
		video_carousel.trigger('to.owl.carousel', [index, 300]);
	}
	
	
	function onInitialized(e) {	
		$(e.target).find('.owl-item .wrapper').each(function() {
			var dots = $('<div class="dots" />');
			for(var i = 0; i < e.item.count; i++) {
				var dot = $('<div class="dot" />');
				if(i === 0) {
					dot.addClass('active');
				}
				dots.append(dot);
			}
			$(this).prepend(dots);
		});
	};
	
	$(document).on('click', '.dot', function() {
		var index = $(this).parent().find('.dot').index($(this));
		video_carousel.trigger('to.owl.carousel', [index, 300]);
	});
	
	function onChanged(e) {
		$('.dot').removeClass('active');
		$(e.target).find('.wrapper').each(function() {
			$(this).find('.dot').eq(e.item.index).addClass('active');
		});
	}
	
	function onChange(e) {
		var video = $(e.target).find('.owl-item').eq(e.item.index).find('video');
		video[0].pause();
	}

	// test
	$(document).ready(function() {
		// Initialize Owl Carousel
		var $owl = $('.owl-carousel');
		
		$owl.on('initialized.owl.carousel', function(event) {
			// Append the Exit Full-Screen button after the carousel is initialized
			var exitFullScreenButton = $('<button class="owl-exit-fullscreen">Exit Full Screen</button>').css({
				position: 'fixed',
				top: '10px',
				right: '10px',
				zIndex: 1000,
				backgroundColor: 'red',
				color: 'white',
				padding: '10px',
				border: 'none',
				cursor: 'pointer',
				display: 'none' // Initially hidden
			});
	
			// Append the button to the body
			$('body').append(exitFullScreenButton);
	
			// Event listener for full-screen change
			function toggleExitButtonVisibility() {
				if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement) {
					exitFullScreenButton.show();
				} else {
					exitFullScreenButton.hide();
				}
			}
	
			// Add event listeners for full-screen change
			$owl.on('fullscreenchange webkitfullscreenchange mozfullscreenchange', toggleExitButtonVisibility);
	
			// Exit full screen when the custom button is clicked
			exitFullScreenButton.on('click', function() {
				if (document.exitFullscreen) {
					document.exitFullscreen();
				} else if (document.webkitExitFullscreen) {
					document.webkitExitFullscreen(); // Safari
				} else if (document.mozCancelFullScreen) {
					document.mozCancelFullScreen(); // Firefox
				}
			});
		});
	
		// Initialize the Owl Carousel
		$owl.owlCarousel({
			items: 1,
			loop: true,
			nav: true,
			navText: ['‹', '›'], // Custom navigation text for previous and next buttons
			autoplay: true,
			autoplayTimeout: 5000,
			autoplayHoverPause: true
		});
	});

	// test
	$(document).ready(function() {
		const overlay = $('#fullscreen-overlay');
		const exitButton = $('#exit-fullscreen');
	
		$(document).on('fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange', function() {
			if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
				overlay.show();
			} else {
				overlay.hide();
			}
		});
	
		exitButton.on('click', function() {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			}
		});
	});
	
})(jQuery);