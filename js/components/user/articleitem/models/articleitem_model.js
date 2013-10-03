$.Model('Articleitem_model', {

    get_article: function(string_param, success, error){
        $.ajax({
            url: base_url+'user/article_controller/get_article/'+string_param,
            type: 'post',
            dataType: 'json',
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    }

}, {});