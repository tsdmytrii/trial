$.Model('Seo_model', {

    get_seo: function(success, error){
        $.ajax({
            url: base_url+'admin/seo_controller/get_seo',
            type: 'post',
            dataType: 'json',
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    },

    set_seo: function(data, success, error){
        $.ajax({
            url: base_url+'admin/seo_controller/set_seo',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    }

}, {});