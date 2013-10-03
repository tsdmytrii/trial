if(steal.options.env=='development'){
    steal(function(){
        if (steal.isRhino !== undefined) {
            steal({
                src:'components/user/core/production/production.js',
                packaged: false
            });
        }
    })
    .then('./css/autoservice.css')
    .then(

        './controllers/autoservice_controller',
        './models/autoservice_model',

        './views/autoservice.tmpl',

        {src:'jquery', packaged:false},
        {src:'jquery/view', packaged:false},
        {src:'jquery/view/tmpl', packaged:false}

    );
} else {

    steal(
        'components/user/autoservice/production/production.css'
    )
    .then(
        'components/user/autoservice/production/production.js'
    );

}