<div id="button_panel">
    
    <?php foreach ($footer as $key => $f): ?>
        <?php if ($f['parent_id'] == 0): ?>
            <?php
//            print_r(count($key));
//             print_r($footer);
            ?>
            <?php if (isset($f['lang'][$pref])): ?>
                <?php
                if (isset($f['link']) && isset($f['link'][$pref]['link'])) {
                    $link = base_url() . $lang_pref . $f['link'][$pref]['link'];
                } else if (isset($f["href"]) && $f['href'] !== '') {
                    $link = base_url() . $lang_pref . $f['href'] . '/' . $f['id'] . '/' . $f['main'] . '/' . $lang_id;
                } else {
                    $link = base_url() . $f['link'];
                }
                ?>
                <a class="menuItem new_component" title="<?= $f['lang'][$pref]['value'] ?>" href="<?= $link; ?>/"><?= $f['lang'][$pref]['value'] ?></a>

                <?php if (count($footer) != ($key + 1)): ?>
                    <img src="<?= base_url(); ?>js/images/menu_sep.png" class="menuSep" />
                <?php endif; ?>
            <?php endif; ?>
        <?php endif; ?>
    <?php endforeach; ?>
    
</div>

<a id="copyRight" href="http://webinnovativelab.com" target="_blank"> WEB-INNOVATIVE LAB</a>