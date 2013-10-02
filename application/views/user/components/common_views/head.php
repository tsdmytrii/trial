<?php

$lang_pref = '';

if ($pref != 'ru') {
    $lang_pref = $pref . '/';
}

if (isset($data['menu']['parent']['link']) && isset($data['menu']['parent']['link'][$pref]['link'])){
    $link = base_url() . $lang_pref . $data['menu']['parent']['link'][$pref]['link'];
} else if (isset($data['menu']['parent']["href"]) && $data['menu']['parent']['href'] !== '') {
    $link = base_url() . $lang_pref . $data['menu']['parent']['href'] . '/' . $data['menu']['parent']['id'] . '/' . $data['menu']['parent']['main'] . '/' . $lang_id;
} else {
    $link = base_url() . $lang_pref . '#';
}

?>

<a class="windHeadItem parent
    <?php
        if (isset($data['menu']['parent']['current']))
            echo ' active';

        if (intval($data['menu']['parent']['child_inner_navigation']) == 1)  {
            echo ' new_inner_component';
        } else {
            echo ' new_component';
        }

    ?>" title="<?= $data['menu']['parent']['lang'][$pref]['value'];?>" href="<?= $link;?>/">
    <?= $data['menu']['parent']['lang'][$pref]['value'];?>
</a>
<div class="windSep"></div>

<?php if($data['menu']['children']):?>
    <?php foreach ($data['menu']['children'] as $key => $val):?>

        <?php

            if (isset($val['link']) && isset($val['link'][$pref]['link'])){
                $link = base_url() . $lang_pref . $val['link'][$pref]['link'];
            } else if (isset($val["href"]) && $val['href'] !== '') {
                $link = base_url() . $lang_pref . $val['href'] . '/' . $val['id'] . '/' . $val['main'] . '/' . $lang_id;
            } else {
                $link = base_url() . $lang_pref . '#';
            }

        ?>

        <a class="windHeadItem<?php
        if (isset($val['current']))
            echo ' active';

        if (intval($val['child_inner_navigation']) == 1)  {
            echo ' new_inner_component';
        } else {
            echo ' new_component';
        }
        ?>" title="<?= $val['lang'][$pref]['value'];?>" href="<?= $link?>/">
            <?= $val['lang'][$pref]['value'];?>
        </a>
        <div class="windSep"></div>
    <?php endforeach;?>
<?php endif;?>