$.Model('Description_model', {

    get_automodel_description: function(string_param, success, error){

        $.ajax({
            url: base_url+'user/automodel_controller/get_automodel/'+string_param,
            type: 'post',
            dataType: 'json',
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });

    }

}, {});