/*!
 * MWA Slide 2.2.2
 *
 * Copyright 2012-2018, MARTINI Werbeagentur GmbH
 *
 */

(function() {

	"use strict";

	var Slide;

	(function($) {

		Slide = function(element, options) {
			var t = $(element);
			var self = this;

			this.placeholder = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
			this.queue = [];

			var test = document.createElement('div');

			if (test.style.transition !== undefined) {
				this.useTransitions = true;
			}
			else {
				this.useTransitions = false;
			}

			this.useTransitions = false;

			this.slideshowContainer = t;
			this.currentIndex = 0;
			this.delay = 0;
			this.mousePos = {
				x: 0,
				y: 0,
				distance: 0
			};

			this.isint = function(n) {
				return n === +n && n === (n | 0);
			};

			this.isfloat = function(n) {
				return n === +n && n !== (n | 0);
			};

			this.isnum = function(n) {
				return this.isint(n) || this.isfloat(n);
			};

			this.options = $.extend({
				duration: 1000,
				prevNextDuration: 0,
				pause: 4000,
				loop: true,
				controls: null,
				controlElements: 'span',
				prevButton: null,
				nextButton: null,
				elements: null,
				touch: true,
				minSlideDistance: 30,
				autoplay: true,
				direction: 'left', 
				effect: 'horizontal', // 'horizontal', 'vertical' or 'fade'
				completeFade: false, 
				preserveRatio: true,
				centerElements: true,
				stopOnManualChange: true,
				fullscreen: false,
				gap: 0,
				beforeChange: function() {},
				afterChange: function() {},
				containerHeight: function(elements, container, effect) {
					var w = Number.MAX_VALUE;
					var h = Number.MAX_VALUE;

					elements.each(function() {
						if (effect === 'vertical') {
							if ($(this).innerWidth() <= w) {
								h = $(this).innerHeight();
								w = $(this).innerWidth();
							}
						}
						else {
							if ($(this).innerHeight() <= h) {
								h = $(this).innerHeight();
								w = $(this).innerWidth();
							}
						}
					});

					return Math.floor(h / w * container.width());
				}
			}, options);

            console.log(this.options.effect); // test

			var i = t.children();

			if (this.options.elements !== null) {
				i = this.options.elements;
			}

			if (this.options.loop === false) {
				$(this.options.prevButton).addClass('disabled');

				if (i.length === 1) {
					$(this.options.nextButton).addClass('disabled');
				}
			}

			this.slideshowContainer.data('mwa:options', this.options);

			this.dequeue = function() {
				var el = self.queue.shift();

				if (!el) {
					return;
				}

				var img = new Image();
				img.src = el.source;
				$(img).on('load', function() {
					$(el.element).attr('src', img.src);
					$(el.element).data('loaded', true);
					$(el.element).removeAttr('width');
					$(el.element).removeAttr('height');
					self.refresh();
					self.dequeue();
				});
			};

			this.setOption = function(option, value) {
				this.options[option] = value;

				if (option === 'loop') {
					this.disablePrevNext();
				}
			};

			this.refresh = function() {
				if (self.slideshowContainer.data('mwa:slide:animating')) {
					self.slideshowContainer.data('mwa:slide:animating', false);
				}

				if (self.options.fullscreen) {
					self.allElements.css({
						width: '',
						height: ''
					});
					self.imageContainer.height('');
					self.slideshowContainer.height('');
				}
				else {
					self.allElements.css({
						width: self.slideshowContainer.width(),
						height: ''
					});
					var tmp_h = self.options.containerHeight(self.elements, self.slideshowContainer, self.options.effect);
					self.imageContainer.height(tmp_h);
					self.slideshowContainer.height(tmp_h);
				}

				var width = self.slideshowContainer.width();
				var height = self.slideshowContainer.height();

				this._gotoImpl(this.currentIndex, 0);

				if (!self.options.preserveRatio) {
					self.allElements.css({
						width: width,
						height: height
					});
				}
				else {
					if (self.options.fullscreen) {
						var ratio = width / height;

						self.allElements.css('max-width', 'none');
						self.allElements.each(function() {
							if ($(this).width() / $(this).height() < ratio) {
								$(this).width(width);
							}
							else {
								$(this).height(height);
							}
						});
					}
					else {
						self.allElements.css('max-width', '');

						if (self.options.effect === 'vertical') {
							self.allElements.each(function() {
								$(this).css({
									width: 'auto',
									height: height,
									marginLeft: 0,
									marginRight: 0,
									marginTop: self.options.gap,
									marginBottom: self.options.gap
								});
								if (self.options.centerElements) {
									$(this).css({
										marginLeft: Math.floor((width - $(this).outerWidth()) / 2.0)
									});
								}
							});
						}
						else {
							self.allElements.each(function() {
								$(this).css({
									width: width,
									height: 'auto',
									marginLeft: self.options.gap,
									marginRight: self.options.gap,
									marginTop: 0,
									marginBottom: 0
								});

								if (self.options.centerElements) {
									$(this).css({
										marginTop: Math.floor((height - $(this).outerHeight()) / 2.0)
									});
								}
							});
						}
					}
				}
			};

			this.disablePrevNext = function() {
				if (this.options.prevButton !== null) {
					var pb = $(this.options.prevButton);

					if (!this.options.loop && this.currentIndex <= 0) {
						pb.addClass('disabled');
					}
					else {
						pb.removeClass('disabled');
					}
				}

				if (self.options.nextButton !== null) {
					var nb = $(this.options.nextButton);

					if (!this.options.loop && this.currentIndex >= this.elements.length - 1) {
						nb.addClass('disabled');
					}
					else {
						nb.removeClass('disabled');
					}
				}
			};

			this.goto = function(index, duration, type, easing, force, delay_disabled) {
				if (self.elements.length === 1) {
					return;
				}

				force = force || false;
				delay_disabled = delay_disabled || false;

				if (index === this.currentIndex && !force) {
					return;
				}

				if (!this.isnum(duration)) {
					duration = this.options.duration;
				}

				if (duration !== 0) {
					duration = Math.max(duration, 300);
				}

				easing = easing || 'none';

				if (this.slideshowContainer.data('mwa:slide:animating') === false || force) {
					this.slideshowContainer.data('mwa:slide:animating', true);
					this.options.beforeChange.call(this, index, type, delay_disabled);

					if (this.delay > 0 && delay_disabled === false) {
						setTimeout(function() {
							self._gotoImpl(index, duration, type);
						}, this.delay);
						this.delay = 0;
					}
					else {
						this._gotoImpl(index, duration, type);
					}

					return true;
				}
				return false;
			};

			this._gotoImpl = function(index, duration, type) {
				var self = this;
				var width = this.slideshowContainer.width();
				var height = this.slideshowContainer.height();
				var p = this.imageContainer;
				var gap = 0;

				var pos_y;
				var pos_x;

				this.oldIndex = this.currentIndex;
				this.currentIndex = index;
				this.disablePrevNext();

        /* CE */
        $(this.allElements).removeClass('active');
        $(this.allElements[this.currentIndex+1]).addClass('active');
        /* -- */

				$(this.options.controls).find(this.options.controlElements).removeClass('active').eq(this.currentIndex).addClass('active');

				if (this.options.effect === 'horizontal' || this.options.effect === 'fade') {
					gap = parseInt(this.allElements.css('margin-left'));
					pos_x = -(this.currentIndex * (width + gap * 2) + gap + (this.options.loop ? width + gap * 2 : 0));
					pos_y = 0;
				}
				else {
					gap = parseInt(this.allElements.css('margin-top'));
					pos_x = 0;
					pos_y = -(this.currentIndex * (height + gap) + gap + (this.options.loop ? height + gap : 0));
				}

				if (this.options.effect === 'fade' && type !== 'touch' && type !== 'callback') {
					var num_children = this.allElements.not('.clone').length;
					var no_clones = this.allElements.not('.clone');

					if (this.options.completeFade) {
						if (this.currentIndex < 0) {
							this.currentIndex = num_children - 1;
						}
						else if (this.currentIndex >= num_children) {
							this.currentIndex = 0;
						}

						this.allElements.hide();
						no_clones.eq(this.oldIndex).show();
						no_clones.eq(this.oldIndex).fadeOut(duration / 2, function() {
							no_clones.eq(self.currentIndex).fadeIn(duration / 2, function() {
								self.callback.call(self);
							});
						});
					}
					else {
						var clone = no_clones.eq(this.oldIndex).clone(true);

						clone.css({
							position: 'absolute',
							left: no_clones.eq(this.oldIndex).offset().left
						});

						p.append(clone);

						if (this.currentIndex < 0) {
							no_clones.eq(num_children).show();
							this.currentIndex = num_children - 1;
						}
						else if (self.currentIndex >= num_children) {
							this.allElements.show();
							self.currentIndex = 0;
						}

						clone.css({
							left: -pos_x,
							zIndex: num_children + 3,
							float: 'none'
						});

						p.css({
							left: pos_x,
							top: pos_y
						});

						if (this.useTransitions) {
							clone.bind('transitionend', function() {
								$(this).remove();
								self.callback.call(self);
							});

							clone.css('transition', 'opacity ' + (duration / 1000) + 's ease');
							clone.css('opacity', 0);
						}
						else {
							clone.fadeOut(duration, function() {
								$(this).remove();
								self.callback.call(self);
							});
						}
					}
				}
				else {
					if (duration > 100) {
						p.animate({
							left: pos_x,
							top: pos_y
						}, duration, function() {
							self.callback.call(self);
						});
					}
					else {
						p.css({
							left: pos_x,
							top: pos_y
						});
						this.callback.call(this);
					}
				}
			};

			this.next = function(duration) {
				var num_children = this.imageContainer.children().not('.clone').length;
				
				if (!this.slideshowContainer.data('mwa:slide:animating') && this.currentIndex < num_children) {
					if (!this.options.loop && this.currentIndex === num_children - 1) {
						return false;
					}
					this.goto(this.currentIndex + 1, duration, 'nextprev');
					return this.currentIndex;
				}
				return false;
			};

			this.prev = function(duration) {
				if (!this.slideshowContainer.data('mwa:slide:animating') && this.currentIndex >= 0) {
					if (!this.options.loop && this.currentIndex === 0) {
						return false;
					}

					this.goto(this.currentIndex - 1, duration, 'nextprev');
					return this.currentIndex;
				}
				return false;
			};

			this.callback = function() {
				//var width = this.slideshowContainer.width();
				//var height = this.slideshowContainer.height();
				//var duration = this.options.duration;
				var p = this.imageContainer;
				var num_children = p.children().not('.clone').length;

				if (this.currentIndex >= num_children && this.options.loop) {
					this.goto(0, 0, 'callback', 'none', true, true);
				}

				if (this.currentIndex < 0 && this.options.loop) {
					this.goto(num_children - 1, 0, 'callback', 'none', true, true);
				}

				$(this.options.controls).find(this.options.controlElements).eq(this.currentIndex).addClass('active');

				$(this.slideshowContainer).data('mwa:slide:animating', false);
				this.options.afterChange.call(this, this.oldIndex);
			};

			this.resetTimer = function() {
				var self = this;
				clearInterval(this.timer);
				this.timer = setInterval(function() {
					self.tick.call(self);
				}, this.options.duration + this.options.pause);
			};

			this.tick = function() {
				if (!this.options.autoplay) {
					return false;
				}

				if (this.options.direction === 'left') {
					this.next();
				}
				else {
					this.prev();
				}

				return true;
			};

			if (this.options.prevButton !== null) {
				$(this.options.prevButton).addClass('slide-button slide-button-prev').click(function() {
					self.resetTimer();

					if (self.options.stopOnManualChange) {
						self.options.autoplay = false;
					}

					if (self.options.prevNextDuration > 0) {
						self.prev(self.options.prevNextDuration);
					}
					else {
						self.prev();
					}
				});
			}

			if (this.options.nextButton !== null) {
				$(this.options.nextButton).addClass('slide-button slide-button-next').click(function() {
					self.resetTimer();

					if (self.options.stopOnManualChange) {
						self.options.autoplay = false;
					}

					if (self.options.prevNextDuration > 0) {
						self.next(self.options.prevNextDuration);
					}
					else {
						self.next();
					}
				});
			}

			if (this.options.touch) {
				//this.options.effect = 'horizontal';
				this._getMousePos = function(element, evt) {
					var pos;
					if (evt.originalEvent.touch || evt.originalEvent.changedTouches) {
						var touch = evt.originalEvent.touches[0] || evt.originalEvent.changedTouches[0];

						pos = {
							x: touch.pageX - $(element).offset().left,
							y: touch.pageY - $(element).offset().top
						};
					}
					else {
						pos = {
							x: evt.pageX - $(element).offset().left,
							y: evt.pageY - $(element).offset().top
						};
					}
					return pos;
				};
				this._mouseMove = function(evt) {
					var pos = self._getMousePos(this, evt);

					if (!self.mousePos.started) {
						var deltaX = Math.abs(pos.x - self.mousePos.startX);
						var deltaY = Math.abs(pos.y - self.mousePos.startY);
						var angle = Math.atan2(deltaY, deltaX) / Math.PI * 180;

						self.mousePos.started = true;

						if (angle >= 50) {
							$(this).unbind('mousemove', self._mouseMove);
							$(this).unbind('touchmove', self._mouseMove);
							$(this).unbind('mouseup', self._mouseUp);
							$(this).unbind('mouseleave', self._mouseUp);
							$(this).unbind('touchend', self._mouseUp);

							self.slideshowContainer.data('mwa:slide:animating', false);
							self.resetTimer();

							return;
						}
					}

					evt.preventDefault();

					var left = self.imageContainer.position().left - (self.mousePos.x - pos.x);

					if (!self.options.loop) {
						if (left >= 0) {
							left = 0;
						}
						if (left <= (self.imageContainer.children().length - 1) * -self.slideshowContainer.width()) {
							left = (self.imageContainer.children().length - 1) * -self.slideshowContainer.width();
						}
					}

					self.imageContainer.css({
						left: left
					});
					self.mousePos.distance += self.mousePos.x - pos.x;
					self.mousePos.scroll += self.mousePos.y - pos.y;
					self.mousePos.x = pos.x;
					self.mousePos.y = pos.y;
				};
				this._mouseUp = function(evt) {
					// next image or not!?
					evt.preventDefault();

					self.resetTimer();

					var relative_distance = 100 / $(this).width() * self.mousePos.distance;
					var old_pos = Math.abs(self.currentIndex * $(this).width() + $(this).width());
					var cur_pos = Math.abs(self.imageContainer.position().left);

					self.slideshowContainer.data('mwa:slide:animating', false);

					if (Math.abs(relative_distance) >= self.options.minSlideDistance) {
						evt.stopImmediatePropagation();
						if (relative_distance > 0) {
							// next
							self.goto(self.currentIndex + 1, 100 / $(this).width() * Math.abs(old_pos - cur_pos), 'touch', 'none', false, true);
						}
						else {
							// prev
							self.goto(self.currentIndex - 1, 100 / $(this).width() * Math.abs(old_pos - cur_pos), 'touch', 'none', false, true);
						}
					}
					else {
						self.goto(self.currentIndex, 200 / $(this).width() * Math.abs(old_pos - cur_pos), 'touch', 'none', true, true);
					}

					$(this).unbind('mousemove', self._mouseMove);
					$(this).unbind('touchmove', self._mouseMove);
					$(this).unbind('mouseup', self._mouseUp);
					$(this).unbind('mouseleave', self._mouseUp);
					$(this).unbind('touchend', self._mouseUp);
				};
				this._mouseDown = function(evt) {
					if (self.slideshowContainer.data('mwa:slide:animating')) {
						return;
					}

					if (self.options.prevButton && ($(evt.target).hasClass('slide_button_prev') || $(self.options.prevButton).has(evt.target).length > 0)) {
						return;
					}

					if (self.options.nextButton && ($(evt.target).hasClass('slide_button_next') || $(self.options.nextButton).has(evt.target).length > 0)) {
						return;
					}

					if (evt.type !== 'touchstart') {
						evt.preventDefault();
					}

					self.slideshowContainer.data('mwa:slide:animating', true);
					self.resetTimer();

					if (self.options.stopOnManualChange) {
						self.options.autoplay = false;
					}

					var pos = self._getMousePos(this, evt);

					self.mousePos.x = pos.x;
					self.mousePos.y = pos.y;
					self.mousePos.startX = pos.x;
					self.mousePos.startY = pos.y;
					self.mousePos.distance = 0;
					self.mousePos.scroll = 0;
					self.mousePos.started = false;
					$(this).bind('mousemove', self._mouseMove);
					$(this).bind('mouseup', self._mouseUp);
					$(this).bind('mouseleave', self._mouseUp);
				};

				this._touchDown = function(evt) {
					if (self.slideshowContainer.data('mwa:slide:animating')) {
						return;
					}

					if ($(evt.target).hasClass('slide_button_prev') || $(evt.target).hasClass('slide_button_next')) {
						return;
					}

					self.slideshowContainer.data('mwa:slide:animating', true);
					self.resetTimer();

					if (self.options.stopOnManualChange) {
						self.options.autoplay = false;
					}

					var pos = self._getMousePos(this, evt);

					self.mousePos.x = pos.x;
					self.mousePos.y = pos.y;
					self.mousePos.startX = pos.x;
					self.mousePos.startY = pos.y;
					self.mousePos.distance = 0;
					self.mousePos.scroll = 0;
					self.mousePos.started = false;
					$(this).bind('touchmove', self._mouseMove);
					$(this).bind('touchend', self._mouseUp);
				};

				this.slideshowContainer.bind('touchstart', this._touchDown);
				this.slideshowContainer.mousedown(this._mouseDown);
			}

			if (t.css('position') === 'static') {
				t.css('position', 'relative');
				t.css('z-index', '1');
			}
			t.css('overflow', 'hidden');

			i.wrapAll('<div class="visual_cont"></div>');//i => t CE
			i.css({
				verticalAlign: 'bottom',
				boxSizing: 'border-box'
			});

			var p = i.parent();

			this.imageContainer = p;
			this.elements = i;

			if (this.options.fullscreen) {
				this.slideshowContainer.css({
					position: 'fixed',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					zIndex: -1
				});
			}

			//this.refresh();

			if (this.options.controls !== null) {
				$(this.options.controls).addClass('slide-controls');
				for (var n = 0, j = i.length; n < j; ++n) {
					var el = document.createElement(this.options.controlElements);
					el.slideIndex = n;
					$(el).addClass('slide-indicator');
					$(this.options.controls).append(el);
				}
				$(this.options.controls).find(this.options.controlElements).click(function() {
					if (self.currentIndex !== this.slideIndex) {
						self.resetTimer();

						if (self.options.stopOnManualChange) {
							self.options.autoplay = false;
						}

						self.goto(this.slideIndex, -1, 'control');
					}
				});
				$(this.options.controls).find(this.options.controlElements + ':first-child').addClass('active');
			}

			var ifirst = $(i).eq(0).find('img');

			if (this.options.loop) {
				var clone_prepend = p.children().eq(-1).clone().addClass('clone');
				var clone_append = p.children().eq(0).clone().addClass('clone');

				p.prepend(clone_prepend);
				p.append(clone_append);
			}

			ifirst.data('loaded', true);

			p.children().not(ifirst).find('img').each(function() {
				if (!this.complete) {
					self.queue.push({
						element: this,
						source: $(this).attr('src')
					});
					$(this).attr('src', self.placeholder);
					$(this).attr('width', '100%');
					$(this).attr('height', '1px');
				}
				else {
					$(this).data('loaded', true);
				}
			});

			var num_images = p.children().length;
			p.children().each(function() {
				$(this).css('z-index', num_images - $(this).index());
			});

			p.css({
				overflow: 'hidden',
				position: 'absolute'
			});

			this.allElements = p.children(); // includes clones

			if (this.options.effect === 'horizontal' || this.options.effect === 'fade') {
				p.css({
					width: '20000em',
					top: 0,
					left: 0
				});
				this.allElements.each(function(index, element) {
					$(element).css({
						float: 'left'
					});
				});
			}
			else if (this.options.effect === 'vertical') {
				p.css({
					height: '20000em',
					top: 0,
					left: 0
				});
				p.children().css({
					float: 'none'
				});
			}

			this.slideshowContainer.data('mwa:slide:animating', false);

			$(window).resize(function() {
				self.refresh();
			});

			$(window).on('load', function() {
				self.refresh();
				self.dequeue();
			});

			if (this.options.autoplay) {
				this.timer = setInterval(function() {
					self.tick.call(self);
				}, this.options.duration + this.options.pause);
			}

			this.refresh();
		};

		window.Slide = Slide;

		$.fn.slide = function(options) {
			return this.each(function() {
				var s = new window.Slide(this, options);

				$(this).data('mwa:slide', s);
			});
		};
	})(jQuery);
})();