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