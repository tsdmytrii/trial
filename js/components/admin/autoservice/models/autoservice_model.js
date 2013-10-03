$.Model('Autoservice_model', {

    get_autoservice: function(data, success){
        $.ajax({
            url: base_url+'admin/autoservice_controller/get_autoservice',
            data: data,
            success: this.callback(success)
        });
    },

    delete_picture: function(data, success){
        $.ajax({
            url: base_url+'picture_controller/delete_autoservice_bg_picture',
            data: data,
            success: this.callback(success)
        });
    },

    set_picture_order: function(data, success){
        $.ajax({
            url: base_url+'picture_controller/set_autoservice_picture_order',
            data: data,
            success: this.callback(success)
        });
    },

    set_autoservice: function(data, success){
        $.ajax({
            url: base_url+'admin/autoservice_controller/set_autoservice',
            data: data,
            success: this.callback(success),
        });
    }

}, {});