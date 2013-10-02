$.Model('Autogroup_model', {

    get_autogroup: function(data, success){
        $.ajax({
            url: base_url+'admin/autogroup_controller/get_autogroup',
            data: data,
            success: this.callback(success)
        });
    },

    set_autogroup: function(data, success, error){
        $.ajax({
            url: base_url+'admin/autogroup_controller/set_autogroup',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    },

    delete_autogroup: function(data, success, error){
        $.ajax({
            url: base_url+'admin/autogroup_controller/delete_autogroup',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    },

    delete_automodel: function(data, success, error){
        $.ajax({
            url: base_url+'admin/autogroup_controller/delete_automodel',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    }

}, {});