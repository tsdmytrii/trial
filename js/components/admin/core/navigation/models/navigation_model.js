$.Model('Navigation_model', {
	get_componen_types: function(success, error){
            $.ajax({
                url: base_url+'admin/component_controller/get_component_types_for_nav',
                type: 'post',
                dataType: 'json',
                success: this.callback(success),
                cache: false,
                error: this.callback(error)
            });
	}
}, {});