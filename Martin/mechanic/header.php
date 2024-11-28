<?php	define("CURRENT_PAGE", get_queried_object_id()); $ptitle = '';?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js no-svg">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="theme-color" content="#981e32">
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
	<link rel="manifest" href="/site.webmanifest"> 
	<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#981e32">
	<meta name="msapplication-TileColor" content="#981e32">
	<title><?= (!is_front_page() ? wp_title("", false) . " | " : ""); ?> Martin Mechanic - Technologie &amp; Automation</title>
	<?php wp_head(); ?>
	<!--style>
		.loading_screen {
			width: 100%;
			height: 100%;
			position: fixed;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			background-color: #fff;
			z-index: 99999999;
		}
		.loading_screen svg {
			width: 10rem;
			height: auto;
			margin: 0 auto;
			display: block;
		}
		.loading_screen_text {
			font-size: 11px;
			letter-spacing: 3px;
			font-weight: bold;
			font-family: sans-serif;
			color: #706f6f;
			text-align: center;
			margin-top: 10px;
		}
		.loading_screen_cont {
			position: absolute;
			top: 50%;
			right: initial;
			bottom: initial;
			left: 50%;
			width: 30rem;
			transform: translate(-50%,-54%);
			overflow: hidden;
		}
		.loading_screen_title {
			font-size: 11px;
			letter-spacing: 1px;
			text-transform: uppercase;
			text-align: center;
			color: #6cc067;
			margin-top: 12px;
		}
		.loading_screen_progress {
			height: 0.75rem;
			width: 100%;
			margin-top: 0.75rem;
			margin-bottom: 1.27rem;
			position: relative;
			font-size: 0;
			/*overflow: hidden;*/
			background-color: #dad9d9;
			transform: skew(-50deg);
			left: -0.5rem;
		}
		.loading_screen_progress #nprogress {
			position: absolute;
			left: 0;
			/*top: -1px;*/
			bottom: 0;
			right: 0;
			width: 100%;
			height: 100%;
			overflow: hidden;
		}
		.loading_screen_progress .bar {
			background-color: #706f6f;
			position: absolute;
			z-index: 1031;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
		@media all and (max-width: 599px) {
			.loading_screen_cont {
				width: 24rem;
			}
		}
		@media all and (max-width: 499px) {
			.loading_screen_cont {
				width: 20rem;
			}
		}
		@media all and (max-width: 399px) {
			.loading_screen_cont {
				width: 16rem;
			}
		}
	</style>
	<script type="text/javascript" src="<?=get_template_directory_uri();?>/js/nprogress.js"></script-->
</head>

<body <?php body_class(); ?> data-anchor="top">
	<!--div class="loading_screen" id="loading_screen">
		<div class="loading_screen_cont">		
			<div class="loading_screen_text">loading</div>
			<div class="loading_screen_progress"></div>
			<svg viewBox="0 0 337.83999 54.737999">
				<defs id="defs4"><style id="style2">.cls-1{fill:#1d1d1b;}.cls-2,.cls-3{fill:#706f6f;}.cls-3{fill-rule:evenodd;}.cls-4{fill:#a52e51;}</style></defs>
				<path class="cls-2" d="M 16,-4.6182617e-4 V 53.899534 H 0 V -4.6182617e-4 Z m 30.74,0 L 32.53,24.459538 46.66,53.899534 h -18 L 16.47,24.149538 30.28,-4.6182617e-4 Z"
					 id="path24" inkscape:connector-curvature="0" style="fill:#706f6f" />
				<path class="cls-2" d="m 67.97,39.149534 v 15.27 a 19.63,19.63 0 0 1 -3.32,0.31 20.2,20.2 0 0 1 -14.8,-5.84 20.84,20.84 0 0 1 0.06,-29.159996 19.84,19.84 0 0 1 14.54,-6 q 9.55,0 15.06,5.58 5.51,5.58 5.5,15.259996 v 19.33 H 70.25 v -18.23 a 7.57,7.57 0 0 0 -1.52,-4.999996 5,5 0 0 0 -4.08,-1.86 5.81,5.81 0 0 0 -4.18,9.749996 5.22,5.22 0 0 0 3.9,1.58 6.77,6.77 0 0 0 3.6,-1"
					 id="path26" inkscape:connector-curvature="0" style="fill:#706f6f" />
				<rect class="cls-2" x="89.940002" y="0.029538238" width="14.76" height="53.869999" id="rect28" style="fill:#706f6f" />
				<path class="cls-2" d="M 163.66,53.899534 H 148.9 V 32.669538 a 7.65,7.65 0 0 0 -0.52,-3.39 1.92,1.92 0 0 0 -1.85,-1 q -2.49,0 -2.49,4.38 V 53.899534 H 129.28 V 32.669538 a 7.48,7.48 0 0 0 -0.53,-3.39 2,2 0 0 0 -1.87,-1 q -2.44,0 -2.45,4.38 V 53.899534 H 109.67 V 29.669538 a 15.65,15.65 0 0 1 4.46,-11.26 14.41,14.41 0 0 1 10.81,-4.64 q 6.56,0 11.76,5.52 5.81,-5.52 11.61,-5.52 a 14.63,14.63 0 0 1 11.84,5.37 q 3.51,4.19 3.51,12.19"
					 id="path30" inkscape:connector-curvature="0" style="fill:#706f6f" />
				<path class="cls-2" d="M 183.74,-4.6182617e-4 V 32.279538 q 0,7.839996 5.65,7.849996 a 5.6,5.6 0 0 0 4.08,-1.64 5.32,5.32 0 0 0 1.68,-4 5.61,5.61 0 0 0 -1.58,-3.999996 5.17,5.17 0 0 0 -3.87,-1.64 6.88,6.88 0 0 0 -3.71,1.43 v -16.28 c 1.74,-0.16 3.05,-0.24 4,-0.24 a 19.35,19.35 0 0 1 14.26,6 20.56,20.56 0 0 1 -0.09,28.999996 21.09,21.09 0 0 1 -23.47,4 19.38,19.38 0 0 1 -6.92,-5.21 q -4.74,-5.68 -4.74,-14.719996 V -4.6182617e-4 Z"
					 id="path32" inkscape:connector-curvature="0" style="fill:#706f6f" />
				<path class="cls-2" d="m 237.25,39.149534 v 15.27 a 19.42,19.42 0 0 1 -3.31,0.31 20.2,20.2 0 0 1 -14.8,-5.84 19.69,19.69 0 0 1 -5.92,-14.639996 20.38,20.38 0 0 1 20.52,-20.48 q 9.56,0 15.06,5.58 5.5,5.58 5.5,15.259996 v 19.29 h -14.76 v -18.23 a 7.57,7.57 0 0 0 -1.52,-4.999996 5,5 0 0 0 -4.08,-1.86 5.81,5.81 0 0 0 -4.18,9.749996 5.21,5.21 0 0 0 3.9,1.58 6.71,6.71 0 0 0 3.59,-1"
					 id="path34" inkscape:connector-curvature="0" style="fill:#706f6f" />
				<path class="cls-2" d="m 284.61,35.789534 14.64,-0.55 a 20.84,20.84 0 0 1 -6.35,14 19.43,19.43 0 0 1 -13.94,5.48 19.84,19.84 0 0 1 -14.66,-6 20.22,20.22 0 0 1 -6,-14.789996 19.25,19.25 0 0 1 6,-14.25 20.46,20.46 0 0 1 34.6,10.59 l -15,0.55 a 5.91,5.91 0 0 0 -4.9,-2.53 5.52,5.52 0 0 0 -4.1,1.71 5.75,5.75 0 0 0 -1.62,4.18 5.84,5.84 0 0 0 1.72,4.299996 5.76,5.76 0 0 0 4.28,1.74 q 3.75,0 5.33,-4.38"
					 id="path36" inkscape:connector-curvature="0" style="fill:#706f6f" />
				<path class="cls-2" d="M 317.99,-4.6182617e-4 V 16.489538 a 12.75,12.75 0 0 1 7.5,-2.72 11,11 0 0 1 9,4.1 q 3.35,4.13 3.35,11.13 V 53.899534 H 323.08 V 33.109538 a 7.22,7.22 0 0 0 -0.53,-3.4 2.24,2.24 0 0 0 -2.07,-0.87 c -1.66,0 -2.49,1.23 -2.49,3.67 V 53.899534 H 303.23 V -4.6182617e-4 Z"
					 id="path38" inkscape:connector-curvature="0" style="fill:#706f6f" />
			</svg>
		</div>
	</div-->

	<header>
		<div class="menu_button_cont">
			<div class="menu_button">
				<span></span>
				<span></span>
				<span></span>
			</div>
			<div class="menu_location">
				<div class="menu_location_cont"><a href="<?=get_permalink();?>"><span><?php the_title(); ?></span></a></div>
			</div>
		</div>
		<div class="first_main_menu">
			<?=wp_nav_menu(array('menu_id' => "nav_menu", 'theme_location'=>'top','<span data-svg="'.get_template_directory_uri().'/img/arrow_link.svg"></span>','container'=>false)); ?>
		</div>
		
		<?php 
			$show_submenu = get_field('show_submenu');

			if(!is_page_template() && $show_submenu) {
				$menu_name = 'top';
				if (($locations = get_nav_menu_locations()) && isset($locations[$menu_name])) {
					$menu = wp_get_nav_menu_object($locations[$menu_name]);
					$menu_items = wp_get_nav_menu_items($menu->term_id);
					$parent_item = wp_filter_object_list($menu_items, array('url' => get_permalink()));
					$parent_item_id = '';
					foreach($parent_item as $key => $value) {
						$parent_item_id = $value->ID;
					}
					echo '<div class="sub_menu"><div class="menu_button"><span></span><span></span><span></span></div><ul>';
					foreach($menu_items as $item) {
						if($item->menu_item_parent == $parent_item_id) {
							echo '<li><a href="'.$item->url.'">'.$item->title.'</a></li>';
						}
					}
					echo '</ul></div>';
				}
			}
		?>
		
		<div class="logo_cont">
			<div class="logo_text">Erfolg durch eine produktive Zukunft</div>
			<a class="logo" href="<?= esc_url(home_url("/")); ?>">
				<div class="logo_main" data-svg="http://martinmechanic.neptune.martiniwerbeagentur.de/wp-content/uploads/2024/11/mm-SVG.svg"></div>
				

			</a>
		</div>
		
		<div class="logo_cont_mobile">
			<a class="logo" href="<?= esc_url(home_url("/")); ?>">
				<div class="logo_main" data-svg="http://martinmechanic.neptune.martiniwerbeagentur.de/wp-content/uploads/2024/11/mm-SVG.svg"></div>
			</a>
		</div>


	</header>
	<div class="main_menu_bg"></div>
	<nav class="main_menu">
		<div class="main_menu_wrap">
			<div class="main_menu_left">
				<?=wp_nav_menu(array('theme_location'=>'top_sec','before'=>'<span></span>','container'=>false)); ?>
			</div>
			<div class="main_menu_right">
				<?=wp_nav_menu(array('theme_location'=>'top','before'=>'<span data-svg="'.get_template_directory_uri().'/img/arrow_link.svg"></span>','container'=>false)); ?>
			</div>
			<!--div class="socials">
				<?php if(have_rows('socials','footer')): ?>
					<?php while(have_rows('socials','footer')): the_row(); $social = get_sub_field('social_network');?>
						<a class="<?=$social;?>" href="<?=get_sub_field($social.'_link');?>" target="_blank" data-svg="<?=get_template_directory_uri();?>/img/social_icon_<?=$social;?>.svg"></a>
					<?php endwhile; ?>
				<?php endif; ?>
			</div-->
		</div>
	</nav>