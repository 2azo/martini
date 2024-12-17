(function($) {
	"use strict";
	
	var chevron = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48" enable-background="new 0 0 48 48" xml:space="preserve"><circle fill="#ffffff" fill-opacity="0" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" cx="24" cy="24" r="18"></circle><g><line fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" x1="27.1" y1="24" x2="22.9" y2="28.2"></line><line fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" x1="27.1" y1="24" x2="22.9" y2="19.8"></line></g></svg>';
	
	var rafId = null;
	var delay = 100;
	var lTime = 0;
	var scrollTop = -1;
	var loaded = false;
	var page = $("html, body");
	var pageHeader = $("#nav-cont");
	var footer_height = $("#footer").outerHeight(true) + $(".group-cont").outerHeight(true);
	var ajax;

	$(".to-top").click(function() {
		page.animate({
			scrollTop: 0
		}, 1200);
		return false;
	});

	$(".mobile-menu").click(function() {
		$(".nav-menu").stop().fadeToggle();
		$(this).toggleClass('active');
	});

	var windowHeight = $(window).innerHeight();
	
	$(".header_cont").click(function(e) {
		var item_cont_all = $(".news_item");
		var item_cont = $(this).parent();
		var c_item = item_cont.find(".news_content");

		$(".news_content").slideUp(500);
		item_cont_all.removeClass("show");

		if (c_item.css("display") == "none") {
			c_item.slideDown(500);
			item_cont.addClass("show");
		}	else {
			c_item.slideUp(500);
			item_cont.removeClass("show");
		}
	});

	if (!window.sessionStorage.getItem("mwa_slide_down") && window.scrollY === 0 && !window.location.hash) {
		//window.scroll(0, 460);
		window.setTimeout(function() {
			page.animate({
				scrollTop: 460
			}, 1500);
		}, 2000);
	}

	$(window).on("load", function() {
		loaded = true;
		
		NProgress.done(false);
		$('.loading_screen').addClass('cls_ready');
		//$('.loading_screen').delay(1800).fadeOut(500);
		$('.loading_screen').fadeOut(500);
		
		if (window.location.hash) {
			var cont = $('[data-id="' + window.location.hash.substring(1) + '"]');
			page.animate({
				scrollTop: cont.offset().top - pageHeader.outerHeight()
			}, 1200);
			cont.addClass('show');
			cont.find('.news_content').slideDown(500);
			
			//scrollTo(window.location.hash.substring(1));
		}
		
		//var img_height = $(".visual").find("img").innerHeight();
		// $(".visual").height(img_height);
		//$(".visual div").first().height(img_height);
		// $(".visual .visual_cont").height(img_height);
		// $(".visual figure").height(img_height);
		
		$('.visual').each(function() {
			if ($(this).data("mwa:slide")) {
				$(this).data("mwa:slide").refresh();
			}
		});

		if (!window.sessionStorage.getItem("mwa_slide_down")) {
			//window.setTimeout(function() {
				//$("html, body").animate({
				//	scrollTop: 460
				//}, 1000);
				window.sessionStorage.setItem("mwa_slide_down", false);
			//}, 2000);
		}
	});
	
	$('.visual').each(function() {
		if ($(this).find('.image').length >= 1) {
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
		} else if ($(this).find('.image_video').length > 1) {
			var self = this;			
			var first = $(this).find(".image_video video");
			first.on('loadeddata', function(e) {
				createSlideshow(self);
			});
		}
	});

	window.requestAnimationFrame(onAnimationFrame);

	function onAnimationFrame() {
		var st = window.pageYOffset;

		if (st !== scrollTop) {
			if (st >= 10) {
				if (!pageHeader.hasClass("fixed-nav")) {
					pageHeader.addClass("fixed-nav");
				}
			}
			else {
				pageHeader.removeClass("fixed-nav");
			}

			$(".visual").each(function(e) {
				var ww = $(window).innerWidth();
				if (ww >= 1025) {
					var viewportOffset = $(this)[0].getBoundingClientRect();
					$(this).find("img").css("transform", "translate(0, " + Math.round(viewportOffset.top * -.1) + "px)");
					$(this).find(".slider-text").css("transform", "translate(0, " + Math.round(viewportOffset.top * .1) + "px)");
				}
			});

			var wh = $(window).innerHeight();

			scrollTop = st;
		}

		scroll();
		window.requestAnimationFrame(onAnimationFrame);
	}

	function reveal() {
		rafId = null;
		var now = performance.now();

		if (now - lTime > delay) {
			lTime = now;
			var $ts = $(".reveal_pending");
			$($ts.get(0)).removeClass("reveal_pending").addClass("reveal_visible");
		}
		if ($(".reveal_pending").length >= 1) rafId = requestAnimationFrame(reveal);
	}

	function scroll() {
		var scrollTop = $(window).scrollTop();
		var height = $(window).height()
		var visibleTop = scrollTop + height;
		$(".reveal").each(function() {
			var $t = $(this);
			if ($t.hasClass("reveal_visible")) {
				return;
			}
			var top = $t.offset().top;
			if (top <= visibleTop) {
				if (top + $t.height() < scrollTop) {
					$t.removeClass("reveal_pending").addClass("reveal_visible");
				}
				else {
					$t.addClass("reveal_pending");
					if (!rafId) requestAnimationFrame(reveal);
				}
			}
		});
		// underline reveal script
		if (loaded) {
			$(".underline").each(function(index, element) {
				if (visibleTop >= $(this).offset().top) {
					$(this).addClass("show");
				}
			});
			$(".image-fade").each(function(index, element) {
				if (visibleTop >= $(this).offset().top) {
					$(this).addClass("show");
				}
			});
		}
	}
	
	page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
		page.stop();
	});
	
	$('.staff-item .si-left .si-header, .team_arrow').click(function() {
		var self = $(this);
		self.closest('.staff-item').toggleClass('collapsed');
	});
	
	

	function createSlideshow(element) {
		if ($(element).data("mwa:slide")) {
			return;
		}
			var controls = $(element).find(".slide-controls");
			var next = $(document.createElement("div"));
			var prev = $(document.createElement("div"));
			var figure = $(element).find("figure");
			var elements = $(element).find('figure').not(".clone").eq(0);
			
			var drag = false;
			var anim_style="fade";

			prev.html(chevron);
			next.html(chevron);
			
			if(figure.length > 1) {
				$(element).append(prev).append(next);
				drag = true;
			}
			
			if($(element).hasClass('visual_video')) {
				anim_style = "horizontal";
			}

			//controls.html('');

			//var firstImage = $(this).find("figure").eq(0).find("img");
			//var self = $(this);
			//var makeSlide = function() {
				$(element).slide({
					effect: anim_style,
					elements: figure,
					duration: 1200,
					pause: 6000,
					touch: drag,
					nextButton: next,
					prevButton: prev,
					containerHeight: function(elements, container, effect) {
						if (container.hasClass("visual_first")) {
							return Math.floor(elements.eq(0).outerHeight());
						}
						var first = elements.eq(0).find("img").get(0);
						var w = first.naturalWidth;
						var h = first.naturalHeight;
						return Math.floor(h / w * container.width()) * .9;
					},
					controls: controls,
					controlElements: 'div',
					beforeChange: function(new_index) {
						this.delay = 800;
						$(this.slideshowContainer).find(".slider-text").removeClass("animation");
						$(this.slideshowContainer).find(".slider-header").removeClass("animation");
						$(this.slideshowContainer).find(".slider-subheader").removeClass("animation");
						
						var video = $(this.elements).eq(this.currentIndex).find("video");
						if (video.length) {
							video.get(0).pause();
						}
				
						var video2 = $(this.elements).eq(new_index).find("video");
						if (video2.length) {
							video2.get(0).pause();
							video2.get(0).currentTime = 0;
						}
					},
					afterChange: function(old_index) {
						var index = this.currentIndex+1;
						$(this.slideshowContainer).find(".slider-text").addClass("animation");
						$(this.slideshowContainer).find(".slider-header").addClass("animation");
						$(this.slideshowContainer).find(".slider-subheader").addClass("animation");
						
						$(this.slideshowContainer).find('.current').html(index);
						
						var video = $(this.elements).eq(this.currentIndex).find("video");
						if (video.length) {
							video.get(0).play();
						}
				
						var video2 = $(this.elements).eq(old_index).find("video");
						if (video2.length && this.currentIndex != old_index) {
							video2.get(0).pause();
						}
					}
				});
				
				// $(controls[0].children).unbind('click');
				var video = $(element).find('figure').not(".clone").eq(0).find("video");
				if (video.length) {
					video.get(0).play();
				}
			//};
			
			// if (firstImage.get(0).complete) {
				// makeSlide();
			// }
			// else {
				// firstImage.on("load", function() {
					// makeSlide();
				// });
			// }
		//}
	};
	
	$("#contact_form").on("submit", function(e) {
    	e.preventDefault();
		var overlay = $('.mail_pending');
		var name = $('#name').val();
		var mail = $('#mail').val();
		var bet = $('#betreff').val();
		var msg = $('#message').val();
		var dts = $('#opt_9_0').is(':checked');
		var invalid = false;
		$(".required").each(function() {
			var el = $(this);
			var el_parent = el.parent();
			if ($.trim(el.val()).length == 0) {
				invalid = true;
				el_parent.addClass('field_error');
			} else {
				el_parent.removeClass('field_error');
			}
		});
		
		if (invalid) {
			show_toast('Es wurden nicht alle Felder ausgefüllt');
      return false;
    } else if (!dts) {
			show_toast("Bitte bestätigen Sie, dass Sie die Datenschutzhinweise zur Kenntnis genommen haben.");
			return false;
		} else {
			overlay.fadeIn(300);
			
			var contact_form = document.getElementById("contact_form");
			var data = new FormData(contact_form);
			data.append("action", "send_mail");
			
			console.log(data);
			
			$.ajax({
				type: "POST",
				url: "/wp-admin/admin-ajax.php",
				//dataType: 'html',
				contentType : false,
				processData : false,
				data: data,
				/*
				data: {
					'action': 'send_mail',
					'name': name,
					'mail': mail,
					'bet': bet,
					'msg': msg,
				},
				*/
				success: function(msg) {
					if(msg == "success") {
						show_toast('E-Mail erfolgreich gesendet!');
						$(".cform-input-cont").each(function() {
							$(this).find('input:not([type="button"]), textarea, select').val('');
						});
					} else {
						show_toast('Error!');
						console.log('Error:');
						console.log(msg);
					}
				}, 
				error: function(msg){
					show_toast('Error!');
					console.log("Error: " + msg);
				}
			});
			overlay.fadeOut(300);
		}
	});
	
	function show_toast(text) {
    $('<div/>')
		.addClass('toast')
		.prependTo('body')
		.text(text)
		.queue(function(next) {
			$(this).css({
				'opacity': 1
			});
			var topOffset = 100;
			$('.toast').each(function() {
				var $this = $(this);
				var height = $this.outerHeight();
				var offset = 15;
				$this.css('top', topOffset + 'px');

				topOffset += height + offset;
			});
			next();
			})
			.delay(3000)
			.queue(function(next) {
				var $this = $(this);
				var width = $this.outerWidth() + 20;
				$this.css({
					'opacity': 0
				});
				next();
			})
			.delay(600)
			.queue(function(next) {
				$(this).remove();
				next();
			});
	};
	
	$('.popup_close, .popup_bg').click(function() {
		var self = $(this);
		self.closest('.main_popup').addClass('hidden');
	});
	
	$(document).on('mouseover', ".nav-menu > ul > li.menu-item-has-children", function() {
		$('.menu_bg_overlay').stop().fadeIn(200);
	});
	$(document).on('mouseleave', ".nav-menu > ul > li.menu-item-has-children", function() {
		$('.menu_bg_overlay').stop().fadeOut(200);
	});
	
	
	function scrollTo(e,v) {
		v = v || 0;
		e = decodeURI(e);
		e = e.toLowerCase();
		var trans = 0;
		var target = $('[data-anchor="' + e + '"]');
		if(target.length < 1) {
            console.log("error 1")
			return;
		}
		if(!target.hasClass('reveal_visible')) {
            console.log("error 2")
			trans += 100;
		}
		
		var scroll_num = $('[data-anchor="' + e + '"]').offset().top - trans + v;
		page.animate({
			scrollTop: scroll_num
		}, 1200);
	}
		
	$(".scroll_link").click(function(evt) {
		var href = $(this).attr("href").replace(window.location.origin, "");
		var url = href.substr(0, href.indexOf("#"));
		var hash = href.substr(href.indexOf("#") + 1);
		
		if (url == "" || url == window.location.pathname) {

			scrollTo(hash);
		}
	});
	
})(jQuery);