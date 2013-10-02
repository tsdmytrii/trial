$.Model('Component_types_model', {

    get_all_component_type: function(data, success){
        $.ajax({
            url: base_url+'admin/component_type_controller/get_all_component_type',
            data: data,
            success: this.callback(success)
        });
    },

    get_component_type: function(data, success){
        $.ajax({
            url: base_url+'admin/component_type_controller/get_component_type',
            data: data,
            success: this.callback(success)
        });
    },

    delete_component_type: function(data, success){
        $.ajax({
            url: base_url+'admin/component_type_controller/delete_component_type',
            data: data,
            success: this.callback(success)
        });
    }

}, {});