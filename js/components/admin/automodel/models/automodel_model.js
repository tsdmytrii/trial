$.Model('Automodel_model', {

    set_automodel: function(data, success, error){
        $.ajax({
            url: base_url+'admin/automodel_controller/set_automodel',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    },

    delete_logo: function(data, success, error){
        $.ajax({
            url: base_url+'logo_controller/delete_automodel_logo',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    },

    delete_photo: function(data, success, error){
        $.ajax({
            url: base_url+'photo_controller/delete_photo',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    }

}, {});