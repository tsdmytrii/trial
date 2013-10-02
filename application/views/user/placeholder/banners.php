<?php foreach ($banners as $key => $b): ?>
    <?php // print_r($b);  ?>
    <div class="bannerItemPict <?php if ($key == 0) echo 'active'; ?>"  data-banner_id="<?= $b['id']; ?>">
        <img class="<?php if ($key == 0) echo 'active'; ?> <?php if($key !== 0) echo 'lazy';?>" src="<?= base_url() . 'uploads/images/' . $b['img']['name']; ?>"/>
    </div>
<?php endforeach; ?>
<div id="bannerPagination">
    <?php foreach ($banners as $key => $b): ?>
        <a class='banerLink' href="" data-baner_link_id="<?php echo $b['id']; ?>">  <?php echo $key; ?> </a> 
    <?php endforeach; ?>
</div>

