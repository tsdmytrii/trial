$.Model('Product_model', {

    set_product: function(data, success){
        $.ajax({
            url: base_url+'admin/product_controller/set_product',
            data: data,
            success: this.callback(success)
        });
    },

    set_attribute_value: function(data, success){
        $.ajax({
            url: base_url+'admin/product_controller/set_attribute_value',
            data: data,
            success: this.callback(success)
        });
    },

    set_category: function(data, success){
        $.ajax({
            url: base_url+'admin/product_controller/set_category',
            data: data,
            success: this.callback(success)
        });
    },

    get_attribute_values: function(data, success){
        $.ajax({
            url: base_url+'admin/product_controller/get_attribute_values',
            data: data,
            success: this.callback(success)
        });
    },

    delete_category: function(data, success){
        $.ajax({
            url: base_url+'admin/product_controller/delete_category',
            data: data,
            success: this.callback(success)
        });
    },

    delete_logo: function(data, success){
        $.ajax({
            url: base_url+'logo_controller/delete_product_logo',
            data: data,
            success: this.callback(success)
        });
    }

}, {});