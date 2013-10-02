<div class="modalBlock" <?php if (isset($maximise) && $maximise == 1) echo 'style="display: block"';?>></div>
<div id="autoBrendPictWrap">
    <?php foreach ($autobrend as $key => $a): ?>
        <div class="autoBrendItemPict <?php if ($key == 0) echo 'active'; ?>" data-autobrend_id="<?= $a['id'];?>">

            <?php if (isset($a['picture'][0])):?>
                <img class="active<?php if ($key != 0) echo ' lazy';?>"
                    <?php if ($key == 0): ?>
                        src="<?= base_url().'uploads/images/'.$a['picture'][0]['name'];?>"
                     <?php else:?>
                        src="<?= base_url().'js/images/lazy.png';?>" data-original="<?= base_url().'uploads/images/'.$a['picture'][0]['name'];?>"
                     <?php endif;?>

                 />
            <?php endif;?>

        </div>
    <?php endforeach;?>
</div>

<div id="autoBrendWrap">

    <?php foreach ($autobrend as $key => $a): ?>
        <div class="autoBrendItem<?php if ($key == 0) echo ' active';?>" data-autobrend_id="<?= $a['id'];?>">
            <div class="autoBrendLogo">
                <div class="logoLeftBg"></div>
                <div class="logoActBg"></div>
                <?php if (($key + 1) !== count($autobrend)):?>
                    <img class="autoBrendLogoBg" src="<?= base_url();?>js/images/logo_bg1px.png"/>
                <?php else:?>
                    <img class="autoBrendLogoBg" src="<?= base_url();?>js/images/logo_bg.png"/>
                <?php endif;?>
                <img class="autoBrendLogoTipe" src="<?= base_url().'uploads/images/'.$a['logo'][0]['name'];?>"/>
            </div>
            <div class="autoBrendInfo">
                <div class="autoBrendSlogan" <?php if ($key == 0) echo 'style="display: block;"';?>><?= $a['lang'][$pref]['moto'];?></div>
                <div class="autoBrendName" <?php if ($key == 0) echo 'style="display: block;"';?>><?= $a['lang'][$pref]['baner_name'];?></div>
                <div class="autoBrendPrice" <?php if ($key == 0) echo 'style="display: block;"';?>><?= $a['price'];?> грн.</div>
                <img class="bg" src="<?= base_url();?>js/images/main_act_bg.png" />
            </div>
        </div>
    <?php endforeach;?>

</div>