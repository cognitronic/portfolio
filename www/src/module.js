/**
 * Created by Danny Schreiber on 12/30/2014.
 */

angular.module('danny.ui',
[
	'danny.ui.services',
    'danny.ui.tpls',
    'danny.ui.change-password',
    'danny.ui.login'
]);



angular.module('danny.ui.tpls', [
   'template/components/change-password.tpl.html',
    'template/components/login.tpl.html'
]);