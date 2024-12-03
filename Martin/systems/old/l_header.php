<!-- get the id of this page and store it in CURRENT_PAGE -->
 <!-- define an empty variable "ptitle" -->
<?php	define("CURRENT_PAGE", get_queried_object_id()); $ptitle = '';?>

<!-- telling browser that this page is HTML5 -->
<!DOCTYPE html>

<!-- language_attribute get's the language settings -->
<!-- no-js no-svg is a technique to check if js and/or svg is supported -->
<html <?php language_attributes(); ?> class="no-js no-svg">

<!-- the place where all meta data exist normally (general information/settings) -->
<head>
    <!-- character encoding set, it exist else where (wp confirgurations), but there's a point for mentioning it here -->
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	
    <!-- setting viewport width to device width (good for mobile?), and initial scale to 1 -> no zooming in or out -->
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- setting theme color, it changes some color in the browser to red -->
	<meta name="theme-color" content="#981e32">

    <!-- the four lines are for icons that appear in different browsers when pinned or something -->
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#981e32">

    <!-- manifest concept in web is to make website appears like an app in phone -->
	<link rel="manifest" href="/site.webmanifest"> 

    <!-- tile color in windows, when website is pinned to the start minue  -->
	<meta name="msapplication-TileColor" content="#981e32">

    <!-- sets the tap title depending on the page title -->
	<title><?= (!is_front_page() ? wp_title("", false) . " | " : ""); ?> Martin Mechanic - Technologie &amp; Automation</title>

    <!-- important for plugins to allow them to manipulate this section -->
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?> data-anchor="top">
	
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
				<div class="logo_main" data-svg="<?=get_template_directory_uri();?>/img/logo.svg"></div>
			</a>
		</div>

		<div class="logo_cont_mobile">
			<a class="logo" href="<?= esc_url(home_url("/")); ?>">
				<div class="logo_main" data-svg="<?=get_template_directory_uri();?>/img/logo_sign_colored.svg"></div>
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
				<?php if(have_rows('socials','footer')): ?>
					<?php while(have_rows('socials','footer')): the_row(); $social = get_sub_field('social_network');?>
						<a class="<?=$social;?>" href="<?=get_sub_field($social.'_link');?>" target="_blank" data-svg="<?=get_template_directory_uri();?>/img/social_icon_<?=$social;?>.svg"></a>
					<?php endwhile; ?>
				<?php endif; ?>
			</div-->
		</div>
	</nav>