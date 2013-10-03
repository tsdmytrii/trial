$.Model('Menu_model', {
/*
 * Function gets one menu-block from the server
 *
 * @param data array We have id of menu-block in this param
 * @param success array Atributes of current requested menu-block 
 */ 
    get_menu_block: function(data, success, error) {
        $.ajax({
            url: base_url+'admin/menu_controller/get_menu_block',
            data: data,
            success: this.callback(success)
        });
    },

/*
 * Function loads all existing menu-blocks
 */
    get_all_menu_blocks: function(success){
        $.ajax({
            url: base_url+'admin/menu_controller/get_all_menu_blocks',
            success: this.callback(success)
        });
    },

/*
 * Function delete menu-block by id
 * 
 * @param data array Here we have an id atribute of menu-block we want to delete
 */
    delete_menu_block: function(data, success){
        $.ajax({
            url: base_url+'admin/menu_controller/delete_menu_block',
            data: data,
            success: this.callback(success)
        });
    }

}, {});