/**
 * Created by Danny Schreiber on 12/30/2014.
 */

angular.module('danny.ui',
[
    'danny.ui.tpls',
    'danny.ui.change-password',
    'danny.ui.login'
]);

angular.module('danny.ui.tpls', [
   'template/components/change-password.tpl.html',
    'template/components/login.tpl.html'
]);
/**
 * Created by Danny Schreiber on 1/4/2015.
 */

angular.module('danny', [ 'ui.router', 'ui.bootstrap', 'ram-utilities.ui', 'danny.ui'])

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
                    controllerAs: 'HeaderController'
                },
                'footer': {
                    templateUrl: '/src/core/layout/footer.html',
                    controllerAs: 'FooterController'
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
                    controllerAs: 'AboutController'
                },
                'header@': {
                    templateUrl: '/src/core/layout/header.html',
                    controllerAs: 'HeaderController'
                }
            }
        })
        .state('blog', {
            url: '/blog',
            views: {
                'main-container@': {
                    templateUrl: '/src/blog/index.html',
                    controllerAs: 'BlogController'
                },
                'header@': {
                    templateUrl: '/src/core/layout/header.html',
                    controllerAs: 'HeaderController'
                }
            }
        })
        .state('contact', {
            url: '/contact',
            views: {
                'main-container@': {
                    templateUrl: '/src/contact/index.html',
                    controllerAs: 'ContactController'
                },
                'header@': {
                    templateUrl: '/src/core/layout/header.html',
                    controllerAs: 'HeaderController'
                }
            }
        })
        .state('login', {
            url: '/login',
            views: {
                'main-container@': {
                    templateUrl: '/src/core/security/login.html'
                },
                'header@': {
                    templateUrl: '/src/core/layout/header.html',
                    controllerAs: 'HeaderController'
                }
            }
        })
        .state('change-password', {
            url: '/change-password',
            views: {
                'main-container@': {
                    templateUrl: '/src/core/security/change-password.html'
                },
                'header@': {
                    templateUrl: '/src/core/layout/header.html',
                    controllerAs: 'HeaderController'
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
    var BlogController = function(){
        var vm = this;
        var _posts = [];
        var _selectedPost = null;


        return  {
            posts: _posts,
            selectedPost: _selectedPost
        };
    };
    angular.module('danny').controller('BlogController', [BlogController]);
})();
/**
 * Created by Danny Schreiber on 1/26/2015.
 */

(function(){ 'use strict';
    var ramChangePassword = function($templateCache){
        console.log($templateCache.get('template/components/change-password.tpl.html'));
        var ChangePasswordController = function($state){
            var vm = this;
            vm.isFormInvalid = true;
            vm.showMessage = false;

            var isValid = function(){
                if(!vm.username &&
                !vm.currentPassword &&
                !vm.newPassword &&
                !vm.confirmPassword){
                    vm.isFormInvalid = false;
                }

                vm.isFormInvalid = (vm.newPassword != vm.confirmPassword);
            };

            vm.submit = function(){
                if(isValid()){
                    vm.showMessage = true;
                    vm.message = 'This form is invalid';
                } else{
                    vm.showMessage = false;
                    $state.go('about');
                }
            };



        };

        var link = function($scope, $element, $attrs, $controller){

        };


        return{
          restrict: 'EA',
          transclude: true,
          scope: {
              username: '@',
              currentPassword: '@',
              newPassword: '@',
              confirmPassword: '@',
              submit: '&',
              isFormInvalid: '@',
              showMessage: '@',
              message: '@'
          },
          templateUrl: 'template/components/change-password.tpl.html',
          controllerAs: 'vm',
          controller: ChangePasswordController,
          link: link
      };
    };

    angular.module('danny.ui.change-password',[]).directive('ramChangePassword', ['$templateCache', ramChangePassword]);

    angular.module('template/components/change-password.tpl.html', [])
        .run(['$templateCache', function($templateCache){
            $templateCache.put('template/components/change-password.tpl.html',
                '<div ng-if="vm.showMessage" class="row">' +
                '<div class="col-md-12 col-xs-12">' +
                '<div>' +
                '<div class="error">{{vm.message}}</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="row">' +
                '<div class="col-md-6 col-xs-12">' +
                '<div>' +
                '<label for="email">Email:</label>' +
                '<input type="email" id="email" ng-model="vm.username" class="required" name="email" autofocus />' +
                '</div>' +
                '</div>' +
                '<div class="col-md-6 col-xs-12">' +
                '<div>' +
                '<label for="pwd">Current Password:</label>' +
                '<input type="password" id="pwd" class="required" ng-model="vm.currentPassword" name="pwd"/>' +
                '</div>' +
                '</div>' +
                '<div class="col-md-6 col-xs-12">' +
                '<div>' +
                '<label for="pwd">New Password:</label>' +
                '<input type="password" id="pwd" class="required" ng-model="vm.newPassword" name="pwd"/>' +
                '</div>' +
                '</div>' +
                '<div class="col-md-6 col-xs-12">' +
                '<div>' +
                '<label for="pwd">Confirm Password:</label>' +
                '<input type="password" id="pwd" class="required" ng-model="vm.confirmPassword" name="pwd"/>' +
                '</div>' +
                '</div>' +
                '<p>' +
                '<button class="btn btn-default" ng-disabled="vm.isFormInvalid" ng-click="vm.submit()">Login</button>' +
                '</p>' +
                '</div>' +
                '</div>');
        }]);
})();
/**
 * Created by Danny Schreiber on 1/26/2015.
 */
(function(){ 'use strict';
    var ramLogin = function($templateCache){
        console.log($templateCache.get('template/components/login.tpl.html'));

        var LoginController = function($state, LoginService) {
            var vm = this;
            vm.user = {};

            vm.login = function login(user) {
                var response = {};
                LoginService.authenticateUser(user).then(function (data) {
                    response.isAuthenticated = data.success;
                    response.message = 'logged in successfully!';
                    response.user = data.user;
                    $state.go('blog');
                }, function (reason) {
                    response.isAuthenticated = false;
                    response.user = null;
                    response.message = reason;
                    $state.go('change-password');
                });
            };
        };

        var link = function($scope, $element, $attrs, $controller ){

        };


        return{
            restrict: 'EA',
            transclude: true,
            scope: {
                login: '&',
                user: '@',
                showChangePassword: '@'
            },
            templateUrl: 'template/components/login.tpl.html',
            controllerAs: 'vm',
            controller: LoginController,
            bindToController: true,
            link: link
        };
    };

    angular.module('danny.ui.login',[]).directive('ramLogin', ['$templateCache', ramLogin]);

    angular.module('template/components/login.tpl.html', [])
        .run(['$templateCache', function($templateCache){
            $templateCache.put('template/components/login.tpl.html',
                '<div class="row">' +
                    '<div class="col-md-4 col-md-offset-5 col-xs-12 col-xs-offset-2">' +
                        '<div>' +
                            '<label for="email">Email:</label>' +
                            '<input type="email" id="email" ng-model="vm.user.username" class="required" name="email" autofocus />' +
                        '</div>' +
                        '<div>' +
                            '<label for="pwd">Password:</label>' +
                            '<input type="password" id="pwd" class="required" ng-model="vm.user.password" name="pwd"/>' +
                        '</div>' +
                        '<p>' +
                            '<button class="btn btn-default" ng-click="vm.login(vm.user)">Login</button>' +
                        '</p>' +
                    '</div>' +
                '</div>');
        }]);
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
    var LoginController = function($state, LoginService){
        var vm = this;
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

        return {
            login: _login,
            user: _user,
            message: _message
        };
    };

    angular.module('danny.ui.login').controller('LoginController',['$state', 'LoginService',LoginController]);
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