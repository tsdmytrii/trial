<div id="mainMenu">
    <?php // print_r($h eader); ?>
    <?php foreach ($header as $key => $h): ?>
        <?php if ($h['parent_id'] == 0): ?>
            <?php
//            print_r(count($key));
//             print_r(count($header));
            ?>
            <?php if (isset($h['lang'][$pref])): ?>
                <?php
                if (isset($h['link']) && isset($h['link'][$pref]['link'])) {
                    $link = base_url() . $lang_pref . $h['link'][$pref]['link'];
                } else if (isset($h["href"]) && $h['href'] !== '') {
                    $link = base_url() . $lang_pref . $h['href'] . '/' . $h['id'] . '/' . $h['main'] . '/' . $lang_id;
                } else {
                    $link = base_url() . $lang_pref. '#';
                }
                ?>
                <a class="menuItem new_component" title="<?= $h['lang'][$pref]['value'] ?>" href="<?= $link; ?>/"><?= $h['lang'][$pref]['value'] ?></a>

                <?php if (count($header) != ($key + 1)): ?>
                    <img src="<?= base_url(); ?>js/images/menu_sep.png" class="menuSep" />
                <?php endif; ?>
            <?php endif; ?>
        <?php endif; ?>
    <?php endforeach; ?>
</div>

<div id="linkUs">

    <?php foreach ($header as $key => $h): ?>
        <?php if ($h['parent_id'] == 0): ?>
            <?php if (isset($h['lang'][$pref])): ?>
                <?php
                if (isset($h['link']) && isset($h['link'][$pref]['link'])) {
                    $link = base_url() . $lang_pref . $h['link'][$pref]['link'];
                } else if (isset($h["href"]) && $h['href'] !== '') {
                    $link = base_url() . $lang_pref . $h['href'] . '/' . $h['id'] . '/' . $h['main'] . '/' . $lang_id;
                } else {
                    $link = base_url() . $lang_pref . '#';
                }
                ?>
            <?php endif; ?>
        <?php endif; ?>
    <?php endforeach; ?>
</div>


