$.Model('Categories_model', {

    get_all_categories: function(success){
        $.ajax({
            url: base_url+'admin/category_controller/get_all_categories',
            success: this.callback(success)
        });
    },

    delete_category: function(id, success) {
        $.ajax({
            url: base_url+'admin/category_controller/delete_category',
            data: {
                id: id
            },
            success: this.callback(success)
        });
    },

    get_category: function(id, success) {
        $.ajax({
            url: base_url+'admin/category_controller/get_category',
            data: {
                id: id
            },
            success: this.callback(success)
        });
    }

}, {});