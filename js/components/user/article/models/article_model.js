$.Model('Article_model', {

    get_all_article: function(string_param, success, error){
        $.ajax({
            url: base_url+'user/article_controller/get_article_list/'+string_param,
            type: 'post',
            dataType: 'json',
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    }

}, {});