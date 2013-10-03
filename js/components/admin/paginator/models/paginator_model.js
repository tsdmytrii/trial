$.Model('Paginator_model', {
    getData: function(server_method, data, success){
        $.ajax({
            url: server_method,
            data: data,
            success: this.callback(success)
        });
    }
}, {});