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
	
	const HOMEPAGE_SCROLLMAGIC_WIDTH = 1920;
	
	var rafId = null;
	var delay = 150;
	var lTime = 0;
	var scrollTop = -1;
	var fid = 0;
	var page = $('html, body');
	var menu = $('.main_menu');
	var mobile_menu = $('.mobile_menu');
	var nav = $('#main_nav');
	var windowWidth = window.innerWidth;	
	var topMenuHeight = menu.outerHeight();
	var menuItems = menu.find("a");
	var scrollItems = menuItems.map(function(){
		var href = $(this).attr("href");
		var anchor = href.substring(href.indexOf('#')+1);
		var item = $('[id="'+anchor+'"]');
		if (item.length) { return item; }
	});
	var pathname = window.location.pathname;
	var chevron = '<svg class="mfp-prevent-close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33.4 12.09"><path class="mfp-prevent-close" d="M27.36 12.09h-1l5.67-5.67h-32v-.75h32L26.36 0h1l6 6z" fill="#231f20"/></svg>';
	var videos = Array.prototype.slice.apply($('video'));
	var icons = {
		play: "#play-icon",
		pause: "#pause-icon",
		volume_full: "#volume-icon",
		volume_none: "#volume-xmark-icon",
		spinner: "#spinner"
	};
	
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
			logo_cont.removeClass('active');
			page.removeClass('no_scroll');
			scrollTo(hash);
		}
	});
	
	$('[data-svg]').each(function() {
		svgImage(this, $(this).attr('data-svg'));
	});
	
	function disableScroll() {		
		// page.animate({
			// scrollTop: 0
		// }, 1);
		window.oldScrollPos = $(window).scrollTop();
		$('body').addClass('no_scroll');

		$(window).on('scroll.scrolldisabler', function (e) {
			$(window).scrollTop( window.oldScrollPos );
			e.preventDefault();
		});
	};
	function enableScroll() {
		$(window).off('scroll.scrolldisabler');
		$('body').removeClass('no_scroll');
	};
	
	var main_video = $('.main_video video')[0];
	function fadeVolumeDown(){
		if(main_video) {
			if (main_video.muted) return;
			
			const visual = document.querySelector('.main_video');
			const vol = 1 - window.scrollY / visual.clientHeight;
			
			if (vol < 0) {
				main_video.volume = 0;
			} else if (vol > 1) {
				main_video.volume = 1;
			} else {
				main_video.volume = vol;
			}
		}
	}

	window.requestAnimationFrame(onAnimationFrame);
	function onAnimationFrame() {
		var st = window.pageYOffset;
		var ww = window.innerWidth;
		var wh = $(window).innerHeight();
		
		if (st !== scrollTop) {
			if (ww > 1199) {
				$('.wp-block-cover, .main_video .video-wrap').each(function(e) {
					var viewportOffset = $(this)[0].getBoundingClientRect();
					$(this).children('img, video').css('transform', 'translate(0, ' + Math.round((viewportOffset.top) * -.1) + 'px)');
					$(this).find('h1').css('transform', 'translate(0, ' + Math.round((viewportOffset.top) * .15) + 'px)');
				});
			} else {
				$('.wp-block-cover, .video-wrap').each(function(e) {
					$(this).children('img, video').css('transform', 'translate(0, 0');
					$(this).find('h1').css('transform', 'translate(0, 0');
				});
			}

			if (st > 50) {
				nav.addClass('shrink');
				if(st < scrollTop) {
					menu.addClass('show');
					mobile_menu.addClass('show');
				} else if (scrollTop - st < 200) {
					menu.removeClass('show');
					mobile_menu.removeClass('show');
				}
			} else {				
				nav.removeClass('shrink');
				menu.removeClass("show");
				mobile_menu.removeClass('show');
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
			
			
			fadeVolumeDown();			
			
			scrollTop = st;
		}
		
		// Video Progress
		const modalVideo = document.querySelector(".vc_modal video");
		
		if (modalVideo) {
			const currentTime = modalVideo.currentTime;
			const duration = modalVideo.duration;
			const progress = document.querySelector(".vc_modal_controls .progress span");
			const progressTime = document.querySelector(".vc_modal_controls .time");
			progress.style.width = Math.round((currentTime / duration) * 100) + "%";
			
 			// progressTime.innerHTML = Math.round(currentTime) + "/" + Math.round(duration) + " sec"; 
			progressTime.innerHTML = Math.round(currentTime / 60) + "/" + Math.round(duration / 60) + " min";


			/*
			if (video.currentTime === video.duration) {					
				container.removeClass('active');
				window.clearInterval(progressLoop)
			}
			*/
		}
		
		scroll();
		window.requestAnimationFrame(onAnimationFrame);
	}
	
	function playModalVideo() {
		const video = document.querySelector(".vc_modal video");
		videos.forEach(function(item) {
			if (video != item) item.pause();
		});
		$(".vc_modal").addClass('active');
		$('.vc_modal_controls .play').find('use').attr('href', icons.pause);
		video.play();
	}

	function pauseModalVideo() {
		const video = document.querySelector(".vc_modal video");
		$(".vc_modal").removeClass('active');			
		$('.vc_modal_controls .play').find('use').attr('href', icons.play);
		video.pause();
	}		

	function playToggle() {
		const video = document.querySelector(".vc_modal video");

		if (video.paused) {
			playModalVideo();
		} else {
			pauseModalVideo();
		}
	}
	
	if ($(".video_carousel").length > 0) {
		const videoModal = document.createElement("div");
		videoModal.className = "vc_modal";
 		videoModal.innerHTML = `
			<div class="vc_modal_bg"></div>
			<div class="vc_modal_wrap">
				<div class="vc_modal_video"></div>
				<div class="vc_modal_footer">
					<div class="vc_modal_controls">
						<svg class="play"><use href="#play-icon"></use></svg>
						<div class="progress">
							<div class="time">0/0 sec</div>
							<div class="bar">
								<span></span>
							</div>
						</div>
					</div> <!-- Closing .vc_modal_controls -->
					<div class="vc_modal_close"></div>
				</div>
				<div class="vc_modal_nav vc_modal_prev"><svg><use href="#arrow-icon"></use></svg></div>
				<div class="vc_modal_nav vc_modal_next"><svg><use href="#arrow-icon"></use></svg></div>
			</div>
		`;
		document.querySelector(".content-wrapper").append(videoModal);
		$(".vc_modal_close, .vc_modal_bg").click(function() { closeModal() });
		
		const controls = $('.vc_modal_controls');
		const playButton = controls.find('.play');
 		const progressTime = controls.find('.time')
		const progressBar = controls.find('.progress .bar');
		const progress = progressBar.find('span');
		
		playButton.click(playToggle);

		progressBar.click(e => {
			const video = document.querySelector(".vc_modal video");
			const rect = e.currentTarget.getBoundingClientRect();
			const x = e.originalEvent.pageX - rect.left;
			progress.width(`${x / rect.width * 100}%`);
			video.currentTime = x / rect.width * video.duration;
			// no effect
  			// progressTime.text(Math.round(video.currentTime)+"/" + Math.round(video.duration) + " sec");
			progressTime.text((Math.round(video.currentTime)+"/" + Math.round(video.duration)) / 60 + "min");
		});
	}

	$(window).on("load", () => {
		const body = document.querySelector("body");
		body.style.setProperty("--scrollbar-size", `${window.innerWidth - body.clientWidth}px`);

		if (window.location.hash) {
			const v = 0;
			scrollTo(window.location.hash.substring(1), v);
		}
			
		$('.wp-block-video').each(function() {
			var container = $(this);
			var video = container.find('video');
			createVideo(container, video);
		});
		
		// $('.swiper-slide__video').each(function() {
			// var container = $(this);
			// var video = container.find('video');
			// createVideo(container, video, true);
		// });
		
		
		const videoQueue = [];
		const workQueue = () => {
			const { video, container } = videoQueue.shift();
			
			if (video) {
				video.addEventListener("loadedmetadata", function() {
					createVideo(container, $(video), true);
					if (videoQueue.length > 0) {
						workQueue();
					}
				});
				video.preload = "metadata";
			}
		};
		
		$('.swiper-slide__video').each(function() {
			const container = $(this);
			const video = container.find('video').get(0);
			videoQueue.push({
				video,
				container
			});
		});
		
		workQueue();		
		
		$('.fixed_button_nav').addClass('active');
	});
	
	$('.vid_swiper').each(function(i, e) {
		let self = $(this);
		let parent = self.parent();
		let cols = 1;
		let gap = 20;
		
		if(parent.hasClass('col4')) {
			cols = 4;
			gap = 20;
		}
		
		let swiper = new Swiper(e, {
			loop: true,
			grabCursor: false,
			slidesPerView: 1,
			spaceBetween: 20,
			disabledClass: "disabled",
			lockClass: "unset",
			navigation: {
				nextEl: parent.find('.swiper-next').get(0),
				prevEl: parent.find('.swiper-prev').get(0),
			},
			pagination: {
				el: parent.find('.swiper-pagination-vid').get(0),
				clickable: true,
			},
			paginationClickable: true,
			breakpoints: {
				// >=
				1024: {
					slidesPerView: 1,
					slidesPerGroup: 1,
					spaceBetween: 30,
					pagination: false,
					loop: false,
				},
				1366: {
					slidesPerView: cols,
					slidesPerGroup: cols,
					spaceBetween: gap,
					pagination: false,
					loop: false,
				}
			}
		});
		
		swiper.on('slideChange', function (e) {
		  $(swiper.slides[swiper.previousIndex]).find('video')[0].pause();
		});
	});
	
	const optimal_start = new Swiper('.os_swiper', {
		slidesPerView: 1,
		spaceBetween: 0,
		loop: false,
		disabledClass: "disabled",
		createElements: true,
		enabled: true,
		navigation: true,
		pagination: {
			enabled: true,
			clickable: true
		},
		breakpoints: {
			768: {
				slidesPerView: 3,
				spaceBetween: 0,
				enabled: false,
				navigation: false,
				pagination: false
			}
		}
	});
	
	function openModal(id, gid) {
		const origVideo = document.querySelector(`[data-id="${id}"][data-gid="${gid}"] video`);
		const total = document.querySelector(`.swiper-slide__video[data-id="${id}"][data-gid="${gid}"]`).dataset.total;
		const modal = document.querySelector('.vc_modal');
		disableScroll();
		
		const video = origVideo.cloneNode(true);
		const videoContainer = document.querySelector(".vc_modal_video");
		
		videoContainer.innerHTML = "";
		videoContainer.append(video);
		
		createModalVideo($(".vc_modal"), $(video));

		modal.dataset.id = id;
		modal.dataset.gid = gid;
		modal.dataset.total = total;
		$(modal).fadeIn(300);
		video.currentTime = origVideo.currentTime;
		setTimeout(()=>{ video.play() }, 100);
	}
	
	function closeModal() {
		const modal = document.querySelector('.vc_modal');
		const id = modal.dataset.id;
		const gid = modal.dataset.gid;

		var modal_video = $(modal).find('video')[0];
		var carousel_item = $('.swiper-slide__video[data-id="'+id+'"][data-gid="'+gid+'"]');
		var carousel_video = carousel_item.find('video')[0];
		
		var currentTime = modal_video.currentTime;
		var duration = modal_video.duration;
		modal_video.pause();
		carousel_video.currentTime = currentTime;
		carousel_item.find('.bar span').width(Math.round((currentTime / duration) * 100) + "%");
 		// carousel_item.find('.time').text(Math.round(currentTime)+"/" + Math.round(duration) + " sec");
		carousel_item.find('.time').text(`${Math.floor(currentTime / 60)}/${Math.floor(duration / 60)} min`);

		$(modal).stop().fadeOut(300);
		
		enableScroll();
	}
	
	$('.vc_modal_nav').click(function() {
		var self = $(this);
		var id = parseInt(self.closest('.vc_modal').attr('data-id'));
		var gid = self.closest('.vc_modal').attr('data-gid');
		var item_count = parseInt($('.vc_modal[data-gid="'+gid+'"]').attr('data-total')) - 1;		
		var prev = ((id-1) < 0) ? item_count : id-1;
		var next = ((id+1) > item_count) ? 0 : id+1;
		
		closeModal(id, gid);
		
		if(self.hasClass('vc_modal_prev')) {
			openModal(prev, gid);
		} else {
			openModal(next, gid);
		}
	});
	
	// test: added id for each video player element
	var videoPlayerCounter = 0;

	function createVideo(container, video, swiper) {
		videoPlayerCounter++;

		var wrap = video.wrap('<div class="video-wrap" />').parent();

		video = video.get(0);
		video.controls = false;
		
		var progress = $('<span>');
		var progressBar = $('<div class="bar"></div>').append(progress);
 		// var progressTime = $('<div class="time">0/'+Math.round(video.duration)+' sec</div>');
		var progressTime = $('<div class="time">0/' + (Math.round(video.duration / 60)) + ' min</div>');
		var playButton = $('<svg class="play"><use href="'+icons.play+'" /></svg>');
		var volumeButton = $('<svg class="volume"><use href="'+icons.volume_full+'" /></svg>');
		var playButtonMain = $('<div class="video-play-button"><svg><use href="'+icons.play+'" /></svg></div>');
		var bufferingIcon = $('<div class="video-buffering"><svg><use href="'+icons.spinner+'" /></svg></div>');
		
		function progressLoop() {
			setInterval(function () {
				var currentTime = video.currentTime;
				var duration = video.duration;
				progress.width(Math.round((currentTime / duration) * 100) + "%");
				// progressTime.text(Math.round(currentTime)+"/" + Math.round(duration) + " sec");
				progressTime.text(Math.round(currentTime / 60) + "/" + Math.round(duration / 60) + " min");

				if (video.currentTime === video.duration) {					
					container.removeClass('active');
					window.clearInterval(progressLoop)
				}
			}, 100);
		}
		
		function play() {
			videos.forEach(function(item) {
			  if(video != item) item.pause();
			});
			if(swiper) {
				if(window.innerWidth > 1024) {
					var id = container.attr('data-id');
					var gid = container.attr('data-gid');
					openModal(id, gid);
					
					return;
				}
			}
			container.addClass('active');
			video.play();
			progressLoop();
			playButton.find('use').attr('href', icons.pause);
			
		}
		
		function pause() {
			container.removeClass('active');			
			playButton.find('use').attr('href', icons.play);
			video.pause();
			window.clearInterval(progressLoop);
		}
		
		function volume_full() {
			video.muted = false;
			volumeButton.find('use').attr('href', icons.volume_full);
		}
		function volume_none() {
			video.muted = true;
			volumeButton.find('use').attr('href', icons.volume_none);
		}
		
		function playToggle() {
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
		
		playButtonMain.click(play);
		video.addEventListener("play", play);
		video.addEventListener("pause", pause);
		video.addEventListener("click", playToggle);
		playButton.click(playToggle);
		volumeButton.click(volumeToggle);
		video.addEventListener("waiting", function() { bufferingIcon.fadeIn(100) });
		video.addEventListener("playing", function() { bufferingIcon.fadeOut(100) });
		
		// video.addEventListener("volumechange", volumeToggle());
		
		
		progressBar.click(e => {
			if(swiper) {
				if(window.innerWidth > 1024) {
					return;
				}
			}
			const rect = e.currentTarget.getBoundingClientRect();
			const x = e.originalEvent.pageX - rect.left;
			progress.width(`${x / rect.width * 100}%`);
			video.currentTime = x / rect.width * video.duration;
 			// progressTime.text(Math.round(video.currentTime)+"/" + Math.round(video.duration) + " sec");
			progressTime.text(Math.round(video.currentTime / 60) + "/" + Math.round(video.duration / 60) + " min");

		});
		
		var progressCont = $('<div class="progress">')
			.append(progressBar)
			.append(progressTime);
		
		// function openFullscreen() {
			// if (video.requestFullscreen) {
				// video.requestFullscreen();
			// } else if (video.webkitRequestFullscreen) {
				// video.webkitRequestFullscreen();
			// } else if (video.msRequestFullscreen) {
				// video.msRequestFullscreen();
			// }
		// }
		
		// var maximize = $('<div class="maximize">max</div>').click(function() {
			// openFullscreen();
		// });
		
		wrap.append(playButtonMain, bufferingIcon);
		
		$('<div class="video-interface">')
		.append(playButton)
		.append(progressCont)
		// .append(maximize)
		.append('<div class="sep" />')
		.append(volumeButton)
// 		.css({
// 			'display': 'flex',
// 			'justify-content': 'flex-end'
// 		})
		.appendTo(container);


		// sequential ID 
		var videoPlayerId = 'video-player-' + videoPlayerCounter;
    
		container.wrapInner('<div class="video-player" id="' + videoPlayerId + '" />');
		
		// Return ID
		return videoPlayerId;
	}
	
	function createModalVideo(container, video) {
		video = video.get(0);
		video.controls = false;

		const bufferingIcon = $('<div class="video-buffering"><svg><use href="'+icons.spinner+'" /></svg></div>');
		const video_cont = container.find('.vc_modal_video');
		const progressTime = $('.vc_modal_controls .time');
		
		// progressTime.text(`0/${Math.round(video.duration)} sec`);
		progressTime.text(`0/${Math.floor(video.duration / 60)} min`);

		
		video.addEventListener("play", playModalVideo);
		video.addEventListener("pause", pauseModalVideo);
		video.addEventListener("waiting", function() { bufferingIcon.fadeIn(100) });
		video.addEventListener("playing", function() { bufferingIcon.fadeOut(100) });

		video_cont.append(bufferingIcon);
	}
	
	$('.play_text').click(function() {
		var el = $(this).closest(".swiper-slide").find('.swiper-slide__video');
		var id = el.attr('data-id');
		var gid = el.attr('data-gid');
		
		if(window.innerWidth < 1024) {
			el.find('video').get(0).play();
		} else {
			openModal(id, gid);
		}
	});
	
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
	
	
	
	$.extend($.easing, {
		def: 'easeOutCubic',
		easeOutCubic: function (x, t, b, c, d) {
			return c*((t=t/d-1)*t*t + 1) + b;
		}
	});


	var numbers = $('.animated_number .number');
	if (numbers.length > 0) {
		const numberAnimations = [];
		const numbersObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach(e => {
				const self = $(e.target);
				const num = self.find("span");
				const display = self.find("i").text();
				const countTo = display.replaceAll(".", "");

				if (e.isIntersecting && e.intersectionRatio >= 0.25) {
					$(self).animate({
						countNum: countTo
					}, {
						duration: 5000,
						easing: "easeOutCubic",
						start: function(anim) {
							anim.tweens[0].start = 0;
						},
						step: function(now) {
							num.text(Math.floor(now));
						},
						complete: function() {
							num.text(display);
						}
					});
				} else if (!e.isIntersecting) {
					self.stop(true);
					num.text("0");
				}
			});
		}, {
			rootMargin: "0px",
			threshold: [0, 0.25]
		});

		numbers.each(i => {
			numbersObserver.observe(numbers.get(i));
		});
	}
	
	var logo_cont = $('.logo_cont, .mobile_menu');
	$('.menu_button').click(function() {
		if(logo_cont.hasClass('active')) {
			logo_cont.removeClass('active');
			nav.removeClass('active');
			enableScroll();
		} else {
			logo_cont.addClass('active');
			nav.addClass('active');
			disableScroll();
		}
	});
	
	// test comment out
	// const backgroundObserver = new IntersectionObserver((entries, observer) => {
	// 	if (entries[0].isIntersecting) {
	// 		$(".bg.next_level").addClass("active");
	// 		$("body").addClass("text_white");
	// 	} else {
	// 		$(".bg.next_level").removeClass("active");
	// 		$("body").removeClass("text_white");
	// 	}
	// });
	
	// backgroundObserver.observe($(".next_level_animated").get(0));
	
	
	// const backgroundObserverMob = new IntersectionObserver((entries, observer) => {
	// 	if(window.innerWidth < 1024) {
	// 		if (entries[0].isIntersecting) {
	// 			$(".bg.ww360mob").addClass("active");
	// 			$("body").addClass("text_white_mob");
	// 		} else {
	// 			$(".bg.ww360mob").removeClass("active");
	// 			$("body").removeClass("text_white_mob");
	// 		}			
	// 	}
	// });
	// backgroundObserverMob.observe($(".ww360_animated").get(0));
	
	
	// WW360 animation
	let controller = null;
	
	// if (windowWidth >= HOMEPAGE_SCROLLMAGIC_WIDTH) {
	// 	controller = createScrollMagic();
	// }

	// only on homepage
	if (window.location.pathname === "/" && windowWidth >= HOMEPAGE_SCROLLMAGIC_WIDTH) {
		controller = createScrollMagic();
	}
	
	
	function createScrollMagic() {
        // 1. no need for controller
		// const controller = new ScrollMagic.Controller();
        
        // 2. new gsap timeline
        // 2. populating the timeline directly, as appose to creating an empty one then add it to another timeine
		// var timeline = new TimelineMax();
        // var timeline = gsap.timeline();	
        var timeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".trigger",      // Element that triggers the animation
                start: "top top",         // Start when `.trigger` hits the top of the viewport
                end: "+=390%",            // End after scrolling down 390% of the viewport height
                scrub: 1,                // Smoothly sync animation to scroll
                pin: ".trigger",          // Pin the `.trigger` element during the scroll
                toggleActions: "play none none reverse", // Play and reverse on scroll
                markers: false             // Optional: Add markers for debugging
            }
        });
        
		var reveal_images = [];
		
		// scene 2
        // 3. deleted, merged into the gsap.to() as replacement to scene2
		// var reveal_bg = TweenMax.to(".ww360bg",20,{css: {opacity: "1"}})
        // var reveal_bg = gsap.to(".ww360bg", {
        //     duration: 20,
        //     opacity: 1
        // });
		
		// scene 1
        // 4. standalone gsap tween 
		// var hide_heading = TweenMax.to(".ww360_title_cont",20,{ css: {opacity: "0"}});
		// commented out -> passed
        var hide_heading = gsap.to(".ww360_title_cont", {
            duration: 20,
            opacity: 0
        });
        
		
        // 5. stadalone gsap tween
		// var count = TweenMax.to(".ww360_title_cont .t2 span", 25, 
		// 	{
		// 	onStart: function() {
		// 		const self = $(this.target[0]);
		// 		self.animate({
		// 			countNum: 360
		// 		}, {
		// 			duration: 1500, 
		// 			easing: "swing",
		// 			start: function(anim) {
		// 				anim.tweens[0].start = 0;
		// 			},
		// 			step: function(now) {
		// 				self.text(Math.floor(now));
		// 			},
		// 		});
		// 	}
		// });
		
		// commented out -> passed
        var count = gsap.to(".ww360_title_cont .t2 span", {
            duration: 25,
            onStart: function() {
                const self = $(this.targets()[0]);
                self.animate({
                    countNum: 360
                }, {
                    duration: 1500,
                    easing: "swing",
                    start: function(anim) {
                        anim.tweens[0].start = 0;
                    },
                    step: function(now) {
                        self.text(Math.floor(now));
                    }
                });
            }
        });
        
		// 6. stadalone gsap tween
		// var reveal_border = TweenMax.to(
		// 	".ww360_border_wrapper", 20, { 
		// 	css: {
		// 		opacity: "1",
		// 		transform: "translateY(0) scale(1)"
		// 	}
		// });
		// commented out -> passed
		var reveal_border = gsap.to(".ww360_border_wrapper", {
            duration: 20,
            opacity: 1,
            y: 0,
            scale: 1
        });

        // 7. stadalone gsap tween
		// var reveal_logo = TweenMax.to(
		// 	".ww360_logo .animate", 20, { 
		// 	css: {
		// 		opacity: "1",
		// 		transform: "translateY(0) scale(1)"
		// 	}
		// });

		// commented out -> passed
        var reveal_logo = gsap.to(".ww360_logo .animate", {
            duration: 20,
            opacity: 1,
            y: 0,
            scale: 1
        });
        

		// 8. stadalone gsap tween
		// $(".ww360 .item .image_wrap").each(function(i) {
		// 	var t = (i+1)*3; // test was (i+1)*5 
		// 	var image = TweenMax.to($(this), 5, // test was 20
		// 		{ 
		// 			delay: t, // how much to wait till the next element
		// 			css: {
		// 				opacity: "1",
		// 				transform: "scale(1)"
		// 			},
		// 		},
		// 	);
		// 	reveal_images.push(image);
		// });

		// commented out -> passed
        $(".ww360 .item .image_wrap").each(function(i) {
            var t = (i + 1) * 5; // Adjust the delay as needed
            var image = gsap.to($(this), {
                duration: 10, // Duration of the animation
                delay: t,    // Delay before the animation starts
                opacity: 1,
                scale: 1
				// onStart: () => console.log("reveal_images started (out of 5)"),
  				// onComplete: () => console.log("reveal_images completed (out of 5)")
            });
            reveal_images.push(image);
        });
        
        // 9. stadalone gsap tween
		// var border_color = TweenMax.to(
		// 	".ww360_border", 20, { // test was 20
		// 	delay: 10,
		// 	css: {
		// 		borderColor: "rgba(0,0,0,.035)",
		// 	}
		// });
        var border_color = gsap.to(".ww360_border", {
            duration: 20, 
            // delay: 10,     
            borderColor: "rgba(0,0,0,.035)",
			// onStart: () => console.log("border_color started"),
  			// onComplete: () => console.log("border_color completed")
        });
        
        // 10. stadalone gsap tween
		// var animate_bg = TweenMax.to(
		// 	".ww360bg", 20, { // test was 20
		// 	delay: 10,
		// 	css: {
		// 		opacity: 0
		// 	}
		// });
        var animate_bg = gsap.to(".background", { // test was ww360bg
            duration: 20, // test was 20
            // delay: 10, // test was 10
            opacity: 0,
			// onStart: () => console.log("animate_bg started"),
  			// onComplete: () => console.log("animate_bg completed")
        });	
		
        // 11. stadalone gsap tween
		// var show_small_heading = TweenMax.to(
		// 	".ww360_title_cont--smaller", 20, { // test was 20
		// 		delay: 10,
		// 		css: {
		// 			opacity: "1"
		// 		}
		// 	}
		// );
        var show_small_heading = gsap.to(".ww360_title_cont--smaller", {
            duration: 20,
            // delay: 10,
            opacity: 1,
			// onStart: () => console.log("show_small_heading started"),
  			// onComplete: () => console.log("show_small_heading completed")
        });	
		
        // 12. stadalone gsap tween
		// var reveal_text = TweenMax.to(
		// 	".ww360 .item .text", 10, { // test was 10
		// 	css: {
		// 		opacity: "1",
		// 		visibility: "visible",
		// 		top: "0"
		// 	}
		// });
        var reveal_text = gsap.to(".ww360 .item .text", {
            duration: 10,
            opacity: 1,
            visibility: "visible",
			top: "0"
        });	
		
		timeline
			.add([count])
			.add([reveal_logo, reveal_border, hide_heading])
			.add([reveal_images, animate_bg, border_color, show_small_heading],"-=3") 
			.add([reveal_text]);

			
		// 13. reaplacing scrollMagic scene with gsap.to() with ScrollTrigger()
		// var scene2 = new ScrollMagic.Scene({
		// 	triggerElement: ".trigger_top",
		// 	duration: "1%", 
		// 	triggerHook: 0,
		// 	reverse: true,
		// }).setTween(reveal_bg).addTo(controller);

        gsap.to(".ww360bg", { // test was ww360bg
            duration: 1,
            opacity: 1,
            scrollTrigger: {
                trigger: ".trigger_top",
                start: "top top",
                end: "top 99%", // test was top 99%
                scrub: 1,
                toggleActions: "play none none reverse"
            }
        });
        
        // 14. replacing it with gsap.timeline()
        // 14. deleting this timeline, and just keeping the first one

		// var scene1 = new ScrollMagic.Scene({
		// 	triggerElement: ".trigger",
		// 	duration: "390%",
		// 	triggerHook: 0,
		// 	reverse: true,
		// 	scrub: 15 // test
		// }).setPin(".trigger").setTween(timeline).addTo(controller);

        // gsap.timeline({
        //     scrollTrigger: {
        //         trigger: ".trigger",      // Element that triggers the animation
        //         start: "top top",         // Start when `.trigger` hits the top of the viewport
        //         end: "+=390%",            // End after scrolling down 390% of the viewport height
        //         scrub: 15,                // Smoothly sync animation to scroll
        //         pin: ".trigger",          // Pin the `.trigger` element during the scroll
        //         toggleActions: "play none none reverse", // Play and reverse on scroll
        //         // markers: true             // Optional: Add markers for debugging
        //     }
        // }).add(timeline);
        

		// 15. changing this snippet to be gsap3
		// let lineArray = [];
		// let tX = new TimelineMax();
		
		// $('.modul_block p').each(function(i) {
		// 	var t = 0.5+(i*0.065);
		// 	let line = TweenMax.from($(this), 1, {
		// 		delay: t,
		// 		y: '110%',
		// 		opacity: 0,
		// 		duration: 1,
		// 		ease: 'power3',
		// 	});
		// 	lineArray.push(line);
		// });
		
		// tX.add(lineArray);
		
		// var sceneX = new ScrollMagic.Scene({
		// 	triggerElement: ".modul_block",
		// 	triggerHook: 1,
		// 	reverse: true
		// }).setTween(tX).addTo(controller);

		// element ".module_block" doesn't exist
        // let lineArray = [];

        // // Use a GSAP timeline directly
        // let tX = gsap.timeline({
        //     scrollTrigger: {
        //         trigger: ".modul_block", // Element that triggers the animation
        //         start: "top bottom",     // Start when the top of `.modul_block` hits the bottom of the viewport
        //         end: "top top",          // End when the top of `.modul_block` reaches the top of the viewport
        //         scrub: true,             // Smoothly animate based on scroll
        //         toggleActions: "play none none reverse" // Play on scroll down, reverse on scroll up
        //     }
        // });

        // // Iterate through each paragraph and create an animation
        // $('.modul_block p').each(function(i) {
        //     let t = 0.5 + (i * 0.065);
        //     let line = gsap.from($(this), {
        //         y: '110%',
        //         opacity: 0,
        //         duration: 1,
        //         delay: t, // Apply delay to each line based on its index
        //         ease: 'power3'
        //     });
        //     lineArray.push(line);
        // });

        // // Add all animations to the GSAP timeline
        // tX.add(lineArray);

		return controller;
	}
	
	$(window).on("resize", function() {		
		if (window.innerWidth < 1024) {
			$('.row.active').removeClass('active');
			$('.item.right').attr("style","");
		}

		if (window.innerWidth < HOMEPAGE_SCROLLMAGIC_WIDTH && controller) {
			controller.destroy(true);
			controller = null;
			

		}
	});
	
	$('.ww360 .item .image').click(function () {
		let self = $(this);
		let item  
		
		
		= self.closest('.item');
		let cont = self.closest('.container');
		let video = self.find('video')[0];
		
		if(!$('body').hasClass('no_scroll')) {
			if(windowWidth >= HOMEPAGE_SCROLLMAGIC_WIDTH) {
				page.animate({
					scrollTop: $('.ww360').offset().top - 150
				}, 300, function() { 
					disableScroll();
				});
			} else {
				var calc = self.offset().top - ($(window).innerHeight()/2) + self.innerHeight()/2
				page.animate({
					scrollTop: calc
				}, 300, function() { 
					disableScroll();
				});
			}
		} else {
			if(item.hasClass('active')) {
				if(video.paused) {
					video.play();
				} else {
					video.pause();
				}
				return;
			} else {
				var old_vid = $('.ww360 .item.active video')[0];
				if(old_vid) {
					old_vid.pause();
					old_vid.currentTime = 0;
				}
			}
		}
		
		$('.ww360 .item').removeClass('active');
		
		cont.addClass('active');
		item.addClass('active');		
		$(".bg.ww360bgs, .ww360_close").addClass("active");
		video.play();
		
		video.addEventListener("ended", function() {
			item.removeClass('active');
			cont.removeClass('active');
			$(".bg.ww360bgs, .ww360_close").removeClass("active");
			enableScroll();
		}, false);			
	});
	
	// $('.ww360_close').on('click', function(e) {
	$('body').on('click', function(event){
		if(!$(event.target).closest('.ww360 .item').hasClass('active')){
			var video = $('.ww360 .item.active video')[0];
			$(".bg.ww360bgs, .ww360_close").removeClass('active');
			$('.ww360 .container, .ww360 .item').removeClass('active');
			if (video) {
				video.pause();
				video.currentTime = 0;
				enableScroll();
			}
		}
	});
	
	
	$('.item.left i, .row .more').click(function() {
		var parent = $(this).closest(".row");
		var cont = parent.find('.item.right');
		if(windowWidth < 1024) {
			if(parent.hasClass('active')) {
				parent.removeClass('active');
				cont.stop().slideUp(300);
			} else {
				$(".row.active").removeClass('active').find('.item.right').stop().slideUp(300);
				parent.addClass('active');
				cont.stop().slideDown(300);
			}
		}
	});

	
})(jQuery);

// 
// 
