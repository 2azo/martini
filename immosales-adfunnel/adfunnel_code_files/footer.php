	
	<?php if(have_rows('certificates', 'option')): ?>
	<section class="footer_cert reveal">
		<?php while(have_rows('certificates', 'option')):
			the_row();
			$image = get_sub_field('image');
			$title = get_sub_field('title');
			$link = get_sub_field('link');
		?>
			<?php if($link): ?>
				<a class="footer_cert_item" href="<?=$link;?>" target="_blank">
					<?php if($title): ?><p><?=$title;?></p><?php endif; ?>
					<img src="<?=$image['url'];?>" alt="<?=$image['alt'];?>" />
				</a>
			<?php else: ?>
				<div class="footer_cert_item">
					<?php if($title): ?><p><?=$title;?></p><?php endif; ?>
					<img src="<?=$image['url'];?>" alt="<?=$image['alt'];?>" />
				</div>
			<?php endif; ?>
		<?php endwhile; ?>
	</section>
	<?php endif; ?>

	<footer class="reveal reveal">
		<div class="footer_block contact">
			<?php the_field('contact_info', 'option'); ?>
		</div>
		<nav class="footer_block menu">
			<?=wp_nav_menu(array('theme_location'=>'footer','container'=>false));?>
		</nav>
		<div class="footer_block socials">
			<div class="socials_cont">
				<?php if(have_rows('socials','option')): ?>
					<?php while(have_rows('socials','option')): the_row(); $social = get_sub_field('social_network');?>
						<a class="<?=$social;?>" href="<?=get_sub_field($social.'_link');?>" target="_blank" data-svg="<?=get_template_directory_uri();?>/img/social_icon_<?=$social;?>.svg"></a>
					<?php endwhile; ?>
				<?php endif; ?>
			</div>
		</div>
	</footer>
	
	<?php wp_footer();  ?>

	</body>
</html>