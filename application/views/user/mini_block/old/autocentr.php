<div id="popUpWrap">

    <form id="searchWrap">
        <div>
            <input type="text" id="search" value="" placeholder="ПОИСК"/>
            <a title="Поиск" data-additional_param="0" style="display: none" class="new_component" id="doSearch" href="<?= base_url();?>search/0/0/0/<?= $lang_id?>/"></a>
        </div>
    </form>

    <div id="socialNetworkWrap">
        <a target="_blank" href="http://google.com.ua">
            <img src="<?= base_url()?>js/images/sn_google.png"/>
        </a>
        <a target="_blank" href="http://facebook.com">
            <img src="<?= base_url()?>js/images/sn_fb.png"/>
        </a>
        <a target="_blank" href="http://vk.com">
            <img src="<?= base_url()?>js/images/sn_vk.png"/>
        </a>
        <a target="_blank" href="http://twitter.com">
            <img src="<?= base_url()?>js/images/sn_tw.png"/>
        </a>
        <a target="_blank" href="<?= base_url();?>">
            <img src="<?= base_url()?>js/images/sn_rss.png"/>
        </a>
        <a target="_blank" href="<?= base_url();?>">
            <img src="<?= base_url()?>js/images/sn_bask.png"/>
        </a>
        <div class="clear"></div>
    </div>

    <div class="clear"></div>

    <div id="shortContact">
        <?= $contacts['lang'][$pref]['description_short']?>

        <?php foreach($header as $key => $h):?>
            <?php if ($h['parent_id'] == 0): ?>
               <?php if (isset($h['lang'][$pref])): ?>
                   <?php
                       if (isset($h['link']) && isset($h['link'][$pref]['link'])){
                           $link = base_url() . $lang_pref . $h['link'][$pref]['link'];
                       } else if (isset($h["href"]) && $h['href'] !== '') {
                           $link = base_url() . $lang_pref . $h['href'] . '/' . $h['id'] . '/' . $h['main'] . '/' . $lang_id;
                       } else {
                           $link = base_url() . $lang_pref . '#';
                       }
                   ?>
                   <?php if (intval($h['component_type_id']) === 28):?>
                       <a title="<?= $h['lang'][$pref]['value']?>" href="<?= $link;?>/" class="details new_component">Подробнее</a>
                   <?php endif;?>

               <?php endif;?>
           <?php endif;?>
        <?php endforeach;?>
    </div>

    <div id="mapWrap">
        <div id="map_canvas" style="width:100%; height:100%"></div>
    </div>

    <div id="popUpBtmBg">
        <img src="<?= base_url();?>js/images/popup_btm.png" />
    </div>
</div>

<div id="askQuestCont">

    <div id="askButton" data-state="mini">
        <img src="<?= base_url();?>js/images/questBtn.png" />
    </div>

    <form id="askQuestWrap">
        <div class="controlGroup">
            <div class="askLabel">Введите свое имя:</div>
            <input type="text" value="" name="name" id="askName" />
        </div>
        <div class="controlGroup">
            <div class="askLabel">Введите свой и-мейл адерс:</div>
            <input type="text" value="" name="email" id="askEmail" />
        </div>
        <div class="controlGroup">
            <div class="askLabel">Выберите тему вопроса:</div>
            <select id="askSelect" name="question_variant_id">
                <?php foreach ($questVariant as $key => $val): ?>
                    <option value="<?= $val['id'];?>"><?= $val['question_theme'];?></option>
                <?php endforeach;?>
            </select>
        </div>
        <div id="separatorLine"></div>
        <div class="controlGroup" id="askQuest">
            <textarea name="question" placeholder="Текст вопроса"></textarea>
        </div>
        <div class="controlGroup">
            <input type="submit" onfocus="this.blur();" value="Отправить" id="askSubmit"/>
        </div>
    </form>

</div>

<div id="autocentr" class="rightSideItem">
    <a id="autoCentrBg" href="<?= base_url();?>js/images/autocentr_big.jpg">
        <img src="<?= base_url();?>js/images/autocentr.png"/>
        <img class="plusAC" src="<?= base_url();?>js/images/autocentrPlus.png"/>
    </a>
    <div class="rightSideHorSep"></div>
</div>