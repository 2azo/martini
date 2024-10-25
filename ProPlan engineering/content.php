<?php if (have_rows('block')): ?>
	<?php $text_wrap_counter = 1; ?>

	<?php while (have_rows('block')): the_row(); ?>
		<?php if (get_row_layout() == 'header'): $type = get_sub_field('type');?>
			<div class="header_cont content_block--wide reveal" data-anchor="<?=get_sub_field('anchor');?>">
				<h1 class="<?=$type;?>"><?=get_sub_field('text');?></h1>
			</div>
			
		<?php elseif (get_row_layout() == 'pixels'):?>
			<div class="pixels_block">
				<div class="pixels">
				</div>
			</div>
		
		<?php elseif (get_row_layout() == 'subheader'):?>
			<div class="subheader_cont content_block reveal" data-anchor="<?=get_sub_field('anchor');?>">
				<h2><?=get_sub_field('text');?></h2>
			</div>
			
			
			<?php
			elseif (get_row_layout() == 'text_block'):
				$image = get_sub_field('image');
				$border_top = (get_sub_field('border_top')) ? " border_top" : "";
				$border_bottom = (get_sub_field('border_bottom')) ? " border_bottom" : "";
			?>
				<div class="text_block content_block reveal<?= $border_top; ?><?= $border_bottom; ?>" data-anchor="<?= get_sub_field('anchor'); ?>">
					<div class="text_wrap" id="text_wrap_<?= $text_wrap_counter; ?>"><?= get_sub_field('text'); ?></div>
					<?php 
						$text_wrap_counter++;
					?>
					<?php if($image): ?>
						<img src="<?= $image; ?>" alt="" />
					<?php endif; ?>
				</div>


            <?php elseif (get_row_layout() == 'slider'): 
                $anchor = get_sub_field('anchor');
                $slider_content_type = get_sub_field('slider_content_type'); 
            ?>
                <?php if(have_rows('slide')): ?>
                    <div class="slider_block" data-anchor="<?= $anchor; ?>">
                        <div class="slider_wrap">
                            <?php if($slider_content_type == 'images'): ?>
                                <?php while(have_rows('slide')): the_row();
                                    $image = get_sub_field('image');
                                ?>
                                    <div class="slide">
                                        <?php if($image): ?>
                                            <img src="<?= esc_url($image); ?>" alt="" />
                                        <?php endif; ?>
                                    </div>
                                <?php endwhile; ?>
                                <div class="slide_controls"></div>

                            <?php elseif($slider_content_type == 'video'): ?>
                                <?php while(have_rows('slide')): the_row();
                                    $video = get_sub_field('video_mp4');
                                ?>
                                    <div class="slide">
                                        <?php if($video): ?>
                                            <video autoplay loop muted playsinline>
                                                <source src="<?= esc_url($video['url']); ?>" type="video/mp4">
                                                Your browser does not support the video tag.
                                            </video>
                                        <?php endif; ?>
                                    </div>
                                <?php endwhile; ?>
                            <?php endif; ?>
                        </div>
                    </div>
            <?php endif; ?>



		<?php elseif (get_row_layout() == 'selector'):
			/*$active[1] = 'active';
			<?=$active[get_row_index()];?>*/
		?>
			<?php if(have_rows('item')): ?>
				<div class="selector_cont content_block--wide reveal">
					<div class="col_left">
						<?php while(have_rows('item')): the_row();?>
							<div class="selector_option" data-id="<?=get_row_index();?>"><?=get_sub_field('title');?></div>
						<?php endwhile; ?>
					</div>
					<div class="col_right">
						<?php while(have_rows('item')): the_row(); ?>
							<div class="selector_option selector_content_option" data-id="<?=get_row_index();?>"><span data-svg="<?=get_template_directory_uri();?>/img/arrow-new.svg"></span><?php the_sub_field('title');?></div>
							<div class="selector_wrap reveal reveal_right" data-target="<?=get_row_index();?>">
								<?php if (have_rows('content')): ?>
								<div class="selector_content">									
									<?php while (have_rows('content')): the_row(); ?>
										<?php if (get_row_layout() == 'header'):?>
											<div class="selector_header reveal"><span data-svg="<?=get_template_directory_uri();?>/img/arrow-new.svg"></span><?=get_sub_field('text');?></div>
										<?php elseif(get_row_layout() == 'text'): ?>
											<div class="selector_text reveal"><?=get_sub_field('text');?></div>
										<?php elseif(get_row_layout() == 'image_block'): ?>
											<?php get_template_part('includes/image_block'); ?>
										<?php endif; ?>
									<?php endwhile; ?>
								</div>
								<?php endif; ?>
							</div>
							<div class="sep"></div>
						<?php endwhile; ?>
					</div>
				</div>
			<?php endif; ?>
			
        <?php elseif (get_row_layout() == 'highlights'): ?>
            <?php if(have_rows('item')): ?>
                <div class="hl_cont reveal">
                    <?php 
                    // Start counting the number of items
                    $item_count = 0;

                    // Loop through each item
                    while(have_rows('item')): the_row(); 
                        $link = get_sub_field('link'); 
                        $item_count++; // Increment the item count
                    ?>
                        <a class="hl_item" href="<?=$link['url'];?>" target="<?=$link['target'];?>">
                            <img src="<?=get_sub_field('image');?>" alt="" />
                            <div class="hl_text"><?=$link['title'];?></div>
                        </a>
                    <?php endwhile; ?>
                    
                    <?php
                    // Calculate the remainder to determine how many padding elements to add
                    $remainder = $item_count % 3;
                    $padding_needed = (3 - $remainder) % 3; // This ensures no extra padding if it's already a multiple of 3
                    
                    // Add padding elements
                    // for ($i = 0; $i < $padding_needed; $i++) {
                    //     echo '<div class="hl_item padding-box"></div>';
                    // }
                    ?>
                </div>
            <?php endif; ?>
       

		
		<?php elseif (get_row_layout() == 'logo_grid'): ?>
			<?php if(have_rows('logo')): ?>
				<div class="logo_grid content_block">
					<?php while(have_rows('logo')): the_row(); 
						$link = get_sub_field('link'); 
						$image = get_sub_field('image'); 
					?>
						<?php if($link): ?>
							<a href="<?=$link['url'];?>" class="logo_item reveal" target="<?=$link['target'];?>">
								<div class="logo_item_wrap">
									<span>
										<img src="<?=$image;?>" alt="<?=$link['title'];?>" />
									</span>
								</div>
							</a>
						<?php else: ?>
							<div class="logo_item reveal">	
								<div class="logo_item_wrap">
									<span>
										<img src="<?=$image;?>" alt="" />
									</span>
								</div>
							</div>
						<?php endif; ?>
					<?php endwhile; ?>
				</div>
			<?php endif; ?>
		
		<?php elseif (get_row_layout() == 'career'): ?>
			<?php if(have_rows('item')): ?>
				<div class="career_block content_block">
					<?php while(have_rows('item')): the_row();
						$genders = get_sub_field('gender');
						$gender_list = [];
						foreach($genders as $gender => $val){
							if($val == 1){
								array_push($gender_list,$gender);
							}
						}
					?>
					<div class="career_item reveal">
						<div class="carreer_title"><span data-svg="<?=get_template_directory_uri();?>/img/arrow-new.svg"></span><?=get_sub_field('name');?><?php if(count($gender_list)!=0):?><div class="gender">/ <?=implode(" / ",$gender_list);?></div><?php endif; ?></div>
						<div class="carreer_content">
							<div class="short_text"><?php the_sub_field('short_text');?> <div class="read_more"><span data-svg="<?=get_template_directory_uri();?>/img/arrow-new.svg"></span> mehr erfahren</div></div>
							<div class="hidden">
								<?php the_sub_field('text');?>
								<?php get_template_part('includes/image_block'); ?>
							</div>
						</div>
					</div>
					<?php endwhile;?>
				</div>
			<?php endif;?>
		
		<?php elseif (get_row_layout() == 'contact_persons'): ?>
			<div class="contact_persons_block content_block reveal">
				<?php if(have_rows('person')): ?>
					<?php while(have_rows('person')): the_row();?>
						<div class="person_item">
							<div class="person_item_pic">
								<img src="<?=get_sub_field('picture');?>" alt="" />
							</div>
							<div class="person_item_text"><?=get_sub_field('text');?></div>
						</div>
					<?php endwhile; ?>
				<?php endif; ?>
			</div>
		
		<?php elseif (get_row_layout() == 'map'): ?>
			<?php if(get_sub_field('show_map')): ?>
				<div class="map_block reveal">
					<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2641.817435370026!2d8.74854581589485!3d48.53673033125433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479750880d4452b1%3A0x7b80fdc43b04012c!2sPro-Plan%20Engineering%20GmbH!5e0!3m2!1sen!2sge!4v1600270028612!5m2!1sen!2sge" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
				</div>
			<?php endif; ?>
		
		<?php elseif (get_row_layout() == 'fw_picture_fixed'): ?>
			<div 
				class="fw_image fixed reveal" 
				data-anchor="<?=get_sub_field('anchor');?>"
				style="background-image:url(<?=get_sub_field('image');?>);"
			>
				<div class="overlay" style="opacity:<?=get_sub_field('overlay')/100;?>"></div>
				<div class="text"><?=get_sub_field('text');?></div>
			</div>
		
		<?php elseif (get_row_layout() == 'image_block'): ?>
			<?php get_template_part('includes/image_block'); ?>
		
		<?php elseif (get_row_layout() == 'sub_menu'): $type = get_sub_field('type');?>
				<?php 
				if($type): 
					get_template_part('includes/submenu');
				else: ?>
					<div class="sub_menu_cont">
						<div class="sub_menu">
							<ul>
								<span class="caret"></span>
								<?php while(have_rows('custom_submenu')): the_row(); $link = get_sub_field('link');?>
									<li class="content_submenu"><a href="<?=$link['url'];?>" target="<?=$link['target'];?>"><?=$link['title'];?></a></li>
								<?php endwhile; ?>
							</ul>
						</div>
					</div>
				<?php endif; ?>
		
		<?php elseif (get_row_layout() == 'news_block'): 
			$cat = get_sub_field('category');
			$cat = ($cat === "all")?"":$cat;
			$num = get_sub_field('number_of_articles');
			$exp = (get_sub_field('expandable'))?" expandable":"";
			$args = array(
				'post_type' => 'post',
				'posts_per_page' => $num,
				'category_name'  => $cat,
			);
			$the_query = new WP_Query($args);
		?>
			
			<?php if ($the_query->have_posts()): ?>
				<div class="news_block<?=$exp;?> content_block reveal">
					<?php while ($the_query->have_posts()): 
						$the_query->the_post();
						$post = $the_query->post;
						$text = get_field("short_text");
						$id = get_the_id();
					?>
						<div class="news_item" data-anchor="<?=$id;?>">
							<div class="news_item_title"><span data-svg="<?=get_template_directory_uri();?>/img/arrow-new.svg"></span><?php the_title(); ?></div>
							<?=$text;?>
							<a class="news_item_rm" href="/presse-aktuelles/#<?=$id;?>"><span data-svg="<?=get_template_directory_uri();?>/img/arrow-new.svg"></span>mehr erfahren</a>
							<?php if(have_rows('type')):?>
								<div class="hidden">
								<?php while (have_rows('type')): the_row(); ?>
									<?php if(get_row_layout() == 'text_block'):?>
										<div class="text_block">
											<?php the_sub_field('text');?>
										</div>
									<?php elseif(get_row_layout() == 'image_block'): ?>
										<?php get_template_part('includes/image_block'); ?>
									<?php endif; ?>
								<?php endwhile; ?>
								</div>
							<?php endif; ?>
						</div>
					<?php endwhile; wp_reset_postdata(); ?>
				</div>
			<?php else: _e('Error'); ?>
			<?php endif; ?>
		
		<?php endif; ?>
	<?php endwhile; ?>
<?php endif; ?>