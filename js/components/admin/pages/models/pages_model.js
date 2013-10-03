$.Model('Pages_model', {

    set_component: function(data, success, error){
        $.ajax({
            url: base_url+'admin/component_controller/set_component',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    },

    get_component_types: function(data, success, error){
        $.ajax({
            url: base_url+'admin/component_controller/get_display_component_types',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    },

    get_components: function(data, success, error){
        $.ajax({
            url: base_url+'admin/component_controller/get_components',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    },

    get_component_by_id: function(data, success, error){
        $.ajax({
            url: base_url+'admin/component_controller/get_component_by_id',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    },

    delete_component: function(data, success){
        $.ajax({
            url: base_url+'admin/component_controller/delete_component',
            data: data,
            success: this.callback(success)
        });
    },

    set_conect_menu_item: function(data, success, error) {
        $.ajax({
            url: base_url+'admin/component_controller/set_conect_menu_item',
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