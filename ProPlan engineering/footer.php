	
	<div class="footer_phone reveal">
		<span>Ihr direkter Kontakt zu <span class="break"> </break> </span> Pro-Plan Engineering GmbH</span><a href="tel:07452837000">0 74 52 / 8 37 00-12</a>
	</div>
	
	<div class="to_top reveal">
		<span data-svg="<?=get_template_directory_uri();?>/img/arrow-new.svg"></span>
	</div>

	<footer class="reveal">
		<div class="footer_wrap content_block">
			<div class="footer_block contact">
			<h2>Pro-Plan Engineering GmbH</h2>
				<?php the_field('contact_info', 'footer'); ?>
			</div>
			<div class="footer_block menu">
				<h2>NAVIGATION</h2>
				<?=wp_nav_menu(array('theme_location'=>'footer','container'=>false));?>
			</div>
			<div class="footer_block menu2">
				<?=wp_nav_menu(array('theme_location'=>'footer_sub','container'=>false));?>
				<div class="socials">
					<?php if(have_rows('socials','footer')): ?>
						<?php while(have_rows('socials','footer')): the_row(); $social = get_sub_field('social_network');?>
							<a class="<?=$social;?>" href="<?=get_sub_field($social.'_link');?>" target="_blank" data-svg="<?=get_template_directory_uri();?>/img/social_icon_<?=$social;?>.svg"></a>
						<?php endwhile; ?>
					<?php endif; ?>
				</div>
			</div>
		</div>
	</footer>
	
	<?php wp_footer();  ?>
	
	<script>
		(function() {
			NProgress.configure({ minimum: 0.1, speed: 600, parent: '.loading_screen_progress' }).start();
			var title = $('.loading_screen_title');
			var interval = setInterval(function() {
				var status = NProgress.status;
				if(status >= 100 || status === null) {
					clearInterval(interval);
					title.text("100%");
				} else {
					title.text(Math.floor(status*100)+"%");
				}
			}, 10);
		})();
	</script>

	</body>
</html>