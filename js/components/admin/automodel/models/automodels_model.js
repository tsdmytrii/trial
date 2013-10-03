$.Model('Automodels_model', {

    get_all_automodels: function(data, success){
        $.ajax({
            url: base_url+'admin/automodel_controller/get_all_automodels',
            data: data,
            success: this.callback(success)
        });
    },

    get_automodel: function(data, success){
        $.ajax({
            url: base_url+'admin/automodel_controller/get_automodel',
            data: data,
            success: this.callback(success)
        });
    },

    delete_automodel: function(data, success, error){
        $.ajax({
            url: base_url+'admin/automodel_controller/delete_automodel',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    }

}, {});