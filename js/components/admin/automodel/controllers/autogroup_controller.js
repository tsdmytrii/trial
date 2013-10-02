$.Controller.extend('Autogroup', {
    autoCompleteQuant: 0,
    defaults: {
        viewpath: '//components/admin/automodel/views/',
        lang_id: 2,
        pref: 'ru'
    }

}, {
    /*
     * Load autogroup with automodels
     */
    init: function(element, automodel_id) {

        this.automodel_id = automodel_id;

        this.elementId = $('.' + this.Class.fullName.toLowerCase()).attr('id');

        Autogroup_model.get_autogroup({
            id: this.automodel_id
        }, this.callback('groupsLoaded'));

    },
    /*
     * Display autogroup with automodels if they are
     */
    groupsLoaded: function(data) {

        if (data && data.message){
            show_error('Код ошибки: '+data.message);
            return;
        }

        if (data)
            this.groupId = data.data.id;

        var html = $.View(this.Class.defaults.viewpath + 'set_group.tmpl', {
            our_data: data ? data.data : false,
            automodel_id: this.automodel_id,
            pref: this.Class.defaults.pref
        }), obj = this, name = $([0]);

        $('#groups').html(html);

        Group.autoCompleteQuant = 0;

        $.each($('.autoModelName'), function(i){
            name[0] = this;

            var id = name.attr('id').split('autoModelName_')[1];

            obj._autoCompleteAutoModel(id);

            if ((i+1) === $('.autoModelName').length) {
                Group.autoCompleteQuant = id;
            }
        });
    },
    /*
     * Send autoGroup form to server
     */
    '#groupForm submit': function(el, ev) {
        ev.preventDefault();

        this.group_validate(el);

        if (el.valid() !== false) {

            Autogroup_model.set_autogroup(el.serialize(), this.callback('groupSaved'), this.callback('error'));

        }

    },
    /*
     * Callback saved group
     */
    groupSaved: function(response) {

        if (response.success === true) {

            if (response.message) {
                show_error('Код ошибки: '+response.message);
                return;
            }

            $('#group_id').val(response.data.id);
            this.groupId = response.data.id;
            show_success('Группа сохранена!');

            if (!$('.addAutoModel').length) {
                this.element.find('.form-actions').before('<div class="control-group"><div class="addAutoModel btn btn-info">Добавить автомодель</div></div><div id="autoModelsInGroup"></div>');
            }

            var el = $([0]);
            $.each(this.element.find('.menu_icon'), function(){
                el[0] = this;

                el.removeClass('icon-remove').removeClass('removeAutoModel').addClass('deleteAutoModel').addClass('icon-trash');
            });

        }
        else {
            show_error('Ой что-то пошло не так!');
        }
    },

    //--------------------------------------------------------------------------
    '.addAutoModel click': function(el) {

        Group.autoCompleteQuant++;

        var html = $.View(this.Class.defaults.viewpath + 'addAutoModel.tmpl', {
            id: Group.autoCompleteQuant
        });

        $('#autoModelsInGroup').append(html);

        this._autoCompleteAutoModel(Group.autoCompleteQuant);
    },
    //--------------------------------------------------------------------------
    '.removeAutoModel click': function(el, ev) {
        this.removeAutoModelFromDom(el);
    },
    //--------------------------------------------------------------------------
    '.deleteAutoModel click': function(el) {
        var automodel_id = $(el).parents('.autoModelWrap').data('automodel_id'),
                obj = this;

        if (confirm('Вы действительно хотите исключить автомодель из группы?'))
            Autogroup_model.delete_automodel({
                automodel_id: automodel_id,
                autogroup_id: this.groupId
            }, function(data) {
                obj.autoModelDeleted(data, el);
            }, this.callback('error'));

    },
    //--------------------------------------------------------------------------
    autoModelDeleted: function(data, el) {
        if (data.success === true) {

            if (data.message) {
                show_error('Код ошибки: '+data.message);
                return;
            }

            show_success('Автомодель исключени из группы');

            this.removeAutoModelFromDom(el);

        } else
            show_error('Ошибка исключения автомодели из группы.');
    },
    //--------------------------------------------------------------------------
    removeAutoModelFromDom: function(el) {
        $(el).parents('.autoModelWrap').fadeOut(300, function() {
            $(el).parents('.autoModelWrap').remove();
        });
    },
    //--------------------------------------------------------------------------
    group_validate: function(element) {

        $(element).validate({
            rules: {
                name: {
                    minlength: 2,
                    maxlength: 200,
                    required: true
                }
            },
            messages: {
                name: {
                    minlength: 'Минимальное количество символов - 2',
                    maxlength: 'Максимальное количество символов - 200',
                    required: 'Это обязательное поле'
                }
            },
            highlight: function(element) {
                $(element).parents('.control-group').addClass('error');
            },
            unhighlight: function(element) {
                $(element).parents('.control-group').removeClass('error').find('.help').empty();
            },
            errorPlacement: function(error, element) {
                element.parents('.control-group').find('.help').html(error.html());
            }
        });

    },
    //--------------------------------------------------------------------------
    _autoCompleteAutoModel: function(id) {

        $('#autoModelName_'+id).autocomplete({
            serviceUrl: base_url + 'admin/automodel_controller/automodel_autocomplete', // Страница для обработки запросов автозаполнения
            minChars: 2, // Минимальная длина запроса для срабатывания автозаполнения
            //            delimiter: /(,|;)\s*/, // Разделитель для нескольких запросов, символ или регулярное выражение
            maxHeight: 400, // Максимальная высота списка подсказок, в пикселях
            width: 300, // Ширина списка
            zIndex: 19999, // z-index списка
            deferRequestBy: 300, // Задержка запроса (мсек), на случай, если мы не хотим слать миллион запросов, пока пользователь печатает. Я обычно ставлю 300.
            onSelect: function(data, value, element) {

                $(element).prev().val(value);
                $(element).parents('.autoModelWrap').data('automodel_id', value);

            } // Callback функция, срабатывающая на выбор одного из предложенных вариантов,
            //            lookup: ['January', 'February', 'March'] // Список вариантов для локального автозаполнения
        });
    },
    //--------------------------------------------------------------------------
    error: function(response) {
        show_error(response.data ? response.data : response);
    }

});