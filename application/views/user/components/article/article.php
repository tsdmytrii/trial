<div class="window-container false_window" data-false_window="contacts" style="height: 87%; left: 20.3%; top: 9.051%; width: 58%;z-index: 30;">

    <div class="window-titleBar">
        <div class="window-titleBar-leftCorner"></div>
        <div class="window-titleBar-content">
            <?php
                if ($data['menu_item'])
                    echo $menu_item['lang'][$pref]['value'];
                else
                    echo $data['lang'][$pref]['title']
            ?>
        </div>
        <div class="window-titleBar-rightCorner"></div>
    </div>

    <div class="window-content">

        <div class="window_preload" style="display: none;">
            <a><img src="<?= base_url();?>js/images/loading_black.gif"></a>
        </div>

        <div style="width: 100%; height: 563px;" class="winContWrap">

            <div class="seo_title" style="display: none;"><?= $data['lang'][$pref]['seo_title']?></div>
            <div class="articleItemWrap">
                <div class="articleItemContent">
                    <?php if ($data['lang'] && $data['lang'][$pref]): ?>
                        <h1 class="articleItemCaption"><?= $data['lang'][$pref]['title']?>
                            <span class="articleItemDate">
                                <?php
                                    $date = explode('-', $data['date']);
                                    echo $date[0] . '.' . $date[1] . '.' . $date[2];
                                ?></span>
                        </h1>
                        <div class="clear"></div>
                        <div class="articleItemDescription">
                            <?php if (isset($data['lang'][$pref]['description'])): ?>
                                <?= $data['lang'][$pref]['description'];?>
                            <?php endif;?>
                        </div>
                        <div class="capScroll">&nbsp;</div>

                    <?php endif;?>
                </div>
            </div>
        </div>

    </div>

    <div class="window-statusBar"></div>

</div>