<?php

$lang_pref = '';

if ($pref != 'ru') {
    $lang_pref = $pref . '/';
}

foreach ($header as $h) {
    if (intval($h['component_type_id']) == 28) {
        $menu_item = $h;

        if (isset($h['link']) && isset($h['link'][$pref]['link'])){
            $link = base_url() . $lang_pref . $h['link'][$pref]['link'];
        } else if (isset($h["href"]) && $h['href'] !== '') {
            $link = base_url() . $lang_pref . $h['href'] . '/' . $h['id'] . '/' . $h['main'] . '/' . $lang_id;
        } else {
            $link = base_url() . $lang_pref . '#';
        }

    }
}

?>

<div data-href="<?= $link; ?>/" class="window-container false_window" data-false_window="contacts" style="z-index: 30;height: 593px;left: 2.8%;padding: 0;top: 9%;width: 77%;" data-name="false">

    <div class="window-titleBar">
        <div class="window-titleBar-leftCorner"></div>
        <div class="window-titleBar-content"><?= $menu_item['lang'][$pref]['value'];?></div>
        <div class="window-titleBar-rightCorner"></div>
    </div>

    <div class="window-content">

        <div class="window_preload" style="display: none;">
            <a><img src="<?= base_url();?>js/images/loading_black.gif"></a>
        </div>

        <div style="width: 100%; height: 563px;" class="winContWrap">

            <div class="seo_title" style="display: none;"><?= $contacts['lang'][$pref]['seo_title'];?></div>
            <div id="contactWrapper">
                <?php if (isset($contacts['lang'][$pref]['description'])):?>
                    <div id="contactTable">
                        <?= $contacts['lang'][$pref]['description'];?>
                    </div>
                <?php endif;?>

                <div id="bigMapTop"></div>

                <div id="bigMapWrap">

                </div>
            </div>



        </div>

    </div>

    <div class="window-statusBar" style="display: none;"></div>

</div>