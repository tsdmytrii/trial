$.Model('Category_model', {

    set_category: function(data, success){
        $.ajax({
            url: base_url+'admin/category_controller/set_category',
            data: data,
            success: this.callback(success)
        });
    },

    set_attribute: function(data, success){
        $.ajax({
            url: base_url+'admin/category_controller/set_attribute',
            data: data,
            success: this.callback(success)
        });
    },

    delete_attribute: function(id, success) {
        $.ajax({
            url: base_url+'admin/category_controller/delete_category_attribute',
            data: {
                id: id
            },
            success: this.callback(success)
        });
    },

    set_quality_variant: function(data, success){
        $.ajax({
            url: base_url+'admin/category_controller/set_quality_variant',
            data: data,
            success: this.callback(success)
        });
    },

    delete_quality_variant: function(id, success) {
        $.ajax({
            url: base_url+'admin/category_controller/delete_quality_variant',
            data: {
                id: id
            },
            success: this.callback(success)
        });
    },

    delete_img: function(data, success){
        $.ajax({
            url: base_url+'logo_controller/delete_category_img',
            data: data,
            success: this.callback(success)
        });
    }

}, {});