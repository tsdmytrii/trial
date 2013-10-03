$.Model('Email_model', {

    set_email: function(data, success, error){
        $.ajax({
            url: base_url+'admin/email_controller/set_email',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    }

}, {});