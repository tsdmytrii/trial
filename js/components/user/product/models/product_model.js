$.Model.extend('Static_comp_model',
/* @Static */
{
    get_content: function(string_param, success, error ){
        $.ajax({
            url: base_url+'user/staticcomp_controller/get_staticcomp/'+string_param,
            type: 'post',
            dataType: 'json',
            success: this.callback(success),
            error: error
        });
    }
},
/* @Prototype */
{});

