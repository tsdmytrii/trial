$.Model('Attributes_model', {

    get_all_attribute: function(data, success){
        $.ajax({
            url: base_url+'admin/attribute_controller/get_all_attribute',
            data: data,
            success: this.callback(success)
        });
    },

    get_attribute: function(data, success){
        $.ajax({
            url: base_url+'admin/attribute_controller/get_attribute',
            data: data,
            success: this.callback(success)
        });
    },

    delete_attribute: function(data, success){
        $.ajax({
            url: base_url+'admin/attribute_controller/delete_attribute',
            data: data,
            success: this.callback(success)
        });
    }

}, {});