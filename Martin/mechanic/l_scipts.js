(function($) {
	"use strict";
	
	if (navigator.platform.indexOf("Mac") != -1) {
		$("body").addClass("mac");
	}
	
	switch (navigator.appName) {
		case "Netscape": {
			$("body").addClass("firefox");
			break;
		}
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
		if (window.location.hash) {
			const v = 0;
			scrollTo(window.location.hash.substring(1), v);
		}
		
		// NProgress.done(false);
		// $('.loading_screen').addClass('cls_ready');
		// $('.loading_screen').delay(1000).fadeOut(500);
		
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
	
	function scrollTo(e, v) {
		v = v || 0;
		e = decodeURI(e);
		e = e.toLowerCase();

		let trans = 0;
		const target = $('[data-anchor="' + e + '"]');

		if (target.length < 1) {
			return;
		}

		if (!target.hasClass('reveal_visible')) {
			trans += 100;
		}
		
		// const headerHeight = 96;
		const headerHeight = 56;
		const scroll_num = $('[data-anchor="' + e + '"]').offset().top - trans + v - headerHeight;
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
	
	$(".sub-menu a, .project-jump-links a, .menu a, .news_wrap a, .fbg_block .icon").click(function(evt) {
		var href = $(this).attr("href").replace(window.location.origin, "");
		var url = href.substr(0, href.indexOf("#"));
		var hash = href.substr(href.indexOf("#") + 1);
		$(".main_menu_bg").removeClass("active");
		$('.menu-item-has-children').removeClass('hovered');
		enableScroll();
		if (url == "" || url == window.location.pathname) {
			menu.removeClass('active');
			page.removeClass('no_scroll');
			menu_button.removeClass('active');
			scrollTo(hash);
		}
	});
	
	$(".sub_menu a").click(function(e) {

		var href = $(this).attr("href").replace(window.location.origin, "");
		var url = href.substr(0, href.indexOf("#"));
		var hash = href.substr(href.indexOf("#") + 1);
		$(".main_menu_bg").removeClass("active");
		$('.menu-item-has-children').removeClass('hovered');
		enableScroll();
		
		if (url == "" || url == window.location.pathname) {
			menu.removeClass('active');
			page.removeClass('no_scroll');
			menu_button.removeClass('active');
			checkAccBlockHash(hash);
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
			} else {
				$('.nav_section').each(function(e) {
					$(this).css('position','relative');
					$(this).children('.text').css({
						'transform': 'translate(0, -50%)',
					});
				});
				$('.acc_image').each(function(e) {
					$(this).children('img').css('transform', 'translate(0, 0');
				});
			}
			
			if (st >= 50) {
				if(st > scrollTop) {
					if(!header.hasClass('always_show')) {
						header.addClass('hide');
					} else {
 						header.removeClass('always_show');
					}
					header.addClass('hide');
 					header.addClass('shrink');
					menu.addClass('shrink');
					sub_menu.addClass('show');
				} else {
                //	header.removeClass('hide');					
                //	sub_menu.removeClass('show');
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
	
	// right
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
		if(el.hasClass('active')) {
			el.removeClass('active');
			cont.stop().slideUp(300);
			$('.image[data-id="'+id+'"]').slideUp(300);
		} else {
			$('.item.active .cont').stop().slideUp(300);
			$('.images .image').stop().slideUp(300);
			$('.item').removeClass('active');
			el.addClass('active');
			cont.stop().slideDown(300);
			$('.image[data-id="'+id+'"]').stop().slideDown(300);
		}
		
		// const acc_cont = acc.find(".acc_cont");
		
		// if (acc_cont.length) {
			// var scrollTarget = acc_cont.offset().top - $("body > header .sub_menu").innerHeight();
			// var scrollBuffer = 20; // added
			// var maxScroll = $(document).height() - $(window).height();
			// page.animate({
				// scrollTop: Math.min(scrollTarget - scrollBuffer, maxScroll)
			// }, 300);
		// }
	});
	
	// function checkAccBlockHash(hash) {
		// if (hash.length) {
			// const accAnchor = $(`.acc_block .list [data-anchor="${hash}"]`);
			// if (accAnchor.length) {
				// accAnchor.find(".toggle").click();
				// setTimeout(function() {
					// var scrollTarget = accAnchor.offset().top - $("body > header .sub_menu").innerHeight();
					// var scrollBuffer = 20; 
					// var maxScroll = $(document).height() - $(window).height();
					// $('html, body').animate({
						// scrollTop: Math.min(scrollTarget - scrollBuffer, maxScroll)
					// }, 300);
				// }, 300); 
			// }
		// }
	// }
	
	function checkAccBlockHash(hash) {
		if(hash.length) {
			const accAnchor = $(`.acc_block .list [data-anchor="${hash}"]`);
			const accToggle = accAnchor.find(".toggle");
			const firstItem = $('.acc_block .list [data-id="1"]').attr('data-anchor');
		
            // // test
            // const targetElement = document.querySelector('[data-anchor="kontaktformular"]');
            // const rect = targetElement.getBoundingClientRect();
            // const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
            // console.log('Is element truly visible on screen?', isVisible);

            
			if (accAnchor.length) {
				// setTimeout(function() {
				scrollTo(firstItem);
				// }, 350);
				if(accAnchor.hasClass('active')) return;
				accToggle.click();
			}

		}
	}
    
      

    
      

	const blueBlockBackgroundObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach(function(e) {
			console.log(e);
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
	});	
	
	// Unternehmen animation
	let controller = null;
	
	if ($(window).innerWidth() >= 960) {
		controller = createScrollMagic();
	}
	
	function createScrollMagic() {
		const controller = new ScrollMagic.Controller();
	
		var shrink = TweenMax.to(
			".scroll_section_desktop .picture.one", 1, {
				css: {
					width: "100%",
					height: "33.3333%"
				}
			});

		var move = TweenMax.to(
			".scroll_section_desktop .content_wrap--scroll", 1, {
				css: {
					transform: "translateX(0)",
					opacity: "1"
				}
			});

		var opacity = new TimelineMax()
		.to(".scroll_section_desktop .picture.one .title", 1, {
			css: {
				opacity: "1"
			},
			delay: 0.5,
		});

		var scene2 = new ScrollMagic.Scene({
			triggerElement: ".scroll_sections",
			duration: "80%",
			triggerHook: 0,
			reverse: true
		}).setTween(shrink).addTo(controller);	

		var scene3 = new ScrollMagic.Scene({
			triggerElement: ".scroll_sections",
			duration: "80%",
			triggerHook: 0,
			reverse: true
		}).setTween(move).addTo(controller);

		var scene4 = new ScrollMagic.Scene({
			triggerElement: ".scroll_sections",
			duration: "100%",
			triggerHook: 0,
			reverse: true
		}).setTween(opacity).addTo(controller);

/*
		var bgOpacityEnter = new TimelineMax()
		.to(".ba_bg", 1, {
			className: "ba_bg show"
		})
		.to(".ba_bg", 1, {
			className: "ba_bg"
		});

		var blueArea = new ScrollMagic.Scene({
			triggerElement: ".blue_block",
			duration: "200%",
			triggerHook: "-50%",
			reverse: true
		}).setTween(bgOpacityEnter).addTo(controller);
*/

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

			/*
			new ScrollMagic.Scene({
				triggerElement: this,
				duration: self.outerHeight() - text.outerHeight()*2,
				triggerHook: "0",
				reverse: true
			})
				.setPin(text[0])
				.addTo(controller);
			*/

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
		
		if (windowWidth < 960 && controller) {
			controller.destroy(true);
			controller = null;
		} else if (windowWidth >= 960 && !controller) {
			controller = createScrollMagic();
		}
	});
	
	$(".picture.one .progress").addClass("show");
	
	// New Version (Fade)
	$(".content").each(function(idx) {		
		new ScrollMagic.Scene({
			triggerElement: this,
			duration: $(this).outerHeight()
		})
			.on("enter", () => $(".progress").eq(idx).addClass("show"))
			.on("leave", (evt) => {
				const element = $(".progress").eq(idx);
				if (!element.parent().hasClass("one") || evt.state == "AFTER") {
					element.removeClass("show");
				}
			})
			.addTo(controller);
	});
	
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
	
	$(".career_content_title").click(function() {
		var self = $(this);
		var parent = self.parent();
		if(self.hasClass("active")) return;
		parent.find('.career_content_title.active').removeClass('active');
		parent.find('.career_content').stop().slideUp(500);		
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
						console.error(msg);
					}
				}, 
				error: function(msg){
					message.text("Error: " + msg);
					console.error(msg);
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