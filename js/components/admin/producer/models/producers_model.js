$.Model('Producers_model', {

    get_all_producers: function(success){
        $.ajax({
            url: base_url+'admin/producer_controller/get_all_producers',
            success: this.callback(success)
        });
    },

    get_producer: function(data, success){
        $.ajax({
            url: base_url+'admin/producer_controller/get_producer',
            data: data,
            success: this.callback(success)
        });
    },

    delete_producer: function(data, success){
        $.ajax({
            url: base_url+'admin/producer_controller/delete_producer',
            data: data,
            success: this.callback(success)
        });
    }

}, {});