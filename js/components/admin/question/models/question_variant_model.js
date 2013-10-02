$.Model('Question_variant_model', {

    set_question_variant: function(data, success, error){
        $.ajax({
            url: base_url+'admin/question_controller/set_question_variant',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    }

}, {});