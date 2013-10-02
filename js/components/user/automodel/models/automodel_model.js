$.Model('Automodel_model', {

    get_service_data: function(string_param, success, error){
        $.ajax({
            url: base_url+'user/automodel_controller/get_service_data/'+string_param,
            type: 'post',
            dataType: 'json',
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    }

}, {});