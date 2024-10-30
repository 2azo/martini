(function($) {
	"use strict";
	
	var rafId = null;
	var delay = 150;
	var lTime = 0;
	var scrollTop = -1;
	var page = $('html, body');
	var header = $("header");
	var menu = $('.main_menu');
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
	var countAnimation = true;
	var counting = false;
	var count = 0;
	var menu_block = $('.menu_block');
	var logo_text = $('.logo_text');
	var caret = $('.caret');
	var modal = $('.modal');
	var pageLoaded = false;
	var muted = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zM461.64 256l45.64-45.64c6.3-6.3 6.3-16.52 0-22.82l-22.82-22.82c-6.3-6.3-16.52-6.3-22.82 0L416 210.36l-45.64-45.64c-6.3-6.3-16.52-6.3-22.82 0l-22.82 22.82c-6.3 6.3-6.3 16.52 0 22.82L370.36 256l-45.63 45.63c-6.3 6.3-6.3 16.52 0 22.82l22.82 22.82c6.3 6.3 16.52 6.3 22.82 0L416 301.64l45.64 45.64c6.3 6.3 16.52 6.3 22.82 0l22.82-22.82c6.3-6.3 6.3-16.52 0-22.82L461.64 256z"></path></svg>';
	var unmuted = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zM480 256c0-63.53-32.06-121.94-85.77-156.24-11.19-7.14-26.03-3.82-33.12 7.46s-3.78 26.21 7.41 33.36C408.27 165.97 432 209.11 432 256s-23.73 90.03-63.48 115.42c-11.19 7.14-14.5 22.07-7.41 33.36 6.51 10.36 21.12 15.14 33.12 7.46C447.94 377.94 480 319.53 480 256zm-141.77-76.87c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 228.28 336 241.63 336 256c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.86z"></path></svg>';
	
	var visual_single = $('.visual .image');
	if (visual_single.hasClass('menu_color_white')) {
		menu_block.addClass('menu_color_white');
	} else {
		menu_block.removeClass('menu_color_white');
	}	
	
	if (visual_single.hasClass('logo_color_white')) {
		logo_text.addClass('logo_color_white');
	} else {
		logo_text.removeClass('logo_color_white');
	}
	
	var parallaxItem = $('.parallax_item:not(.projects_wow_cont)');
	var parallaxItems = parallaxItem.map(function(i) {
		var el = parallaxItem[i];
		var multiplier = $(el).attr('data-multi');
		var items = [];
		var obj = { "el": el, "multiplier":multiplier };
		// obj.el = el;
		// obj.multiplier = multiplier;
		items.push(obj);
		
		return items;
	});
	
	$('.menu_button, .menu_close').on('click', function(e) {
		$('.menu_button').parent().toggleClass('active');
		menu.toggleClass('show');
		header.toggleClass('menu_active');
	});
	
	$('.to_top').click(function(e) {
		page.animate({
			scrollTop: 0
		}, 1200);
		return false;
	});
	
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
		
		if(target.hasClass('clickable')) {
			target.addClass('active');
			target.find('.hidden').slideDown(300);
		}
		
		var scroll_num = $('[data-anchor="' + e + '"]').offset().top - trans + v;
		page.animate({
			scrollTop: scroll_num
		}, 1200);
	}	
	
	
	page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
		page.stop();
	});
	
	
	$('[data-svg]').each(function() {
		svgImage(this, $(this).attr('data-svg'));
	});	
	
	// ACF map functions
	// function new_map($el) {
		// var $markers = $el.find('.marker');
		// var args = {
			// zoom: 10,
			// center: new google.maps.LatLng(0, 0),
			// mapTypeId: google.maps.MapTypeId.ROADMAP
		// };
		// var map = new google.maps.Map($el[0], args);
		// map.markers = [];
		// $markers.each(function() {
			// add_marker($(this), map);
		// });
		// center_map(map);
		// return map;
	// }
	// function add_marker($marker, map) {
		// var latlng = new google.maps.LatLng($marker.attr('data-lat'), $marker.attr('data-lng'));
		// var marker = new google.maps.Marker({
			// position: latlng,
			// map: map
		// });
		// map.markers.push(marker);
		// if($marker.html()) {
			// var infowindow = new google.maps.InfoWindow({
				// content: $marker.html()
			// });
			// google.maps.event.addListener(marker, 'click', function() {
				// infowindow.open(map, marker);
			// });
		// }
	// }
	// function center_map(map) {
		// var bounds = new google.maps.LatLngBounds();
		// $.each( map.markers, function(i, marker) {
			// var latlng = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
			// bounds.extend(latlng);
		// });
		// if(map.markers.length == 1)	{
			// map.setCenter(bounds.getCenter());
			// map.setZoom(16);
		// }	else {
			// map.fitBounds(bounds);
		// }
	// }
	// var map = null;
	// $('.map_item').each(function(){
		// map = new_map($(this));
	// });
	
	function wowCount(el) {
		var self = el;
		// var num = self.find('.fact_num');
		var countTo = 100;
		$({countNum: self.text()}).animate({
			countNum: countTo
		},{ 
			duration: 2000,
			easing: 'swing',
			step: function() {
				self.text(Math.floor(this.countNum));
			},
			complete: function() {
				self.text(this.countNum);
			}
		});
	}
	
	$(window).on("load", function() {
		pageLoaded = true;

		if (window.location.hash) {
			var v = 0;
			var vw = $(window).width();
			if(!$('.content_static').hasClass('visual_default') && vw > 1200) {
				v = $(window).height();
			}
			scrollTo(window.location.hash.substring(1),v);
		}
		NProgress.done(false);
		$('.loading_screen').addClass('cls_ready');
		$('.loading_screen').delay(1000).fadeOut(500, function() {
			$('.visual').each(function() {
				if ($(this).data("mwa:slide")) {
					$(this).data("mwa:slide").refresh();
				}
			});
			var vid = $('.visual').find('video')[0];
			// setTimeout(function() {
				// console.log('test');
				// if(vid) {
					// vid.play();
				// }
			// }, 500);
			
			
		});
		openMenu(
			$('#menu-main-menu li.current_page_item .sub-menu, #menu-main-menu li.current_page_parent .sub-menu'),
			$('#menu-main-menu li.current_page_item, #menu-main-menu li.current_page_parent')
		);
		
		// $(".visual video").each(function() {
			// $(this).get(0).currentTime = 0;
		// });

		if ($(".visual_first").length > 0) {
			$('.content_static').css('position', 'fixed');
		}
	});

	$(window).on("resize", function() {
		$('.visual').each(function() {
			if ($(this).data("mwa:slide")) {
				$(this).data("mwa:slide").refresh();
			}
		});
	});
	
	$("a[href^=\"#\"]").click(function(evt) {
		var href = $(this).attr("href").replace(window.location.origin, "");
		var url = href.substr(0, href.indexOf("#"));
		var hash = href.substr(href.indexOf("#") + 1);
		
		if (url == "" || url == window.location.pathname) {
			evt.preventDefault();
			scrollTo(hash);
		}
	});

	$('.visual').each(function() {
		if ($(this).find('figure').length > 1) {
			var first = $(this).find("figure img").eq(0);
			var self = this;
			
			if (first.get(0).complete) {
				createSlideshow(self);
			}
			else {
				first.on("load", function() {
					$(this).off("load");
					createSlideshow(self);
				});
			}
		} else if ($(this).find('.image').length > 1) {
			var first = $(this).find(".image").eq(0);
			var self = this;
			
			var img = document.createElement("img");
			var vid = first.find('video');
			
			if(img.length > 0) {
				img.src = first.find('.image_cont').css("background-image").replace(/(?:^url\(["']?|["']?\)$)/g, "");
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
			} else if(vid) {
				createSlideshow(self);
			}
		} else {
			if($(this).hasClass('visual_first')) {
				$(this).addClass('single_image');
			}
		}
	});
	
	$('.h_count.first').html(0);
	
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
		var count_cont = $('.h_count.first');

		if (counting) {
			if (count >= 100) {
				count = 100;
				counting = false;
			}
			
			count_cont.text(count++);
		}
		
		if (st !== scrollTop) {
			if (ww > 1024) {
				$('.visual:not(.event_visual), .image_text--img').each(function(e) {
					var viewportOffset = $(this)[0].getBoundingClientRect();
					$(this).find('img, .image').css('transform', 'translate(0, ' + Math.round((viewportOffset.top) * -.1) + 'px)');
					// $(this).find('figcaption').css('transform', 'translate(-50%, ' + Math.round(viewportOffset.top * .1) + 'px)');
				});
				// $('.projects_wrap').each(function(e) {
					// var viewportOffset = $(this)[0].getBoundingClientRect();
					// $(this).find('.projects_text').css('transform', 'translate(0, ' + Math.round((viewportOffset.top) * .25) + 'px)');
					// $(this).find('.projects_bg_cont').css('transform', 'translate(0, ' + Math.round((viewportOffset.top) * .05) + 'px)');
				// });
				parallaxItems.each(function(i) {
					var item = parallaxItems[i];
					var self = item.el;
					var viewportOffset = self.getBoundingClientRect();
					$(self).css('transform', 'translateY(' + (Math.round((viewportOffset.top)-(wh/2)) * item.multiplier) + 'px)');
				});
				
				const wowCont = $('.projects_wow_cont');
				if (wowCont.length > 0) {
					const wowEl = wowCont.find(".projects_wow");
					const maxY = wowCont.innerHeight() - wh;
					const factor = (maxY - wowEl.innerHeight()) / maxY;
					const minY = wowCont.offset().top
					
					let y = st - minY;
					
					if (y < 0) {
						y = 0;
					}
					
					if (y > maxY) {
						y = maxY;
					}
					
					y *= factor;
					
					console.log(y);
					wowEl.css("transform", `rotate(-90deg) translateX(-100%) translateX(${-y}px)`);
				}
			} else {
				$(this).find('img').css('transform', 'none');
				// $(this).find('figcaption').css('transform', 'none');
			}
			
			if (ww > 1280) {
				if ($(".visual_first").length > 0) {
					if (st >= wh) {
						$('.content_static').css('position', 'relative');
					} else {
						$('.content_static').css('position', 'fixed');
					}
				}
			}
			
			if (countAnimation && st > 200 && count_cont.length && count_cont.offset().top > st + 100 && count_cont.offset().top < st + wh - 100) {				
				counting = true;
				countAnimation = false;
			}
			
			if (st >= 10) {
				if(!header.hasClass('shrink')) {
					header.addClass("shrink");
					menu.addClass("shrink");
				}			
				if(st > scrollTop) {
					header.addClass('hide');
					sub_nav.addClass('sticky');
				} else {
					header.removeClass('hide');
					sub_nav.removeClass('sticky');
				}
			} else {
				header.removeClass("shrink");
				menu.removeClass("shrink");
			}
			
			if(sub_nav_cont.length > 0) {
				var num = header.not('.hide').outerHeight() || 0;
				var sub_nav_offset = sub_nav_cont.offset().top - num;
				if (st >= sub_nav_offset) {
					if(!sub_nav.hasClass('fixed')) {
						sub_nav.addClass("fixed");
					}
				} else {
					sub_nav.removeClass("fixed");
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
				var el = $('a[href="'+pathname+'#'+id+'"]').parent();
				var el2 = $(".content_submenu").find('a[href="'+pathname+'#'+id+'"]').parent();
				el.addClass("active");
				moveLine(el2);
			}
			
			scrollTop = st;
		}

		scroll();

		window.requestAnimationFrame(onAnimationFrame);
	}
	
	function createSlideshow(element) {
		if ($(element).data("mwa:slide")) {
			return;
		}

		var controls = $(element).find('.slide_controls');
		var next = $(document.createElement('div'));
		var prev = $(document.createElement('div'));
		// var figure = $(element).find("figure");
		var drag = true;
		var chevron = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48" enable-background="new 0 0 48 48" xml:space="preserve">\
			<circle fill="#ffffff" fill-opacity="0" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" cx="24" cy="24" r="18"></circle>\
			<g>\
				<line fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" x1="27.1" y1="24" x2="22.9" y2="28.2"></line>\
				<line fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" x1="27.1" y1="24" x2="22.9" y2="19.8"></line>\
			</g>\
		</svg>';
		var chevron_new = '<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" viewBox="0 0 446.10001 448" version="1.1" id="svg4" sodipodi:docname="arrow.svg" width="446.10001" height="448" inkscape:version="0.92.3 (2405546, 2018-03-11)"> <metadata id="metadata10"> <rdf:rdf> <cc:work rdf:about=""> <dc:format>image/svg+xml</dc:format> <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"></dc:type> <dc:title></dc:title> </cc:work> </rdf:rdf> </metadata> <defs id="defs8"></defs> <sodipodi:namedview pagecolor="#ffffff" bordercolor="#666666" borderopacity="1" objecttolerance="10" gridtolerance="10" guidetolerance="10" inkscape:pageopacity="0" inkscape:pageshadow="2" inkscape:window-width="1920" inkscape:window-height="1017" id="namedview6" showgrid="false" inkscape:zoom="0.4609375" inkscape:cx="224" inkscape:cy="256" inkscape:window-x="-8" inkscape:window-y="-8" inkscape:window-maximized="1" inkscape:current-layer="svg4"></sodipodi:namedview> <path d="m 3.51525,231.536 7.07,7.071 c 4.686,4.686 12.284,4.686 16.971,0 L 206.05025,60.113 V 436 c 0,6.627 5.373,12 12,12 h 10 c 6.627,0 12,-5.373 12,-12 V 60.113 l 178.494,178.493 c 4.686,4.686 12.284,4.686 16.971,0 l 7.07,-7.071 c 4.686,-4.686 4.686,-12.284 0,-16.97 l -211.05,-211.05 c -4.686,-4.686 -12.284,-4.686 -16.971,0 L 3.51525,214.566 c -4.687,4.686 -4.687,12.284 0,16.97 z" id="path2" inkscape:connector-curvature="0"></path> </svg>';
		// prev.html(chevron);
		// next.html('<div class="next_cont"><span>NEXT</span></div>');
		prev.html(chevron_new);
		next.html(chevron_new);
		
		$(element).append(prev).append(next);
		
		// var stopOnManualChange = true;
		// var pause = 8000;
		
		// if ($(element).hasClass("visual_first")) {
			// stopOnManualChange = false;
			// pause = 4500;
		// }
				
		$(element).slide({
			// effect: 'fade',
			elements: $(element).find('figure, .image'),
			autoplay: true,
			stopOnManualChange: false,
			duration: 1000,
			pause: 7000,
			touch: drag,
			nextButton: next,
			prevButton: prev,
			containerHeight: function(elements, container, effect) {
				if (container.hasClass("visual_first")) {
					return Math.floor(elements.eq(0).innerHeight());
				}
				
				var first = elements.eq(0).find("img").get(0);

				// if ($('.video_poster').length > 0) {
					// first = elements.eq(0).find("video");
					// var w = first.innerWidth();
					// var h = first.innerHeight();
					// return Math.floor(h / w * container.width());
				// }
				
				var w = first.naturalWidth;
				var h = first.naturalHeight;
				
				return Math.floor(h / w * container.width()) * 0.9;
			},
			controls: controls,
			beforeChange: function(new_index) {
				this.delay = 0;
			},
			afterChange: function(old_index) {
				var index = this.currentIndex;
				var indexOld = this.oldIndex;
				var prev = $(this.allElements).eq(indexOld);
				var self = $(this.slideshowContainer).find('.image.active');
				
				wowCount(self.find('.count'));

				if ($(this.slideshowContainer).find('.active').hasClass('menu_color_white')) {
					menu_block.addClass('menu_color_white');
				} else {
					menu_block.removeClass('menu_color_white');
				}

				if ($(this.slideshowContainer).find('.active').hasClass('logo_color_white')) {
					logo_text.addClass('logo_color_white');
				} else {
					logo_text.removeClass('logo_color_white');
				}
				
				$(this.slideshowContainer).find('.main-line').addClass('reveal_visible_slider');
				$(this.slideshowContainer).find('.sub-line').addClass('reveal_visible_slider');
				
				var currentSlide = $(this.elements).eq(index);
				
				if (index != old_index) {
					$(this.elements).each(function() {
						var video = $(this).find("video");
						if (video.length === 0) return;
						video = video.get(0);
						video.pause();
						video.currentTime = 0;
					});
				}
				
				var currentVideo = currentSlide.find("video");
				if (currentVideo.length > 0) {
					currentVideo.get(0).play();
				}
			}
		});
		
		$(element).find('figure, .image').not(".clone").eq(0).addClass("breath");
	}
	
	function scroll() {
		var scrollTop = $(window).scrollTop();
		var height = $(window).height()
		var visibleTop = scrollTop + height;

		$('.reveal').each(function() {
			var $t = $(this);
			
			if ($t.hasClass('reveal_visible')) return;
			
			var top = $t.offset().top;
			
			if (top <= visibleTop) {
				if (top + $t.height() < scrollTop) {
					$t.removeClass('reveal_pending').addClass('reveal_visible');
				} else {
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
	
	$('.hl_item_list').click(function(e) {
		var self = $(this);
		if(self.hasClass('active')) {
			self.removeClass('active');
		} else {
			$('.hl_item_list').removeClass('active');
			self.addClass('active');
		}
	});
	

	$('.gallery_controls_item').click(function() {
		var self = $(this);
		var type = self.data('button');
		$('.gallery_controls_item').removeClass('active');
		self.addClass('active');
		if(self.hasClass('gallery_text')) {
			$('.project_overlay').addClass('show');
		} else {
			$('.project_overlay').removeClass('show');
		}
	});
	
	$('.project_overlay_close').click(function() {
		$('.project_overlay').removeClass('show');
		$('.gallery_text').removeClass('active');
		$('.gallery_pic').addClass('active');
	});
	
	$(".content_links a").hover( hoverVideo, hideVideo );

	function hoverVideo(e) {
		$(e.currentTarget).find('video').get(0).play();
	}
	function hideVideo(e) {
		$(e.currentTarget).find('video').get(0).pause();
	}
	
	var carousel_project = $('.grid_carousel');
	var carousel_news = $('.news_carousel');
	var news_next = $('.news_next');
	var news_prev = $('.news_prev');
	var grid_next = $('.grid_next');
	var grid_prev = $('.grid_prev');
	carousel_project.owlCarousel({
		items:2,
		center: true,
		loop:true,
		autoplay:true,
		autoplayTimeout: 5000,
		autoplaySpeed: 1500,
		autoplayHoverPause: true,
		navSpeed: 1200,
		touchDrag: true,
		nav: false,
		dots: false,
		rewind: false,
		responsive : {
			0: {
				items:1,
			},
			1024: {
				items:2,
			}
		}
	});
	carousel_news.owlCarousel({
		items:3,
		center: true,
		loop:true,
		touchDrag: true,
		nav: false,
		rewind: false,
		dots: false,
		autoplay:true,
		autoplayTimeout: 5000,
		autoplaySpeed: 1500,
		autoplayHoverPause: true,
		navSpeed: 1200,
		responsive : {
			0: {
				items:1,
			},
			768: {
				items:2,
			},
			1025: {
				items:3,
			}
		}
	});
	
	news_next.click(function() {
    carousel_news.trigger('next.owl.carousel', [1200]);
		carousel_news.trigger('stop.owl.autoplay');
	})
	news_prev.click(function() {
		carousel_news.trigger('prev.owl.carousel', [1200]);
		carousel_news.trigger('stop.owl.autoplay');
	})
	grid_next.click(function() {
    carousel_project.trigger('next.owl.carousel', [1200]);
		carousel_project.trigger('stop.owl.autoplay');
	})
	grid_prev.click(function() {
		carousel_project.trigger('prev.owl.carousel', [1200]);
		carousel_project.trigger('stop.owl.autoplay');
	})
	
	$('.sub_menu a, .sub-menu li a, .accordion_block .acc_anchor').click(function(e) {
		var href = $(this).attr('href');
		var anchor = href.substring(href.indexOf('#')+1);
		// var h = sub_nav.outerHeight()+25;
		scrollTo(anchor);
	});
	
	$('.hl_item_video').click(function() {
		var self = $(this);
		var link = self.attr('data-vid');
		var img = self.find('img').attr('src');
		var modal = $(".video_modal");
		var cont = modal.find('.video_modal_cont');
		cont.html('');
		$('<video/>')
		.attr('controls',true)
		.attr('poster',img)
		.append($('<source/>').attr('src',link).attr('type','video/mp4'))
		.append($('<img/>').attr('src',img).attr('alt','')).appendTo(cont);
		modal.fadeIn(500);
	});
	
	$('.video_modal_close, .video_modal_bg, .modal_close, .modal_bg').click(function() {
		var self = $(this);
		self.parent().fadeOut(500);
		$(".video_modal .video_modal_cont").html('');
	});
	
	$('.scroll_down').click(function() {
		page.animate({
			scrollTop: $('.visual_first').outerHeight()
		}, 1000);
		return false;
	});
	
	// News accordion toggle
	$('.read_more .news_header, .read_more .news_item_link').click(function(e) {
		var self = $(this);
		var parent = self.closest('.news_item');
		var hidden = parent.find('.hidden');
		
		if(parent.hasClass('active')) {
			parent.removeClass('active');
			hidden.stop().slideUp(300);
		} else {
			$('.news_item').removeClass('active');
			$('.news_item .hidden').slideUp(300);
			parent.addClass('active');
			hidden.stop().slideDown(300);
		}
	});
	
	// Accordion toggle
	$('.acc_toggle').click(function(e) {
		var self = $(this);
    self.toggleClass('active');
    self.next().stop().slideToggle(500);
  });
	
	// Karriere select
	$('.select_placeholder').click(function(e) {
		var self = $(this);
		var values = self.next('.select_values');
		values.toggleClass('active');
		self.toggleClass('active');
	});
	
	$(document).click(function (e) {
    e.stopPropagation();
    var container = $(".select");
    if (container.has(e.target).length === 0) {
			$('.select_placeholder, .select_values').removeClass('active');
    }
	});
	
	$('.select_value').click(function() {
		var self = $(this);
		var value = self.text();
		var select = self.closest('.select');
		var placeholder_text = select.find('.select_placeholder_text');
		var input = select.find('input');
		placeholder_text.addClass('active').text(value);
		// placeholder_text.attr('data-value',value);
		input.val(value);
		select.find('.select_placeholder, .select_values').removeClass('active');
	});
	
	
	
	$(".sd_form").on("submit", function(e) {
		e.preventDefault();
		var self = $(this);
		var overlay = $('.mail_pending');
		var message = modal.find('.modal_message');
		var invalid = false;
		var bchk = self.find('#bchk').val();
		if(bchk !== '') {
			invalid = false;
		}
		$(".required").each(function() {
			var el = $(this);
			var input = el.find('input');
			if ($.trim(input.val()).length == 0) {
				invalid = true;
				el.addClass('field_error');
			} else {
				el.removeClass('field_error');
			}
		});
		
		if (invalid) {
			message.text('Es wurden nicht alle Felder ausgefÃ¼llt');
			modal.fadeIn(400);
      return false;
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
						modal.fadeIn(400);
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
	
	$('#menu-main-menu li span').click(function() {
		var self = $(this);
		var parent = self.parent();
		var sub_menu = parent.find('.sub-menu');
		if(parent.hasClass('active')) {
			// sub_menu.stop().slideUp(300);
			// parent.removeClass('active');
			closeMenu(sub_menu,parent);
		} else {
			// $('#menu-main-menu li').removeClass('active').find('.sub-menu').slideUp(300,function() {
				// parent.addClass('active');
				// sub_menu.stop(true, false).slideDown(300);
			// });
			closeAllMenu();
			openMenu(sub_menu,parent);
		}
	});
	
	function closeMenu(sub_menu,parent) {
		sub_menu.stop().slideUp(300);
		parent.removeClass('active');
	}
	
	function openMenu(sub_menu,parent) {
		parent.addClass('active');
		sub_menu.stop().slideDown(300);
	}
	
	function closeAllMenu() {
		$('#menu-main-menu li.active .sub-menu').slideUp(300);
		$('#menu-main-menu li.active').removeClass('active');
	}
	
	if ($("#canvas").length > 0) {
		var canvas = $('#canvas')[0];
		var fillColor = "#e6e6e6";
		var elCount = 9;

		var startAngle = 0.55;
		var arc = Math.PI / (elCount / 2);
		var ctx = canvas.getContext("2d");
		
		var outsideRadius = 200;
		var insideRadius = outsideRadius - 24;
		
		var centerX = canvas.width / 2;
		var centerY = canvas.height - outsideRadius;
		
		ctx.clearRect(0,0,canvas.width,canvas.height);
		for(var i = 0; i < elCount; i++) {
			var angle = startAngle + i * arc;
			ctx.fillStyle = fillColor;
			ctx.beginPath();
			ctx.arc(centerX, centerY, insideRadius, angle, (angle + arc) - (arc/12), false);
			ctx.arc(centerX, centerY, outsideRadius, (angle + arc) - (arc/12), angle, true);
			ctx.fill(); 
			ctx.save();
			ctx.restore();
		}
		
		// $(".image_fixed_tgs_text").css({
			// top: centerY,
			// maxWidth: insideRadius * 1.8
		// });
	}
	
	if($('.visual.video')) {
		volumeControls();
	}
	
	$('.event_option_label').click(function() {
		var self = $(this);
		var parent = self.parent();
		var cont = self.next('.event_option_content');
		$('.event_option.active').removeClass('active');
		$('.event_option_content').stop().slideUp(300);
		$('#event_captcha_input, #event_submit, #name1').attr('disabled', false);
		$('.input_cont.req').removeClass("required");
		if(cont.length > 0) {
			parent.addClass('active');
			cont.stop().slideDown(300);
			$('.input_cont.req').addClass("required");
		}
	});
	
	$("form.event_form").on("submit", function(e) {
		e.preventDefault();
		var self = $(this);
		var overlay = $('.mail_pending');
		var message = modal.find('.modal_message');
		var invalid = false;
		
		$(".req").each(function() {
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
			message.text('Es wurden nicht alle Felder ausgefÃ¼llt');
			modal.fadeIn(400);
      return false;
		} else {
			overlay.fadeIn(300);
			
			var contact_form = self[0];
			var data = new FormData(contact_form);
			data.append("action", "event_submit");
			data.append("event_name", "messe");
			
			$.ajax({
				type: "POST",
				url: "/wp-admin/admin-ajax.php",
				contentType : false,
				processData : false,
				data: data,
				success: function(msg) {
					if(msg == "success") {
						message.text('Erfolgreich gesendet!');
						modal.fadeIn(400);
						$(".input_cont").each(function() {
							$(this).find('input[type=text],input[type=number],input[type=tel],input[type=email],textarea').val('');
						});
					} else {
						message.text("Error: " + msg);
						modal.fadeIn(400);
						console.log("Error: " + msg);
					}
					overlay.fadeOut(300);
				}, 
				error: function(msg){
					message.text("Error: " + msg);
					modal.fadeIn(400);
					console.log("Error: " + msg);
					overlay.fadeOut(300);
				}
			});
		}
	});
	
	$('.video_block').each(function() {
		var self = $(this);
		var video = $(this).find('video')[0];
		var progress = $('<span>');
		var progressTime = $('<div class="time">.0 sec</div>');
		var progressBar = $('<div class="bar"></div>').append(progress);
		var doc = document.documentElement;
		video.controls = false;
		
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
		
		video.addEventListener("play", progressLoop);		
		video.addEventListener("pause", () => window.clearInterval(progressLoop));
		video.addEventListener("click", () => {
			if (video.paused) {
				self.addClass('active');
				video.play();
				self.find('.video_play').fadeOut(300);
			} else {
				self.removeClass('active');
				video.pause();
			}
		});
		
		progressBar.click(e => {
			const rect = e.currentTarget.getBoundingClientRect();
			const x = e.originalEvent.pageX - rect.left;
			progress.width(`${x / rect.width * 100}%`);
			video.currentTime = x / rect.width * video.duration;
			progressTime.text("." + Math.round(video.currentTime) + " sec");
		});

		function progressLoop() {
			setInterval(function () {
				progress.width(Math.round((video.currentTime / video.duration) * 100) + "%");

				if (video.currentTime === video.duration) {					
					self.removeClass('active');
					window.clearInterval(progressLoop)
				}
			}, 100);
		}
		
		var progressCont = $('<div class="progress">')
			.append(progressBar);
			
		var volumeButton = $('<div class="volume" />')
			.click(function () {
				if(video.muted) {
					video.muted = false;
					$(this).removeClass('muted');
				} else {
					video.muted = true;
					$(this).addClass('muted');
				}
			})
			.append('<div class="mute_enabled">'+muted+'</div>')
			.append('<div class="mute_disabled">'+unmuted+'</div>')
		
		$('<div class="video_play">').click(function() {
			self.addClass('active triggered');
			video.play();
			$(this).fadeOut(200);
		}).appendTo(self);
		
		if(video.autoplay === true) {
			self.addClass('autoplay');
		}
		
		$('<div class="video_interface">')
			.append(playButton)
			.append(volumeButton)
			.append(progressCont)			
			.appendTo(self);
	});
	
})(jQuery);

var st = 0;
function volumeControls(slider) {
	"use strict;"

	if (document.getElementsByTagName("video").length == 0) return;
	const volume_muted = document.querySelector('button[data-action="video-unmute"]');
	const volume_unmuted = document.querySelector('button[data-action="video-mute"]');

	let scroll_position = 0;
	const video = document.getElementsByTagName("video")[0];
	const volume_slider_wrapper = document.getElementById("volume_slider_wrapper");
	const volume_slider = document.getElementById("volume_slider");
	const volume_slider_fill = document.getElementById("volume_slider_fill");
	const volume_slider_knob = document.getElementById("volume_slider_knob");
	let volume_first_time = false;

	if (!volume_slider) return;
	
	volume_muted.addEventListener("click", toggleVolume);
	volume_unmuted.addEventListener("click", toggleVolume);

	if (volume_slider) {
		volume_slider.addEventListener("mousedown", knobDragStart);
	}
	
	if (video) {	
		// const video_controls = document.querySelector(".video-controls");
		
		if (document.getElementById("video_timeline")) {
			var video_timeline_fill = document.getElementById("video_timeline_fill");
			var video_timeline_left = document.getElementById("video_timeline_left");
			var video_timeline_right = document.getElementById("video_timeline_right");
			// video.muted = false;
			//fadeVolumeDown();
			// video.play();
			video.addEventListener('timeupdate', (event) => {
				var duration = Math.floor(video.duration);
				video_timeline_right.innerHTML = duration + " sec";
				var current = Math.floor(video.currentTime);
				var percent = 100 * current / duration;
				video_timeline_left.innerHTML = current + " sec";
				video_timeline_fill.style.minWidth = percent + "%";
			});
			/*
			window.addEventListener('scroll', function(e) {
				scroll_position = window.scrollY;
				if(scroll_position > document.getElementById('visual').offsetHeight){
					fadeVolumeDown();
				}
			});
			*/
		}
		
		if (slider) {
			slider.events.on('indexChanged', function(info, eventName) {
				VolumeDown();
			});
		}
	}
	
	function toggleVolume() {
		if (video.muted) {
			volume_unmuted.style.display = "initial";
			volume_muted.style.display = "none";
			video.muted = false;
			video.volume = 1;
			volume_slider_fill.style.width = (video.volume * 100) + "%";
			volume_slider_knob.style.left = (video.volume * 100) + "%";
		} else {
			volume_unmuted.style.display = "none";
			volume_muted.style.display = "initial";
			video.muted = true;
			volume_slider_fill.style.width = 0;
			volume_slider_knob.style.left = 0;
		}
	}
	
	function setVolumeSlider() {
		if (video.volume == 0) {
			volume_unmuted.style.display = "none";
			volume_muted.style.display = "initial";
		} else {
			volume_unmuted.style.display = "initial";
			volume_muted.style.display = "none";
		}
		volume_slider_fill.style.width = (video.volume * 100) + "%";
		volume_slider_knob.style.left = (video.volume * 100) + "%";

		if (volume_first_time) {
			video.currentTime = 0;
			volume_first_time = false;
		}
	}
	
	function VolumeDown() {
		volume_unmuted.style.display = "none";
		volume_muted.style.display = "initial";
		volume_slider_fill.style.width = 0;
		volume_slider_knob.style.left = 0;
		video.volume = 0;
	}
	
	function fadeVolumeDown(){
		// volume_down.style.display = "none";
		// volume_up.style.display = "none";
		// volume_mute.style.display = "initial";
		// volume_slider_fill.style.width = 0;
		// volume_slider_knob.style.left = 0;
		// var interval = setInterval(function(){
		// if(video.volume > 0.05){
			// video.volume -= 0.05;
		// }
		// else if(video.volume < 0.05){
			// video.volume = 0;
			// clearInterval(interval);
		// }
		// else{
			// clearInterval(interval);
		// }
		// }, 1000);
		if (video.muted) return;
		
		const visual = document.querySelector('.visual');
		const vol = 1 - window.scrollY / visual.clientHeight;
		console.log(window.scrollY);
		if (vol < 0) {
			video.volume = 0;
			toggleVolume();
		} else if (vol > 1) {
			video.volume = 1;
		} else {
			video.volume = vol;
		}

		setVolumeSlider();
	
	}
	
	function svgImage(element, src, callback) {
		var req = new XMLHttpRequest();
		req.open("GET", src);
		req.addEventListener("load", function(e) {
			var data = e.currentTarget.responseText;
			var repl = data.replace(/<\?xml.*?>/, '').replace(/<!DOCTYPE.*?>/, '');
			element.innerHTML = repl;
			if (callback) callback.call(element);
		});
		req.send();
	}
	
	function knobDragStart(e) {
		e.preventDefault();
		e.stopImmediatePropagation();
		e.currentTarget.removeEventListener("mousedown", knobDragStart);
		document.addEventListener("mouseup", knobDragEnd);
		document.addEventListener("mousemove", knobDragMove);
		knobDragMove(e);

		if (volume_first_time) {
			video.currentTime = 0;
			volume_first_time = false;
		}
	}
	
	window.requestAnimationFrame(onAnimationFrame);

	function onAnimationFrame() {
		if (volume_slider && st != window.scrollY) {
			fadeVolumeDown();
		}

		st = window.scrollY;

		window.requestAnimationFrame(onAnimationFrame);
	}
	
	function fullOffset(element, depth) {
		var offsetLeft = element.offsetLeft;
		var offsetTop = element.offsetTop;
		var parent = element.offsetParent;
		var i = 1;

		while (parent != null) {
			offsetLeft += parent.offsetLeft;
			offsetTop += parent.offsetTop;
			parent = parent.offsetParent;
			
			++i;
			
			if (depth && i >= depth) break;
		}

		return { left: offsetLeft, top: offsetTop };
	}

	function knobDragMove(e) {
		var d = (e.clientX - fullOffset(volume_slider_wrapper, 1).left) / volume_slider_wrapper.clientWidth;

		if (d < 0) {
			d = 0;
		} else if (d > 1) {
			d = 1;
		}
		
		if (d > 0) {
			video.muted = false;
		} else {
			video.muted = true;
		}
		
		video.volume = d;
		
		if (d == 0) {
			volume_unmuted.style.display = "none";
			volume_muted.style.display = "initial";
		} else {
			volume_unmuted.style.display = "initial";
			volume_muted.style.display = "none";
		}
		
		volume_slider_fill.style.width = (video.volume * 100) + "%";
		volume_slider_knob.style.left = (video.volume * 100) + "%";
	}

	function knobDragEnd(e) {
		volume_slider.addEventListener("mousedown", knobDragStart);
		document.removeEventListener("mouseup", knobDragEnd);
		document.removeEventListener("mousemove", knobDragMove);
	}
}

$(document).on('click', '.controls span', function() {
	var cont = $(this).closest('.num_cont');
	var qty = cont.find('input[type="number"]');
	var val = parseFloat(qty.val());
	var max = parseFloat(qty.attr('max'));
	var min = parseFloat(qty.attr('min'));
	var step = parseFloat(qty.attr('step'));
	var sub = cont.find('.sub');
	var names = $('#event_names');

	if ($(this).is('.add')) {
		if (max && (max <= val)) {
			qty.val(max);
		} else {
			var num = val + step;
			qty.val(num);
		}
	} else {
		if (min && (min >= val)) {
			qty.val(min);
		} else if (val > 0) {
			qty.val(val - step);
		}
	}
	
	if(qty.val() == min) {
		sub.addClass('disabled');
	} else {
		sub.removeClass('disabled');
	}

});