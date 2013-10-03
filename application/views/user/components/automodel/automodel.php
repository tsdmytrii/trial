<div class="window-container false_window" data-false_window="automodel" data-href="<?= base_url().$this->uri->segment(1).'/';?>" data-name="false" style="height: 87%; left: 20.3%; top: 9.051%; width: 58%;z-index: 30;">
    <div class="window-titleBar">
        <div class="window-titleBar-leftCorner"></div>
        <div class="window-titleBar-content">

            <a href="<?= base_url().$this->uri->segment(1);?>/description/" class="amMI new_inner_component">Описание</a>
            <div class="AMSep"></div>
            <a href="<?= base_url().$this->uri->segment(1);?>characteristic/" class="amMI new_inner_component">Характеристики и цены</a>
            <div class="AMSep"></div>
            <a href="<?= base_url().$this->uri->segment(1);?>colors/" class="amMI new_inner_component">Цветовая гамма</a>
            <div class="AMSep"></div>
            <a href="<?= base_url().$this->uri->segment(1);?>review/" class="amMI new_inner_component">360 обзор</a>
            <div class="AMSep"></div>
            <a href="<?= base_url().$this->uri->segment(1);?>kredit/" class="amMI new_inner_component">Кредит</a>
            <div class="AMSep"></div>

        </div>
        <div class="window-titleBar-rightCorner"></div>
    </div>
    <div class="window-content">
        <div style="width: 100%; height: 430px; overflow: hidden;" class="winContWrap">
            <div class="seo_title" style="display: none;">
                <?= $data['seo']['seo_title'];?>
            </div>


            <?php if($tab == 'description'):?>

                <div class="amTabCont serverLoad freshComponent current" data-component_id="description">
                    <div class="galeryWrap">
                        <div class="mainPhoto">
                            <?php if ($data['photo']): ?>
                                <a href="<?= base_url().'uploads/images/'.$data['photo'][0]['name']?>" class="galeryPhoto" rel="autoModelPhoto_<?= $data['id']?>">
                                    <img src="<?= base_url().'uploads/images/'.$data['photo'][0]['name']?>">
                                </a>
                            <?php endif;?>
                        </div>
                        <div class="sidePhoto">
                            <?php if ($data['photo']): ?>
                            <?php foreach($data['photo'] as $key => $val):?>
                                <?php if ($key != 0):?>
                                    <a href="<?= base_url().'uploads/images/'.$val['name'];?>" class="galeryPhoto" rel="autoModelPhoto_<?= $data['id']?>">
                                        <img src="<?= base_url().'uploads/images/'.$val['name_mini'];?>">
                                    </a>
                                <?php endif;?>
                            <?php endforeach;?>
                            <?php endif;?>
                        </div>
                    </div>
                    <div class="descriptionAutoModelWrap" style="margin: 0.5% 0px 0px; width: 100%;">
                        <div class="descriptionAutoModel">
                            <div class="descriptionAutoModelPadding">
                                <?= $data['description'];?>
                            </div>
                            <div class="capScroll">&nbsp;</div>
                        </div>
                    </div>
                </div>

            <?php elseif($tab == 'characteristic'):?>
                <div class="amTabCont serverLoad freshComponent current" data-component_id="characteristic">

                    <div class="charNavWrap">
                        <div class="charGroupCaption">Характеристики</div>

                        <?php foreach ($data['characteristic'] as $key => $val): ?>
                            <?php if(intval($val['type_id']) == 1):?>
                                <a class="charCaption active" href="#charCont_<?= $val['id']?>"><?= $val['lang'][$lang]['name'];?></a>
                                <div class="clear"></div>
                            <?php endif;?>
                        <?php endforeach;?>

                        <div class="charGroupCaption">Комплектации</div>
                        <?php foreach ($data['characteristic'] as $key => $val): ?>
                            <?php if(intval($val['type_id']) == 2):?>
                                <a class="charCaption active" href="#charCont_<?= $val['id']?>"><?= $val['lang'][$lang]['name'];?></a>
                                <div class="clear"></div>
                            <?php endif;?>
                        <?php endforeach;?>
                    </div>

                    <div class="charContainer">
                        <div class="complWrap">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Комплектация</td>
                                        <?php foreach($data['complectation'] as $key => $val):?>
                                            <td  class="compl"><?= $val['lang'][$lang]['name'];?></td>
                                        <?php endforeach;?>
                                        <td class="space"></td>
                                    </tr>
                                    <tr>
                                        <td>Год выпуска</td>
                                        <?php foreach($data['complectation'] as $key => $val):?>
                                            <td class="compl"><?= $val['year'];?></td>
                                        <?php endforeach;?>
                                        <td class="space"></td>
                                    </tr>
                                    <tr>
                                        <td>Цена</td>
                                        <?php foreach($data['complectation'] as $key => $val):?>
                                            <td class="compl"><?= $val['price'];?></td>
                                        <?php endforeach;?>
                                        <td class="space"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="charContWrap">
                            <?php foreach ($data['characteristic'] as $key => $val): ?>
                                <?php if(intval($val['type_id']) == 1):?>
                                    <div class="charCont" id="charCont_<?= $val['id']?>">
                                        <div class="charContCapt"><span>--<?= $val['lang'][$lang]['name'];?></span></div>
                                        <div class="clear"></div>
                                        <div class="charContDesc"><?= $val['lang'][$lang]['description'];?></div>
                                    </div>
                                <?php endif;?>
                            <?php endforeach;?>
                            <?php foreach ($data['characteristic'] as $key => $val): ?>
                                <?php if(intval($val['type_id']) == 2):?>
                                    <div class="charCont" id="charCont_<?= $val['id']?>">
                                        <div class="charContCapt"><span>--<?= $val['lang'][$lang]['name'];?></span></div>
                                        <div class="clear"></div>
                                        <div class="charContDesc"><?= $val['lang'][$lang]['description'];?></div>
                                    </div>
                                <?php endif;?>
                            <?php endforeach;?>

                            <div style="width: 100%;" class="emptyBlock"></div>

                        </div>
                    </div>
                </div>


            <?php elseif($tab == 'colors'):?>

            <?php elseif($tab == 'review'):?>

            <?php elseif($tab == 'review'):?>

            <?php endif;?>

        </div>
    </div>

    <div class="autoModelListWrap">
        <div class="autoModelName">
            <?php foreach ($autobrend as $key => $a): ?>
                <?php if($a['id'] == $data['automodel']['autobrend_id']) :?>
                    <?= $a['lang'][$lang]['name'] . ' - ' . $data['name'];?>
                <?php endif;?>
            <?php endforeach;?>
        </div>
        <div class="automodelListImg">

            <?php foreach($autobrend as $k => $a):?>
                <?php if($a['id'] == $data['automodel']['autobrend_id']):?>
                    <?php foreach($a['automodel'] as $key => $val):?>
                        <?php if ($val['id'] == $data['automodel']['id']):?>
                            <?php if ($val['photo']):?>
                                <img src="<?= base_url() . 'uploads/images/' . $val['photo']['name_mini'];?>">
                            <?php endif;?>
                        <?php endif;?>
                    <?php endforeach;?>
                <?php endif;?>
            <?php endforeach;?>
        </div>

        <div class="automodelList">
            <?php foreach($autobrend as $k => $a):?>
                <?php if($a['id'] == $data['automodel']['autobrend_id']):?>
                    <?php foreach($a['automodel'] as $key => $val):?>
                        <a class="autoModelWindItem" href="<?= base_url() . $lang_pref . $val['link']['link'].'/';?>">
                            <?= $val['lang']['name'];?>
                        </a>
                    <?php endforeach;?>
                <?php endif;?>
            <?php endforeach;?>
        </div>
    </div>

   <div class="window-statusBar"></div>

</div>