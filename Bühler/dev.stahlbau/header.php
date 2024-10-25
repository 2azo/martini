<!DOCTYPE html>
<html data-id="<?= get_current_blog_id(); ?>">
<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<meta name="theme-color" content="<?= get_field('website_color', 'options'); ?>">
	<meta name="msapplication-TileColor" content="<?= get_field('website_color', 'options'); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="facebook-domain-verification" content="hx0upvy117qwz50qdpdh6bfxyc04er" />
	<title><?= (!is_front_page() ? wp_title("", false) . " | " : ""); ?> Bühler Stahlbau</title>
	
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
	<link rel="manifest" href="/site.webmanifest">
	
	<?php wp_head(); ?>

	<style>
		.loading_screen {
			width: 100%;
			height: 100%;
			position: fixed;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			background-color: #fff;
			z-index: 9999999999;
		}

		.loading_screen svg {
			height: auto;
			margin: 0 auto;
			display: block;
		}

		.loading_screen_cont {
			position: absolute;
			top: 50%;
			right: initial;
			bottom: initial;
			left: 50%;
			width: 580px;
			-webkit-transform: translate(-50%, -54%);
			-ms-transform: translate(-50%, -54%);
			transform: translate(-50%, -54%);
			overflow: hidden;
		}
		
		
		.loading_screen_cont svg {
			width: 280px;
			margin: 0 auto 3em;
		}

		.loading_screen .st0 {
			fill: #3C3C3B;
		}

		.loading_screen .st1,
		.loading_screen .st11 {
			fill: #3C3C3B;
		}

		.loading_screen .st1.slow {
			animation: animationFrames ease 5s 0.5s forwards;
		}

		.loading_screen .st1.fast {
			fill: #d2232a;
			animation: animationFrames ease 2.5s forwards;
		}
		
		body.fahrzeugservice .loading_screen .st11.slow {
			animation: animationFramesBlue ease 5s 0.5s forwards;
		}
		
		body.fahrzeugservice .loading_screen .st11.fast {
			fill: #0098D1;
			animation: animationFramesBlue ease 2.5s forwards;
		}

		@keyframes animationFrames {
			0% {
				fill: #3C3C3B;
			}
			100% {
				fill: #d2232a;
			}
		}
		
		@keyframes animationFramesBlue {
			0% {
				fill: #3C3C3B;
			}
			100% {
				fill: #0098D1;
			}
		}
		
		.loading_screen_progress {
			height: 3px;
			width: 100%;
			margin-top: 10px;
			top: 60%;
			position: relative;
			font-size: 0;
			margin: 0 auto;
			/*overflow: hidden;*/
			background-color: #fff;
		}
		.loading_screen_progress #nprogress {
			position: absolute;
			left: 0;
			top: 0;
			bottom: 0;
			right: 0;
			width: 100%;
			height: 1px;
			/*overflow: hidden;*/
			background-color: #000;
		}
		.loading_screen_progress .bar {
			background-color: #d2232a;
			position: absolute;
			z-index: 1031;
			top: -2px;
			left: 0;
			width: 100%;
			height: 4px;
		}
		body.fahrzeugservice .loading_screen_progress .bar {
			background-color: #0098D1;
		}
		.loading_screen .cls-1 {
			opacity: 0;
			transition: opacity .8s ease 1s;
		}
		.loading_screen .cls-2 {
			transform: translateX(16px);
			transition: transform .8s ease;
		}
		.loading_screen.cls_ready .cls-1 {
			opacity: 1;
		}
		.loading_screen.cls_ready .cls-2 {
			transform: translateX(0);
		}
	</style>
	<script type="text/javascript" src="<?= get_template_directory_uri(); ?>/js/nprogress.js"></script>
</head>
<body <?php body_class(); ?> <?php if (is_page('fahrzeugservice')) echo "class='fahrzeugservice'"; ?> >

<div class="loading_screen" id="loading_screen">
	<div class="loading_screen_cont">
		<?php if (is_page('fahrzeugservice')): ?>
			<?= file_get_contents(get_template_directory() . "/img/logo-blau-fixed.svg"); ?>
		<?php else: ?>
			<?= file_get_contents(get_template_directory() . "/img/logo.svg"); ?>
		<?php endif; ?>
		<div class="loading_screen_progress"></div>
	</div>
</div>
<div class="nav-menu-header">
	<div class="nav-content">
		<div class="button-container">
			<div class="close-button" id="nav-menu-close"></div>
		</div>
		<div class="menu-outer">
			<?= wp_nav_menu(array('theme_location' => 'main_menu', 'menu' => 2, 'container' => false)); ?>
		</div>
	</div>
