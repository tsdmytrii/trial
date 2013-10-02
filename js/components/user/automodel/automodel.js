if(steal.options.env=='development'){
    steal(function(){
        if (steal.isRhino !== undefined) {
            steal({
                src:'components/user/core/production/production.js',
                packaged: false
            });
        }
    })
    .then('./css/automodel.css')
    .then(

        './controllers/automodel_controller',
        './models/automodel_model',

        './views/head.tmpl',
        './views/automodel_menu.tmpl',
        './views/automodel.tmpl',

        {src:'jquery', packaged:false},
        {src:'jquery/view', packaged:false},
        {src:'jquery/view/tmpl', packaged:false}

    );
} else {

    steal(
        'components/user/article/production/production.css'
    )
    .then(
        'components/user/article/production/production.js'
    );

}