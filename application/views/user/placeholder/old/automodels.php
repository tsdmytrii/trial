<div class="modalBlock" <?php if (isset($maximise) && $maximise == 1) echo 'style="display: block"';?>></div>

<div id="autoModelCont">

    <div id="amLT"></div>
    <div id="amL"></div>
    <div id="amLB"></div>
    <div id="amMT"></div>
    <div id="amMB"></div>
    <div id="amRT"></div>
    <div id="amR"></div>
    <div id="amRB"></div>

    <div id="allAutoModelWrap">
        <img src="<?= base_url();?>/js/images/all_automodels.png" />
        <a data-additional_param="<?= $autobrend[0]['id'];?>" title="<?= $automodels_title;?>" id="allAutoModelWrapCapt" href="<?= $automodels_link?>/" class="new_component">Развернуть список машин</a>
    </div>

    <div id="autoModelItemsWrap">

        <?php
            if ($placeholder['product_block']) {

                foreach($placeholder['product_block'] as $product_block) {

                    include(APPPATH . $product_block['view']);

                }

            }
        ?>

    </div>

</div>
