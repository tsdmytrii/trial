<?php

    $sortedProduct = array();

    if ($product_block['product']) {

        $bufer = array();

        foreach($product_block['product'] as $key => $product) {

            $bufer[] = $product;

            if (($key+1)%intval($product_block['column_quantity']) == 0) {

                $sortedProduct[] = $bufer;

                $bufer = array();

            } else {

                if (($key+1) == count($product_block['product'])) {

                    $sortedProduct[] = $bufer;

                }

            }

        }

    }

?>

<div class="autoModelSector">

    <?php if ($sortedProduct):?>

        <?php foreach ($sortedProduct as $key => $tr):?>

            <?php if (($key+1) < intval($product_block['row_quantity'])): ?>

                <?php foreach ($tr as $td):?>

                    <div class='autoModelItem'>
                        <img src="<?= base_url().'uploads/images/'.$td['logo']['name'];?>" class="autoModelPict" style="width: 82px;">

                        <div class="autoModelCapt"><?= $td['lang'][$pref]['name'];?></div>

                        <?php if (intval($product_block['price']) === 1):?>
                            <div class="autoModelPrice">от <?= $td['price'];?> ₴</div>
                        <?php endif;?>

                    </div>

                <?php endforeach;?>

            <?php endif; ?>

        <?php endforeach;?>

    <?php endif; ?>


</div>