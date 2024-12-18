<?php
	ini_set('display_errors','1');
	ini_set('error_reporting', E_ALL );
	
	// define('WP_DEBUG', true);
	// define('WP_DEBUG_DISPLAY', true);
	
	// TODO: Remove after developement is finished
	// define('WP_SCSS_ALWAYS_RECOMPILE', true);
	
	// remove emoji, REST API, oEmbed, RSD, WLW manifest, Wordpress generator from head
	remove_action('wp_head', 'print_emoji_detection_script', 7);
	remove_action('wp_print_styles', 'print_emoji_styles');
	remove_action('wp_head', 'rest_output_link_wp_head');
	remove_action('wp_head', 'wp_oembed_add_discovery_links');
	remove_action('wp_head', 'rsd_link');
	remove_action('wp_head', 'wlwmanifest_link');
	remove_action('wp_head', 'wp_generator');
	
	// all styles and scripts enqueued
	function content() {		
		wp_dequeue_style( 'wp-block-library' );
		wp_dequeue_style( 'wp-block-library-theme' );
		wp_enqueue_style('main_styles', get_template_directory_uri() . '/css/style.css', [], filemtime(get_template_directory() . '/css/style.css'), 'all');
		wp_enqueue_style('responsive_styles', get_template_directory_uri() . '/css/responsive.css', [], filemtime(get_template_directory() . '/css/responsive.css'), 'all');
		wp_deregister_script( 'wp-embed' );
		wp_dequeue_script('jquery');
		wp_enqueue_script('jquery_custom', get_template_directory_uri() . '/js/jquery.min.js', [], '3.6.0', true);
		wp_enqueue_script('fonts', '//fast.fonts.net/jsapi/35e52d13-bc0a-4794-bdd7-218db32a66a8.js', [], '1.0.0', true);
		wp_enqueue_script('tween-max', get_template_directory_uri() . '/js/TweenMax.js', [], '1.16.1', true);
		wp_enqueue_script('scroll-magic', get_template_directory_uri() . '/js/ScrollMagic.min.js', [], '2.0.8', true);
		wp_enqueue_script('gsap', get_template_directory_uri() . '/js/animation.gsap.min.js', [], '2.0.8', true);
		wp_enqueue_script('slider', get_template_directory_uri() . '/js/slider.js', [], '2.2.2', true);
		// wp_enqueue_script('magnific-js', get_template_directory_uri() . '/js/jquery.magnific-popup.min.js', [], '1.1.0', true);
		wp_enqueue_script('scripts', get_template_directory_uri() . '/js/scripts.js', array(), filemtime(get_template_directory() . '/js/scripts.js'), true);
	}
	add_action('wp_enqueue_scripts', 'content');
	
	function mwa_setup() {
		add_theme_support('title-tag');
		add_theme_support('post-thumbnails');

		register_nav_menus(array(
			'top' => __('Main menu', 'mwa'),
			'top_sec' => __('Main menu (secondary)', 'mwa'),
			'footer' => __('Footer menu', 'mwa'),
		));

		add_theme_support('html5', array(
			'comment-form',
			'comment-list',
			'gallery',
			'caption'
		));

		add_theme_support('custom-logo');
	}
	add_action('after_setup_theme', 'mwa_setup');
	
	// adding options page to wp dashboard
	if(function_exists('acf_add_options_page')) {
		$args = array(
			'page_title' => 'Footer',
			'menu_title' => 'Footer',
			'menu_slug' => '',
			'position' => "25",
			'icon_url' => "dashicons-tagcloud",
			'post_id' => 'footer',
			'update_button'		=> __('Aktualisieren', 'acf'),
			'updated_message'	=> __("Footer aktualisiert", 'acf'),
		);
		acf_add_options_page($args);
	}
	
	add_filter( 'body_class', 'my_class_names' );
	function my_class_names( $classes ) {
		global $post;		
		$classes[] = $post->post_name;
		return $classes;
	}
	
	// add_action('acf/init', 'my_acf_init_block_types');
	// function my_acf_init_block_types() {
		// if( function_exists('acf_register_block_type') ) {
			// acf_register_block_type(array(
				// 'name'              => 'custom-text-block',
				// 'title'             => __('Custom text block'),
				// 'description'       => __('A custom text block.'),
				// 'render_template'   => 'partials/blocks/text_block/text_block.php',
				// 'category'          => 'common-blocks',
				// 'icon'              => 'align-left',
				// 'keywords'          => array( 'text', 'media' ),
			// ));
		// }
	// }


	add_filter('wp_nav_menu_objects', 'my_wp_nav_menu_objects', 10, 2);
	function my_wp_nav_menu_objects($items, $args) {
		foreach($items as $item) {
			$icon = get_field('footer_menu_icon', $item);
			$class = get_field('menu_custom_class', $item);
			if($icon) {
				$item->title = '<i><img src="'.$icon.'" alt="'.$item->title.' icon"/></i><span>'.$item->title.'</span>';
			}
			if($class) {
				$item->classes[] = $class;
			}
		}
		return $items;
	}

	// function change_post_menu_label() {
		// global $menu, $submenu;

		// $menu[5][0] = 'Projects';
		// $submenu['edit.php'][5][0] = 'Projects';
		// $submenu['edit.php'][10][0] = 'New project';
		// $submenu['edit.php'][16][0] = 'Project Tags';
		// echo '';
	// }
	// add_action( 'admin_menu', 'change_post_menu_label' );
	

	function mwa_init() {
		remove_post_type_support("page", "editor");
		
		// $labels = array(
			// 'name' => _x( 'Project categories', 'taxonomy general name' ),
			// 'singular_name' => _x( 'Project category', 'taxonomy singular name' ),
			// 'search_items' =>  __( 'Search categories' ),
			// 'popular_items' => __( 'Popular categories' ),
			// 'all_items' => __( 'All categories' ),
			// 'parent_item' => null,
			// 'parent_item_colon' => null,
			// 'edit_item' => __( 'Edit category' ), 
			// 'update_item' => __( 'Update category' ),
			// 'add_new_item' => __( 'Add New category' ),
			// 'new_item_name' => __( 'New category name' ),
			// 'separate_items_with_commas' => __( 'Separate categories with commas' ),
			// 'add_or_remove_items' => __( 'Add or remove category' ),
			// 'choose_from_most_used' => __( 'Choose from the most used categories' ),
			// 'menu_name' => __( 'Project categories' ),
		// ); 
	 
		// register_taxonomy('project_category', 'project', array(
			// 'hierarchical' => false,
			// 'labels' => $labels,
			// 'show_ui' => true,
			// 'show_in_rest' => true,
			// 'show_admin_column' => true,
			// 'update_count_callback' => '_update_post_term_count',
			// 'query_var' => true,
			// 'rewrite' => array( 'slug' => 'project_category' ),
		// ));
	}
	add_action("init", "mwa_init");
?>
