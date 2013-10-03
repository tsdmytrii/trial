/*
 * @page navigation Navigation
 * @tag loader, core, navigation, windows
 * @parent core
 * ###Loader for Navigation
 * @download arsenal/js/components/user/core/navigation/navigation.js
 * @plugin core
 * Here we load all components for navigation, which are needed for all pages on userside
 * This component allows us to open all our components in Windows.
 */
steal(
    'components/classes/windows/windows.js',          
    './css/jquery.contextMenu.css',    
    './css/button_panel.css',    
    'resources/plugins/windows.engine/jquery.windows-engine.css',    
    'resources/plugins/windows.engine/jquery.windows-engine.js',
    './models/script.js', 
    './resources/jquery.contextMenu.js',        
    './controllers/navigation_controller.js',
    'components/classes/windows/windows.css'
    );
