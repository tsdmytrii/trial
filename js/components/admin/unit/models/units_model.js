$.Model('Units_model', {

    get_all_units: function(success){
        $.ajax({
            url: base_url+'admin/unit_controller/get_all_units',
            success: this.callback(success)
        });
    },

    get_unit: function(data, success){
        $.ajax({
            url: base_url+'admin/unit_controller/get_unit',
            data: data,
            success: this.callback(success)
        });
    },

    delete_unit: function(data, success){
        $.ajax({
            url: base_url+'admin/unit_controller/delete_unit',
            data: data,
            success: this.callback(success)
        });
    }

}, {});