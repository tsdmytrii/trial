$.Controller.extend('Img_banners',{
    defaults: {
        viewpath:'//components/admin/img_banners/views/',
        path_for_uploadify: 'js/resources/plugins/uploadify/',
        imgpath: 'uploads/images',
        lang_id: 2,
        wind_opt: {
            width: 960,
            height: 480,
            minimize: true,
            maximise: true,
            left: '100',
            top: '100',
            resize: true,
            status_bar: true,
            modal: true
        },
        upload_function: 'banner_image_controller/set_banner_image',
        pref: 'ru'
    }

},{

    init:function(selector, content_id, menu_item_id){

        var html = $.View(this.options.viewpath+'index.tmpl', {});

        this.elementId = '#'+this.element.attr('id');

        this.element.html(html);

        this.load_banner();
    },

    /*
     * ------------------------------------------------------------------------- Get banners functions
     */

    load_banner: function(){

        Img_banners_model.get_all_banners(this.callback('bannersGeted'));

    },

    bannersGeted: function(data){

        if (data && data.success == false) {

            show_error('Error, no entries. You should add some banner');

        } else {

            var html = $.View(this.options.viewpath+'all_banner.tmpl', {
                our_data: data.data,
                directory: this.options.imgpath,
                pref: this.options.pref
            });

            $('#bannersWrap').html(html);
        }

        componentLoaded(this.element);
    },

    /*
     * ------------------------------------------------------------------------- Set banners functions
     */

    '#add_banner click': function(el){

        this.setImgBanerCallback(false);

    },

    '.editBanner click': function(el) {
        var id = {
            banner_id: $(el).parents(".banner_icon_wrap").attr('data-banner_id')
        };

        Img_banners_model.get_banner(id, this.callback('setImgBanerCallback'));
    },

    setImgBanerCallback: function(data) {

        var html = $.View(this.options.viewpath+'set_banner.tmpl', {
                our_data: data && data.data ? data.data : false,
                directory: this.options.imgpath
            }), msg;

        if (data && data.data && typeof data.data != 'undefined')
            msg = 'Изменение банера';
        else
            msg = 'Добавление банера';

        loadWindow('banner', this.options.wind_opt, msg, html);

        $('#banner_window').img_banner({
            full_functionality:true,
            elementId: this.elementId,
            our_data: data && data.data ? data.data : false
        });

    },

    '.deleteBanner click': function(el) {
        var id = {
            banner_id: $(el).parents(".banner_icon_wrap").attr('data-banner_id')
        }, obj = this;

        if(confirm('Вы действительно хотите удалить банер?')){
            Img_banners_model.delete_banner(id, this.callback('banerDeleted', el));
        }
    },

    banerDeleted: function(el, data){
        if (data.success) {
            show_success('Deleted');

            el.parents('tr').fadeOut(300, function(){
                el.parents('tr').remove();
            });

        } else {
            show_error('Delete error');
        }
    },

    '.delete_banner_img click': function(el){
        var img_id = {
                id: $(el).attr('data-img_id')
            };

        if(confirm('Вы действительно хотите удалить это изображение?')){

            Img_banners_model.delete_banner_img(img_id, this.callback('imgDeleted', el));

        }
    },

    imgDeleted: function(el, data){
        $(el).parents('td').children().fadeOut(300, function(){
            $(el).parents('td').children().remove();
        });
    },

    '.cancel click': function(el){
        $(el).parents('.window-container').find('.window-closeButton').click();
    }

});