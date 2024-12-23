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
	
	const HOMEPAGE_ANIMATION_WIDTH = 1920;
	
	var rafId = null;
	var delay = 150;
	var lTime = 0;
	var scrollTop = -1;
	var fid = 0;
	
	var page = $('html, body');
	var navbar = $('.navbar');
	var mob_navbar = $('.mob_nav');
	var nav = $('#main_nav');
	var menu_button = $('.menu_button');
	
	var old = 1;
	
	var windowWidth = window.innerWidth;
	var topMenuHeight = navbar.outerHeight();
	var menuItems = nav.find("a");

	// 1
	var scrollItems = menuItems.map(function(){
		var href = $(this).attr("href");
		var anchor = href.substring(href.indexOf('#')+1);
		var item = $('[id="'+anchor+'"]');
		if (item.length) { return item; }
	});
	var pathname = window.location.pathname;
	
	var chevron = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 12.847 12.09"><path d="M6.847 12.09h-1l5.67-5.67H0v-.75h11.517L5.847 0h1l6 6z" /></svg>';
	var icons = {
		play: "#play-icon",
		pause: "#pause-icon",
		volume_full: "#volume-icon",
		volume_none: "#volume-xmark-icon",
		spinner: "#spinner"
	};

	// 2
	$('h1.wp-block-heading').each(function() {
		let self = $(this);
		let res = self.html().split('<br>').map((x)=> '<span>'+x+'</span>');
		self.html(res.join(''));
	});
	
	const zeroPad = (num, places) => String(num).padStart(places, '0');

	// 3
	function scroll() {
		var scrollTop = $(window).scrollTop();
		var height = $(window).height()
		var visibleTop = scrollTop + height;
		/*
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
		*/
	}

	// 4
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
	
	// 5
	function scrollTo(e) {
		e = decodeURI(e.toLowerCase());
		var target = $('[id="' + e + '"]');
		if(target.length > 0) {
			var scroll_num = target.offset().top;
			if(target.hasClass('reveal') && !target.hasClass('reveal_visible')) {
				scroll_num+=100;
			}
			history.replaceState({}, document.title, ".");
			page.animate({
				scrollTop: scroll_num
			}, 1000);			
		}
	}

	// 6
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
	
    // 7
	$('a[href*="#"]')
	.not('[href="#"]')
	.not('[href="#0"]')
	.click(function (e) {
		var href = $(this).attr("href").replace(window.location.origin, "");
		var url = href.substr(0, href.indexOf("#"));
		var hash = href.substr(href.indexOf("#") + 1);
		enableScroll();
		
		if (url == "" || url == window.location.pathname) {
			nav.removeClass('active');
			menu_button.removeClass('active');
			page.removeClass('no_scroll');
			scrollTo(hash);
		}
	});
	
    // 8
	$('[data-svg]').each(function() {
		svgImage(this, $(this).attr('data-svg'));
	});
	
    // 9
	function disableScroll() {
		window.oldScrollPos = $(window).scrollTop();
		$('body').addClass('no_scroll');

		$(window).on('scroll.scrolldisabler', function (e) {
			$(window).scrollTop( window.oldScrollPos );
			e.preventDefault();
		});
	};
	
    // 10
	function enableScroll() {
		$(window).off('scroll.scrolldisabler');
		$('body').removeClass('no_scroll');
	};
	
	var main_video = $('.main_slider video')[0];

	createDebugElement();

    // 11
	function fadeVolumeDown(){
		if(main_video) {
			if (main_video.muted) return;
			// console.log("3");
			// if iphone
			// if (isIphone()) {
				// debug("I am an Iphone!")
			// }
				
			const visual = document.querySelector('.main_slider');
			var video = $('.main_slider video')[0];
			const vol = 1 - window.scrollY / visual.clientHeight;
			
			if (vol < 0) {
				video.volume = 0;
				// video.muted = true;
				// debug("1+" + vol)
			} else if (vol > 1) {
				video.volume = 1;
				// video.muted = false;
				// debug("2+" + vol)
			} else {
				video.volume = vol;
				// video.muted = false;
				// debug("3+" + video.volume)
                
			}
		}

	}

    // 12
	const videoElement = document.querySelector("main_slider");

	if (videoElement) {
		// Create an intersection observer
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						console.log("Video has intersected with the top of the screen!");
						videoElement.style.width = "10%"; // Shrink the video width to 10%
						// You can perform any action here, e.g., play the video or change its style
					} else {
						console.log("Video is no longer intersecting the top.");
						videoElement.style.width = "100%"; // Reset the width when it leaves
					}
				});
			},
			{
				root: null, // viewport
				rootMargin: "0px 0px -100% 0px", // Trigger when top of element is at the top of viewport
				threshold: 0 // Trigger as soon as any part of the element is visible
			}
		);

		// Start observing the video element
		observer.observe(videoElement);
	}



    // 13
	window.requestAnimationFrame(onAnimationFrame);
	function onAnimationFrame() {
		var st = window.pageYOffset;
		var ww = window.innerWidth;
		var wh = $(window).innerHeight();
		
		if (st !== scrollTop) {
			if (ww > 1199) {
				$('.wp-block-cover, .unternehmen_block .image, .main_video .video-wrap, .slider_block .slide .img').each(function(e) {
					var viewportOffset = $(this)[0].getBoundingClientRect();
					$(this).children('img, video').css('transform', 'translate(0, ' + Math.round((viewportOffset.top) * -.12) + 'px)');
					$(this).find('h1').css('transform', 'translate(0, ' + Math.round((viewportOffset.top) * .15) + 'px)');
				});
				$('.wp-block-video').each(function(e) {
					var viewportOffset = $(this)[0].getBoundingClientRect();
					$(this).find('.wp-element-caption').css('transform', 'translate(0, calc(-50% + ' + Math.round((viewportOffset.top) * .2) + 'px))');
				});
			} else {
				$('.wp-block-cover, .unternehmen_block .image, .video-wrap, .slider_block .slide .img, .slider_block .slide .video').each(function(e) {
					$(this).children('img, video').css('transform', 'translate(0, 0');
					$(this).find('h1').css('transform', 'translate(0, 0');
				});
				$('.wp-block-video').each(function(e) {
					$(this).find('.wp-element-caption').css('transform', 'translate(0, 0))');
				});
			}
			
			if (ww >= 768) {
				if (st >= 80) {
					if(!navbar.hasClass('shrink')) {
						navbar.addClass("shrink");
						nav.addClass("shrink");
					}
					if(st > scrollTop) {
						navbar.addClass('hide');
					} else if (scrollTop - st < 200) {
						navbar.removeClass('hide');
					}
				} else {
					navbar.removeClass("shrink");
					nav.removeClass("shrink");
				}
			} else {
				if (st >= 200) {
					nav.addClass("shrink");
					if(st > scrollTop) {
						mob_navbar.addClass('hide');
					} else if (scrollTop - st < 200) {
						mob_navbar.removeClass('hide');
					}
				} else {
					mob_navbar.addClass('hide');
					nav.removeClass("shrink");
				}
			}
			
			var fromTop = st+topMenuHeight;
			var cur = scrollItems.map(function(){
				if ($(this).offset().top-100 < fromTop) {
					return this;
				}
			});
			
			cur = cur[cur.length-1];
			var id = cur && cur.length ? cur.attr('id') : "";
			
			$('.menu li').removeClass("active");
			$('a[href="'+pathname+'#'+id+'"]').parent().addClass("active");
			
			
			scrollTop = st;

            // test worked!
            $('.main_slider').each(function() {
                const video = $(this).find('video')[0];
                if (!video) return;
        
                // only not muted
                if (!video.muted && !video.paused) {
                    // if iphone
                    if (isIphone()) {
                        videoVisibilityObserver();
                        // debug("I am Iphone")
                    }
                    
                    // everything except iphone
                    else {
                        fadeVolumeDown();
                        // console.log("I am unmuted");
                    }
                    
                    
                }
            });
            
		}
		
		scroll();
		window.requestAnimationFrame(onAnimationFrame);
	}
	
    // 14
	$(window).on("load", () => {
		const body = document.querySelector("body");
		body.style.setProperty("--scrollbar-size", `${window.innerWidth - body.clientWidth}px`);
		
		NProgress.done(false);
		$('.loading_screen').addClass('cls_ready');
		$('.loading_screen').delay(1000).fadeOut(500);
		
		if (window.location.hash) {
			const v = 0;
			scrollTo(window.location.hash.substring(1), v);
		}
		
		$('.fixed_button_nav').addClass('active');
	});


	// 15
	$('.scroll_up').click(function() {
		page.animate({
			scrollTop: 0
		}, 1000);
	});
	
    // 16
	$('.scroll_down').click(function() {
		let self = $(this);
		let parent = self.closest(".main_slider")[0];
		let rect = parent.getBoundingClientRect();
		let scroll_amount = parent.offsetTop + rect.height;
		page.animate({
			scrollTop: scroll_amount
		}, 1000);
		//document.querySelector(".slider_footer").nextElementSibling.scrollIntoView({ behavior: "smooth" });
	});
	
    // 17
	const scrollDownObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			
			if (!entry.isIntersecting && window.pageYOffset < $(".main_slider").innerHeight()) {
				$('.scroll_down').css("position", "fixed");
			} else {
				$('.scroll_down').css("position", "absolute");
			}
		});
	});

    // 18
	if($('.scroll_down').length > 0) {
		scrollDownObserver.observe(document.querySelector(".main_slider + .slider_footer"));
	}
	
    // 19
	const productAnimationObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				let target = entry.target;
				let id = $(target).attr('data-id');
				target.classList.add('active');
				$('.pa_block_wrap .images .image').eq(id).addClass('active');
			}
		});
	}, { rootMargin: "0px 0px -200px 0px",  });
	
    // 20
	gsap.utils.toArray(".text_blocks .text_block").forEach(function(el) {
		productAnimationObserver.observe(el);
	});
	
    // 21
	const unternehmenAnimationObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const el = entry.target;				
				if(el.classList.contains('dark')) {
					$('.bg.dark').addClass('active');
					$('body').addClass('text_white');
				}
			} else {
				$('.bg').removeClass('active');
				$('body').removeClass('text_white');
			}
		});
	}, { rootMargin: "-400px 0px -250px 0px",  });
	
    // 22
	gsap.utils.toArray(".show_bg").forEach(function(el) {
		unternehmenAnimationObserver.observe(el);
	});

    // 23
	// var logo_cont = $('.logo_cont, .mobile_menu');
	menu_button.click(function() {
		if($(this).hasClass('active')) {
			// logo_cont.removeClass('active');
			$(this).removeClass('active');
			nav.removeClass('active');
			enableScroll();
		} else {
			// logo_cont.addClass('active');
			$(this).addClass('active');
			nav.addClass('active');
			disableScroll();
		}
	});
	
    // 24
	const calculateAR = () => {
		let ar = window.innerHeight / $('body').width();
		$('.trigger.part1 .picture .img').css("padding-bottom", ar*100+"%");
	};
	
	
    // 25
	let controller = null;	
	
	$(window).on("load", () => {
		animateElements();
		
		if($('body').hasClass('home')) {
			if (windowWidth >= HOMEPAGE_ANIMATION_WIDTH) {
				controller = createController();
			}
		}
	});

    // 26
	function animateElements() {
		const list = `
			.video_sections,
			.table_block,
			section>.wp-block-group__inner-container>p,
			.pa2_block,
			.wp-block-video,
			.gallery_cont,
			.wp-block-columns,
			.separator,
			.wp-block-image.img,
			.wp-block-heading,
			.wp-block-group__inner-container > .wp-block-group,
			.cert_cont,
			.scroll_up,
			footer,
			.background_text,
			.hl_cont,
			.unternehmen_animation,
			.video_loop + .wp-block-image,
			.wp-block-media-text,
			.unternehmen_block,
			.karriere_block .header,
			.karriere_block section,
			.karriere_block .accordion_cont,
			.map,
			.wp-block-list:not(.custom_ul),
			.gallery_block .animated,
			.kb_item,
			.footer_contact,
			#contact-form,
			#sb_instagram,
			.history_block .left,
			.history_block .right
		`;
		
		const elements = gsap.utils.toArray(list);
		
		function historyX(m) {
			if(windowWidth >= 1024) {
				return 8*m+'rem';
			}
			return 0;
		}
		
		function historyY() {
			if(windowWidth >= 1024) {
				return 0;
			}
			return "8rem";
		}
		
		const observer = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					if(!entry.target.classList.contains('done')) {
						if (entry.target.classList.contains("wp-block-heading")) {
							gsap.from(entry.target.querySelectorAll("span"), {
								y: '110%',
								opacity: 0,
								duration: 1.25,
								ease: 'power3',
								stagger: 0.1,
								delay: 0.15,
							});
						} else if (entry.target.classList.contains("left")) {
							gsap.from(entry.target.querySelectorAll("*:not(span)"), {
								opacity: 0,
								y: historyY,
								x: historyX(-1),
								duration: 1.25,
								delay: 0.15,
							});
						} else if (entry.target.classList.contains("right")) {
							gsap.from(entry.target.querySelectorAll("*:not(span)"), {
								opacity: 0,
								y: historyY,
								x: historyX(1),
								duration: 1.25,
								delay: 0.15,
							});
						} else if (entry.target.classList.contains("animated")) {
							gsap.from(entry.target.querySelectorAll("span"), {
								x: 30,
								opacity: 0,
								duration: 0.5,
								ease: 'power3',
								stagger: 0.075,
								delay: 0.1,
							});
						} else if (entry.target.classList.contains("kb_item")) {
							entry.target.classList.add('active');
						} else {						
							gsap.from(entry.target, {
								opacity: 0,
								y: '8rem',
								duration: 1.25,
								delay: 0.15,
							});
						}
						entry.target.classList.add('done');
					}
				}
			});
		});
		// }, { rootMargin: "0px 0px -150px 0px" });

		elements.forEach(function(el) {	
			observer.observe(el);
		});
	}
	
    // 27
	function createController() {
		calculateAR();
		const controller = gsap.timeline({});
		
		let p1_pic = $('.trigger.part1 .picture');
		let p1_pic_left = $('.signature').offset().left;
		let p1_pic_width = 854;
		p1_pic.css({width: p1_pic_width, left: p1_pic_left});
		
		let calc = -(1 - (p1_pic_width / $(window).innerWidth())) * 100;
		
		// pin picture to the bottom and enlarge it on scroll
		let part1 = gsap.timeline({
			scrollTrigger: {
				trigger: ".trigger.part1",
				start: "bottom bottom",
				end: "+=6000",
				scrub: 1.5,
				pin: true,
				markers: false,
			},
			onUpdate: (e) => {
				let progress = part1.progress()*100;
				$(".trigger.part1 .picture .img").css({'background-position': 'center '+progress * 0.75+'%'});
			}
		});
		
		// enlarge picture to full screen
		let a1 = gsap.timeline({
			onStart: () => {
				// p1_pic.css({position:"absolute"});
			}
		})
		.to('.trigger.part1 .picture', {
			duration: 1,
			left: 0,
			y: calc+"%",
			width: "100%"
		});
		
		// reveal text line by line
		let a2 = gsap.from('.trigger.part1 .text h1 span', {
			y: '110%',
			opacity: 0,
			// rotationZ: '7.5',
			duration: 1,
			ease: 'power3',
			stagger: 0.1,
		})
		
		// enlarge logo
		let a3 = gsap.to('.trigger.part1 .logo_cont .logo', {
			width: "150%",
			opacity: 1,
			duration: 3,
		});
		
		// fade out picture
		let a4 = gsap.to('.trigger.part1 .picture', {
			opacity: 0,
			duration: 3,
		});

		// change text color to black
		let a5 = gsap.to('.trigger.part1 .text h1 span.white', {
			color: "rgb(0,0,0)",
			delay: 0.5,
			duration: 1.5
		});
		
		// change first sentence color to green
		let a6 = gsap.to('.trigger.part1 .text h1 span.green', {
			color: "rgb(144,176,62)",
			delay: 0.5,
			duration: 1.5
		});

		// grow line on scroll
		let a7 = gsap.to('.trigger.part1 .text .line', {
			scaleY: 1,
			duration: 0.75
		});

		part1.add(a1).add(a2).add([a3, a4, a5, a6]).add(a7);

		let part2 = gsap.timeline({
			scrollTrigger: {
				trigger: ".trigger.part2",
				pin: ".trigger.part2 .picture",
				start: "top top",
				end: "bottom bottom",
				scrub: 1.5,
				markers: false,
				pinSpacing: false,
			},
			onUpdate: (e) => {
				let progress = part2.progress()*100;
				$(".trigger.part2 .picture .img").css({'background-position': 'center '+progress * 0.5+'%'});
			}
		});

		// enlarge picture to full screen
		let p2a1 = gsap.to(".trigger.part2 .picture .img", {
			scale: 1,
			duration: 0.2,
		});
		// reveal overlay
		let p2a2 = gsap.to(".trigger.part2 .picture .overlay", {
			opacity: 1,
		}, "<50%");
		
		let p2a3 = gsap.to(".trigger.part2", {
			opacity: 0,
			duration: 0.05
		});
		
		part2.add(p2a1).add(p2a2).add(p2a3);		
		controller.add(part1).add(part2);
	
		let vs_animation = gsap.timeline({
			scrollTrigger: {
				trigger: ".video_sections",
				start: "center bottom",
				markers: false,
			}
		});
		
		let vs1 = [];
		
		$('.video_sections .vs_item div').each(function() {
			vs1.push(gsap.fromTo($(this).find('span'), {
				x: -30,
				opacity: 0
			}, {
				x: 0,
				opacity: 1,
				duration: 0.85,
				ease: 'power3',
				stagger: 0.075,
			}));
		});
			
		vs_animation.add(vs1);
		
		return controller;
	}
	
    // 28
	$(window).on("resize", function() {
		if($('body').hasClass('home')) {
			if (window.innerWidth < HOMEPAGE_ANIMATION_WIDTH && controller) {
				controller.kill();
				controller = null;
			} else if (window.innerWidth >= HOMEPAGE_ANIMATION_WIDTH && !controller) {
				controller = createController();
			} else if (window.innerWidth >= HOMEPAGE_ANIMATION_WIDTH && controller) {			
				// controller.kill();
				// controller = createController();
			}
		}
	});

	// 29
	$('.video_sections').on('mouseenter', function() {
		let cont = $('.vs_videos');
		cont.stop().fadeIn(600);
		$(this).on('mouseleave', function() {
			cont.stop().fadeOut(600);
		});
	});


	// 30
	$('.video_sections .vs_item').on('mouseenter', function() {
		let self = $(this);
		let cont = self.closest('.video_sections');
		let id = self.index();
		let video = cont.find('.vs_videos video').eq(id);
		
		video.stop().fadeIn(600);
		video[0].play();
		self.on('mouseleave', function() {
			video.stop().fadeOut(600, ()=>{video[0].pause()});
		});
	});
	
    // 31
	$('.wp-block-video').each(function() {
		const self = $(this);
		const video = self.find('video').get(0);
		const parent = self.get(0);

        // "creating" element, not initializing variables
		const progressCont = $('<div class="progress_cont" />');
		const pauseButton = $('<div class="icon pause"><svg><use href="#pause-icon"></use></div>').appendTo(progressCont);
		const volumeButton = $('<div class="icon volume"><svg><use href="#volume-xmark-icon"></use></div>').appendTo(progressCont);
		const progressBar = $('<div class="progress_bar" />').appendTo(progressCont);
		const progress = $('<div class="progress" />').appendTo(progressBar);
		const progressTime = $('<div class="progress_time">00.<span>sek</span></div>').appendTo(progressCont);
		let interval;

		const playButton = $('<div class="play"></div>').appendTo(self);

		const fullscreenButton = document.createElement("button");
		fullscreenButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
			</svg>`;
		fullscreenButton.classList.add("fullscreen");
		fullscreenButton.addEventListener("click", function() {
			if (document.fullscreenElement) {
				document.exitFullscreen();	
			} else {
				parent.requestFullscreen();
			}
		});
		
		if(!video.muted) {
			volumeButton.find('use').attr('href', icons.volume_full);
		}
		
		function volume_full() {
			video.muted = false;
			volumeButton.find('use').attr('href', icons.volume_full);
		}
		function volume_none() {
			video.muted = true;
			volumeButton.find('use').attr('href', icons.volume_none);
		}
		
		function play() {
			progressLoop();
			playButton.stop().fadeOut(300);
			video.play();
			pauseButton.stop().fadeIn(300);
		}
		
		function pause() {
			playButton.stop().fadeIn(300);
			video.pause();
			pauseButton.stop().fadeOut(300);
			if(interval) {
				window.clearInterval(interval);
			}
		}
		
		function playToggle() {
			if (video.autoplay && video.parentNode.classList.contains("no_controls")) {
				return;
			}

			if (video.paused) {
				play();
			} else {
				pause();
			}
		}
		
		function volumeToggle() {
		  if(video.muted) {
			volume_full();
		  } else {
			volume_none();
		  }
		}
		
		volumeButton.click(volumeToggle);
		
		function progressLoop() {
			var currentTime = video.currentTime;
			var duration = video.duration;
			progress.width(Math.round((currentTime / duration) * 100) + "%");
			progressTime.html(zeroPad(Math.round(currentTime),2) + ".<span>sek</span>");

			if (video.currentTime === video.duration) {
				playButton.fadeIn(300);
				pauseButton.fadeOut(300);
			}
		}

		playButton.click(play);
		pauseButton.click(pause);

		video.addEventListener("play", play);
		video.addEventListener("pause", pause);
		video.addEventListener("timeupdate", progressLoop);
		video.addEventListener("click", playToggle);
		
		parent.addEventListener("fullscreenchange", function() {
			if (document.fullscreenElement) {
				parent.classList.add("is-fullscreen");
			} else {
				parent.classList.remove("is-fullscreen");
			}
		});

		if(!self.hasClass('no_controls')) {
			parent.append(fullscreenButton);
			self.append(progressCont);
		}
	});
	
    // 32
	$(window).on("resize", function() {
		$('.slider_block').each(function() {
			if ($(this).data("mwa:slide")) {
				$(this).data("mwa:slide").refresh();
			}
		});
	});	
	
    // 33
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
	
    // 34
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
			controls: controls,
			beforeChange: function(new_index) {
				var slider = $(this.slideshowContainer);
				var index = this.currentIndex;
				var self = this.elements.eq(index);
				
				self.find('figcaption').addClass('hide');
				
				if(self.find('video').length > 0) {
					slider.next('.slider_footer').find('.progress_cont').fadeOut(300);
				}
			},
			afterChange: function(old_index) {
				var slider = $(this.slideshowContainer);
				var index = this.currentIndex;
				var self = this.elements.eq(index);
				
				if(self.find('video').length > 0) {
					slider.next('.slider_footer').find('.progress_cont').fadeIn(300);
				}
				if(self.find('figcaption').length > 0) {
					self.find('figcaption').removeClass('hide');
				}
			}
		});
	}
	
    // 35
	$.extend(true, $.magnificPopup.defaults, {
		gallery: {
			enabled:true,
			preload: [0,1],
			tPrev: '',
			tNext: '',
			tCounter: '%curr% / %total%',
			arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%">'+chevron+'</button>'
		},
		callbacks: {
			buildControls: function() {
			  this.contentContainer.append(this.arrowLeft.add(this.arrowRight));
			}
		},
		// zoom: {
			// enabled: true,
			// duration: 500
		// }
	});
	
    // 36
	$('.gallery-swiper').each(function(i, element) {
		if($(this).find('.swiper-slide').length > 1) {
			let self = $(this);
			let parent = self.parent();
			let maximize = parent.find('.maximize');
			let items = $(this).find('img').map((i, el)=>{
				return { id: i, src: $(el).attr('src'), title: $(el).next('figcaption').text() }
			});
			
			let prev = $('<div class="swiper-button-prev">'+chevron+'</div>').appendTo(parent);
			let next = $('<div class="swiper-button-next">'+chevron+'</div>').appendTo(parent);
			
			const swiper = new Swiper(element, {
				loop: false,
				autoplay: true,
				grabCursor: true,
				effect: "fade",
				crossFade: true,
				speed: 800,
				slidesPerView: 1,
				spaceBetween: 0,
				lockClass: "unset",
				navigation: {
					nextEl: next[0],
					prevEl: prev[0],
				},
				pagination: {
					el: parent.find('.swiper-pagination')[0],
					clickable: true,
				},
			});
			
			maximize.click(function() {
				$.magnificPopup.open({
					items: Array.from(items),
					type: 'image',
					callbacks: {
						close: function() {
							swiper.slideTo(this.index, 0);
						},
					},
					// test
					// zoom: {
					// 	enabled: true, // By default it's false, so don't forget to enable it
					// 	duration: 300, // duration of the effect, in milliseconds
					// 	easing: 'ease-in-out', 

					// }
					zoom: {
						opener: function(x) {
							return $(swiper.slides[x.index]).find('img')
						}
					}
				}, swiper.activeIndex);
			});
		}
	});
	
    // 37
	$('.hl_swiper').each(function(i, element) {		
		if($(this).find('.swiper-slide').length > 1) {
			let self = $(this);
			let parent = self.parent();
			
			let prev = $('<div class="swiper-button-prev">'+chevron+'</div>').appendTo(parent);
			let next = $('<div class="swiper-button-next">'+chevron+'</div>').appendTo(parent);
			
			const swiper = new Swiper(element, {
				loop: true,
				autoplay: false,
				grabCursor: false,
				allowTouchMove: false,
				effect: "slide",
				speed: 1500,
				slidesPerView: 1,
				spaceBetween: 0,
				lockClass: "unset",
				slideClass: "hl_slide",
				navigation: {
					nextEl: next[0],
					prevEl: prev[0],
				},
			});
			
			$.extend($.easing, {
				def: 'easeOutCubic',
				easeOutCubic: function (x, t, b, c, d) {
					return c*((t=t/d-1)*t*t + 1) + b;
				}
			});
			
			let delay = 125;
			let easing = 'easeOutCubic';
			
			swiper.on('slideNextTransitionStart', function(e) {
				let speed = e.params.speed;
				let slide = this.slides[e.activeIndex];
				let title = $(slide).find('.title');
				let image = $(slide).find('.hl_gallery_swiper');
				let text = $(slide).find('figcaption');
				
				title.css({translate: "8rem"});
				image.css({translate: "8rem"});
				text.css({translate: "8rem"});
				title.stop().animate({translate: [0,0]}, speed-delay, easing);
				image.stop().delay(delay*2).animate({translate: [0,0]}, speed-delay, easing);
				text.stop().delay(delay*3).animate({translate: [0,0]}, speed-delay, easing);
			});
			swiper.on('slidePrevTransitionStart', function(e) {
				let speed = e.params.speed;
				let slide = this.slides[e.activeIndex];
				let title = $(slide).find('.title');
				let image = $(slide).find('.hl_gallery_swiper');
				let text = $(slide).find('figcaption');
				
				title.css({translate: "-8rem"});
				image.css({translate: "-8rem"});
				text.css({translate: "-8rem"});
				title.stop().delay(delay*3).animate({translate: [0,0]}, speed-delay, easing);
				image.stop().delay(delay*2).animate({translate: [0,0]}, speed-delay, easing);
				text.stop().animate({translate: [0,0]}, speed-delay, easing);
			});
		}
	});
	
    // 38
	$('.hl_gallery_swiper').each(function(i, element) {
		if($(this).find('.swiper-slide').length > 1) {
			const swiper = new Swiper(element, {
				loop: true,
				autoplay: true,
				effect: "fade",
				crossFade: true,
				speed: 800,
				slidesPerView: 1,
				spaceBetween: 0,
				lockClass: "unset",
				allowTouchMove: false,
				slideClass: "hl_gallery_slide"
			});
		}
	});
	
    // 39
	const main_vid = $('.main_slider:not(.init) video');
	if(main_vid.length) {
		main_vid.get(0).addEventListener("loadedmetadata", function() {
			let slider = $('.main_slider');
			let video = this;
			let self = slider.next('.slider_footer');
			
			const progressCont = $('<div class="progress_cont" />');
			const pauseButton = $('<div class="icon pause"><svg><use href="#pause-icon"></use></div>').appendTo(progressCont);
			const volumeButton = $('<div class="icon volume"><svg><use href="#volume-xmark-icon"></use></div>').appendTo(progressCont);
			// volumeButton = $('<div class="icon volume"><svg><use href="#volume-xmark-icon"></use></div>').appendTo(progressCont); // test
			const progressBar = $('<div class="progress_bar" />').appendTo(progressCont);
			const progress = $('<div class="progress" />').appendTo(progressBar);
			const progressTime = $('<div class="progress_time">00.<span>sek</span></div>').appendTo(progressCont);
			
			const playButton = $('.main_slider .video .play');
			
			let interval;
			
			function volume_full() {
				video.muted = false;
				volumeButton.find('use').attr('href', icons.volume_full);
			}
			function volume_none() {
				video.muted = true;
				volumeButton.find('use').attr('href', icons.volume_none);
			}
			
			function volumeToggle() {
			  if(video.muted) {
				volume_full();
			  } else {
				volume_none();
			  }
			}
			
			function play() {
				progressLoop();
				playButton.stop().fadeOut(300);
				video.play();
				pauseButton.stop().fadeIn(300);
			}
			
			function pause() {
				playButton.stop().fadeIn(300);
				video.pause();
				pauseButton.stop().fadeOut(300);
				if(interval) {
					window.clearInterval(interval);
				}
			}
			
			function playToggle() {
				if (video.paused) {
					play();
				} else {
					pause();
				}
			}
			
			playButton.click(play);
			pauseButton.click(pause);
			volumeButton.click(volumeToggle);
			
			function progressLoop() {
				interval = setInterval(function () {
					var currentTime = video.currentTime;
					var duration = video.duration;
					progress.width(Math.round((currentTime / duration) * 100) + "%");
					progressTime.html(zeroPad(Math.round(currentTime),2) + ".<span>sek</span>");
				}, 100);
			}
			progressLoop();
			
			video.addEventListener("play", play);
			video.addEventListener("pause", pause);
			video.addEventListener("click", playToggle);
			
			self.append(progressCont);	
		});
	}
	
    // 40
	if($(".unternehmen_animation").length > 0 && windowWidth > HOMEPAGE_ANIMATION_WIDTH) {
		let unt1 = gsap.timeline({
			scrollTrigger: {
				trigger: ".unternehmen_animation",
				start: "center center",
				end: "+=2500",
				scrub: 1.25,
				pin: true,
				markers: false,
			},
			onUpdate: (e) => {
				let progress = $(".unternehmen_animation").outerHeight() * unt1.progress() * 0.15;
				$(".unternehmen_animation .wp-block-image img").css({transform:`translateY(-${progress}px)`});
			}
		});
		let u1a1 = gsap.from(".unternehmen_animation .wp-block-image", {
			scale: 0.75
		});
		
		unt1.add(u1a1);
	}
	
	
	// 41
	if($('.karriere_block').length > 0 && windowWidth > HOMEPAGE_ANIMATION_WIDTH) {
		$('.karriere_block .header').each(function(i,e) {
			let kar1 = gsap.timeline({
				scrollTrigger: {
					id: `kar-id-${i}`,
					trigger: $(this),
					start: "center center",
					end: "+=1500",
					scrub: 1,
					pin: true,
					markers: false,
				},
				onUpdate: (e) => {
					let progress = $(this).outerHeight() * kar1.progress() * 0.15;
					$(this).find('img').css({transform:`translateY(-${progress}px)`});
				}
			});
			let k1a1 = gsap.from($(this), {
				scale: 0.75
			});
			
			let k1a2 = gsap.from($(this).find(".title span"), {
				y: '110%',
				opacity: 0,
				// rotationZ: '7.5',
				duration: 1,
				ease: 'power3',
				stagger: 0.1,
			});
			
			let k1a3 = gsap.from($(this).find(".overlay"), {
				opacity: 0
			});
			
			kar1.add([k1a1, k1a2, k1a3]);
		});
	}
	
    // 42
	function accCallback() {
		if(!(windowWidth > HOMEPAGE_ANIMATION_WIDTH)) {
			return;
		}
		
		let t1 = ScrollTrigger.getById("kar-id-0");
		let t2 = ScrollTrigger.getById("kar-id-1");
		let t3 = ScrollTrigger.getById("kar-id-2");
		t1.refresh();
		t2.refresh();
		t3.refresh();
	}
	
    // 43
	$('.accordion_item .title').click(function() {
		let self = $(this);
		let accordion = self.closest('.accordion_item');
		let content = accordion.find('.content');
		
		if(self.hasClass('active')) {
			self.removeClass('active');
			self.next('.content').slideUp(300, accCallback);
		} else {
			$('.accordion_item .title.active + .content').stop().slideUp(300, accCallback);
			$('.accordion_item .title.active').removeClass('active');
			
			self.addClass('active');
			self.next('.content').stop().slideDown(300, accCallback);
		}
	});

    // 44
	if($('.map').length > 0 && windowWidth > HOMEPAGE_ANIMATION_WIDTH) {
		let map1 = gsap.timeline({
			scrollTrigger: {
				trigger: ".map",
				start: "center center",
				end: "+=1500",
				scrub: 1,
				pin: true,
				markers: false,
			},
		});
		let m1a1 = gsap.from(".map", {
			scale: 0.75
		});
		
		map1.add(m1a1);
	}
	
    // 45
	$('#menu-main > li > div > span').click(function() {
		var self = $(this);
		var parent = self.closest(".menu-item");
		var menu = parent.find('.sub-menu');
		if(parent.hasClass('active')) {
			parent.removeClass('active');
			menu.stop().slideUp(300);
		} else {
			$('#menu-main > li').removeClass('active');
			$('#menu-main > li > .sub-menu').stop().slideUp(300);
			parent.addClass('active');
			menu.stop().slideDown(300);
		}
	});
	
	// 46
	$("#contact-form").on("submit", function(e) {
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

    // 47
	// test
	function videoVisibilityObserver() {
		const videoElement = document.querySelector('.slider_block.main_slider video');
	  
		if (!videoElement) {
		  console.log('Video element not found');
		  return;
		}
	  
		// Create a new Intersection Observer
		const observer = new IntersectionObserver(
		  (entries) => {
			entries.forEach((entry) => {
			  if (entry.isIntersecting) {
				videoElement.muted = false;
			  } else {
				videoElement.muted = true;
			  }
			});
		  },
		  {
			rootMargin: '0px',
			threshold: 0.1,
		  }
		);
	  
		// Start observing the video element
		observer.observe(videoElement);
	}
	
	// // Call the function initially
	// // window.addEventListener('load', videoVisibilityObserver);
	// // window.addEventListener('resize', videoVisibilityObserver);
	// window.addEventListener('scroll', videoVisibilityObserver);

    // 48
	// test debugging
	// Create the debugging element dynamically
	function createDebugElement() {
		const debugElement = document.createElement('div');
		debugElement.id = 'debugInfo';
		debugElement.style.position = 'fixed';
		debugElement.style.bottom = '10px';
		debugElement.style.left = '10px';
		debugElement.style.backgroundColor = 'rgba(0,0,0,0.7)';
		debugElement.style.color = 'white';
		debugElement.style.padding = '5px';
		debugElement.style.fontSize = '12px';
		debugElement.style.zIndex = '1000';
		debugElement.style.display = 'none'; // Hide initially
		document.body.appendChild(debugElement);
	}

    // 49
	// Function to log messages to the debugging element
	function debug(message) {
		const debugElement = document.getElementById('debugInfo');
		debugElement.style.display = 'block'; // Make it visible
		debugElement.innerText += message + "\n"; // Append each message
	}

	// Run the setup and check functions
	createDebugElement();

	// test is iphone
	function isIphone() {
		return /iPhone/i.test(navigator.userAgent);
	}

})(jQuery);