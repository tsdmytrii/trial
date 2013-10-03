$.Model('Main_model', {

    get_components: function(data, success, error){
        $.ajax({
            url: base_url+'user_controller/component_load',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    },

    set_interview_variant: function(data, success, error){
        $.ajax({
            url: base_url+'user_controller/set_interview_variant',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    },

    load_data: function(data, success, error){
        $.ajax({
            url: base_url+'user_controller/load_data',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    },

    get_indexes: function(data, success, error){
        $.ajax({
            url: base_url+'user_controller/get_indexes',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    }

}, {});