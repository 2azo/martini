<?php $page_id = get_queried_object_id(); ?>

<div class="image_block highlights">
	<?php if (get_field("image_block_img", $page_id)): ?>
	<div class="image_cont reveal">
		<img src="<?php the_field('image_block_img', $page_id); ?>" alt="" />
	</div>
	<?php endif ?>
	<?php if (get_field("image_block_text", $page_id)): ?>
	<div class="text_cont reveal">
		<?php the_field('image_block_text', $page_id); ?>
	</div>
	<?php endif ?>
</div>