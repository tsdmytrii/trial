<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');
/*
  | -------------------------------------------------------------------------
  | URI ROUTING
  | -------------------------------------------------------------------------
  | This file lets you re-map URI requests to specific controller functions.
  |
  | Typically there is a one-to-one relationship between a URL string
  | and its corresponding controller class/method. The segments in a
  | URL normally follow this pattern:
  |
  |	example.com/class/method/id/
  |
  | In some instances, however, you may want to remap this relationship
  | so that a different class/function is called than the one
  | corresponding to the URL.
  |
  | Please see the user guide for complete details:
  |
  |	http://codeigniter.com/user_guide/general/routing.html
  |
  | -------------------------------------------------------------------------
  | RESERVED ROUTES
  | -------------------------------------------------------------------------
  |
  | There area two reserved routes:
  |
  |	$route['default_controller'] = 'welcome';
  |
  | This route indicates which controller class should be loaded if the
  | URI contains no data. In the above example, the "welcome" class
  | would be loaded.
  |
  |	$route['404_override'] = 'errors/page_missing';
  |
  | This route will tell the Router what URI segments to use if those provided
  | in the URL cannot be matched to a valid route.
  |
 */
//$route['menu_spisok_statey'] = '';
$route['staticcomp/(:num)/(:num)/(:num)/(:num)'] = 'user/staticcomp_controller/get_staticcomp/$1/$2/$3/$4';

$route['automodel/(:num)/(:num)/(:num)/(:num)'] = 'user/automodel_controller/get_automodel/$1/$2/$3/$4';
$route['automodels/(:num)/(:num)/(:num)/(:num)'] = 'user/automodel_controller/get_automodels/$1/$2/$3/$4';

$route['admin/menu'] = 'admin/menu_controller/index';
$route['admin/menu/(:any)'] = 'admin/menu_controller/index';

$route['admin/(:num)/menu_item/(:num)'] = 'admin/menu_controller/index';

$route['admin/(:num)/articles/(:num)'] = 'admin/menu_controller/index';

$route['admin/(:num)/contacts/(:num)'] = 'admin/menu_controller/index';

$route['admin/(:num)/staticcomp/(:num)'] = 'admin/menu_controller/index';

$route['admin/(:num)/question/(:num)'] = 'admin/menu_controller/index';

$route['admin/(:num)/autobrend/(:num)'] = 'admin/menu_controller/index';

$route['admin/(:num)/img_banners/(:num)'] = 'admin/menu_controller/index';

$route['admin/pages'] = 'admin/component_controller/index';
$route['admin/pages/(:any)'] = 'admin/component_controller/index';

$route['admin/placeholders'] = 'admin/placeholder_controller';

$route['admin/mini_blocks'] = 'admin/layout_controller';

$route['admin/product_blocks'] = 'admin/product_block_controller';

$route['admin/categories'] = 'admin/menu_controller/index';

$route['admin/producers'] = 'admin/menu_controller/index';

$route['admin/products'] = 'admin/menu_controller/index';

$route['admin/units'] = 'admin/menu_controller/index';

$route['admin/groups'] = 'admin/menu_controller/index';

$route['admin/marking'] = 'admin/menu_controller/index';

$route['admin/seo'] = 'admin/menu_controller/index';

$route['admin/component_types'] = 'admin/menu_controller/index';

$route['admin/languages'] = 'admin/menu_controller/index';

$route['admin/subscribes'] = 'admin/subscribes_controller/index';

$route['admin/campaigns'] = 'admin/campaigns_controller/index';

$route['profiling'] = 'profiling_controller/get_productivity';

$route['default_controller'] = "user/user_controller";
$route['404_override'] = 'user_controller/show_404_error';

/* End of file routes.php */
/* Location: ./application/config/routes.php */
