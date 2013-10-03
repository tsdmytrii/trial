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
then('css/plugins/960/reset.css').
then(
    '//css/plugins/datatables/demo_page.css',
    '//css/plugins/datatables/demo_table.css',
    '//css/plugins/datatables/demo_table_jui.css',
    '//css/plugins/ui/nonametheme/jquery-ui-1.8.13.custom.css',
    '//resources/plugins/datatables/jquery.dataTables.js',
    //including resources
    'resources/plugins/jquery.dump.js'
    );

