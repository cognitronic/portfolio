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