/*
 * @page Navigation_json
 * @tag navigation
 * @parent navigation
 * @plugin navigation
 * @download arsenal/js/components/user/core/navigation_json.js
 * ###Navigation controller
 *
 * In this file we register all dynamic components, which can be loaded into windows.
 * Here we specify all atttributes for each component:
 *
 * * componentId - inique id for each componentType
 * * windowOption.button_panel - if for component must be craeted a control button, .settings - a setting-icon (deprecated), maximise - a maximize-icon for window
 * * serverQuery - do we receive a json response or an html, now we receive on ly json-response, thatswhy 0 all the time
 * * serverApp - path to server controller
 * * clientApp - path to Client Controller
 * * clientController - namefor clientController
 * * type - should be 'window' for all components now
 *
 *  It would be better if we place it into navigation folder and navigation steel builder
 */
var navigation_components = [{

    'componentId': 'staticcomp',
    'windowOption': {
        'titleBar': true,
        'buttonsInBody': false,
        'statusBar': true,
        'logoAlign': false,
        'allWidth': false,
        'button_panel': true,
        'settings': false,
        'maximise': true,
        'width': 'default'
    },
    'serverQuery': 0,
    'serverApp': 'static_comp',
    'clientApp': 'components/user/static_comp',
    'clientController': 'static_comp',
    'type': 'window'

},{

    'componentId': 'article',
    'windowOption': {
        'titleBar': true,
        'buttonsInBody': false,
        'statusBar': true,
        'logoAlign': false,
        'allWidth': true,
        'button_panel': true,
        'settings': false,
        'maximise': true,
        'width': 'default'
    },
    'serverQuery': 0,
    'serverApp': 'article',
    'clientApp': 'components/user/article',
    'clientController': 'article',
    'type': 'window'

},{

    'componentId': 'articleitem',
    'windowOption': {
        'titleBar': true,
        'buttonsInBody': false,
        'statusBar': true,
        'logoAlign': false,
        'allWidth': false,
        'button_panel': true,
        'settings': false,
        'maximise': true,
        'width': 'default'
    },
    'serverQuery': 0,
    'serverApp': 'articleitem',
    'clientApp': 'components/user/articleitem',
    'clientController': 'articleitem',
    'type': 'window'

},{

    'componentId': 'automodel',
    'windowOption': {
        'titleBar': true,
        'buttonsInBody': false,
        'statusBar': true,
        'logoAlign': false,
        'allWidth': false,
        'button_panel': true,
        'settings': false,
        'maximise': true,
        'width': 960
    },
    'serverQuery': 0,
    'serverApp': 'automodel',
    'clientApp': 'components/user/automodel',
    'clientController': 'automodel',
    'type': 'window'

},{

    'componentId': 'automodels',
    'windowOption': {
        'titleBar': false,
        'buttonsInBody': true,
        'statusBar': false,
        'logoAlign': false,
        'allWidth': true,
        'button_panel': true,
        'settings': false,
        'maximise': false,
        'width': 'default'
    },
    'serverQuery': 0,
    'serverApp': 'automodel',
    'clientApp': 'components/user/automodels',
    'clientController': 'automodels',
    'type': 'window'

},{

    'componentId': 'contacts',
    'windowOption': {
        'titleBar': true,
        'buttonsInBody': false,
        'statusBar': false,
        'logoAlign': true,
        'allWidth': true,
        'button_panel': true,
        'settings': false,
        'maximise': true,
        'width': 'default'
    },
    'serverQuery': 0,
    'serverApp': 'contacts',
    'clientApp': 'components/user/contacts',
    'clientController': 'contacts',
    'type': 'window'

},{

    'componentId': 'search',
    'windowOption': {
        'titleBar': true,
        'buttonsInBody': false,
        'statusBar': true,
        'logoAlign': false,
        'allWidth': false,
        'button_panel': true,
        'settings': false,
        'maximise': true,
        'width': 'default'
    },
    'serverQuery': 0,
    'serverApp': 'search',
    'clientApp': 'components/user/search',
    'clientController': 'search',
    'type': 'window'

},{

    'componentId': 'autoservice',
    'windowOption': {
        'titleBar': false,
        'buttonsInBody': true,
        'statusBar': false,
        'logoAlign': false,
        'allWidth': true,
        'button_panel': true,
        'settings': false,
        'maximise': false,
        'width': 'default'
    },
    'serverQuery': 0,
    'serverApp': 'autoservice',
    'clientApp': 'components/user/autoservice',
    'clientController': 'autoservice',
    'type': 'window'

},

/*
 * --------------------- SUB COMPONENTS
 **/

{
    'componentId': 'description',
    'clientApp': 'components/user/automodel/sub_components/description',
    'clientController': 'description'
},{
    'componentId': 'characteristic',
    'clientApp': 'components/user/automodel/sub_components/characteristic',
    'clientController': 'characteristic'
}
];