</div>
<?php

$obj_id = get_queried_object_id();
$current_url = get_permalink($obj_id);
$active = false;

$categories = [];

if (get_field('categories', 'options')) {
	while (have_rows('categories', 'options')) {
		the_row();

		$categories[] = [
			"background" => get_sub_field("background"),
			"id" => get_sub_field("category")
		];
		
		if (has_category(get_sub_field("category"), $obj_id)) {
			$active = true;
		}
	}
}

?>
<div class="nav-menu-header-categories <?php if ($active) echo "item-open"; ?>"
	 id="<?php if ($active) echo "open-anchor"; ?>" >
	<div class="nav-content">
		<?php
			foreach ($categories as $cat) {
				$active = has_category($cat["id"], $obj_id);		
				$category = get_term($cat["id"]);	
				$categoryName = $category->name;
				$args = [
					'post_type' => 'project',
					'post_status' => 'publish',
					'posts_per_page' => -1,
					'orderby' => 'pubdate',
					'order' => 'ASC',
					'cat' => $cat["id"]
				];

				$query = new WP_Query($args); 
		?>				
				<div id="<?php if ($active) echo "active-anchor"; ?>" class="item <?php if ($active) echo "active"; ?>"<?php if ($cat["background"]): ?> style="background-image:url('<?= $cat["background"] ?>');" <?php endif; ?>>
					<a class="mob-anchor" href="/projekte/#<?=$category->slug;?>"></a>
					<div class="item-container">
						<p><?= $categoryName ?></p>
						<div class="items">
							<?php while ($query->have_posts()): $query->the_post(); ?>
								<div class="item-in">
									<a href="<?= get_permalink(); ?>" class="<?php if ($current_url == get_permalink()) echo "active"; ?>">
										<?php the_title(); ?>
									</a>
								</div>
							<?php endwhile; ?>
						</div>
					</div>
				</div>
		<?php
			}
		?>
	</div>
</div>
<?php wp_reset_postdata(); ?>
<?php if (is_page('fahrzeugservice')) : ?>
<div class="nav-menu-header-categories-vehicle <?php if ($active) echo "item-open"; ?>"
	 id="<?php if ($active) echo "open-anchor"; ?>">
	<?php if(have_rows('menu_item', 'options')): ?>
		<div class="nav-content">
			<?php while (have_rows('menu_item', 'options')): the_row(); $link = get_sub_field('link'); ?>
				<div class="item" <?php if (get_sub_field('image')): ?> style="background-image:url(<?= the_sub_field('image') ?>);" <?php endif; ?> >
					<a href="<?php echo $link['url']; ?>" class="vehicle item-container">
						<p>
							<?php echo $link['title']; ?>
						</p>
					</a>
			   </div>
			<?php endwhile; ?>
			</div>
	<?php endif; ?>
</div>
<?php endif; ?>
<header class="site-header header_slide">
	<div class="group">
		<div class="site-footer-left">
			<div class="logo-container main-menu-icon" id="nav-menu-open">
				<div class="menu-logo">
				</div>
			</div>
		</div>
		<div class="site-footer-center">
			<div class="logo">
				<a href="<?= get_home_url() ?>" data-svg="<?= get_template_directory_uri(); ?>/img/logo_1_fix.svg"></a>
			</div>
			<div class="logo-blue">
				<a href="<?= get_home_url() ?>" data-svg="<?= get_template_directory_uri(); ?>/img/logo-blau-fixed.svg"></a>
			</div>
		</div>
		<div class="site-footer-right">
			<?php if (get_field('categories', 'options')): ?>
				<div class="logo-container main-menu-icon" id="nav-menu-categories-open<?php if(is_page('fahrzeugservice')) echo '-vehicle'; ?>">
					<div class="menu-logo">
					</div>
				</div>
			<?php endif; ?>
		</div>
	</div>
</header>

<div id="menu-toggle-button">
	<div class="logo-container main-menu-icon">
		<div class="menu-logo"></div>
	</div>
</div>


<div id="mail_modal" style="display:none;">					
	<div class="mail_modal_bg mail_modal_close_button"></div>
	<div class="mail_modal">
		<div class="mail_modal_cont">
			<div class="mail_modal_text ajax_message">E-Mail erfolgreich gesendet!</div>
			<div class="mail_modal_text_close_button mail_modal_close_button">
				<span>Schließen</span>
			</div>
		</div>
	</div>
</div>
