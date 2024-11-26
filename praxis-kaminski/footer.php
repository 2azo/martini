<div class="office-hours">
  <h1 class="reveal">Sprechzeiten</h1>
  <div class="day reveal">
    <div>MONTAG</div>
    <span>08:00 - 12:00 &nbsp;&nbsp; 14:00 - 18:00</span>
  </div>
  <div class="day reveal">
    <div>DIENSTAG</div>
    <span>08:00 - 12:00 &nbsp;&nbsp; 14:00 - 18:00</span>
  </div>
  <div class="day reveal">
    <div>MITTWOCH</div>
    <span>08:00 - 12:00</span>
  </div>
  <div class="day reveal">
    <div>DONNERSTAG</div>
    <span>08:00 - 12:00 &nbsp;&nbsp; 14:00 - 18:00</span>
  </div>
  <div class="day reveal">
    <div>FREITAG</div>
    <span>08:00 - 12:00</span>
  </div>
</div>

<div class="to-top reveal">
<span>NACH OBEN</span>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48" enable-background="new 0 0 48 48" xml:space="preserve">      
    <circle fill="#ffffff" fill-opacity="0" stroke="#ffffff" stroke-width="1.5" stroke-miterlimit="10" cx="24" cy="24" r="18"></circle>      
    <g>        
      <line fill="none" stroke="#ffffff" stroke-width="1.5" stroke-linecap="square" stroke-miterlimit="10" x1="27.1" y1="24" x2="21.5" y2="29.2"></line>        
      <line fill="none" stroke="#ffffff" stroke-width="1.5" stroke-linecap="square" stroke-miterlimit="10" x1="27.1" y1="24" x2="21.5" y2="18.8"></line>      
    </g>    
  </svg>
</div>

<footer class="site-footer reveal">

  <div class="wrap">
	
    <?php if (has_nav_menu('footer')): ?>
			<nav class="footer-navigation" role="navigation">
				<?php
					wp_nav_menu(array(
						'theme_location' => 'footer',
						'menu_class' => 'footer-links-menu',
						'depth' => 1,
						// 'link_before' => '<span class="screen-reader-text">',
						// 'link_after' => '</span>'
					));
				?>
			</nav>
		<?php endif; ?>
		
		<div>
			<address class="dr">
				<div>
					Larissa Kaminski
				</div>
				<div class="address-smaller">
					Fachärztin für Frauenheilkunde und Geburtshilfe,
				</div>
				<div class="address-smaller">
					Fachärztin für Chirurgie
				</div>
			</address>
			<address>
				<div>
					Wittlensweiler Straße 61 / 72250 Freudenstadt
				</div>
				<div>
					Tel. <a href="tel:07441950080">07441 950080</a> / Fax 07441 950081
				</div>
				<div>
					Frauenärztin in Freudenstadt
				</div>
			</address>
		</div>
    
		<nav class="social-navigation" role="navigation">
			<a href="https://goo.gl/maps/apsvAewL16u"><i class="fas fa-map-marker-alt fa-2x" style="color: #fff;"></i></a>
		</nav>
			
  </div>
</footer>
<?php wp_footer(); ?>

<!-- urlaub -->
<?php 
	$from = get_field('from','urlaub');
	$until = get_field('until','urlaub');
	$urlaub = get_field('urlaub','urlaub');
	$text = get_field('text', 'urlaub');

    // var_dump($urlaub);
    // var_dump($from);
    // var_dump($until);
    // var_dump($text);

	if($urlaub):
        // echo "<!-- Popup is being rendered -->";
?>

<div id="h_popup_wrap">
	<div class="h_popup_bg h_popup_close_button"></div>
	<div class="h_popup">
		<div class="h_popup_cont">
			<!-- <div class="h_popup_header">Für unsere gynäkologische Praxis suchen wir zum näschstmöglisch Zeitpunkt Unterstützung.</div> -->
			<div class="h_popup_text">
				<!-- <div>Für unsere gynäkologische Praxis suchen wir zum näschstmöglisch Zeitpunkt Unterstützung.</div> -->
				<div class="h_popup_text_info"><?=$text;?></div>
			</div>
			<div class="h_popup_text_close_button h_popup_close_button"><span>Schließen</span></div>
		</div>
	</div>
</div>
<?php endif;?>





<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-144922440-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-144922440-1', { 'anonymize_ip': true });
</script>

<style>
	#cookie-notice {
	position: fixed;
	left: 20px;
	bottom: 20px;
	z-index: 10000;
	width: calc(100% - 40px);
	max-width: 420px;
	padding: 20px;
	box-sizing: border-box;
	background-color: #7e7e7e;
	color: #fff;
}

#cookie-notice a {
	color: #fff;
	text-decoration: underline;
}

#cookie-notice .button-bar {
	text-align: right;
	margin-top: 1.5em;
}

#cookie-notice .button {
	background-color: rgba(0, 0, 0, 0.3);
	display: inline-block;
	padding: 0.5em 1em;
	font-weight: bold;
	cursor: pointer;
	color: #fff;
}

#cookie-notice .button:hover {
	background-color: #000;
}
</style>

<div id="cookie-notice">
	<div>Durch die Nutzung dieser Webseite erklären Sie sich mit der Verwendung von Cookies einverstanden.
<br><a href="http://kaminski.mars.martiniwerbeagentur.de/datenschutz/" target="_blank">Mehr erfahren</a></div>
	<div class="button-bar">
		<span class="button">Akzeptieren</span>
	</div>
</div>
<script>

(function($) {
	var cn = document.getElementById("cookie-notice");
	var popup = document.getElementById("h_popup_wrap");
	
	if (popup) {
		var el = popup.querySelectorAll('.h_popup_close_button');
		if (!window.sessionStorage.getItem("mwa_cookie_popup")) {	
			for (var i = 0; i < el.length; i++) {
				el[i].addEventListener("click", function() {
					popup.remove();
					window.sessionStorage.setItem("mwa_cookie_popup", true);
				});
			}
		} else {
			popup.remove();
		}
	}
	
	if (window.sessionStorage.getItem("kaminski_popup")) {
		document.getElementById("popup").remove();
	}

	if (!window.sessionStorage.getItem("mwa_cookie_notice")) {
		cn.querySelector(".button").addEventListener("click", function() {
			cn.remove();
			window.sessionStorage.setItem("mwa_cookie_notice", true);
		});
	} else {
		cn.remove();
	}		
})(jQuery);
	
</script>


</body>
</html>
