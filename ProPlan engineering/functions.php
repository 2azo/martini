<?php
	// define('WP_DEBUG', true);
	// ini_set('display_errors', 1);
	ini_set('display_errors','1');
	ini_set('error_reporting', E_ALL );
	//define('WP_DEBUG', true);
	//define('WP_DEBUG_DISPLAY', true);
	
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
		wp_enqueue_style('main_styles', get_template_directory_uri() . '/css/style.css', [], filemtime(get_template_directory() . '/css/style.css'), 'all');
		wp_enqueue_style('responsive_styles', get_template_directory_uri() . '/css/responsive.css', [], filemtime(get_template_directory() . '/css/responsive.css'), 'all');
		//wp_enqueue_style('google_fonts', 'https://fonts.googleapis.com/css?family=Fira+Sans:300,300i,400,400i,500,500i&display=swap', [], '1.0.0', 'all');
		wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;300italic;400;700&display=swap', false); // Google font Roboto Condenced 
		wp_deregister_script( 'wp-embed' );
		wp_dequeue_script('jquery');
		wp_enqueue_script('jquery_custom', get_template_directory_uri() . '/js/jquery-3.2.1.min.js', [], '3.2.1', true);
		wp_enqueue_script('fonts', '//fast.fonts.net/jsapi/bdfff6b5-2ace-421e-a8b7-ceeac0edc15a.js', [], '1.0.0', true);
		wp_enqueue_script('slider', get_template_directory_uri() . '/js/slider.js', [], '2.2.2', true);
		//wp_enqueue_script('owl-carousel', get_template_directory_uri() . '/js/owl.carousel.min.js', [], '2.3.4', true);
		wp_enqueue_script('scripts', get_template_directory_uri() . '/js/scripts.js', array(), filemtime(get_template_directory() . '/js/scripts.js'), true);
	}
	add_action('wp_enqueue_scripts', 'content');
	
	function mwa_setup() {
		add_theme_support('title-tag');
		add_theme_support('post-thumbnails');

		register_nav_menus(array(
			'top' => __('Top Menu', 'mwa'),
			'footer' => __('Footer Menu', 'mwa'),
			'footer_sub' => __('Footer Sub-menu', 'mwa')
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
	
	add_action('acf/init', 'my_acf_init_block_types');
	function my_acf_init_block_types() {
		if( function_exists('acf_register_block_type') ) {
			acf_register_block_type(array(
				'name'              => 'custom-text-block',
				'title'             => __('Custom text block'),
				'description'       => __('A custom text block.'),
				'render_template'   => 'partials/blocks/text_block/text_block.php',
				'category'          => 'common-blocks',
				'icon'              => 'align-left',
				'keywords'          => array( 'text', 'media' ),
			));
		}
	}
	
	function mwa_init() {
		remove_post_type_support("page", "editor");
		remove_post_type_support("post", "editor");
		
		register_post_type("project", [
			"labels" => [
				"name" => __("Projects", "proplan"),
				"singular_name" => __("Project", "proplan")
            ],
			"public" => true,
			"menu_icon" => "dashicons-format-aside",
			"supports" => ["title", "editor", "thumbnail"]
        ]);
	}
	add_action("init", "mwa_init");
?>
