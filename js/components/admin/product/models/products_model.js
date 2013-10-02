$.Model('Products_model', {

    get_all_categories: function(data, success){
        $.ajax({
            url: base_url+'admin/product_controller/get_all_categories',
            data: data,
            success: this.callback(success)
        });
    },

    get_all_products: function(data, success){
        $.ajax({
            url: base_url+'admin/product_controller/get_all_products',
            data: data,
            success: this.callback(success)
        });
    },

    get_all_units: function(success) {
        $.ajax({
            url: base_url+'admin/unit_controller/get_all_units',
            success: this.callback(success)
        });
    },

    get_product: function(data, success){
        $.ajax({
            url: base_url+'admin/product_controller/get_product',
            data: data,
            success: this.callback(success)
        });
    },

    delete_product: function(data, success){
        $.ajax({
            url: base_url+'admin/product_controller/delete_product',
            data: data,
            success: this.callback(success)
        });
    }

}, {});