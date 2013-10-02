<?php
    $lang_pref = '';

    if ($pref != 'ru') {
        $lang_pref = $pref . '/';
    }
?>

    <div id="pageWrap" class="defProp">

        <?php
            if (isset($maximise) && $maximise == 1){
                include(APPPATH . 'views/user/components/' . $view . '/' . $view . '.php');
            }
        ?>

        <?php

            foreach($placeholders as $key => $placeholder) {

                $height_param = '';

                if (intval($placeholder['height_param']) === 2) {
                    $height_param = ' dynamic';
                }

                echo '<div id="'.$placeholder['identificator'].'" class="placeholder'.$height_param.'">';

                    if ($placeholder['mini_block']) {

                        foreach ($placeholder['mini_block'] as $k => $m_block) {

                            if ($m_block['component'] && $m_block['view'] == '') {

                                switch (intval($m_block['component']['component_type_id'])) {
                                    case 1:

                                        include(APPPATH . 'views/user/mini_block/text_block.php');

                                        break;
                                    case 7:

                                        include(APPPATH . 'views/user/mini_block/article.php');

                                        break;
                                }

                            }  else {
                                include(APPPATH . $m_block['view']);
                            }

                        }
                        
                    } 
                    
                    if ($placeholder['product_block']) {
                        foreach ($placeholder['product_block'] as $k => $p_block) {

                            if ($p_block['view'] == '') {

                                include(APPPATH . 'views/user/product_block/products.php');
                                
                            } else {
                                include(APPPATH . $p_block['view']);
                            }

                        }
                    }
                    
                    if ($placeholder['product_block'] == false && $placeholder['mini_block'] == false) {

                        include(APPPATH . $placeholder['view']);

                    }

                echo '</div>';

            }

        ?>


    </div>

   </body>
</html>