/**
 * Created by Danny Schreiber on 1/26/2015.
 */
(function(){ 'use strict';
    var ramLogin = function($state){

        var link = function($scope, $element){

            $scope.user = {};
            $element.find('#login').bind('click', function(evt){
                if($scope.onSubmit && typeof $scope.onSubmit === 'function'){
                    $scope.onSubmit({user: $scope.user})
                        .then(function(data){
                            if(data.success){
                                $state.go('post');
                            }
                        });
                }
            });
        };

        return{
            restrict: 'EA',
            transclude: true,
            scope: {
                onSubmit: '&ramOnSubmit'
            },
            templateUrl: 'template/components/login.tpl.html',
            link: link
        };
    };

    angular.module('danny.ui.login',[]).directive('ramLogin', [ '$state', ramLogin]);

    angular.module('template/components/login.tpl.html', [])
        .run(['$templateCache', function($templateCache){
            $templateCache.put('template/components/login.tpl.html',
                '<div class="row">' +
                    '<div class="col-md-4 col-md-offset-5 col-xs-12 col-xs-offset-2">' +
                        '<div>' +
                            '<label for="email">Email:</label>' +
                            '<input type="email" id="email" ng-model="user.username" class="required" name="email" autofocus />' +
                        '</div>' +
                        '<div>' +
                            '<label for="pwd">Password:</label>' +
                            '<input type="password" id="pwd" class="required" ng-model="user.password" name="pwd"/>' +
                        '</div>' +
                        '<p>' +
                            '<button id="login" class="btn btn-default" ng-click="onSubmit(user)">Login</button>' +
                        '</p>' +
                    '</div>' +
                '</div>');
        }]);
})();