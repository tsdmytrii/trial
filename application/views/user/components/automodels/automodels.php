<?php

$lang_pref = '';

if ($pref != 'ru') {
    $lang_pref = $pref . '/';
}

foreach ($header as $h) {
    if (intval($h['component_type_id']) == 26) {
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

<div data-href="<?= $link; ?>/" class="window-container bigContent false_window" data-false_window="automodels" style="z-index: 30; left: 0; top: 9%; width: 80%; height: 593px; padding: 0;" data-name="false">

    <div class="window-titleBar" style="display: none;">
        <div class="window-titleBar-leftCorner"></div>
        <div class="window-titleBar-content">Автомобили</div>
        <div class="window-titleBar-rightCorner"></div>
        <div class="window-minimizeButton"></div>
        <div class="window-closeButton"></div>
    </div>

    <div class="window-content">

        <div class="window_preload" style="display: none;">
            <a><img src="<?= base_url();?>js/images/loading_black.gif"></a>
        </div>

        <div style="width: 100%; height: 100%;" class="winContWrap">

            <div class="autoModelsLogoWrap">
                <?php foreach($autobrend as $k => $a):?>
                    <a class="autoBrendLogoItem<?php if ($k == 0) echo ' active';?>" href="#autoBrend_<?= $a['id']?>">
                        <img class="autoBrendLogoAct" src="<?= base_url();?>uploads/images/<?= $a['autologo']['name']?>">
                        <img class="autoBrendLogo" src="<?= base_url();?>js/images/auto_logo<?= $a['id']?>.png">
                        <div class="btmBord"></div>
                    </a>
                <?php endforeach;?>
            </div>

            <div class="autoModelsTblWrap" style="width: 85%; left: 15%;">
                <div class="autoModelsTblCont">

                    <?php foreach ($autobrend as $k => $a): ?>


                        <div id="autoBrend_<?= $a['id'];?>" class="autoBrendCont<?php if ($k == 0) echo ' active'?>">
                            <h1 class="autoBrendCapt"><?= $a['lang'][$lang]['name'];?></h1>


                            <?php

                                $sortedArray = array();
                                $buferArray = array();
                                $i = 0;
                                $j = 0;

                                foreach ($a['automodel'] as $key => $val) {
                                    $buferArray[$j] = $val;
                                    $j++;

                                    if (($key+1) % 5 == 0) {
                                        $sortedArray[$i] = $buferArray;
                                        $buferArray = array();
                                        $i++;
                                        $j = 0;
                                    }

                                    if (($key+1) == count($a['automodel'])) {
                                        if (count($buferArray) < 5) {
                                            for ($z = count($buferArray); $z <=5 ; $z++) {
                                                $buferArray[count($buferArray)] = array('empty' => true);
                                            }
                                        }

                                        $sortedArray[$i] = $buferArray;
                                    }
                                }

                            ?>


                            <table>
                                <tbody>
                                    <?php foreach($sortedArray as $m => $sortedItem):?>
                                        <tr>
                                            <?php foreach ($sortedItem as $z => $automodelItem):?>
                                                <td <?php if (!isset($automodelItem['empty'])) echo 'title="'.$a['lang'][$pref]['name'].' - '.$automodelItem['lang']['name'].'" '.'data-href="'.base_url().$automodelItem['link']['link'].'/"'; ?> class="<?php if (isset($automodelItem['empty'])) echo 'empty'; else echo 'new_component'; ?>">

                                                    <div class="autoModelInTbl<?php if(isset($automodelItem['quant']) && $automodelItem['quant'] !== 0) echo ' groupAM'; if ($k==0 && $m==0) echo ' btm';?>" data-timer="null">



                                                        <?php if(isset($automodelItem['quant']) && $automodelItem['quant'] !== 0 && $automodelItem['quant'] !== 1):?>
                                                            <div class="autoModelQuant autoModels">
                                                                <?= $automodelItem['quant'];?>
                                                            </div>



                                                            <?php
                                                                $leftPosition = '';

                                                                if ($z !== 0 && $automodelItem['quant'] > 1){
                                                                    $leftPosition = -($automodelItem['quant']-1)*50;
                                                                }

                                                                if ($z == 1 && $automodelItem['quant'] > 3) {
                                                                    $leftPosition = -100;
                                                                }

                                                                if ($z == 3 && $automodelItem['quant'] > 3) {
                                                                    $leftPosition = -200;
                                                                }

                                                                if ($z == 4 && $automodelItem['quant'] > 1) {
                                                                    $leftPosition = -100;
                                                                }

                                                                if ($z == 4 && $automodelItem['quant'] > 2) {
                                                                    $leftPosition = -200;
                                                                }

                                                                if ($z == 4 && $automodelItem['quant'] > 3) {
                                                                    $leftPosition = -300;
                                                                }

                                                                $leftPosition = 'left: '.$leftPosition.'%;';
                                                            ?>

                                                            <div style="width: <?= 100*(intval($automodelItem['quant']));?>%; <?= $leftPosition;?>" class="relatedAutoModelToolTip <?php if ($z == 0) echo 'first'; else if ($z == 7) echo 'last';?>">
                                                                <?php foreach ($automodelItem['related'] as $rel):?>

                                                                        <?php foreach($a['automodel'] as $relAM):?>
                                                                            <?php if ($relAM['id'] === $rel['id']):?>

                                                                                <div style="width: <?= intval(100/(intval($automodelItem['quant'])));?>%" title="<?= $a['lang'][$pref]['name'] . ' - ' .$relAM['lang']['name'];?>" data-href="<?= base_url().$relAM['link']['link'] . '/';?>" class="autoModelRelItem new_component">

                                                                                    <img style="width:110px; height: 64px;" src="<?= base_url().'js/images/lazy.png';?>" data-original="<?= base_url().'uploads/images/'.$relAM['logo']['name'];?>" class="lazy autoModelRelPict" />
                                                                                    <div class="autoModelRelCapt"><?= $relAM['lang']['name']; ?></div>
                                                                                    <div class="autoModelPrice">от <?= $relAM['price'];?> &#8372;</div>

                                                                                </div>

                                                                            <?php endif;?>
                                                                        <?php endforeach;?>

                                                                <?php endforeach;?>
                                                            </div>

                                                            <img src="<?= base_url();?><?php if ($k==0 && $m==0) echo 'js/images/popUpTriangle3.png'; else echo 'js/images/popUpTriangle.png';?>" class="triangle<?php if ($k==0 && $m==0) echo ' btm';?>">


                                                        <?php endif;?>

                                                        <?php if (!isset($automodelItem['empty'])):?>
                                                            <img src="<?= base_url().'uploads/images/'.$automodelItem['logo']['name'];?>" />
                                                            <div class="autoModelCapt"><?= $automodelItem['lang']['name'];?></div>
                                                            <div class="autoModelPrice">от <?= $automodelItem['price']?> &#8372;</div>
                                                        <?php endif;?>

                                                    </div>
                                                </td>
                                            <?php endforeach;?>
                                        </tr>
                                    <?php endforeach;?>
                                </tbody>
                            </table>
                        </div>

                    <?php endforeach;?>

                    <div class="emptyBlock"></div>
                </div>
            </div>

        </div>

    </div>

    <div class="window-statusBar" style="display: none;"></div>

</div>