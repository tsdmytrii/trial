$.Model('Static_model', {

    get_static: function(data, success){
        $.ajax({
            url: base_url+'admin/static_controller/get_static_component',
            data: data,
            success: this.callback(success)
        });
    },

    delete_file: function(data, success, error){
        $.ajax({
            url: base_url+'file_controller/delete_file',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    },

    set_static_component: function(data, success, error){
        $.ajax({
            url: base_url+'admin/static_controller/set_static_component',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    }

}, {});