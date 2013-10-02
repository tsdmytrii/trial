$.Model('Autobrend_model', {

    get_autobrend: function(data, success, error){
        $.ajax({
            url: base_url+'admin/autobrend_controller/get_autobrend',
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
            url: base_url+'logo_controller/delete_logo',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    },

    delete_autologo: function(data, success, error){
        $.ajax({
            url: base_url+'logo_controller/delete_autologo',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    },

    delete_picture: function(data, success, error){
        $.ajax({
            url: base_url+'picture_controller/delete_picture',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    },

    set_autobrend: function(data, success, error){
        $.ajax({
            url: base_url+'admin/autobrend_controller/set_autobrend',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    }

}, {});