steal(
    //load jmvc components
    'jquery/controller',			// a widget factory
    'jquery/controller/subscribe',		// subscribe to OpenAjax.hub
    'jquery/view/tmpl',			// client side templates
    'jquery/controller/view',		// lookup views with the controller's name
    'jquery/model',			// Ajax wrappers
    'jquery/dom/fixture',			// simulated Ajax requests
    'jquery/dom/form_params'
    ).
then(
    'css/plugins/ui/nonametheme/jquery-ui-1.8.13.custom.css',

    'css/plugins/pnotify/jquery.pnotify.default.css',
    'css/plugins/windows-engine/jquery.windows-engine.css',
    'resources/plugins/bootstrap/css/bootstrap-responsive.min.css',
    'resources/plugins/bootstrap/css/bootstrap.css',
    '//resources/plugins/jquery.timepicker/jquery.timepicker.css',

    'resources/plugins/jquery.cookie.js',

    'css/admin/global.css'
    ).
then(
    'resources/plugins/ui/jquery-ui-1.8.16.custom.min.js',
    'resources/plugins/jquery.pnotify.js',
    '//resources/plugins/jquery.timepicker/jquery.timepicker.js',
    'resources/plugins/jquery.validate.js',
    './navigation/navigation.js'
    ).

then(
    //including resources
    'resources/plugins/jquery.dump.js',
    'resources/plugins/jquery.autocomplete.js',

    //	'resources/helpers',
    //	'resources/plugins/ui/jquery.ui.autocomplete.html.js',
    //	'resources/plugins/datatables/jquery.dataTables.js',
    'resources/plugins/jquery.windows-engine.js',
    'resources/helper_admin_functions.js'
    ).
then(function(){
    //$.ajaxStart(function(){
    //	$('body').showPreload();
    //	});
    //$.ajax
    //	$.ajaxComplete(function(){
    //		$('body'.hidePreload())
    //	})
    $.ajaxSetup({
        type:'post',
        dataType:'json',
        cache: false,
        error: function(xhr){
            if (xhr.status == 500) { // Internal Server Error
                alert(500);

            }
            else if (xhr.status == 404) { // File Not found
                alert(404);
            }
            else if(xhr.status == 401){
                alert(401);
            }
        }

    });
});

