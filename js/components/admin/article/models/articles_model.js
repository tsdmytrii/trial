$.Model('Articles_model', {

    get_all_article: function(data, success){
        $.ajax({
            url: base_url+'admin/article_controller/get_all_article',
            data: data,
            success: this.callback(success)
        });
    },

    get_article: function(data, success){
        $.ajax({
            url: base_url+'admin/article_controller/get_article',
            data: data,
            success: this.callback(success)
        });
    },

    delete_article: function(data, success){
        $.ajax({
            url: base_url+'admin/article_controller/delete_article',
            data: data,
            success: this.callback(success)
        });
    }

}, {});