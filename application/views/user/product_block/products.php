<?php

    $sortedProduct = array();

    if ($p_block['product']) {

        $bufer = array();

        foreach($p_block['product'] as $key => $product) {

            $bufer[] = $product;

            if (($key+1)%intval($p_block['column_quantity']) == 0) {

                $sortedProduct[] = $bufer;

                $bufer = array();

            } else {

                if (($key+1) == count($p_block['product'])) {

                    $sortedProduct[] = $bufer;

                }

            }

        }

    }

?>
<div class="productsSelector">
<?php // foreach ($sortedProduct as $key => $tr):?>
   <?php // print_r($tr)?>
     <?php // endforeach;?>
   

        <?php if ($sortedProduct):?>

        <?php foreach ($sortedProduct as $key => $tr):?>

            <?php if (($key+1) < intval($p_block['row_quantity'])): ?>

                <?php foreach ($tr as $td):?>

    <?php 
    
    ?>
                    <div class='autoModelItem'>
                       <a href="http://localhost/trial/product/7/0/0/2/" class="new_component"> <img src="<?= base_url().'uploads/images/'.$td['logo']['name'];?>" class="autoModelPict" style="width: 82px;"></a>

                        <div class="autoModelCapt"><?= $td['lang'][$pref]['name'];?></div>

                        <?php if (intval($p_block['price']) === 1):?>
                            <div class="autoModelPrice">от <?= $td['price'];?> ₴</div>
                        <?php endif;?>

                    </div>

                <?php endforeach;?>

            <?php endif; ?>

        <?php endforeach;?>

    <?php endif; ?>
    

</div>