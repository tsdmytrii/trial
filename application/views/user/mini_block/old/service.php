<div id="randMenuItem">
    <div class="tooltipMiniBlock">
        <img src="<?= base_url().'uploads/images/serviceGaranty.jpg'?>"/>
        <img class="toolTipTriangle" src="<?= base_url();?>js/images/popUpTriangle2.png" />
    </div>

    <img class="bg" src="<?= base_url();?>js/images/service_garanty.png" />

    <?php
        foreach($header as $h) {
            if ($h['component_type_id'] == 30){
                $service_m_i = $h;
            }
        }

        if (isset($service_m_i['link']) && isset($service_m_i['link'][$pref]['link'])){
            $link = base_url() . $lang_pref . $service_m_i['link'][$pref]['link'];
        } else if (isset($service_m_i["href"]) && $service_m_i['href'] !== '') {
            $link = base_url() . $lang_pref . $service_m_i['href'] . '/' . $service_m_i['id'] . '/' . $service_m_i['main'] . '/' . $lang_id;
        } else {
            $link = base_url() . $lang_pref . '#';
        }

    ?>

    <a href="<?= $link;?>/" data-timer="null" class="randMenuItenCapt new_component" title="<?= $service_m_i['lang'][$pref]['value']?>"><?= $service_m_i['lang'][$pref]['value']?></a>
    <img class="key" src="<?= base_url();?>js/images/key.png" />
</div>