$.Controller.extend('Articles',{
    defaults: {
        viewpath:'//components/admin/article/views/',
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
        pref: 'ru'
    }

},{

    init:function(selector, article_id, component_type_id){

        this.article_id = article_id;
        this.component_type_id = component_type_id;
        this.limit = 20;
        this.items = 0;
        this.offset = 0;

        this.loadSeoArticle();

        this.elementId = this.element.attr('id');

        this.paginatorOptions = {
            itemsOnPage: this.limit,
            edges: 1,
            currentPage: 1,
            callBackString: '$("#' + this.elementId + '").' + this.Class.fullName.toLowerCase() + '("getOffset", '
        };

        var html = $.View(this.Class.defaults.viewpath+'index.tmpl', {});

        this.element.html(html);

        this.loadArticles();
    },

    '.articleMaxTab click': function(el, ev) {

        ev.preventDefault();

        tab_navigation(el, 'articleMaxTab', 'active', '#articlesContent', 'cur', 'articleTabContent', '#'+this.elementId, $(el).attr('href'));

    },

    loadArticles: function(){

        Articles_model.get_all_article({
            article_id: this.article_id,
            limit: this.limit,
            offset: this.offset
        }, this.callback('articlesGeted'));

    },

    articlesGeted: function(data) {

        if (data.success == false) {

            show_error('Error, no entries. You should add some article');

        } else {

            var html;

            if (data.message) {

                html = '<h3>Код ошибки: '+data.message+'</h3>';

                return;
            }

            if (this.items === 0 || this.items !== parseInt(data.data.articleItemQuant)) {
                this.items = data.data.articleItemQuant;

                this.refreshPaginator();
            }

            html = $.View(this.Class.defaults.viewpath+'all_article.tmpl', {
                our_data: data.data.data,
                pref: this.Class.defaults.pref
            });


            $('.articlesList', '#'+this.elementId).html(html);

            componentLoaded(this.element);

        }
    },

    '.add_article click': function(el) {

        this.setArticleCallback(false);

    },

    '.editArticle click': function(el) {
        var id = {
            article_item_id: $(el).parents(".article_icon_wrap").data('article_item_id')
        };

        Articles_model.get_article(id, this.callback('setArticleCallback'));
    },

    setArticleCallback: function(data){

        if (data && data.message) {
            show_error('Код ошибки: '+data.message);
            return;
        }

        var html = $.View(this.Class.defaults.viewpath+'set_article.tmpl', {
                our_data: data.data,
                site_url: base_url,
                article_id: this.article_id,
                directory: this.Class.defaults.imgpath
            }),
            msg = data === false ? 'Добавление статьи' : 'Изменение статьи';

        loadWindow('set_article', this.Class.defaults.wind_opt, msg, html);

        $('#set_article_window').article({
            data: data ? data.data : false,
            edit: data ? true : false ,
            elementId: this.elementId,
            className: this.Class.fullName.toLowerCase()
        });

    },

    getOffset: function(offset) {

        this.offset = offset;

        this.loadArticles();

    },

    '.deleteArticle click': function(el){
        var id = {
            article_item_id: $(el).parents(".article_icon_wrap").attr('data-article_item_id')
        },
        obj = this;

        if(confirm('Вы действительно хотите удалить статью?')){

            Articles_model.delete_article(id, this.callback('articleDeleted', el),function(data){

                obj.success_delete_article(data, el);

            });

        }
    },

    articleDeleted: function(el, data){
        if (data.success) {

            if (data.message) {

                show_error('Код ошибки:'+data.message);

                return;

            }

            show_success('Deleted');

            var tr = el.parents('tr');

            tr.slideUp(300, function(){

                tr.remove();

            });

            this.items--;

            this.refreshPaginator();

        } else {
            show_error('Delete error');
        }

    },

    '.quantity click': function(el) {

        $(el).parents('div').find('.quantity').removeClass('active');

        $(el).addClass('active');

        this.limit = $(el).data('limit');

        this.refreshPaginator();

        this.loadArticles();

    },

    refreshPaginator: function() {

        if ($('#paginator').hasClass('paginator'))
            $('#paginator').paginator('destroy');

        this.paginatorOptions.items = this.items;

        this.paginatorOptions.itemsOnPage = this.limit;

        $('#paginator').paginator(this.paginatorOptions);

     },


     /*
      * Article seo functions
      */

    loadSeoArticle: function() {

        Article_seo_model.get_article_seo({
            article_id: this.article_id
        }, this.callback('articleGeted'));

    },

    articleGeted: function(data) {

        if (data.success == false) {

            show_error('Error, no entries. You should add some article');

        } else {

            if (data.message) {

                $('#articlePageData').html('<h3>Код ошибки: '+data.message+'</h3>');

            } else {
                var article_seo = $.View(this.Class.defaults.viewpath + 'seo_form.tmpl', {
                    our_data: data.data,
                    article_id: this.article_id
                });

                $('#articlePageData').html(article_seo);

                imperavi($('.content_desc', '#' + this.elementId));
            }
        }
    },

    '.seo_article_lang click': function(el, ev) {
        ev.preventDefault();

        tab_navigation(el, 'seo_article_lang', 'active', '.seo_article_lang_wrap', 'current_seo', 'content_lang', '#articlePageData', $(el).attr('href'));
    },

    '.seo_form submit': function(el,ev) {
        ev.preventDefault();
        var data;

        this.article_lang_validate(el);

        if ($(el).valid() === true) {
            data = $(el).serialize()+'&component_type_id='+this.component_type_id;

            Article_seo_model.set_article_seo(data, this.callback('articleSeoSaved', el));
        }

    },

    articleSeoSaved: function(form, data) {
        if (data.success) {

            if (data.message) {

                show_error('Код ошибки: '+data.message)

            } else {

                if (data.data.link_id) {
                    $(form).find('.link_id').val(data.data.link_id);
                }

                show_success('Изменения внесены успешно');

            }

        } else {
            show_error('Ошибка');
        }
    },

    article_lang_validate: function(element){

        $(element).validate({
            rules: {
                description: {
                    maxlength: 500
                },
                description_btm: {
                    maxlength: 4000
                },
                link: {
                    regexp: '^[a-zA-Z0-9_]+$',
                    maxlength: 100,
                    unique: true
                },
                key_words: {
                    maxlength: 1000
                },
                seo_description: {
                    maxlength: 4000
                },
                seo_title: {
                    maxlength: 500
                }
            },
            messages: {
                description: {
                    maxlength: "Максимальное количество символов - 500"
                },
                description_btm: {
                    maxlength: "Максимальное количество символов - 4000"
                },
                link: {
                    regexp: 'Может состоять только из латинских букв, цифр и знака подчеркивания',
                    maxlength: 'Максимальное количество символов - 100',
                    unique: 'Такая ссылка уже зарегестрирована'
                },
                key_words: {
                    maxlength: "Максимальное количество символов - 1000"
                },
                seo_description: {
                    maxlength: "Максимальное количество символов - 4000"
                },
                seo_title: {
                    maxlength: "Максимальное количество символов - 500"
                }
            },
            errorPlacement: function(error, element){
                element.next().append(error).animate({
                    opacity: "1"
                }, 1000);
            }
        });

    }

});