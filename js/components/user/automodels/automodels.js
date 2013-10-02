if(steal.options.env=='development'){
    steal(function(){
        if (steal.isRhino !== undefined) {
            steal({
                src:'components/user/core/production/production.js',
                packaged: false
            });
        }
    })
    .then('./css/automodels.css')
    .then(

        './controllers/automodels_controller',
        './models/automodels_model',

        './views/automodels.tmpl',

        {src:'jquery', packaged:false},
        {src:'jquery/view', packaged:false},
        {src:'jquery/view/tmpl', packaged:false}

    );
} else {

    steal(
        'components/user/automodels/production/production.css'
    )
    .then(
        'components/user/automodels/production/production.js'
    );

}