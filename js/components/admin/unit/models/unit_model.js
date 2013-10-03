$.Model('Unit_model', {

    set_unit: function(data, success){
        $.ajax({
            url: base_url+'admin/unit_controller/set_unit',
            data: data,
            success: this.callback(success)
        });
    }

}, {});