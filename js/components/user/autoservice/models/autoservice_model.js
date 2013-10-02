$.Model('Autoservice_model', {

    get_autoservice: function(string_param, success, error){
        $.ajax({
            url: base_url+'user/autoservice_controller/get_autoservice/'+string_param,
            type: 'post',
            dataType: 'json',
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    }

}, {});