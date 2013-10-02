$.Model('Group_model', {

    set_group: function(data, success){
        $.ajax({
            url: base_url+'admin/group_controller/set_group',
            data: data,
            success: this.callback(success)
        });
    },

    get_component_functions: function(data, success){
        $.ajax({
            url: base_url+'admin/group_controller/get_component_functions',
            data: data,
            success: this.callback(success)
        });
    },

    set_permissions: function(data, success){
        $.ajax({
            url: base_url+'admin/group_controller/set_permissions',
            data: data,
            success: this.callback(success)
        });
    }

}, {});