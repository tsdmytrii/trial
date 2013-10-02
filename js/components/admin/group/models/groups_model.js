$.Model('Groups_model', {

    get_all_groups: function(success){
        $.ajax({
            url: base_url+'admin/group_controller/get_all_group',
            success: this.callback(success)
        });
    },

    get_group: function(data, success){
        $.ajax({
            url: base_url+'admin/group_controller/get_group',
            data: data,
            success: this.callback(success)
        });
    },

    delete_group: function(data, success){
        $.ajax({
            url: base_url+'admin/group_controller/delete_group',
            data: data,
            success: this.callback(success)
        });
    }

}, {});