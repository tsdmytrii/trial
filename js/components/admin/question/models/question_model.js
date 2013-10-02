$.Model('Question_model', {

    get_question_variant: function(success, error){
        $.ajax({
            url: base_url+'admin/question_controller/get_question_variant',
            type: 'post',
            dataType: 'json',
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    },

    get_question_variant_by_id: function(data, success, error){
        $.ajax({
            url: base_url+'admin/question_controller/get_question_variant_by_id',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    },

    delete_question_variant: function(data, success, error){
        $.ajax({
            url: base_url+'admin/question_controller/delete_question_variant',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    },

    get_emails: function(success, error){
        $.ajax({
            url: base_url+'admin/email_controller/get_emails',
            type: 'post',
            dataType: 'json',
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    },

    get_email_by_id: function(data, success, error){
        $.ajax({
            url: base_url+'admin/email_controller/get_email_by_id',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    },

    delete_email: function(data, success, error){
        $.ajax({
            url: base_url+'admin/email_controller/delete_email',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    }

}, {});