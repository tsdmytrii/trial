<div id="topSep"></div>

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

<a title="<?= $m_block['content']['lang'][$pref]['title'];?>" id="advTextCapt" class="new_component" href="<?= $link;?>/"><?= $m_block['content']['lang'][$pref]['title'];?></a>
<div class="clear"></div>
<div id="advTextDesc">
<?php
    $desc = str_replace('&nbsp;', ' ', $m_block['content']['lang'][$pref]['description_search']);
    $desc = substr($desc, 0, $m_block['content']['quantity']);
    $desc = substr($desc, 0, strrpos($desc, ' '));
    echo $desc . '...';
?>
</div>