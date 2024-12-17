<?php
  if( have_rows('page_content') ):
    while ( have_rows('page_content') ) : the_row();
		echo "<!-- ROW LAYOUT: " . get_row_layout() . " -->";
      if( get_row_layout() == 'content_slider' ):?>
        <div class="visual content_gallery reveal">
          <?php 
            $gallery = get_sub_field('gallery');
            if($gallery):
              foreach($gallery as $gal):
          ?>
                <figure>
                  <img src="<?=$gal['url'];?>" alt="">
                </figure>
          <?php 
              endforeach;
            endif;
          ?>
          <div class="slider_header"><?=the_sub_field('header');?></div>
          <div class="slide-controls"></div>
        </div>
      <?php elseif( get_row_layout() == 'content' ): $underline = get_sub_field('disable_underline'); ?>
        <div class="main-cont">
          <div class="block-header reveal"><?=the_sub_field('header');?></div>
          <div class="block-text<?=($underline)?' underline_disabled':'';?> reveal">
            <div class="block-subheader"><?=the_sub_field('subheader');?></div>
            <span><?php the_sub_field('text'); ?></span>
            <div class="underline"></div>
          </div>
        </div>
      <?php elseif( get_row_layout() == 'image_block' ): 
              $numrows = count( get_sub_field( 'image_block_repeater' ) );
      ?>
        <div class="main-cont">
          <div class="img-item-cont" data-count="<?=$numrows;?>">
            <?php if(get_sub_field('header')): ?>
              <div class="img-items-header reveal"><?=the_sub_field('header');?></div>
            <?php endif; ?>
            <?php while( have_rows('image_block_repeater') ): the_row(); ?>
              <div class="img-item reveal">
                <div class="img-item-pic image-fade">
                  <img src="<?=the_sub_field('image');?>" alt="" />
                  <?php if(get_sub_field('link')): ?>
                    <a class="img-item-pic-overlay" href="<?=the_sub_field('link');?>"></a>
                  <?php else: ?>
                    <span class="img-item-pic-overlay"></span>
                  <?php endif; ?>
                </div>
                <div class="img-item-header"><?=the_sub_field('header');?></div>
                <div class="img-item-content">
                  <span><?=the_sub_field('text');?></span>
                  <?php if(get_sub_field('link')): ?>
                    <a href="<?=the_sub_field('link');?>">
										<?php if(ICL_LANGUAGE_CODE == 'de') {
											echo 'mehr erfahren';
										} else {
											echo 'learn more';
										}?>
										</a>										
                  <?php endif; ?>
                </div>
              </div>
            <?php endwhile; ?>
          </div>
          <div class="reveal"> 
            <div class="underline"></div>
          </div>
        </div>
			<?php elseif(get_row_layout() == 'image_block_simple'): 
				$numrows = count(get_sub_field( 'image_block_repeater'));
      ?>
				<div class="main-cont">
          <div class="img-item-cont no_zoom" data-count="<?=$numrows;?>">
						<?php if(get_sub_field('header')): ?>
              <div class="img-items-header reveal"><?=the_sub_field('header');?></div>
            <?php endif; ?>
						<?php while( have_rows('image_block_repeater') ): the_row(); ?>
              <div class="img-item reveal">
                <div class="img-item-pic image-fade">
                  <img src="<?=the_sub_field('image');?>" alt="" />
                  <?php if(get_sub_field('link')): ?>
                    <a class="img-item-pic-overlay" href="<?=the_sub_field('link');?>"></a>
                  <?php else: ?>
                  <?php endif; ?>
                </div>
                <div class="img-item-header"><?=the_sub_field('header');?></div>
                <div class="img-item-content">
                  <span><?=the_sub_field('text');?></span>
                </div>
              </div>
            <?php endwhile; ?>
					</div>
          <!--div class="reveal"> 
            <div class="underline"></div>
          </div-->
				</div>
		<?php elseif( get_row_layout() == "history_block"): ?>
			<?php $items = get_sub_field("items"); ?>
			<?php if (count($items) > 0): ?>
				<?php $items = array_reverse($items); ?>
				<div class="main-cont">
					<div class="block-history block-text reveal">
						<div class="block-subheader"><?= get_sub_field("subheader"); ?></div>
						<?php foreach ($items as $item): ?>
							<div class="history__item">
								<p class="history__date"><?= $item["date"]; ?></p>
								<?= $item["text"]; ?>
							</div>
						<?php endforeach; ?>
					</div>
				</div>
			<?php endif; ?>
		<?php elseif (get_row_layout() == "accordion"): ?>
			<section class="accordion-block main-cont">
				<?php while (have_rows('accordion')): the_row(); ?>
					<div class="news_item reveal">
						<div class="header_cont">
							<h1><?= the_sub_field('title'); ?></h1>
							<div class="read_more"><span><img src="<?= get_template_directory_uri(); ?>/img/read_more_s.png" alt="" /></span>mehr erfahren</div>
							<div class="clear"></div>
						</div>
						<div class="news_content" style="display: none;">
							<?php
								$gallery = get_sub_field('gallery');

								if ($gallery):
									$num = count($gallery);
							?>
								<div class="gallery num-<?= $num; ?>">
									<?php foreach ($gallery as $image): ?>
										<img src="<?= $image['url']; ?>" alt="<?= $image['alt']; ?>" />
									<?php endforeach;?>
								</div>
							<?php endif; ?>
							<div class="news_text">
								<?= the_sub_field('content'); ?>
							</div>
						</div>
					</div>
				<?php endwhile; ?>
			</section>
		<?php elseif (get_row_layout() == "pjobs"): ?>
			<?php 
            [$jobs, $jobCounts] = pjobs_get_jobs(); 
            ?>
			<div class="news_cont main-cont pjobs" data-anchor="jobs">
				<div class="pjobs-filter">
					<p>Liste filtern:</p>
					<div>
						<label>
							<input type="radio" name="pjobs-filter" value="-1" checked>
							<div>
								<span class="check"></span>
								<span class="text">Alle</span>
							</div>
						</label>
						<?php if (isset($jobCounts["6"])): ?>
							<label>
								<input type="radio" name="pjobs-filter" value="6">
								<div>
									<span class="check"></span>
									<span class="text">Initiativbewerbung</span>
								</div>
							</label>
						<?php endif; ?>
						<?php if (isset($jobCounts["1"])): ?>
							<label>
								<input type="radio" name="pjobs-filter" value="1">
								<div>
									<span class="check"></span>
									<span class="text">Stellenangebot</span>
								</div>
							</label>
						<?php endif; ?>
						<?php if (isset($jobCounts["2"])): ?>
							<label>
								<input type="radio" name="pjobs-filter" value="2">
								<div>
									<span class="check"></span>
									<span class="text">Ausbildung</span>
								</div>
							</label>
						<?php endif; ?>
						<?php if (isset($jobCounts["4"])): ?>
							<label>
								<input type="radio" name="pjobs-filter" value="4">
								<div>
									<span class="check"></span>
									<span class="text">Duales Studium</span>
								</div>
							</label>
						<?php endif; ?>
					</div>
				</div>
                <!-- Ausbildung bug -->
				<?php foreach ($jobs as $job): ?>
					<div class="news_item reveal" id="pjob-<?= $job["id"]; ?>" data-jobtype="<?= $job["idJobtype"]; ?>">
						<div class="header_cont">
                            <!-- job: label -->
							<h1><?= $job["label"]; ?></h1>
							<div class="read_more">
								<span>
									<img src="https://www.profiltech.com/wp-content/themes/profiltech/img/read_more_s.png" alt="">
								</span>
								mehr erfahren
							</div>
						</div>
						<div class="news_content" style="display: none;">
							<div class="news_text">
								<?= preg_replace("/(\<br\s*\/?\>)+/", "<br>", preg_replace("/\<h3\>\s*&nbsp;\s*\<\/h3\>/", "", $job["descIntroduction"])); ?>

								<h2><?= $job["descOfferTitle"]; ?></h2>
								<?= $job["descOffer"]; ?>

								<h2><?= $job["descJobProfileTitle"]; ?></h2>
								<?= $job["descJobProfile"]; ?>

								<h2><?= $job["descApplicantProfileTitle"]; ?></h2>
								<?= $job["descApplicantProfile"]; ?>

								<p class="pjobs_buttonbar">
									<a class="pjobs_button" href="<?= $job["additional"]["applicationFormUrl"]; ?>" target="_blank">Jetzt direkt bewerben</a>
								</p>
							</div>
						</div>
					</div>
				<?php endforeach; ?>
			</div>

			<script>
				const filters = document.querySelectorAll("input[name='pjobs-filter']");
				const jobs = document.querySelectorAll(".pjobs [data-jobtype]");

				const filterJobs = (jobType) => {
					jobs.forEach((job) => {
						if (jobType == "-1" || job.dataset.jobtype == jobType) {
							job.style.display = "block";
						} else {
							job.style.display = "none";
						}
					});
				};

				filters.forEach((filter) => {
					filter.onclick = (e) => {
						console.log("onClick", e.currentTarget.value);
						filterJobs(e.currentTarget.value);
					}
				});
			</script>
		<?php elseif (get_row_layout() == "jobs"): ?>
			<?php 
    			if (have_rows('jobs')): ?>
					<div class="news_cont main-cont" data-anchor="jobs">
						<?php while (have_rows('jobs')): the_row();
							$genders = get_sub_field('gender');
							$gender_list = [];
							foreach($genders as $gender => $val){
								if($val == 1){
									array_push($gender_list,$gender);
								}
							}
						?>
						<?php if (get_sub_field('active')): ?>
							<div class="news_item reveal">
								<div class="header_cont">
									<h1><?=the_sub_field('name');?> <?php if(count($gender_list)!=0):?><div class="gender">(<?=implode("/",$gender_list);?>)</div><?php endif; ?></h1>
									<div class="read_more"><span><img src="<?=get_template_directory_uri();?>/img/read_more_s.png" alt="" /></span>mehr erfahren</div>
									<!--div class="tech_specs_arrow">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 8.5">
                                    <line class="cls-1" x1="8.5" y1="7.5" x2="1" y2="1"></line>
                                    <line class="cls-1" x1="8.5" y1="7.5" x2="16" y2="1"></line>
                                    </svg>
                                    </div-->
									<div class="clear"></div>
								</div>
								<!--div class="news_date">Sonntag, Mai 20, 08:28</div-->
								<div class="news_content" style="display: none;">
									<?php if(get_sub_field('galerie')):
									$gallery = get_sub_field('galerie');
									$num = count($gallery);
									?>
									<div class="gallery num-<?=$num;?>">
										<?php foreach($gallery as $image): ?>
										<img src="<?=$image['url'];?>" alt="<?=$image['alt'];?>" />
										<?php endforeach;?>
									</div>
									<?php endif; ?>
									<div class="news_text">
										<?=the_sub_field('desc');?>
									</div>
								</div>
							</div>
						<?php endif; ?>
					<?php endwhile; ?>
				</div>
			<?php endif; ?>
			<?php if (get_field('text_after')): ?>
				<div class="main-cont text_after reveal">
					<?php the_field('text_after'); ?>
				</div>
			<?php endif; ?>
		<?php endif; ?>
		<?= "<!-- END ROW LAYOUT: " . get_row_layout() . " -->"; ?>
	<?php endwhile; ?>
<?php endif; ?>