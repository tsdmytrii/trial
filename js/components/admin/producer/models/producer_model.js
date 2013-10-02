$.Model('Producer_model', {

    set_producer: function(data, success){
        $.ajax({
            url: base_url+'admin/producer_controller/set_producer',
            data: data,
            success: this.callback(success)
        });
    },

    delete_logo: function(data, success){
        $.ajax({
            url: base_url+'logo_controller/delete_producer_logo',
            data: data,
            success: this.callback(success)
        });
    },

    delete_photo: function(data, success){
        $.ajax({
            url: base_url+'photo_controller/delete_producer_photo',
            data: data,
            success: this.callback(success)
        });
    }

}, {});