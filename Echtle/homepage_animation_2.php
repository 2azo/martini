<?php
/**
 * Home Animation block template.
 *
 * @param array $block The block settings and attributes.
 */


	// Support custom "anchor" values.
	$anchor = '';
	if (!empty( $block['anchor'])) {
		$anchor = 'id="' . esc_attr($block['anchor']) . '"';
	}

	// Create class attribute allowing for custom "className".
	$class_name = 'ha2_block';
	if (!empty( $block['className'])) {
		$class_name .= ' ' . $block['className'];
	}

	$picture = get_field('picture');
	$text1 = get_field('text1');
	$text2 = get_field('text2');
	$text3 = get_field('text3');
	$pwc = get_field('picture_with_caption');
	$vwc = get_field('video_with_caption');
?>

<div <?=$anchor;?> class="<?php echo esc_attr($class_name); ?>">
	<div class="ha2_block_wrap">
		<div class="trigger part2">
			<div class="picture">
				<div class="img" style="background-image: url('<?=$picture['url'];?>');">
					<div class="overlay"></div>
				</div>
			</div>
			<div class="text">
				<div class="row"><?=$text1;?></div>
				<div class="row">
					<div class="col">
						<?=$text2;?>
						<div class="wp-block-video white">
							<div class="image">
								<img src="<?=$pwc['picture']['url'];?>" alt="<?=$pwc['picture']['alt'];?>" />
								<div class="caption">
									<?=$pwc['caption'];?>
								</div>
							</div>
							<video playsinline poster="<?= $vwc["video_poster"]; ?>" src="<?=$vwc['video']['url'];?>"></video>
						</div>
					</div>
					<div class="col">
						<?=$text3;?>
						<div class="caption">
							<?=$vwc['caption'];?>
						</div>
					</div>
				</div>
				<div class="mob">
					<div class="image"><img src="<?=$pwc['picture']['url'];?>" alt="<?=$pwc['picture']['alt'];?>" /></div>
					<div class="caption"><?=$pwc['caption'];?></div>
					<div class="wp-block-video">
						<video playsinline src="<?=$vwc['video']['url'];?>"></video>
					</div>
					<div class="caption"><?=$vwc['caption'];?></div>
				</div>
			</div>
		</div>
	</div>
</div>