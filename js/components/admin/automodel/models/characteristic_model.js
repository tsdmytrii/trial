$.Model('Characteristic_model', {

    get_all_characteristics: function(data, success, error){
        $.ajax({
            url: base_url+'admin/characteristic_controller/get_all_characteristics',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    },

    get_characteristic: function(data, success, error){
        $.ajax({
            url: base_url+'admin/characteristic_controller/get_characteristic',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    },

    set_characteristic: function(data, success, error){
        $.ajax({
            url: base_url+'admin/characteristic_controller/set_characteristic',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    },

    delete_characteristic: function(data, success, error){
        $.ajax({
            url: base_url+'admin/characteristic_controller/delete_characteristic',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    }

}, {});