<?php

$lang_pref = '';

if ($pref != 'ru') {
    $lang_pref = $pref . '/';
}


$h = $data['menu_item'];

if (isset($h['link']) && isset($h['link'][$pref]['link'])){
    $link = base_url() . $lang_pref . $h['link'][$pref]['link'];
} else if (isset($h["href"]) && $h['href'] !== '') {
    $link = base_url() . $lang_pref . $h['href'] . '/' . $h['id'] . '/' . $h['main'] . '/' . $lang_id;
} else {
    $link = base_url() . $lang_pref . '#';
}

?>
<div class="window-container false_window" data-false_window="automodel" data-href="<?= $link.'/';?>" data-name="false" style="z-index: 30; left: 0; top: 9%; width: 80%; height: 593px; padding: 0;">
    <div class="window-titleBar" style="display: none;">
        <div class="window-titleBar-leftCorner"></div>
        <div class="window-titleBar-content">
            <?= $data['menu_item']['lang'][$pref]['value'];?>
        </div>
        <div class="window-titleBar-rightCorner"></div>
    </div>
    <div class="window-content" style="top: 0;">
        <div style="width: 100%; height: 100%; overflow: hidden; top: 0;" class="winContWrap">
            <div class="seo_title" style="display: none;">
                <?= $data['lang'][$pref]['seo_title'];?>
            </div>

            <div class="aSBaner">
                <div class="aSBanerBg">
                    <div class="aSOverlay"></div>
                    <?php foreach ($data['bg'] as $key => $bg):?>
                        <img class="aSBanerImg<?php if ($key == 0) echo ' active'; ?>" src="<?= base_url() . 'uploads/images/' . $bg['name'];?>" />
                    <?php endforeach;?>
                </div>
                <div class="aSMenuWrap">
                    <?php foreach ($data['menu'] as $key => $value):?>
                        <?php if ($value['parent_id'] == 0):?>
                            <div class="aSMenuSection<?php if ($value['position'] == 0) echo ' active';?>">
                                <div class="bg"></div>
                                <div data-index="<?= $value['position']; ?>" class="aSGroupMenuItem">
                                    <div class="aSGroupMenuItemCapt"><?= $value['lang'][$pref]['value']?></div>
                                </div>
                                <div class="aSMenuItemsWrap">
                                    <?php foreach ($data['menu'] as $k => $val):?>
                                        <?php if ($value['id'] == $val['parent_id']):?>
                                            <?php
                                                if (isset($val['link']) && isset($val['link'][$pref]['link'])){
                                                    $link = base_url() . $lang_pref . $val['link'][$pref]['link'];
                                                } else if (isset($val["href"]) && $val['href'] !== '') {
                                                    $link = base_url() . $lang_pref . $val['href'] . '/' . $val['id'] . '/' . $val['main'] . '/' . $lang_id;
                                                } else {
                                                    $link = base_url() . $lang_pref . '#';
                                                }
                                            ?>

                                    <a <?php if ($val['child_inner_navigation'] == 1) echo "data-inner='true'";?> href="<?= $link;?>/" title="<?= $val['lang'][$pref]['value'];?>" class="aSMenuItem new_component"><?= $val['lang'][$pref]['value'];?></a>
                                        <?php endif;?>
                                    <?php endforeach;?>
                                    <div class="aSMenuItem orderService">
                                        <div class="bg"></div>
                                        <span>заказать обслуживание</span>
                                    </div>
                                </div>
                            </div>
                        <?php endif;?>
                    <?php endforeach;?>
                </div>
            </div>
            <div class="aSTextWrap">
                <div class="aSDescriptionWrap">
                    <div class="aSDescriptionContent">
                        <?= $data['lang'][$pref]['description'];?>
                    </div>
                </div>
                <div class="aSContactsWrap">
                    <img class="bg" src="<?= base_url();?>js/images/map_bg.png" />
                    <div class="aSContactsConteiner">
                        <div class="bg"></div>
                        <div class="aSContactsContent">
                            <?= $data['lang'][$pref]['contacts'];?>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <div class="window-statusBar" style="display: none;"></div>

</div>