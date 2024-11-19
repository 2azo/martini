<?php if (have_rows('block')): ?>
	<?php while (have_rows('block')): the_row(); ?>
		<?php if (get_row_layout() == 'header'): ?>
			<section class="header_cont content_block reveal" data-anchor="<?=get_sub_field('anchor');?>">
				<h1><?=get_sub_field('text');?></h1>
				<div class="section_title"><?php the_sub_field('section_title');?></div>
			</section>
			
		<?php elseif (get_row_layout() == 'subheader'): ?>
			<section class="subheader_cont content_block reveal" data-anchor="<?=get_sub_field('anchor');?>">
				<h2><?=get_sub_field('text');?></h2>
			</section>
			
		<?php elseif (get_row_layout() == 'text_block'):
			$align = get_sub_field('align');
			$image = get_sub_field('image');
			$tsize = get_sub_field('text_size');
		?>
			<section class="text_block <?=$align;?> <?=$tsize;?> content_block--med reveal" data-anchor="<?=get_sub_field('anchor');?>">
				<div class="text_wrap">
					<?=get_sub_field('text');?>
					<?php if($image): ?>
						<div class="img">
							<img src="<?=$image;?>" alt="" />
						</div>
					<?php endif; ?>
				</div>
			</section>
		
		<?php elseif (get_row_layout() == 'image_block'): ?>
			<section class="image_block content_block reveal">
				<img src="<?=get_sub_field('img');?>" alt="" />
			</section>
		
		<?php elseif (get_row_layout() == 'contact_info'): ?>
			<section class="contact_form reveal" data-anchor="kontaktformular">
				<form id="contact_form" method="POST">
					<input type="hidden" id="bchk" name="bchk" value="">
					<div class="mail_pending"></div>
					<div class="message"></div>
					<div class="form_cont">
					<div class="input_cont required">
						<input id="name" type="text" name="name" required="">
						<label for="name">Vorname</label>
					</div>
					<div class="input_cont required">
						<input id="surname" type="text" name="surname" required="">
						<label for="sur">Nachname</label>
					</div>
					<div class="input_cont required">
						<input id="email" type="email" name="email" required="">
						<label for="email">E-Mail</label>
					</div> 
					<div class="input_cont required">
						<input id="phone" type="tel" name="phone" required="">
						<label for="phone">Telefon</label>
					</div>
					<div class="input_cont required full">
					   <div class="select">
						<select name="appt" id="appt">
							<option value="08:00 - 10:00 Uhr">von 08:00 Uhr bis 10:00 Uhr</option>
							<option value="10:00 - 12:00 Uhr">von 10:00 Uhr bis 12:00 Uhr</option>
							<option value="12:00 - 14:00 Uhr">von 12:00 Uhr bis 14:00 Uhr</option>
							<option value="14:00 - 16:00 Uhr">von 14:00 Uhr bis 16:00 Uhr</option>
							<option value="16:00 - 18:00 Uhr">von 16:00 Uhr bis 18:00 Uhr</option>
						</select>
						<div class="arrow"></div>
					   </div>
					   <label for="appt">Erreichbarkeit</label>
					</div>
					</div>
				   <div>
					   <div class="form_footer">
						   <button type="submit" form="contact_form" value="ABSENDEN">ABSENDEN</button>
					   </div> 
				   </div>
    			</form>
			</section>
		
		<?php elseif (get_row_layout() == 'slider'): ?>
				<div class="background">
					<div class="bg intro">
						<div class="slider_block main_slider">
							<div class="slider_wrap">
								<?php if(get_sub_field('video')): ?>
									<div class="slide">
										<video autoplay muted loop>
											<source src="<?=get_sub_field('video');?>" type="video/mp4">
										</video>
									</div>
								<?php else: ?>
									<?php while(have_rows('slide')): the_row(); $image = get_sub_field('image');?>
										<div class="slide">
											<div class="img" style="background-image: url('<?=$image['url'];?>');"></div>
										</div>
									<?php endwhile; ?>
								<?php endif;?>
							</div>
							<div class="slide_controls"></div>
						</div>
						
						<div class="fill">
							<div id="text_cont">
								<?php if(get_sub_field('text_small')): ?>
									<div class="text small"><span><?php the_sub_field('text_small'); ?></span></div>
								<?php endif; ?>
								<?php if(get_sub_field('text_large')): ?>
									<div class="text large"><?php the_sub_field('text_large'); ?></div>
								<?php endif; ?>
							</div>
						</div>
					</div>
				</div>
				<div class="main_slider_cont">
				</div>

		<?php elseif (get_row_layout() == 'fbg_sections'): ?>
			<div class="fbg_title" data-anchor="<?= get_sub_field("anchor"); ?>">
				<section class="news_block links_block wide content_block--wide">
					<div class="news_wrap">
						<ul></ul>
						<div class="title"><?= get_sub_field("title"); ?></div>
					</div>
				</section>
			</div>
			<div class="fbg_block">
				<?php if (have_rows("items")): ?>
					<?php while(have_rows("items")): the_row(); $file = get_sub_field('download_file'); $link = get_sub_field('projects_link'); ?>
						<div class="fbg_item">
							<img src="<?= get_sub_field("image")["url"]; ?>" alt="" />
							<div class="text">
								<div class="text_wrap"><?= get_sub_field("text"); ?></div>
								<?php if ($file): ?>
									<a class="dl_button" href="<?=$file;?>" target="_blank"><?=get_sub_field('download_text');?></a>
								<?php endif; ?>
								<?php if ($link): ?>
									<a class="pj_button" href="<?=$link;?>" target="_blank">Echte Anwendungen</a>
								<?php endif; ?>
							</div>
						</div>
					<?php endwhile; ?>
				<?php endif; ?>
				<a href="#overview" class="icon">
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</a>
			</div>
		<?php elseif (get_row_layout() == 'latest_news'): 
			$num = get_sub_field('number_of_articles');
			$dates = get_sub_field('show_dates');
			$title = get_sub_field('title');
			// $cats = get_categories();
			$cats = get_terms(array('taxonomy' => 'category','orderby' => 'meta_value_num', 'meta_key' => 'cat_order', 'order' => 'ASC'));
		?>
			<section class="news_block content_block--wide">
				<div class="news_wrap">
				
					<ul>
						<?php 
							foreach($cats as $cat) {
								$query = new WP_Query(array(
									'tax_query' => array(
										array(
											'taxonomy' => 'category',
											'field' => 'slug',
											'terms' => $cat->slug,
											'orderby' => 'field',
											'order' => 'desc',
										),
									),
									'ignore_sticky_posts' => 1,
									'posts_per_page' => 1,
									'no_found_rows' => true,
									'update_post_term_cache' => false,
									'update_post_meta_cache' => false,
								));

								if ($query->have_posts()):
									while ($query->have_posts()): $query->the_post();?>
										<li><a href="<?= get_permalink(155); ?>?newsId=<?= $post->ID; ?>"><?=($dates)?"<span>[".get_the_date('d.m.Y')."]</span>":"";?><?php the_title(); ?></a></li>
									<?php endwhile;
								endif;
								wp_reset_postdata();
							}
						?>
					</ul>
					<div class="title"><?=$title;?></div>
				</div>	
			</section>
		<?php elseif (get_row_layout() == 'nav_sections'): ?>
		<div class="nav_sections">
			<?php if(have_rows('section')): ?>
				<?php while(have_rows('section')):
					the_row();
					$switch = get_sub_field('switch');
				?>
					<section class="nav_section" data-anchor="<?=get_sub_field('anchor');?>">
						<div class="image" style="background-image: url('<?=get_sub_field('image');?>');">
							<div class="title mob"><?php the_sub_field('title');?></div>
						</div>
						<div class="text">
							<?php if(get_sub_field('tl_toggle')):
								$page_link = get_sub_field('page_link');
							?>
								<div class="side_text">
									<div class="text_content"><?php the_sub_field('text');?></div>
									<?php if($page_link):?><a class="page_link" href="<?=$page_link['url'];?>" target="<?=$page_link['target'];?>"><span data-svg="<?=get_template_directory_uri();?>/img/arrow_link.svg"></span>mehr erfahren</a><?php endif; ?>
								</div>
							<?php else: ?>
								<ul>
									<?php if($switch):
										$page = get_sub_field('link');
										$menu_name = 'top';
										if (($locations = get_nav_menu_locations()) && isset($locations[$menu_name])) {
											$menu = wp_get_nav_menu_object($locations[$menu_name]);
											$menu_items = wp_get_nav_menu_items($menu->term_id);
											$parent_item = wp_filter_object_list( $menu_items, array('url' => $page));
											$value = array_shift($parent_item);
											$parent_item_id = $value->ID;
											$items = array();

											foreach($menu_items as $item) {
												if($item->menu_item_parent == $parent_item_id) {
													array_push($items,$item);
												}
											}

											$num = count($items);
											if($num > 0) {
												for($x = 0; $x < $num; $x++) {
													echo '<li><a href="'.$items[$x]->url.'">'.$items[$x]->title.'</a></li>';
												}
											}
										}
									?>
									<?php else: ?>
											<?php while(have_rows('links')): the_row();
												$link = get_sub_field('link');
											?>
												<li><a href="<?=$link['url'];?>" target="<?=$link['target'];?>"><?=$link['title'];?></a></li>
											<?php endwhile; ?>
									<?php endif; ?>
								</ul>					
							<?php endif; ?>
							
							<div class="title"><?php the_sub_field('title');?></div>
						</div>
					</section>
				<?php endwhile; ?>
			<?php endif; ?>
		</div>
		
		<?php elseif (get_row_layout() == 'map'): ?>
			<?php if(get_sub_field('show_map')): ?>
				<section class="map_block reveal" data-anchor="anfahrt">
					<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2641.9154766244583!2d8.753847677475047!3d48.53485152341921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4797508f22fa61a5%3A0x7e57e8e5c3a64e3c!2sWerner-von-Siemens-Stra%C3%9Fe%2011%2C%2072202%20Nagold%2C%20Germany!5e0!3m2!1sen!2sge!4v1690198957106!5m2!1sen!2sge" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
				</section>
			<?php endif; ?>
		
		<?php elseif (get_row_layout() == 'sub_menu'): $type = get_sub_field('type');?>
			<?php 
			if($type): 
				get_template_part('includes/submenu');
			else: ?>
				<nav class="sub_menu_cont">
					<div class="sub_menu">
						<ul>
							<span class="caret"></span>
							<?php while(have_rows('custom_submenu')): the_row(); $link = get_sub_field('link');?>
								<li class="content_submenu"><a href="<?=$link['url'];?>" target="<?=$link['target'];?>"><?=$link['title'];?></a></li>
							<?php endwhile; ?>
						</ul>
					</div>
				</nav>
			<?php endif; ?>
			
		<?php elseif (get_row_layout() == 'accordion_block_news'):
			$count1 = 1;
			$count2 = 1;
			$title_size = get_sub_field('title_size');
			
			$posts = [];
			$num = get_sub_field('num');
			$cat = get_sub_field('category');
			$slugs = array_map(function($el){
				return $el->slug;
			}, $cat);
			
		?>
			<div class="acc_block acc_block_news reveal" data-anchor="<?=get_sub_field('anchor');?>">
				<div class="acc_image">
					<div class="slider_block acc_slider">
						<div class="slider_wrap">
							<?php $gallery = get_sub_field('picture'); 
							if($gallery): ?>
								<?php foreach($gallery as $image):?>
									<div class="slide">
										<div class="img" style="background-image: url('<?=$image['url'];?>');"></div>
									</div>
								<?php endforeach; ?>
							<?php endif;?>
						</div>
						<div class="slide_controls"></div>
					</div>
				</div>
				<div class="acc_cont <?=$title_size;?>">
					<?php
									$args = array(
										'post_type' => 'post',
										'posts_per_page' => $num,
										'tax_query' => array(
											array(
												'taxonomy' => 'category',
												'field'    => 'slug',
												'terms'    => $slugs,
											),
										)
									);
									$the_query = new WP_Query($args);
									if ($the_query->have_posts()) {
										while ($the_query->have_posts()) {
											$the_query->the_post();
											$pid = get_the_ID();
											$date = get_the_date('d.m.Y');
											$mtitle = get_the_title();
											array_push($posts, [$mtitle, $pid, $date]);
										}
										
										wp_reset_postdata();
									}
								?>
					<?php if(count($posts) > 0): ?>
						<div class="list">						
							<?php foreach($posts as $key => [$title, $pid, $date]): ?>								
								<div class="item <?= ($key === array_key_first($posts)) ? "active" : ""; ?>" data-id="<?=$count2;?>">
									<div class="title">
										<span><?= $title; ?></span>
										<div aria-role="button" aria-label="Tab öffnen" class="toggle">
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
												<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
											</svg>
										</div>
									</div>
									<div class="cont empty"></div>
								</div>								
							<?php $count2++; endforeach; ?>							
						</div>
					<?php endif; ?>
					<div class="title">
						<h1 class="<?=$title_size;?>">
							<div class="line_wrap">
								<span class="line line-t"><?php the_sub_field('title');?></span>
								<?php if (get_sub_field("title_2")): ?>
									<span class="line line-b"><?php the_sub_field("title_2"); ?></span>
								<?php endif; ?>
							</div>
						</h1>
						<div class="images">
							<?php if (count($posts) > 0): ?>
								<?php foreach ($posts as $key => [$mtitle, $pid, $date]): ?>
											<div class="news_mob_title"><?=$mtitle;?></div>
											<div class="image" data-id="<?=$count1;?>" <?=($count1 === 1)?'style="display:block;"':"";?>>
												<div class="news_date"><?=$date;?></div>
												<div class="news_title"><?=$mtitle;?></div>
												<div class="news_text"><?=get_post_field('post_content', $pid);?></div>
											</div>
											<?php
												$count1++;
											
										endforeach;
									else:
										_e('Sorry, no posts matched your criteria.');
									endif;
								?>
						</div>
					</div>
					
				</div>
			</div>
			<?php elseif (get_row_layout() == 'infoshop'):
				$num = get_sub_field('num');
				$gallery = get_sub_field('picture');			
			?>

				<div class="infoshop_block">
					
					<div class="infoshop_content">
						<?php
							$args = array(
								'post_type' => 'products',
								'posts_per_page' => $num,								
							);
							
							$the_query = new WP_Query($args);							
							if ($the_query->have_posts()) {
								while ($the_query->have_posts()):
									$the_query->the_post();
									$pid = get_the_ID();
									$date = get_the_date('d.m.Y');
									$thumbnail = get_the_post_thumbnail($pid, 'large');
								?>
									<div class="infoshop_product">
										<div class="infoshop_product_left"><?=$thumbnail;?></div>
										<div class="infoshop_product_right">
											<div class="infoshop_product--title"><?=get_the_title();?></div>
											<div class="infoshop_product--desc"><?=get_the_content();?></div>
<!-- 											<div class="infoshop_product--footer">Preis auf Anfrage</div> -->
										</div>
									</div>
								<?php 
								endwhile;
								
								wp_reset_postdata();
							}
						?>
					</div>
					
				</div>
		
		<?php elseif (get_row_layout() == 'accordion_block'):
			$count1 = 1;
			$count2 = 1;
			$title_size = get_sub_field('title_size');
		?>
			<div class="acc_block reveal" data-anchor="<?=get_sub_field('anchor');?>">
				<div class="acc_image">
					<div class="slider_block acc_slider">
						<div class="slider_wrap">
							<?php $gallery = get_sub_field('picture'); 
							if($gallery): ?>
								<?php foreach($gallery as $image):?>
									<div class="slide">
										<div class="img" style="background-image: url('<?=$image['url'];?>');"></div>
									</div>
								<?php endforeach; ?>
							<?php endif;?>
						</div>
						<div class="slide_controls"></div>
					</div>
				</div>
				<div class="acc_cont <?=$title_size;?>">
					<?php if(have_rows('list')): ?>
						<div class="list">
							<?php while(have_rows('list')): the_row(); ?>
							<div class="item" data-id="<?=$count1;?>" data-anchor="<?=get_sub_field('anchor');?>">
								<div class="title">
									<span><?php the_sub_field('title');?></span>
									<div aria-role="button" aria-label="Tab öffnen" class="toggle">
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
										</svg>
									</div>
								</div>
								<div class="cont<?=(get_sub_field('text'))?"":" empty";?>"><?php the_sub_field('text');?>
									<div class="img_mob"><img src="<?=get_sub_field('image');?>" alt="" /></div>
								</div>
							</div>
							<?php $count1++; endwhile; ?>
						</div>
					<?php endif; ?>
					<div class="title">
						<h1 class="<?=$title_size;?>">
							<div class="line_wrap">
								<span class="line line-t"><?php the_sub_field('title');?></span>
								<?php if (get_sub_field("title_2")): ?>
									<span class="line line-b"><?php the_sub_field("title_2"); ?></span>
								<?php endif; ?>
							</div>
						</h1>
						<div class="images">
							<?php while(have_rows('list')): the_row();?>
							<div class="image" data-id="<?=$count2;?>">
								<img src="<?=get_sub_field('image');?>" alt="" />
							</div>
							<?php $count2++; endwhile; ?>
						</div>
					</div>
				</div>
			</div>
		
		<?php elseif (get_row_layout() == 'history'): ?>
			<?php if(have_rows('item')): $prev = date("Y")+1;?>
			<div class="history_bg">
				<span data-svg="<?=get_template_directory_uri();?>/img/logo_sign.svg"></span>
			</div>
			<div class="history_block content_block--wide" data-anchor="historie">
				<div class="pre_text">
					IDEEN VON HEUTE<br/>
					FÜR AUFGABEN<br/>
					VON MORGEN.
				</div>
				<div class="history_wrap">
					<?php while(have_rows('item')):
						the_row();
						$from = get_sub_field('year_from');
						$to = get_sub_field('year_to');
						$num = $prev-$from;
					?>
						<div class="history_item">
							<div class="history_timeline">
								<?php
									for($i=0;$i<$num*2;$i++) {
										echo '<span></span>';
									};?>
							</div>
							<div class="history_text">
								<div class="year"><?=$from;?><?=($to)?"-".$to:"";?></div>
								<div class="text"><?php the_sub_field('text');?></div>
							</div>
						</div>
					<?php $prev=$from; endwhile; ?>
					<div class="history_item placeholder">
						<div class="history_timeline">
							<span></span>
							<span></span>
						</div>
					</div>
				</div>
			</div>
			<?php endif; ?>
		
		<?php elseif (get_row_layout() == 'links_block'):
			$title = get_sub_field('title');
			$width = get_sub_field('width');
			$hide_logo = get_sub_field('hide_logo');
		?>
			<section class="news_block links_block <?=$width;?> content_block--wide reveal<?=($hide_logo)?" centered":"";?>" data-anchor="<?=get_sub_field('anchor');?>">
				<div class="news_wrap">
				
					<?php if(have_rows('links')):?>
					<ul>
						<?php while(have_rows('links')):
							the_row();
							$link = get_sub_field('link');
						?>
							<li><a href="<?=$link['url'];?>" target="<?=$link['target'];?>"><?=$link['title'];?></a></li>
						<?php endwhile; ?>
					</ul>
					<?php else: ?>
						<?php if(!$hide_logo): ?>
							<div class="placeholder">
								<div class="line"></div>
								<div class="logo" data-svg="<?=get_template_directory_uri();?>/img/logo_sign_colored.svg"></div>
							</div>
						<?php endif; ?>
					<?php endif; ?>
					<div class="title"><?=$title;?></div>
				</div>
			</section>
		<?php elseif (get_row_layout() == 'blue_area'): $anchor = get_sub_field('anchor'); ?>
			<?php if (have_rows('type')): ?>
				<div class="blue_block" data-anchor="<?=$anchor;?>">
					<?php while (have_rows('type')): the_row(); ?>
						<?php if (get_row_layout() == 'heading'): ?>
							<h1 class="content_block reveal"><span><?php the_sub_field('text');?></span></h1>
						<?php elseif (get_row_layout() == 'image_block'): $gallery = get_sub_field('gallery');?>
							<div class="gallery_block content_block reveal">
								<?php foreach($gallery as $image):?>
									<img src="<?=$image;?>" alt="" />
								<?php endforeach; ?>
							</div>
						<?php elseif (get_row_layout() == 'text_block'): ?>
							<div class="text_block content_block reveal">
								<h1><?php the_sub_field('title');?></h1>
								<div class="text"><?php the_sub_field('text');?></div>
							</div>
						<?php endif; ?>
					<?php endwhile; ?>
				</div>
			<?php endif; ?>
			
		<?php elseif (get_row_layout() == 'karriere_block'): ?>
			<?php if(have_rows('item')):
				$titles = [];
				$count = 0;
			?>
				<section class="career_block content_block--wide reveal">
					<div class="career_block_cont">
						<div class="career_content_wrap">
							<?php while(have_rows('item')): the_row(); 
								$genders = get_sub_field('gender');						
								$mtitle = get_sub_field('title');
								$gender_list = [];
								foreach($genders as $gender => $val){
									if($val == 1){
										array_push($gender_list,$gender);
									}
								}
								if(count($gender_list)!=0) {
									array_push($titles, array($mtitle, '<div class="gender">'.implode("/",$gender_list).'</div>'));
								} else {
									array_push($titles, array($mtitle, ""));
								}
							?>
								<div class="career_content_title<?=($count === 0)?' active':"";?>"><?=$mtitle;?><?php if(count($gender_list)!=0):?><div class="gender"><?=implode("/",$gender_list);?></div><?php endif; ?></div>
								<div class="career_content" <?=($count === 0)?'style="display:block;"':"";?>>
									<div class="career_title"><?=$mtitle;?><?php if(count($gender_list)!=0):?><div class="gender"><?=implode("/",$gender_list);?></div><?php endif; ?></div>
									<div class="career_text"><?=get_sub_field('text');?></div>
								</div>
							<?php 
								$count++;
								endwhile; 
							?>
						</div>
						<div class="career_sidebar">
							<ul class="career_list">
								<?php foreach($titles as $key => $val): ?>
									<li class="<?=($key === array_key_first($titles))?"active":"";?>"><?=$val[0];?><?=$val[1];?><div class="toggle">+</div></li>
								<?php endforeach; ?>
							</ul>
							<div class="career_contact">
								<?php the_sub_field('contact_text'); ?>
								<div class="logo" data-svg="<?=get_template_directory_uri();?>/img/logo_sign_colored.svg"></div>
							</div>
						</div>
					</div>
				</section>
			<?php endif; ?>
			
		<?php elseif (get_row_layout() == 'news_block'): 			
				$posts = [];
				$count = 0;
				$num = get_sub_field('num');
				$cat = get_sub_field('category');
				$slugs = array_map(function($el){
					return $el->slug;
				}, $cat);
				$title = get_sub_field('title');
		?>
		
				<section class="career_block content_block--wide reveal" data-anchor="<?=get_sub_field('anchor');?>">
					<?php if($title): ?><div class="career_main_title"><?=$title;?></div><?php endif; ?>
					<div class="career_block_cont">
						<div class="career_content_wrap cat-<?= $slugs[0]; ?>">
								<?php
									$args = array(
										'post_type' => 'post',
										'posts_per_page' => $num,
										'tax_query' => array(
											array(
												'taxonomy' => 'category',
												'field'    => 'slug',
												'terms'    => $slugs,
											),
										)
									);
									$the_query = new WP_Query($args);
									if ($the_query->have_posts()):
										while ($the_query->have_posts()):
											$the_query->the_post();
											$pid = get_the_ID();
											$date = get_the_date('d.m.Y');
											$mtitle = get_the_title();
											array_push($posts, [$mtitle, $pid]);
												?>
											<div class="career_content_title<?=($count === 0)?' active':"";?>"><?=$mtitle;?></div>
											<div class="career_content" <?=($count === 0)?'style="display:block;"':"";?>>
												<?php if ($slugs[0] != "presseberichte"): ?>
													<div class="career_date"><?=$date;?></div>
												<?php endif; ?>
												<div class="career_title"><?=$mtitle;?></div>
												<div class="career_text"><?php the_content($pid);?></div>
													<?php if(have_rows('gallery')): ?>
														<div class="career_gallery">
														<?php while(have_rows('gallery')):
															the_row();
															$gallery = get_sub_field('gallery');
															?>
															<div class="gallery_block layout_<?=get_row_layout();?>">
																<?php foreach($gallery as $image): ?>
																	<img src="<?=$image;?>" alt="" />
																<?php endforeach; ?>
															</div>
														<?php endwhile; ?>
														</div>
													<?php endif; ?>
											</div>
											<?php
												$count++;
											wp_reset_postdata();
										endwhile;
									else:
										_e('Sorry, no posts matched your criteria.');
									endif;
								?>
						</div>
						<div class="career_sidebar">
							<ul class="career_list">
								<?php foreach($posts as $key => [$title, $pid]): ?>
									<li class="<?= ($key === array_key_first($posts)) ? "active" : ""; ?>" data-id="<?= $pid; ?>"><?= $title; ?></li>
								<?php endforeach; ?>
							</ul>
						</div>
					</div>
					
				</section>
		<?php elseif (get_row_layout() == 'newsletter'): ?>
			<div class="newsletter_block" >
				<div class="newsletter_title_2">Bleiben Sie auf dem Laufenden. Mit unserem Newsletter.</div>
				<div class="newsletter_form">
					<?= do_shortcode("[newsletter_form]"); ?>
				</div>
			</div>
		
		<?php elseif (get_row_layout() == 'image_fade_scroll'): 
			$image1 = get_sub_field('image1');
			$image2 = get_sub_field('image2');
		?>
			<div class="image_fade_scroll reveal">
				<div class="img img2" style="background-image: url(<?=$image2['url'];?>);"></div>
				<div class="img img1" style="background-image: url(<?=$image1['url'];?>);"></div>
			</div>
		
		<?php elseif (get_row_layout() == 'partner_area'): ?>
			<?php if(have_rows('logos')): ?>
				<div class="partners_block content_block--wide reveal">
					<?php while(have_rows('logos')): the_row(); $logo = get_sub_field('logo');?>
						<div class="partner_logo">
							<?php if($logo):?> <img src="<?=$logo['url'];?>" alt="<?=$logo['alt'];?>" /> <?php endif; ?>
							<div class="corners one"></div>
							<div class="corners two"></div>
						</div>
					<?php endwhile; ?>
				</div>
			<?php endif; ?>
		
		
		<?php elseif (get_row_layout() == 'linkedin_feed'): ?>
			<div class="linkedin_feed reveal">
				<div class="lf_title"><?=get_sub_field('title'); ?></div>
				<div class="lf_content">
					<script src="https://static.elfsight.com/platform/platform.js" data-use-service-core defer></script>
					<div class="elfsight-app-07dd6383-5987-4d17-a3ab-874c172e2760" data-elfsight-app-lazy></div>
				</div>
				<div class="news_newsletter_block" >
					<div class="newsletter_title">Bleiben Sie auf dem Laufenden. Mit unserem Newsletter.</div>
					<div class="newsletter_form">
						<?= do_shortcode("[newsletter_form]"); ?>
					</div>
				</div>
			</div>
		
		
		<?php elseif (get_row_layout() == 'scroll_sections'):
			$section1 = get_sub_field('section_one');
			$section2 = get_sub_field('section_two');
			$section3 = get_sub_field('section_three');
			$section4 = get_sub_field('section_four');
			$section5 = get_sub_field('section_five');
		?>
			<section class="scroll_sections">
				<div class="scroll_sections_wrap scroll_section_desktop">
					<div class="picture_cont">
						<div class="picture one">
							<div class="img" style="background-image: url('<?=$section1["picture"]["picture"];?>');"></div>
							<?php if($section1["picture"]["picture_title"]): ?>
								<div class="title_cont">
									<div class="title"><?=$section1["picture"]["picture_title"];?></div>
									<div class="subtitle" data-svg="<?=get_template_directory_uri();?>/img/DURCHSTARTEN_MIT_ROBOCUBE.svg"></div>
								</div>
							<?php endif; ?>
							<div class="layer">
								<img src="<?=get_template_directory_uri();?>/img/parallax-RoboCube-Huerde_solo-RGB.png" alt="" />
							</div>
							<div class="progress show"></div>
						</div>
						<div class="picture two">
							<div class="img" style="background-image: url('<?=$section2["picture"]["picture"];?>');"></div>
							<?php if($section2["picture"]["picture_title"]): ?><div class="title"><?=$section2["picture"]["picture_title"];?></div><?php endif; ?>
							<div class="progress"></div>
						</div>
						<div class="picture three">
							<div class="img" style="background-image: url('<?=$section3["picture"]["picture"];?>');"></div>
							<?php if($section3["picture"]["picture_title"]): ?><div class="title"><?=$section3["picture"]["picture_title"];?></div><?php endif; ?>
							<div class="progress"></div>
						</div>
						<div class="picture four">
							<div class="img" style="background-image: url('<?=$section4["picture"]["picture"];?>');"></div>
							<?php if($section4["picture"]["picture_title"]): ?><div class="title"><?=$section4["picture"]["picture_title"];?></div><?php endif; ?>
							<div class="progress"></div>
						</div>
						<div class="picture five">
							<div class="img" style="background-image: url('<?=$section5["picture"]["picture"];?>');"></div>
							<?php if($section5["picture"]["picture_title"]): ?><div class="title"><?=$section5["picture"]["picture_title"];?></div><?php endif; ?>
							<div class="progress"></div>
						</div>			
					</div>
					<div class="content_wrap">
						<div class="content_wrap--scroll">
							<div class="content one">
								<h1><?=$section1["content"]["title"];?></h1>
								<div class="text_cont">
									<div class="picture">
										<img src="<?=$section1["content"]["picture"];?>" alt="" />
									</div>
									<div class="text_small"><?=$section1["content"]["small_text"];?></div>
									<div class="text"><span data-svg="<?=get_template_directory_uri();?>/img/quote-right.svg"></span><?=$section1["content"]["text"];?></div>
								</div>
							</div>
							<div class="content two">
								<h1><?=$section2["content"]["title"];?></h1>
								<div class="text_cont">
									<div class="picture">
										<img src="<?=$section2["content"]["picture"];?>" alt="" />
									</div>
									<div class="text_small"><?=$section2["content"]["small_text"];?></div>
									<div class="text"><span data-svg="<?=get_template_directory_uri();?>/img/quote-right.svg"></span><?=$section2["content"]["text"];?></div>
								</div>
							</div>
							<div class="content three">
								<h1><?=$section3["content"]["title"];?></h1>
								<div class="text_cont">
									<div class="picture">
										<img src="<?=$section3["content"]["picture"];?>" alt="" />
									</div>
									<div class="text_small"><?=$section3["content"]["small_text"];?></div>
									<div class="text"><span data-svg="<?=get_template_directory_uri();?>/img/quote-right.svg"></span><?=$section3["content"]["text"];?></div>
								</div>
							</div>
							<div class="content four">
								<h1><?=$section4["content"]["title"];?></h1>
								<div class="text_cont">
									<div class="picture">
										<img src="<?=$section4["content"]["picture"];?>" alt="" />
									</div>
									<div class="text_small"><?=$section4["content"]["small_text"];?></div>
									<div class="text"><span data-svg="<?=get_template_directory_uri();?>/img/quote-right.svg"></span><?=$section4["content"]["text"];?></div>
								</div>
							</div>
							<div class="content five">
								<h1><?=$section5["content"]["title"];?></h1>
								<div class="text_cont">
									<div class="picture">
										<img src="<?=$section5["content"]["picture"];?>" alt="" />
									</div>
									<div class="text_small"><?=$section5["content"]["small_text"];?></div>
									<div class="text"><span data-svg="<?=get_template_directory_uri();?>/img/quote-right.svg"></span><?=$section5["content"]["text"];?></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="scroll_sections_wrap scroll_section_mobile">
					<div class="content_wrap">
						<div class="content_wrap--scroll">
							<div class="picture one">
								<div class="img" style="background-image: url('<?=$section1["picture"]["picture"];?>');"></div>
								<div class="layer">
									<img src="<?=get_template_directory_uri();?>/img/parallax-RoboCube-Huerde_solo-RGB.png" alt="" />
								</div>
								<!--<?php if($section1["picture"]["picture_title"]): ?><div class="title"><?=$section1["picture"]["picture_title"];?></div><?php endif; ?>-->
							</div>
							<div class="content one">
								<h1><?=$section1["content"]["title"];?></h1>
								<div class="text_cont">
									<div class="picture">
										<img src="<?=$section1["content"]["picture"];?>" alt="" />
									</div>
									<div class="text_small"><?=$section1["content"]["small_text"];?></div>
									<div class="text"><span data-svg="<?=get_template_directory_uri();?>/img/quote-right.svg"></span><?=$section1["content"]["text"];?></div>
								</div>
							</div>
							<div class="picture two">
								<div class="img" style="background-image: url('<?=$section2["picture"]["picture"];?>');"></div>
								<?php if($section2["picture"]["picture_title"]): ?><div class="title"><?=$section2["picture"]["picture_title"];?></div><?php endif; ?>
							</div>
							<div class="content two">
								<h1><?=$section2["content"]["title"];?></h1>
								<div class="text_cont">
									<div class="picture">
										<img src="<?=$section2["content"]["picture"];?>" alt="" />
									</div>
									<div class="text_small"><?=$section2["content"]["small_text"];?></div>
									<div class="text"><span data-svg="<?=get_template_directory_uri();?>/img/quote-right.svg"></span><?=$section2["content"]["text"];?></div>
								</div>
							</div>
							<div class="picture three">
								<div class="img" style="background-image: url('<?=$section3["picture"]["picture"];?>');"></div>
								<?php if($section3["picture"]["picture_title"]): ?><div class="title"><?=$section3["picture"]["picture_title"];?></div><?php endif; ?>
							</div>
							<div class="content three">
								<h1><?=$section3["content"]["title"];?></h1>
								<div class="text_cont">
									<div class="picture">
										<img src="<?=$section3["content"]["picture"];?>" alt="" />
									</div>
									<div class="text_small"><?=$section3["content"]["small_text"];?></div>
									<div class="text"><span data-svg="<?=get_template_directory_uri();?>/img/quote-right.svg"></span><?=$section3["content"]["text"];?></div>
								</div>
							</div>
							<div class="picture four">
								<div class="img" style="background-image: url('<?=$section4["picture"]["picture"];?>');"></div>
								<?php if($section4["picture"]["picture_title"]): ?><div class="title"><?=$section4["picture"]["picture_title"];?></div><?php endif; ?>
							</div>
							<div class="content four">
								<h1><?=$section4["content"]["title"];?></h1>
								<div class="text_cont">
									<div class="picture">
										<img src="<?=$section4["content"]["picture"];?>" alt="" />
									</div>
									<div class="text_small"><?=$section4["content"]["small_text"];?></div>
									<div class="text"><span data-svg="<?=get_template_directory_uri();?>/img/quote-right.svg"></span><?=$section4["content"]["text"];?></div>
								</div>
							</div>
								<div class="picture five">
								<div class="img" style="background-image: url('<?=$section5["picture"]["picture"];?>');"></div>
								<?php if($section5["picture"]["picture_title"]): ?><div class="title"><?=$section5["picture"]["picture_title"];?></div><?php endif; ?>
							</div>
							<div class="content five">
								<h1><?=$section5["content"]["title"];?></h1>
								<div class="text_cont">
									<div class="picture">
										<img src="<?=$section5["content"]["picture"];?>" alt="" />
									</div>
									<div class="text_small"><?=$section5["content"]["small_text"];?></div>
									<div class="text"><span data-svg="<?=get_template_directory_uri();?>/img/quote-right.svg"></span><?=$section5["content"]["text"];?></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		
		<?php endif; ?>
	<?php endwhile; ?>
<?php endif; ?>