$.Model('Complectation_model', {

    get_all_complectations: function(data, success, error){
        $.ajax({
            url: base_url+'admin/complectation_controller/get_all_complectations',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    },

    get_complectation: function(data, success, error){
        $.ajax({
            url: base_url+'admin/complectation_controller/get_complectation',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    },

    set_complectation: function(data, success, error){
        $.ajax({
            url: base_url+'admin/complectation_controller/set_complectation',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    },

    delete_complectation: function(data, success, error){
        $.ajax({
            url: base_url+'admin/complectation_controller/delete_complectation',
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
            url: base_url+'logo_controller/delete_complectation_logo',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    }

}, {});