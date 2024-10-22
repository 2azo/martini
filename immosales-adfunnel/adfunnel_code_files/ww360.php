<?php
/**
 * Testimonial Block template.
 *
 * @param array $block The block settings and attributes.
 */
	
	$items =  array(
     'item1' => get_field("item_1"),
     'item2' => get_field("item_2"),
     'item3' => get_field("item_3"),
     'item4' => get_field("item_4"),
     'item5' => get_field("item_5"),
   );
 
	// Support custom "anchor" values.
	$anchor = '';
	if (!empty( $block['anchor'])) {
		$anchor = 'id="' . esc_attr($block['anchor']) . '"';
	}

	// Create class attribute allowing for custom "className".
	$class_name = 'ww360';
	if (!empty( $block['className'])) {
		$class_name .= ' ' . $block['className'];
	}
?>

<div <?= $anchor; ?> class="<?php echo esc_attr($class_name); ?>">
    <div class="wrapper">
        <div class="container">
            <div class="ww360_title_cont">
                <div class="ww360_title">
                    <div class="t1">Dein Immosales</div>
                    <div class="t2"><span>0</span>&#176;</div>
                    <div class="t1">Vorteil</div>
                </div>
            </div>
            <div class="ww360_title_cont--smaller">
                <div class="ww360_title">
                    <div class="t1">Dein Immosales</div>
                    <div class="t2">360&#176;</div>
                    <div class="t1">Vorteil</div>
                </div>
            </div>
            <div class="ww360_bg_mob">
                <div class="border"></div>
                <span data-svg="<?=get_template_directory_uri(); ?>/img/immosales_logo_part.svg"></span>
            </div>
            <div class="ww360_border_wrapper"><div class="ww360_border"></div></div>
            <div class="ww360_logo"><span class="animate" data-svg="<?=get_template_directory_uri(); ?>/img/immosales_logo_part.svg"></span></div>            
            <?php foreach ($items as $index => $item): ?>
                <div class="item <?= $index; ?>">
                    <div class="image_wrap">
                        <div class="image">
                            <!-- Lazy loading for images -->
                            <img src="<?= $item['image']['url']; ?>" alt="<?= $item['image']['alt']; ?>" loading="lazy" />
                            <div class="overlay"><svg><use href="#play-icon"></use></svg></div>

                            <!-- Lazy loading for videos -->
                            <video preload="metadata" playsinline poster="<?= $item['image']['url']; ?>" loading="lazy">
                                <source src="<?= $item['video']['url']; ?>" type="video/mp4" />
                            </video>
                        </div>
                    </div>
                    <div class="text">
                        <?= $item['text']; ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</div>
<div class="ww360_close"></div>
