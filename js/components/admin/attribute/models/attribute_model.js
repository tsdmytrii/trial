$.Model('Attribute_model', {

    set_attribute: function(data, success){
        $.ajax({
            url: base_url+'admin/attribute_controller/set_attribute',
            data: data,
            success: this.callback(success)
        });
    }

}, {});