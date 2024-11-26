<?php $page_id = get_queried_object_id(); ?>

<?php if (get_field('l_image', $page_id) || have_rows('left_item', $page_id) || have_rows('right_item', $page_id)): ?>
	<?php if (get_field('l_intro', $page_id)): ?>
		<div class="p-intro-wrapper"><?php the_field('l_intro', $page_id); ?></div>
	<?php endif; ?>
	<div class="listing">
		<?php if (have_rows('left_item', $page_id)): ?>
			<div class="left">
				<?php while (have_rows('left_item', $page_id)): the_row(); ?>
					<div class="reveal item">
						<?php if (get_sub_field("link")): ?>
							<a href="<?php the_sub_field('link'); ?>">
						<?php endif; ?>
							<div class="header"><?php the_sub_field('header'); ?></div>
						<?php if (get_sub_field("link")): ?>
							</a>
						<?php endif; ?>
						<?php if (get_sub_field("text")): ?>
							<div class=" ltext h-info"><?php the_sub_field('text'); ?></div>
						<?php endif; ?>
					</div>
				<?php endwhile; ?>
			</div>
		<?php endif; ?>
		
		<?php if (get_field('l_image', $page_id)): ?>
			<div class="middle">
				<div class="l-image">
					<img src="<?php the_field('l_image', $page_id); ?>" alt="">
				</div>
			</div>
		<?php endif; ?>
		
		<?php if (have_rows('right_item', $page_id)): ?>
			<div class="right">
				<?php while (have_rows('right_item', $page_id)): the_row(); ?>
					<div class="reveal item">
						<?php if (get_sub_field("link")): ?>
							<a href="<?php the_sub_field('link'); ?>">
						<?php endif; ?>
							<div class="header"><?php the_sub_field('header'); ?></div>
						<?php if (get_sub_field("link")): ?>
							</a>
						<?php endif; ?>
						<?php if (get_sub_field("text")): ?>
							<div class=" ltext h-info"><?php the_sub_field('text'); ?></div>
						<?php endif; ?>
					</div>
				<?php endwhile; ?>
			</div>
		<?php endif; ?>
	</div>
<?php endif; ?>