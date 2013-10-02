$.Model('Menu_item_model', {

    set_menu_item_relation: function(data, success, error){
        $.ajax({
            url: base_url+'admin/menu_controller/set_menu_item_relation',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    },

/*
 * Function sends ajax request to server 
 * 
 * @param data object menu item properties
 */
set_menu_item: function(data, success, error){
        $.ajax({
            url: base_url+'admin/menu_controller/set_menu_item',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    },

    set_related_menu_item: function(data, success, error){
        $.ajax({
            url: base_url+'admin/menu_controller/set_related_menu_item',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    },

/*
 * Gets menu item 
 * 
 * Function sends ajax request to server
 * 
 * @param data object menu item properties, id etc.
 */
    get_menu_item: function(data, success, error){
        $.ajax({
            url: base_url+'admin/menu_controller/get_menu_item',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    },

    get_menu_item_for_parent: function(data, success, error){
        $.ajax({
            url: base_url+'admin/menu_controller/get_menu_item_for_parent',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    },

/*
 * Function get menu items by parent block id
 * 
 * @param data object parent block id
 * 
 */
    get_menu_item_by_block: function(data, success, error){
        $.ajax({
            url: base_url+'admin/menu_controller/get_menu_item_by_block',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    },

/*
 * Ajax request for deleting menu item
 * 
 * @param data object menu item id
 */
    delete_menu_item: function(data, success, error){
        $.ajax({
            url: base_url+'admin/menu_controller/delete_menu_item',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    },

    minus_menu_item: function(data, success, error){
        $.ajax({
            url: base_url+'admin/menu_controller/minus_menu_item',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    },

    /*
     * Gets components using its id
     * 
     * @param data object Id of the component and other properties.
     */
    get_component_by_id: function(data, success, error){
        $.ajax({
            url: base_url+'admin/menu_controller/get_component_by_id',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    },

    disconect_menu_item: function(data, success, error) {
        $.ajax({
            url: base_url+'admin/component_controller/disconect_menu_item',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    }

}, {});