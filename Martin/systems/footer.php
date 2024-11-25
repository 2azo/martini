	
	<div class="footer_phone reveal">
		<span>Sofortkontakt / tel: <a href="tel:497452846670">+49 7452 84667-0</a></span>
	</div>
	
	<div class="to_top reveal">
		<i data-svg="<?=get_template_directory_uri();?>/img/thin_arrow.svg"></i>
	</div>

	<footer class="reveal reveal">
		<div class="footer_wrap content_block--wide">
			<div class="footer_block contact">
				<h2>MartinSystems®<br><strong>Standard Automation</strong></h2>
				<?php the_field('contact_info', 'footer'); ?>
			</div>
			<div class="footer_block menu">
				<?=wp_nav_menu(array('theme_location'=>'footer','container'=>false));?>
			</div>
			<div class="footer_block menu2">
				<div class="socials">
					<?php if(have_rows('socials','footer')): ?>
						<?php while(have_rows('socials','footer')): the_row(); $social = get_sub_field('social_network');?>
							<a class="<?=$social;?>" href="<?=get_sub_field($social.'_link');?>" target="_blank" data-svg="<?=get_template_directory_uri();?>/img/social_icon_<?=$social;?>.svg"></a>
						<?php endwhile; ?>
					<?php endif; ?>
				</div>
				<h2>Social Media</h2>
			</div>
		</div>
	</footer>
	
	<?php wp_footer();  ?>
	
	<!--script>
		(function() {
			NProgress.configure({ minimum: 0.1, speed: 600, parent: '.loading_screen_progress' }).start();
			var interval = setInterval(function() {
				var status = NProgress.status;
				if(status >= 100 || status === null) {
					clearInterval(interval);
				} else {
				}
			}, 10);
		})();
	</script-->

	</body>
</html>