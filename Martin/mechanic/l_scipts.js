(function($) {
	"use strict";
	
	if (navigator.platform.indexOf("Mac") != -1) {
		$("body").addClass("mac");
	}
	
	if (navigator.userAgent.includes("Firefox")) {
		$("body").addClass("firefox");
	} else if (navigator.userAgent.includes("Safari")) {
		$("body").addClass("safari");
	} else if (navigator.userAgent.includes("Chrome")) {
		$("body").addClass("chrome");
	}
	
	var rafId = null;
	var delay = 150;
	var lTime = 0;
	var scrollTop = -1;
	var fid = 0;	
	
	var page = $('html, body');
	var header = $('header');
	var menu_button = $('.menu_button');
	var menu = $('.main_menu');
	var sub_menu = $('.sub_menu');
	
	var windowWidth = $(window).innerWidth();
	
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
	var chevron = '<svg class="mfp-prevent-close" data-name="Ebene 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33.4 12.09"><path class="mfp-prevent-close" d="M27.36 12.09h-1l5.67-5.67h-32v-.75h32L26.36 0h1l6 6z" fill="#231f20"/></svg>';
	
	$(window).on("load", function() { 
		if (!window.location.hash) { 
			initializeSectionPositions(); 
		} else { 
			const initialHash = window.location.hash; 
			
			// Scroll to top and wait for animation to complete
			$('html, body').animate({ scrollTop: 0 }, {
				duration: 200,
				complete: function() {
					// Ensure page is fully at top before calculating positions
					setTimeout(function() {
						initializeSectionPositions(); 
					
						scrollTo(initialHash.substring(1)); 
					}, 100); // delay 
				}
			}); 
		} 
		
		if ($(this).data("mwa:slide")) { 
			$(this).data("mwa:slide").refresh(); 
		} 
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
	

	// function scrollTo(e, v) {
	// 	v = v || 0;
	// 	e = decodeURI(e);
	// 	e = e.toLowerCase();

	// 	let trans = 0;
	// 	const target = $('[data-anchor="' + e + '"]');

	// 	if (target.length < 1) {
	// 		console.log("Target not found for data-anchor:", e);
	// 		return;
	// 	}
	
	// 	if (!target.hasClass('reveal_visible')) {
	// 		trans += 100;
	// 	}

	// 	const headerHeight = 96;
	// 	const scroll_num = target.offset().top - trans + v - headerHeight;
	
	// 	page.animate({
	// 		scrollTop: scroll_num
	// 	}, 1200);
	// }

	// 
	// 
	// Store for section positions
	const sectionPositions = {};

	// Initialize position mapping
	function initializeSectionPositions() {
		const headerHeight = 96; // Your header height
		const sections = $('.nav_sections > [data-anchor]');
		
		// Clear existing positions
		Object.keys(sectionPositions).forEach(key => delete sectionPositions[key]);
		
		// Populate positions map
		sections.each(function() {
			const anchor = $(this).attr('data-anchor').toLowerCase();
			const offsetTop = $(this).offset().top - headerHeight;
			sectionPositions[anchor] = offsetTop;
		});
		
		// console.log('Section positions initialized:', sectionPositions);
	}

	// // Scroll to section function
	// // v is the offset, we can edit it
	// function scrollTo(e, v = 0) {
	// 	// console.log("e ->", e)
	// 	// new
	// 	e = decodeURI(e).toLowerCase();

	// 	// Check if we have the position stored
	// 	if (!(e in sectionPositions)) {
	// 			v = -150
	// 			// console.warn(`No position found for anchor: ${e}`);
	// 			let trans = 0;
	// 			const target = $('[data-anchor="' + e + '"]');

	// 			if (target.length < 1) {
	// 				// console.log("Target not found for data-anchor:", e);
	// 				return;
	// 			}
			
	// 			if (!target.hasClass('reveal_visible')) {
	// 				trans += 100;
	// 			}

	// 			const headerHeight = 96;
	// 			const scroll_num = target.offset().top - trans + v - headerHeight;
			
	// 			page.animate({
	// 				scrollTop: scroll_num
	// 			}, 500);;
	// 			return
	// 		}
		
	// 	// Get stored position
	// 	const scrollPosition = sectionPositions[e] + v;
		
	// 	// Perform scroll
	// 	$('html, body').animate({
	// 		scrollTop: scrollPosition
	// 	}, {
	// 		duration: 800,  
	// 	});
		
	// }

	// Debounce: a technique used to prevent an event from being triggered too frequently
	// e.g. to avoid the user spamming a button or sending an excessive number of requests to a server.
	// ensuring the function re-runs after a delay, in other words: delaying the execution 
	// parameters: function + variable (wait)
	function debounce(func, wait = 50) {
		
		// setting the timeout "delay" 
		let timeout;

		// a function returns a function :D
		// returns (calls) the original function
		return function(...args) {

			// clearTimeout: a method of an interface (window)
			// cancels the existing timer (set by setTimeout)
			clearTimeout(timeout);

			// setTimeout: a method of an interface (window)
			// sets a timer, before running a function (the function won't run till the timer clears out)
			// calling the original function, with a timer (wait)
			// the function will only run if no event happened during the (wait)
			timeout = setTimeout(() => func.apply(this, args), wait);
		};
	}

	function scrollTo(e, v = 0) {
		// Normalize and decode anchor
		e = decodeURI(e).toLowerCase();

		// Memoize target element to prevent repeated DOM queries
		// IIFE (Immediately Invoked Function Expression): (() => { ... })();
		// good for a single use case: when the same element called repeatedly
		// could be improved to cache each unique data-anchor, by setting a list or object to store them all, once called
		const getTarget = (() => {
			let cachedTarget = null;
			return () => {
				if (!cachedTarget) {
					cachedTarget = $(`[data-anchor="${e}"]`);
				}
				return cachedTarget;
			};
		})();

		// Cached position lookup
		const scrollPosition = sectionPositions[e] 
			? sectionPositions[e] + v 
			: (() => {
				v = -150
				const target = getTarget();
				if (target.length < 1) return null;

				const headerHeight = 96;
				const trans = target.hasClass('reveal_visible') ? 0 : 100;
				return target.offset().top - trans + v - headerHeight;
			})();

		if (scrollPosition === null) return;

		// Use requestAnimationFrame for smoother scrolling
		const smoothScroll = () => {
			window.requestAnimationFrame(() => {
				window.scrollTo({
					top: scrollPosition,
					behavior: 'smooth'
				});
			});
		};

		// Debounce the scroll to prevent multiple rapid calls
		// no idea how does that work in js
		const debouncedScroll = debounce(smoothScroll, 100);
		debouncedScroll();
	}

	// 
	// 

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
	
	// $(".sub_menu a, .sub-menu a, .project-jump-links a, .menu a, .news_wrap a, .fbg_block .icon").click(function(evt) {
	$('a[href*="#"]')
	// .not('[href="#"]')
	// .not('[href="#0"]')
	.click(function (e) {
		var href = $(this).attr("href").replace(window.location.origin, "");
		var url = href.substr(0, href.indexOf("#"));
		var hash = href.substr(href.indexOf("#") + 1);
		$(".main_menu_bg").removeClass("active");
		$('.menu-item-has-children').removeClass('hovered');
		enableScroll();
		
		// test
		// if (url == "" || url == window.location.pathname) {
		// 	menu.removeClass('active');
		// 	page.removeClass('no_scroll');
		// 	menu_button.removeClass('active');
		// 	checkAccBlockHash(hash);
		// 	scrollTo(hash);
		// }

		if (url == "" || url == window.location.pathname) {
			menu.removeClass('active');
			page.removeClass('no_scroll');
			menu_button.removeClass('active');

			const accAnchor = $(`.acc_block .list [data-anchor="${hash}"]`);
			// const firstChild = accAnchor.children().first();

			if (accAnchor.length) {
				// console.log("there's accAnchor")
				checkAccBlockHash(hash);
			}
			
			else {
				// console.log("there's NO accAnchor")
				scrollTo(hash);
			}
           
		}
	});
	
	$('[data-svg]').each(function() {
		svgImage(this, $(this).attr('data-svg'));
	});
	
	function disableScroll() {
    window.oldScrollPos = $(window).scrollTop();
		page.addClass('no_scroll');

    $(window).on('scroll.scrolldisabler',function ( event ) {
       $(window).scrollTop( window.oldScrollPos );
       event.preventDefault();
    });
	};
	function enableScroll() {
		$(window).off('scroll.scrolldisabler');
		page.removeClass('no_scroll');
	};
	
	menu_button.click(function() {
		var self = $(this);
		self.toggleClass('active');
		menu.toggleClass('active');
		if(page.hasClass('no_scroll')) {
			enableScroll();
		} else {
			disableScroll();
		}
	});
	
	var introCont = $('.bg.intro');
	var introBG = $('.bg.intro .fill');
	var msCont = $('.main_slider_cont');
	var msContHeight = msCont.height();
	var txtCont = $('#text_cont');
	
	var navSections = [];
	$('.nav_section').each(function() {
		navSections.push($(this)[0].offsetTop);
	});
	
	window.requestAnimationFrame(onAnimationFrame);
	function onAnimationFrame() {
		var st = window.pageYOffset;
		var ww = $(window).innerWidth();
		var wh = $(window).innerHeight();
		var calcBG = ((st*2+wh))/(wh*2);
		var calcTXT = (wh-st)/(wh/2);// 2.5
		
		if (ww > 1199) {
			txtCont.css('opacity',calcTXT);
			introBG.width(calcBG*100+'%');
			
			if(st+wh>msContHeight) {
				introCont.css('opacity',0);
				header.addClass('always_show');
			} else {
				introCont.css('opacity',1);
				header.removeClass('always_show');
			}
		}
		
		if (st !== scrollTop) {
			if (ww > 1199) {
				$('.nav_section').each(function(e) {
					$(this).css('position','sticky');
					$(this).children('.text').css({
						'transform': 'translate(0, calc(-50% - ' + Math.round((navSections[e]-st) * -.15) + 'px))',
					});
				});
				$('.acc_image').each(function(e) {
					var viewportOffset = $(this)[0].getBoundingClientRect();
					$(this).children('img').css('transform', 'translate(0, ' + Math.round((viewportOffset.top) * -.15) + 'px)');
				});
				// $('.scroll_sections').each(function(e) {
					// var viewportOffset = $(this)[0].getBoundingClientRect();					
					// $(this).find('.picture_cont').css('transform', 'translate(0, ' + Math.round((viewportOffset.top + (wh/-1)) * .1) + 'px)');
				// });
			} else {
				$('.nav_section').each(function(e) {
					$(this).css('position','relative');
					$(this).children('.text').css({
						'transform': 'translate(0, -50%)',
					});
				});
				$('.acc_image').each(function(e) {
					$(this).children('img').css('transform', 'translate(0, 0)');
				});
				// $('.scroll_sections').each(function(e) {			
					// $(this).find('.picture_cont').css('transform', 'translate(0, 0)');
				// });
			}
			if (st >= 50) {
				if(st > scrollTop) {
					if(!header.hasClass('always_show')) {
						header.addClass('hide');
					} else {
						header.removeClass('hide');
					}
					header.addClass('hide');
					header.addClass('shrink');
					menu.addClass('shrink')
					sub_menu.addClass('show');
				} else {
					// header.removeClass('hide');			
					// sub_menu.removeClass('show');
				}
			} else {
				header.removeClass('hide');
				header.removeClass('shrink');
				menu.removeClass('shrink');
				sub_menu.removeClass('show');
			}
				
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
		if ($(this).find('.img').length > 1) {
			var first = $(this).find(".img").eq(0);
			var self = this;
			
			var img = document.createElement("img");
			img.src = first.css("background-image").replace(/(?:^url\(["']?|["']?\)$)/g, "");

			if (img.complete) {
				createSlideshow(self);
			}
			else {
				$(img).on("load", function() {
					$(this).off("load");
					$(this).remove();
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
		
		prev.html(chevron);
		next.html(chevron);
		
		$(element).append(prev).append(next);
		$(element).slide({
			effect: 'fade',
			elements: $(element).find('.slide'),
			autoplay: true,
			stopOnManualChange: false,
			duration: 1000,
			pause: 5000,
			touch: drag,
			nextButton: next,
			prevButton: prev,
			containerHeight: function(elements, container, effect) {},
			controls: controls,
		});
	}
	
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
	
	$('.acc_block .title .toggle').click(function() {
		var self = $(this);
		var el = self.closest('.item');
		var acc = el.closest('.acc_block');
		var cont = el.find('.cont');
		var id = el.data('id');
		var acc_cont = self.closest(".acc_cont");
		var image = acc_cont.find('.image[data-id="'+id+'"]');
		var images = acc_cont.find('.images');
		var items = acc_cont.find('.item');
		var active_cont = acc_cont.find('.item.active .cont');
		if(el.hasClass('active')) {
			el.removeClass('active');
			cont.stop().slideUp(300);
			image.slideUp(300);
		} else {
			active_cont.stop().slideUp(300);
			images.find('.image').stop().slideUp(300);
			items.removeClass('active');
			el.addClass('active');
			cont.stop().slideDown(300);
			image.stop().slideDown(300);
		}
	});
	
	function checkAccBlockHash(hash) {
		if(hash.length) {
			// const accAnchor = $(`.acc_block .list [data-id="${hash}"]`);
			const accAnchor = $(`.acc_block .list [data-anchor="${hash}"]`);
			const firstChild = accAnchor.parent().children().first();
			const firstChildAnchor = firstChild.attr('data-anchor');
			// console.log("firstChildAnchor -> ", firstChildAnchor)

			if (accAnchor.length) {
				scrollTo(firstChildAnchor)
				accAnchor.find(".toggle").click();
			}
		}
	}
	
	const blueBlockBackgroundObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach(function(e) {
			// console.log(e);
			if (e.isIntersecting && e.intersectionRatio >= 0.25) {	
				$("body").addClass("inverted");
			} else if (!e.isIntersection) {
				$("body").removeClass("inverted");
			}
		});
	}, { threshold: [0.25] });
	
	$(".blue_block").each(function() {
		blueBlockBackgroundObserver.observe($(this).get(0));
	});
	
	$(window).on("load", () => {
		const body = document.querySelector("body");
		body.style.setProperty("--scrollbar-size", `${window.innerWidth - body.clientWidth}px`);
		checkAccBlockHash(window.location.hash.substring(1));
		
		const params = new URLSearchParams(window.location.search);
		
		if (params.has('newsId')) {
			const newsId = params.get('newsId');
			const link = $(`.career_list li[data-id="${newsId}"]`);

			if (link.length) {
				link.click();
				page.animate({
					scrollTop: link.parent().parent().offset().top - 100
				}, 1200);
			}
		}
		
		
		// New Version (Fade)
		$(".content").each(function(idx) {
			new ScrollMagic.Scene({
				triggerElement: this,
				duration: $(this).outerHeight()
			})
				// .on('update', (e) => console.log(e.target.progress()))
				.on("enter", () => $(".progress").eq(idx).addClass("show"))
				.on("leave", (evt) => {
					const element = $(".progress").eq(idx);
					// if (!element.parent().hasClass("one") || evt.state == "AFTER") {
					if (!element.parent().hasClass("one") || evt.state == "AFTER") {
						element.removeClass("show");
					}
				})
				.addTo(controller);
		});
	});
	
	// Unternehmen animation
	let controller = null;
	
	if ($(window).innerWidth() >= 1199) {
		controller = createScrollMagic();
	}
	
	function createScrollMagic() {
		const controller = new ScrollMagic.Controller();
		const timeline = new TimelineMax();
	
		var shrink = TweenMax.fromTo(
			".scroll_section_desktop .picture.one", 1, {
					width: "100vw",
					height: "100vh",
					//height: "100%"
				},
				{
					width: "100%",
					height: "33.33vh",
					// height: "33.33%"
				}
			);
			
			
		var scale_down_text = TweenMax.to(
			".scroll_section_desktop .title_cont .title", 0.35, {
				css: {
					opacity: "0"
				}
			}
		);
		
		var marquee = TweenMax.fromTo(
			".scroll_section_desktop .title_cont .subtitle", 1, {
				transform: "translate(30vw)"
			}, {				
				transform: "translate(-100vw)"
			}
		);
		var marquee_opacity = TweenMax.to(
			".scroll_section_desktop .title_cont .subtitle", 0.5, {
				css: {
					opacity: 0
				}
			}
		);
		
		
		
		timeline.add(marquee).add([shrink, scale_down_text, marquee_opacity]);
		
		
		var layer = $('.scroll_section_desktop .picture .layer');
		var scene2 = new ScrollMagic.Scene({
			triggerElement: ".scroll_sections",
			duration: 4000,
			triggerHook: 0,
			reverse: true
		})
		.setPin('.scroll_section_desktop')
		.setTween(timeline)
		.on('update', function(e) {
			var progress = e.target.progress();
			var progress_calc = (progress * 85);
			var height = $('.picture.one').innerHeight()*1.3;
			var scroll_area = $('.scroll_section_desktop .content_wrap');
			
			$('.picture.one .img').css('background-position', '50% '+progress_calc+'%');
			
			if(progress > 0.85) {
				var val = (1 - progress)/0.15;
				scroll_area.css('padding-top', height*val);
			} else {
				scroll_area.css('padding-top', height);
			}
		})
		.addTo(controller);
		
		var scene4 = new ScrollMagic.Scene({
			triggerElement: ".scroll_section_desktop .content_wrap--scroll",
			duration: "100%",
			triggerHook: 0,
			reverse: true
		})
		.setPin('.picture_cont')
		.on('start', function() {
			var heignt = $(".scroll_section_desktop .content_wrap--scroll").height()*0.85;
			this.duration(heignt);
		})
		.on('progress', function(e) {
			$('.picture_cont').css('transform', 'translateY(-' + e.progress*100*0.65 + '%)');
		})
		.addTo(controller);
		

		var historyBGOpacity = new TimelineMax()
		.to(".history_bg", 1, {
			className: "history_bg show"
		});

		var historyBG = new ScrollMagic.Scene({
			triggerElement: ".history_block",
			duration: "100%",
			triggerHook: "-10%",
			reverse: true
		}).setTween(historyBGOpacity).addTo(controller);

		$(".fbg_block").each(function (i) {
			var self = $(this);
			var text = self.find('.text');
			var icon = self.find('.icon');

			new ScrollMagic.Scene({
				triggerElement: this,
				duration: self.outerHeight() - $('.fbg_item').outerHeight(),
				triggerHook: "0",
				reverse: true
			})
				.setPin(icon[0])
				.addTo(controller);
		});
		
		return controller;
	}

	$(window).on("resize", function() {
		$('.slider_block').each(function() {
			if ($(this).data("mwa:slide")) {
				$(this).data("mwa:slide").refresh();
			}
		});
		
		windowWidth = $(window).innerWidth();
		
		if (windowWidth < 1199 && controller) {
			controller.destroy(true);
			controller = null;
		} else if (windowWidth >= 1199 && !controller) {
			controller = createScrollMagic();
		}
	});
	
	// $(".picture.one .progress").addClass("show");
	
	
	$('.career_list li').click(function() {
		var self = $(this);
		var rawSelf = self.get(0);
		var parent = self.closest('.career_block');
		var index = parent.find('.career_list li').index(this);
		if (self.hasClass("active")) return;
		parent.find('.career_list li.active').removeClass('active');
		self.addClass('active');
		parent.find('.career_content').stop().slideUp(500);
		parent.find('.career_content').eq(index).stop().slideDown(500);
		if (rawSelf.dataset.id) {
			window.history.replaceState(null, "", `${window.location.pathname}?newsId=${rawSelf.dataset.id}`);
		}
	});
	
	$(".career_content_title, .news_mob_title").click(function() {
		var self = $(this);
		var parent = self.parent();
		if(self.hasClass("active")) return;
		parent.find('.career_content_title.active, .news_mob_title.active').removeClass('active');
		parent.find('.career_content, .image').stop().slideUp(500);		
		self.addClass('active').next().stop().slideDown(500);
	});
	
	$("#contact_form").on("submit", function(e) {
		e.preventDefault();
		var self = $(this);
		var overlay = $('.mail_pending');
		var message = self.find('.message');
		var invalid = false;
		var bchk = self.find('#bchk').val();
		if(bchk !== '') {
			invalid = false;
		}
		$(".required").each(function() {
			var el = $(this);
			var input = el.find('input,select');
			
			if ($.trim(input.val()).length == 0) {
				invalid = true;
				el.addClass('field_error');
			} else {
				el.removeClass('field_error');
			}
		});
		
		if (invalid) {
			message.text('Es wurden nicht alle Felder ausgefüllt');
		} else {
			overlay.fadeIn(300);
			var contact_form = self[0];
			var data = new FormData(contact_form);
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
						$(".input_cont").each(function() {
							$(this).find('input[type=text],input[type=tel],input[type=email],textarea').val('');
						});
					} else {
						message.text('Error!');
						console.log("Error: " + msg);
					}
				}, 
				error: function(msg){
					message.text("Error: " + msg);
					console.log("Error: " + msg);
				}
			});
			
			overlay.fadeOut(300);
		}
	});
	$("#nav_menu .menu-item-has-children").on("mouseenter", function(){
		$(".main_menu_bg").addClass("active");
		$(this).addClass('hovered');
		disableScroll();
	});
	$("#nav_menu .menu-item-has-children").on("mouseleave", function(){
		$(".main_menu_bg").removeClass("active");
		$(this).removeClass('hovered');
		enableScroll();
	});
})(jQuery);