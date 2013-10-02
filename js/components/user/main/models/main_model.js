$.Model('Main_model', {

    ask_quest: function(data, success, error){
        $.ajax({
            url: base_url+'user/user_controller/ask_quest',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    }

}, {});