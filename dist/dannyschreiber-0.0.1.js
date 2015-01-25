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

angular.module('danny', [ 'ui.router', 'ui.bootstrap', 'ram-utilities.ui'])

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
        .state('blog', {
            url: '/blog',
            views: {
                'main-container@': {
                    templateUrl: '/src/blog/index.html',
                    controller: 'BlogController'
                },
                'header@': {
                    templateUrl: '/src/core/layout/header.html',
                    controller: 'HeaderController'
                }
            }
        })
        .state('contact', {
            url: '/contact',
            views: {
                'main-container@': {
                    templateUrl: '/src/contact/index.html',
                    controller: 'ContactController'
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
 * Created by Danny Schreiber on 1/14/2015.
 */

(function(){ 'use strict';
    var BlogController = function($scope){

    };
    angular.module('danny').controller('BlogController', [BlogController]);
})();
/**
 * Created by Danny Schreiber on 1/17/2015.
 */
(function(){ 'use strict';
    var BlogController = function($scope){

    };
    angular.module('danny').controller('BlogController', ['$scope', BlogController]);
})();
/**
 * Created by Danny Schreiber on 1/14/2015.
 */

(function(){ 'use strict';
    var ContactController = function($scope){

    };
    angular.module('danny').controller('ContactController', ['$scope', ContactController]);
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
    var LoginController = function($scope, $state, LoginService){
        var _user;
        var _message;

        var _login = function login(user){
            var response = {};
            LoginService.authenticateUser(user).then(function(data){
                response.isAuthenticated = data.success;
                response.message = 'logged in successfully!';
                response.user = data.user;
                $state.go('blog');
            }, function(reason){
                response.isAuthenticated = false;
                response.user = null;
                response.message = reason;
                $state.go('login');
            });
        };

        $scope.model = {
            login: _login,
            user: _user,
            message: _message
        };
    };

    angular.module('danny').controller('LoginController',['$scope', '$state', 'LoginService',LoginController]);
})();
/**
 * Created by Danny Schreiber on 1/20/2015.
 */

(function(){ 'use strict';
    var LoginService = function(RestService, $state, $q){
        var _authenticateUser = function(user){
            var response = {};
            var deferred  = $q.defer();
            RestService.postData('/api/login', null, null, {username: user.username, password: user.password}, {showLoader: true})
                .then(function(data){
                    deferred.resolve(data);
            }, function(reason){
                    deferred.reject(reason);
                });
            return deferred.promise;
        };

        return {
            authenticateUser: _authenticateUser
        };
    };
    angular.module('danny').factory('LoginService', ['RestService', '$state', '$q', LoginService]);
})();