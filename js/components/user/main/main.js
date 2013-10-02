steal(
function(){
        if (steal.isRhino !== undefined) {
            steal({
                src:'components/user/core/production',
                packaged: false
            });
        }
    })
    .then('//resources/plugins/jquery.fancybox/jquery.fancybox-1.3.4.js',
        '//resources/plugins/jquery.fancybox/jquery.fancybox-1.3.4.css')
    .then(

    //load resources
    './css/main.css',
    './controllers/main_controller',
    './models/main_model',
    {src:'jquery',packaged:false},
    {src:'jquery/view',packaged:false},
    {src:'jquery/view/tmpl',packaged:false}
    );



