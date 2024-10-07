<?php if( have_rows('video_carousel') ): ?>
    <div id="interviews" class="acf-video-carousel interviews">
        <?php while( have_rows('video_carousel') ): the_row(); ?>
            <?php 
                $video_url = get_sub_field('video_url'); 
                $video_title = get_sub_field('video_title');
				$video_description = get_sub_field('video_description');
            ?>
            <div class="video-item"> 
                <div class="video-wrapper">
                    <video src="<?php echo esc_url($video_url); ?>" class="acf-video" ></video> 
                    <div class="video-overlay">
                        <?php echo esc_html($video_description); ?>
                    </div>
                </div>
				<div class="video-title">
					<p><?php echo esc_html($video_title); ?></p>
				</div>
            </div>
        <?php endwhile; ?>
    </div>
<?php endif; ?>


<?php
/**
 * Video carousel block template.
 *
 * @param array $block The block settings and attributes.
 */
	
  	$items = get_field('items');
  	$ID = get_field('id');
	
  	$count = count($items);
 
//   	  Support custom "anchor" values.
  	$anchor = '';
  	if (!empty( $block['anchor'])) {
  		$anchor = 'id="' . esc_attr($block['anchor']) . '"';
  	}

//   	  Create class attribute allowing for custom "className".
  	$class_name = 'video_carousel reveal';
  	if (!empty( $block['className'])) {
  		$class_name .= ' ' . $block['className'];
  	}
  ?>
  <div <?= $anchor; ?> class="<?= esc_attr($class_name); ?>">
  	<?php if($items): ?>
  		<div class="swiper-pagination-vid"></div>
  		<div class="swiper vid_swiper">
  			<div class="swiper-wrapper">
  			<?php foreach( $items as $i=>$item ): 
  				$poster = $item['poster']?$item['poster']['url']:"";
  			?>
  				<div class="swiper-slide">
				  <div class="swiper-slide__video" data-total="<?=$count;?>" data-id="<?= $i; ?>" data-gid="<?= $ID; ?>" data-hover="">
				  	<video preload="none" playsinline="" poster="<?= $poster; ?>">
  							<source src="<?= $item['video']['url']; ?>" type="video/mp4" />
  						</video>
  					</div>					
  					<div class="swiper-slide__info">
  						<div class="swiper-slide__subheader"><svg><use href="#arrow-icon"></use></svg><?=strip_tags($item['subheader'],"<strong><a><br><em>");?></div>
  						<div class="swiper-slide__text"><svg><use href="#quote-icon"></use></svg><?=strip_tags($item['description'], "<strong><a><br><em>");?><div class="play_text"><svg><use href="#arrow-icon"></use></svg>play video</div></div>
  					</div>
  				</div>	
  			<?php endforeach; ?>
  			</div>
  		</div>
  		<div class="swiper-nav swiper-prev"><svg><use href="#arrow-icon"></use></svg></div>
  		<div class="swiper-nav swiper-next"><svg><use href="#arrow-icon"></use></svg></div>
  	<?php endif;?>
  </div>

<?php



/*
    
<?php if($items): ?>
	<?php foreach( $items as $i=>$item ): 
		$poster = $item['poster']?$item['poster']['url']:"";
	?>
		<div data-id="<?=$i;?>" data-gid="<?=$ID;?>" class="vc_modal">
			<div class="vc_modal_bg"></div>
			<div class="vc_modal_wrap">
				<div class="vc_modal_video">
					<video data-id="<?= $i; ?>" preload="none" playsinline poster="<?= $poster; ?>">
						<source src="<?= $item['video']['url']; ?>" type="video/mp4" />
					</video>
				</div>
				<div class="vc_modal_footer">
					<div class="vc_modal_info"><svg><use href="#arrow-icon"></use></svg><?=strip_tags($item['subheader'],"<strong><a><br><em>");?></div>
					<div class="vc_modal_controls"></div>
					<div class="vc_modal_close"></div>
				</div>
				<div class="vc_modal_nav vc_modal_prev"><svg><use href="#arrow-icon"></use></svg></div>
				<div class="vc_modal_nav vc_modal_next"><svg><use href="#arrow-icon"></use></svg></div>
			</div>
		</div>
	<?php endforeach; ?>
<?php endif;?>
*/ ?>