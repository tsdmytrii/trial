$.Model('Languages_model', {

    get_all_languages: function(success){
        $.ajax({
            url: base_url+'admin/language_controller/get_all_languages',
            success: this.callback(success)
        });
    },

    get_language: function(data, success){
        $.ajax({
            url: base_url+'admin/language_controller/get_language',
            data: data,
            success: this.callback(success)
        });
    },

    delete_language: function(data, success){
        $.ajax({
            url: base_url+'admin/language_controller/delete_language',
            data: data,
            success: this.callback(success)
        });
    }

}, {});