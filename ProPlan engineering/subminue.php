<?php 	
	$menu_name = 'top';

	if (($locations = get_nav_menu_locations()) && isset($locations[$menu_name])) {
		$menu = wp_get_nav_menu_object($locations[$menu_name]);
		$menu_items = wp_get_nav_menu_items($menu->term_id);
		$parent_item = wp_filter_object_list($menu_items, array('url' => get_permalink()));
		$value = array_shift($parent_item);
		$parent_item_id = $value->ID;
		$items = array();

		foreach($menu_items as $item) {
			if ($item->menu_item_parent == $parent_item_id) {
				array_push($items, $item);
			}
		}
		
		$num = count($items);

		if ($num > 0) {
			echo '<div class="sub_menu_cont"><div class="sub_menu"><ul><span class="caret"></span>';
			for ($x = 0; $x < $num; $x++) {
				echo '<li><a href="' . $items[$x]->url . '">' . $items[$x]->title . '</a></li>';
			}
			echo '</ul></div></div>';
		}
	}
?>