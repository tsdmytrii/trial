<div class="rightSideItem news">

    <?php
//    print_r($m_block);
        if (intval($m_block['img']) == 1) {
            if ($m_block['bg'])
                $src = base_url().'uploads/images/'.$m_block['bg']['name'];
        } else {
            $src = base_url().'js/images/news1.png';
        }
    ?>

    <img src="<?= $src;?>"/>

    <div class="newsContent">

        <?php foreach($m_block['content']['list'] as $v):?>

            <?php
                if (isset($v['link']) && isset($v['link'][$pref]['link'])) {
                    $link = base_url() . $lang_pref . $v['link'][$pref]['link'];
                } else if (isset($v["href"]) && $v['href'] !== '') {
                    $link = base_url() . $lang_pref . $v['href'] . '/' . $v['id'] . '/' . $v['main'] . '/' . $lang_id;
                } else {
                    $link = base_url() . $lang_pref . '#';
                }
            ?>

            <a href="<?= $link; ?>/" class="newsCaption new_component" title="<?= $v['lang'][$pref]['title'] ?>"><?= $v['lang'][$pref]['title'] ?></a>
            <div class="newsDescription">
                <?php
                    $desc = str_replace('&nbsp;', ' ', $v['lang'][$pref]['description_search']);
                    $desc = substr($desc, 0, 150);
                    $desc = substr($desc, 0, strrpos($desc, ' '));
                    echo $desc . '...';
                ?>
            </div>

        <?php endforeach;?>

    </div>

    <?php
        if ($m_block['content']['menu_item']) {

            $h = $m_block['content']['menu_item'];

            if (isset($h['link']) && isset($h['link'][$pref]['link'])) {
                $link = base_url() . $lang_pref . $h['link'][$pref]['link'];
            } else if (isset($h["href"]) && $h['href'] !== '') {
                $link = base_url() . $lang_pref . $h['href'] . '/' . $h['id'] . '/' . $h['main'] . '/' . $lang_id;
            } else {
                $link = base_url() . $lang_pref . '#';
            }
        } else {
            $link = base_url() . $lang_pref . $m_block['content']['link'] . $lang_id;
        }
    ?>

    <a href="<?= $link; ?>/" data-timer="null" class="allNewsCaption new_component" title="<?= $m_block['lang'][$pref]['button_name']; ?>"><?= $m_block['lang'][$pref]['button_name']; ?></a>

    <div class="rightSideHorSep"></div>
</div>