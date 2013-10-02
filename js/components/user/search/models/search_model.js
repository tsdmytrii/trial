$.Model('Search_model', {

    search: function(data, success, error){
        $.ajax({
            url: base_url+'user/search_controller/search',
            type: 'post',
            dataType: 'json',
            data: data,
            success: this.callback(success),
            cache: false,
            error: this.callback(error)
        });
    }

}, {});