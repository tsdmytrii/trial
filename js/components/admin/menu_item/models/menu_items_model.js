$.Model('Menu_items_model', {
/*
 * Function sends ajax request to server.
 * Response data with menu items of current menu_block on callback 
 * 
 * @var data object properties of menu block.
 */
    get_menu_item_by_block: function(data, success){
        $.ajax({
            url: base_url+'admin/menu_controller/get_menu_item_by_block',
            data: data,
            success: this.callback(success)
        });
    },

/*
 * Function  sends ajax request to server 
 * Response data with menu items  
 * 
 */
    get_menu_item: function(data, success){
        $.ajax({
            url: base_url+'admin/menu_controller/get_menu_item',
            data: data,
            success: this.callback(success)
        });
    },

/*
 * Function sends ajax request to server to get menu items properties
 * 
 */
    get_menu_item_for_parent: function(data, success){
        $.ajax({
            url: base_url+'admin/menu_controller/get_menu_item_for_parent',
            data: data,
            success: this.callback(success)
        });
    },

/*
 * Function sends ajax request to server to delete some menu item
 * 
 * @param data object Id and other menu item properties.
 */
    delete_menu_item: function(data, success){
        $.ajax({
            url: base_url+'admin/menu_controller/delete_menu_item',
            data: data,
            success: this.callback(success)
        });
    }

}, {});