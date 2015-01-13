/**
 * Created by Danny Schreiber on 12/30/2014.
 */

angular.module('danny.ui',
[
    'danny.ui.cache.service'
]);
/**
 * Created by Danny Schreiber on 1/4/2015.
 */

angular.module('danny', [ 'ui.router', 'ui.bootstrap'])

.config(function($httpProvider, $stateProvider, $urlRouterProvider){

    $httpProvider.defaults.transformRequest = function(data){
        if (data === undefined) {
            return data;
        }
        return $.param(data);
    };

    //sets the content type header globally for $http calls
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    $httpProvider.defaults.headers['delete'] = {'Content-Type': 'application/json; charset=UTF-8'};

    $stateProvider
        .state('root', {
            url: '/',
            views: {
                'header': {
                    templateUrl: '/src/core/layout/header.html',
                    controller: 'HeaderController'
                },
                'footer': {
                    templateUrl: '/src/core/layout/footer.html',
                    controller: 'FooterController'
                }
            },
            resolve:{
                test: function($state){
                    $state.go('about');
                }
            }
        })
        .state('about', {
            url: '/about',
            views: {
                'main-container@': {
                    templateUrl: '/src/about/index.html',
                    controller: 'AboutController'
                },
                'header@': {
                    templateUrl: '/src/core/layout/header.html',
                    controller: 'HeaderController'
                }
            }
        })
        .state('login', {
            url: '/login',
            views: {
                'main-container@': {
                    templateUrl: '/src/core/security/login.html',
                    controller: 'LoginController'
                },
                'header@': {
                    templateUrl: '/src/core/layout/header.html',
                    controller: 'HeaderController'
                }
            }
        });
    $urlRouterProvider.otherwise('/about');
});
/**
 * Created by Danny Schreiber on 1/7/2015.
 */

(function(){ 'use strict';
    var AboutController = function(){

    };

    angular.module('danny').controller('AboutController', [AboutController]);
})();
/**
 * Created by Danny Schreiber on 1/7/2015.
 */
(function(){ 'use strict';
    var FooterController = function(){

    };

    angular.module('danny').controller('FooterController', [FooterController]);
})();
/**
 * Created by Danny Schreiber on 1/7/2015.
 */

(function(){ 'use strict';
    var HeaderController = function(){

    };

    angular.module('danny').controller('HeaderController', [HeaderController]);
})();
/**
 * Created by Danny Schreiber on 1/11/2015.
 */

(function(){ 'use strict';
    var LoginController = function($scope, $http){
        var _user = {};

        var _login = function(){
            console.log($scope.model.user);
            $http.post('/api/login', {username: $scope.model.user.email, password: $scope.model.user.password}).then(function(response){
                console.log(response);
                if(response.data.success){
                    console.log('logged in!');
                } else {
                    console.log('log in failed');
                }
            });
        };

        $scope.model = {
            login: _login,
            user: _user
        };
    };

    angular.module('danny').controller('LoginController',['$scope', '$http',LoginController]);
})();
/**
 * @author Danny Schreiber on 8/12/2014.
 */



(function(){ 'use strict';
    /**
     * @constructor CacheService
     * @classdesc The cache service is a wrapper for the sessionStorage object and allows for client side state management.
     *
     */
    var CacheService = function(){

        /**
         * Constants representing the available items in the cache.  This allows for using dot notation.
         *
         * @namespace
         * @property {object} UserInfo - global user info
         * @property {object} UserInfo.userData - Logged in user object
         * @memberOf CacheService
         */
        var _cacheItems = {
            UserInfo: {
                userData: 'userData',
                userId: 'userId',
                browserSupportChecked: 'browserSupportChecked'
            }
        };

        /**
         * Inserts an item into session storage object
         * @param {key} string name
         * @param {val} object value that will be stringified and stored
         * @function setItem
         * @memberOf CacheService
         */
        var _setItem = function(key, val) {
            sessionStorage.setItem(key, JSON.stringify(val));
        };

        /**
         * Retrieves an item from the cache
         * @param {item} string name of the key
         * @function getItem
         * @memberOf CacheService
         */
        var _getItem = function(item) {
            if(angular.fromJson){
                return angular.fromJson(sessionStorage.getItem(item));
            }
        };

        /**
         * Removes an item from the cache
         *
         * @param {item} string name of the key
         * @function removeItem
         * @memberOf CacheService
         */
        var _removeItem = function(item) {
            sessionStorage.removeItem(item);
        };

        /**
         *Clears all data from the local sessionStorage object
         *
         * @function clearCache
         * @memberOf CacheService
         */
        var _clearCache = function(){
            sessionStorage.clear();
        };



        return {
            setItem: _setItem,
            getItem: _getItem,
            removeItem: _removeItem,
            Items: _cacheItems,
            clearCache: _clearCache
        };
    };

    angular.module('danny.ui.cache.service', []).factory('CacheService', [CacheService]);
})();