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

<div data-href="<?= $link; ?>/" class="window-container false_window" data-false_window="article" style="z-index: 10;height: 593px;left: 0;padding: 0;top: 9%;width: 80%;" data-name="false">

    <div class="window-titleBar" style="color: #000; padding-left: 15px;">
        <div class="window-titleBar-leftCorner"></div>
        <div class="window-titleBar-content"><?= $data['menu_item']['lang'][$pref]['value'];?></div>
        <div class="window-titleBar-rightCorner"></div>
    </div>

    <div class="window-content">

        <div class="window_preload" style="display: none;">
            <a><img src="<?= base_url();?>js/images/loading_black.gif"></a>
        </div>

        <div style="width: 100%; height: 563px;" class="winContWrap">

            <div class="articleWrap">
                <div class="seo_title" style="display: none;"><?= $data['seo'][$pref]['seo_title'];?></div>

                <div class="articleContent">

                    <?php if (isset($data['seo'])): ?>
                        <?php if (isset($data['seo'][$pref]['description']) && $data['seo'][$pref]['description'] !== ''): ?>
                            <div class="articleDescTop"><?= $data['seo'][$pref]['description']?></div>
                        <?php endif;?>
                    <?php endif;?>
                    <div class="clear"></div>

                    <?php foreach($data['data'] as $key => $val): ?>
                        <?php if(isset($val['lang']) && isset($val['lang'][$pref]) && $val['img']):?>
                            <div class="articleItem <?php if ($key%2 == 0) echo 'even';?>">
                                <div class="articleImgWrap">
                                    <img src="<?= base_url() . 'uploads/images/' . $val['img']['name'];?>">
                                </div>
                                <div class="articleTextWrap">

                                    <?php

                                        if (isset($val['link']) && isset($val['link'][$pref]['link'])){
                                            $link = base_url() . $lang_pref . $val['link'][$pref]['link'];
                                        } else if (isset($val["href"]) && $val['href'] !== '') {
                                            $link = base_url() . $lang_pref . $val['href'] . '/' . $val['id'] . '/' . $val['main'] . '/' . $lang_id;
                                        } else {
                                            $link = base_url() . $lang_pref . '#';
                                        }
                                    ?>

                                    <a class="articleCaption new_component" title="<?= $val['lang'][$pref]['title'];?>" href="<?= $link;?>/">
                                        <?= $val['lang'][$pref]['title'];?>
                                        <span class="articleDate">
                                            <?php
                                                $date = explode('-', $val['date']);

                                                echo $date[2] . '.' . $date[1] . '.' . $date[0];
                                            ?>
                                        </span>
                                    </a>
                                    <div class="articleDesc">

                                        <?php

                                            $description = $val['lang'][$pref]['description'];
                                            $description = substr($description, 0, 300);
                                            $description = substr($description, 0, strrpos($description, ' ' ));;

                                            echo $description;

                                        ?>
                                    </div>
                                </div>
                                <div class="clear"></div>
                            </div>
                            <div class="clear"></div>
                        <?php endif; ?>
                    <?php endforeach;?>


                    <?php if (isset($data['seo'])): ?>
                        <?php if (isset($data['seo'][$pref]['description_btm']) && $data['seo'][$pref]['description_btm'] !== ''): ?>
                            <div class="articleDescTop"><?= $data['seo'][$pref]['description_btm']?></div>
                        <?php endif;?>
                    <?php endif;?>
                    <div class="clear"></div>

                    <div class="capScroll">&nbsp;</div>

                </div>

            </div>



        </div>

    </div>

    <div class="window-statusBar" style="display: none;"></div>

</div>