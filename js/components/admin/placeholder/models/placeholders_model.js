$.Model('Placeholders_model', {

    get_placeholder: function(id, success){
        $.ajax({
            url: base_url+'admin/placeholder_controller/get_placeholder',
            data: {
                id: id
            },
            success: this.callback(success)
        });
    },

    get_placeholders: function(success){
        $.ajax({
            url: base_url+'admin/placeholder_controller/get_placeholders',
            success: this.callback(success)
        });
    },

    delete_placeholder: function(id, success){
        $.ajax({
            url: base_url+'admin/placeholder_controller/delete_placeholder',
            data: {
                placeholder_id: id
            },
            success: this.callback(success)
        });
    }

}, {});