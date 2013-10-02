$.Model('Language_model', {

    set_language: function(data, success){
        $.ajax({
            url: base_url+'admin/language_controller/set_language',
            data: data,
            success: this.callback(success)
        });
    }

}, {});