<?php
	ini_set('display_errors','1');
	ini_set('error_reporting', E_ALL );
	
	// define('WP_DEBUG', true);
	// define('WP_DEBUG_DISPLAY', true);
	
	// TODO: Remove after developement is finished
	define('WP_SCSS_ALWAYS_RECOMPILE', true);
	
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

        // gsap2 and gsap3 can't coexist
		// wp_enqueue_script('tween-max', get_template_directory_uri() . '/js/TweenMax.js', [], '1.16.1', true); // gsap2
		// wp_enqueue_script('scroll-magic', get_template_directory_uri() . '/js/ScrollMagic.min.js', [], '2.0.8', true); // gsap2
		// wp_enqueue_script('gsap', get_template_directory_uri() . '/js/animation.gsap.min.js', [], '2.0.8', true); // gsap2
 
        // gsap3
        // The core GSAP library
        wp_enqueue_script( 'gsap-js', 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js', array(), false, true );
        // ScrollTrigger - with gsap.js passed as a dependency
        wp_enqueue_script( 'gsap-st', 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js', array('gsap-js'), false, true );
        // Your animation code file - with gsap.js passed as a dependency
		wp_enqueue_script('scripts', get_template_directory_uri() . '/js/scripts.js', array('gsap-js'), filemtime(get_template_directory() . '/js/scripts.js'), true);


		wp_enqueue_script('swiper', get_template_directory_uri() . '/js/swiper.min.js', [], '11.0.4', true);
		wp_enqueue_script('slider', get_template_directory_uri() . '/js/slider.js', [], '2.2.2', true);

		
	}
	add_action('wp_enqueue_scripts', 'content');
	
	function mwa_setup() {
		add_theme_support('title-tag');
		add_theme_support('post-thumbnails');
		add_theme_support( 'disable-layout-styles' );

		register_nav_menus(array(
			'main' => __('Main menu', 'mwa'),
			'main_sec' => __('Main menu (secondary)', 'mwa'),
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
	
	// registering our custom ACF blocks
	function register_custom_acf_blocks() {
		register_block_type( __DIR__ . '/blocks/ww360' );
		register_block_type( __DIR__ . '/blocks/section_label' );
		register_block_type( __DIR__ . '/blocks/video_carousel' );
		register_block_type( __DIR__ . '/blocks/comparison_table' );
		register_block_type( __DIR__ . '/blocks/animated_numbers' );
		register_block_type( __DIR__ . '/blocks/separator' );
		register_block_type( __DIR__ . '/blocks/timeline' );
	}
	add_action( 'init', 'register_custom_acf_blocks' );
	
	add_filter( 'body_class', 'my_class_names' );
	function my_class_names( $classes ) {
		global $post;		
		$classes[] = $post->post_name;
		return $classes;
	}
	
	//[contact_form] shortcode
	function contact_form(){
		$form = '<form id="contact-form" method="post">';
		$form .= '<input type="hidden" id="bchk" name="bchk" value="">';
		$form .= '<div class="mail_pending"></div>';
		$form .= '<div class="message"></div>';
		$form .= '<div class="form_cont">';
		$form .= '<div class="input_cont required"><input type="text" name="name" id="name" required=""><label for="name">Vorname</label></div>';
		$form .= '<div class="input_cont required"><input type="text" name="surname" id="surname" required=""><label for="surname">Nachname</label></div>';
		$form .= '<div class="input_cont required"><input type="email" name="email" id="email" required=""><label for="email">E-Mail</label></div>';
		$form .= '<div class="input_cont required"><input type="tel" name="phone" id="phone" required=""><label for="phone">Telefon</label></div>';
		$form .= '<div class="input_cont required full"><div class="select"><select id="appt" name="appt"><option value="08:00 - 10:00">von 08:00 Uhr bis 10:00 Uhr</option><option value="10:00 - 12:00">von 10:00 Uhr bis 12:00 Uhr</option><option value="12:00 - 14:00">von 12:00 Uhr bis 14:00 Uhr</option><option value="14:00 - 16:00">von 14:00 Uhr bis 16:00 Uhr</option><option value="16:00 - 18:00">von 16:00 Uhr bis 18:00 Uhr</option><option value="ab 18:00">ab 18:00 Uhr</option></select><div class="arrow"></div></div><label for="appt">Erreichbarkeit</label></div>';
		$form .= '</div>';
		$form .= '<div class="form_footer"><button type="submit" form="contact-form" value="ABSENDEN">ABSENDEN</button></div>';
		$form .= '</form>';
		
		return $form;
	}
	add_shortcode('contact_form', 'contact_form');
	
	add_action('wp_ajax_nopriv_send_mail', 'send_mail');
	add_action('wp_ajax_send_mail', 'send_mail');

	add_action('phpmailer_init', 'immosales_phpmailer_init');
	function immosales_phpmailer_init($phpmailer) {
	    $phpmailer->IsSMTP();
		$phpmailer->SMTPAuth = true;
		$phpmailer->SMTPSecure = 'tls';
	    $phpmailer->Host = 'tegeve.han-solo.net';
	    $phpmailer->Port = 587;
	    $phpmailer->Username = 'no-reply@immosales-academy.de';
	    $phpmailer->Password = 'Pavilion-Crewman-Gush-Scrimmage5';
	}

	function send_mail() {
		if (trim($_POST['bchk']) != '') {
			die();
		}

		$email = strip_tags($_POST['email']);
		$to = "info@immosales-academy.de";
		// Uncomment to send a copy to the sender (possible SPAM source)
		//$to = ["info@domain.de", $email];
		$subject = "Immosales Academy Kontaktformular";
		
		$message = '<h1>'.$subject. '</h1>';
		$message .= '<table rules="all" border="1" style="border-color: #666;" cellpadding="10">';
		$message .= "<tr><td><strong>Name</strong> </td><td>" . strip_tags($_POST['name']) . ' '. strip_tags($_POST['surname']) . "</td></tr>";
		$message .= "<tr><td><strong>E-Mail</strong> </td><td>" . $email . "</td></tr>";
		$message .= "<tr><td><strong>Rufnummer</strong> </td><td>" . strip_tags($_POST['phone']) . "</td></tr>";
		$message .= "<tr><td><strong>Erreichbarkeit</strong> </td><td>" . strip_tags($_POST['appt']) . "</td></tr>";
		$message .= "</table>";
		$headers = array('Content-Type: text/html; charset=UTF-8', 'From: Immosales Academy <no-reply@immosales-academy.de>');		
		
		if (wp_mail($to, $subject, $message, $headers)){
			echo "success";
		} else {
			echo "Error";
		}

		die();
	}
?>
