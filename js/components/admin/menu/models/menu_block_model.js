$.Model('Menu_block_model', {
/*
 * Function for posting new menu-block element
 * 
 * This function send ajax request to the server with data that contains
 * attributes for new menu-block element
 * 
 * @param data string Serialized string from submiting new menu-block form
 * @param success Callback data. Used in menu-block.controller.menuBlockSaved
 * for checking if ajax request was successfull or not and thowing messages.
 * 
 */
    set_menu_block: function(data, success) {
        $.ajax({
            url: base_url+'admin/menu_controller/set_menu_block',
            data: data,
            success: this.callback(success)
        });
    }

}, {});