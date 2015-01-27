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
                '<div class="row form-horizontal">' +
                '<div class="form-group col-md-6 col-xs-12">' +
                '<label class="control-label row-label" for="email">Email:</label>' +
                '<input type="email" id="email" ng-model="vm.username" tabindex="1" class="form-control required" name="email" autofocus />' +
                '</div>' +
                '<div class="form-group col-md-6 col-xs-12">' +
                '<label class="control-label row-label" for="pwd">Current Password:</label>' +
                '<input type="password" id="pwd" class="form-control required" tabindex="3" ng-model="vm.currentPassword" name="pwd"/>' +
                '</div>' +
                '<div class="form-group col-md-6 col-xs-12">' +
                '<label class="control-label row-label" for="pwd">New Password:</label>' +
                '<input type="password" id="pwd" class="form-control required" tabindex="2" ng-model="vm.newPassword" name="pwd"/>' +
                '</div>' +
                '<div class="form-group col-md-6 col-xs-12">' +
                '<label class="control-label row-label" for="pwd">Confirm Password:</label>' +
                '<input type="password" id="pwd" class="form-control required" tabindex="4" ng-model="vm.confirmPassword" name="pwd"/>' +
                '</div>' +
                '<div class="form-group col-md-6 col-xs-12">' +
                '<p><button class="form-control btn btn-default" ng-disabled="vm.isFormInvalid" ng-click="vm.submit()">Submit</button></p>' +
                '</div>' +
                '</div>' +
                '</div>');
        }]);
})();