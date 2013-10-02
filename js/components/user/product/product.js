if(steal.options.env=='development'){
    steal(function(){
        if (steal.isRhino !== undefined) {
            steal({
                src:'components/user/core/production',
                packaged: false
            });
        }
    })
    .then(

        './css/product.css',
        './controllers/product_controller.js',
        './models/product_model.js',

        './views/index.tmpl',

        {src:'jquery', packaged:false},
        {src:'jquery/view', packaged:false},
        {src:'jquery/view/tmpl', packaged:false}

        );
} else {
        steal('components/user/product/production/production.css').
        then('components/user/product/production/production.js');
}