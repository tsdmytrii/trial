$.Model('Img_banners_model', {

    get_all_banners: function(success){
        $.ajax({
            url: base_url+'admin/banner_controller/get_all_banner',
            success: this.callback(success)
        });
    },

    get_banner: function(data, success){
        $.ajax({
            url: base_url+'admin/banner_controller/get_banner',
            data: data,
            success: this.callback(success)
        });
    },

    delete_banner: function(data, success){
        $.ajax({
            url: base_url+'admin/banner_controller/delete_banner',
            data: data,
            success: this.callback(success)
        });
    },

    delete_banner_img: function(data, success){
        $.ajax({
            url: base_url+'admin/banner_controller/delete_img_banner',
            data: data,
            success: this.callback(success)
        });
    }

}, {});