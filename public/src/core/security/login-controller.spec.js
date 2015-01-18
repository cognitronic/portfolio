/**
 * Created by Danny Schreiber on 1/16/2015.
 */
describe('LoginController', function(){
    var scope, $httpBackend, controller, $state, restService, redirect;
    beforeEach(function(){
        module('danny');
    });

    beforeEach(module(function($provide){
        $provide.value('RestService', {});
    }));

    beforeEach(inject(function(_$controller_, _$rootScope_, _$httpBackend_, _$state_, _RestService_){
        $httpBackend = _$httpBackend_;
        $state = _$state_;
        restService = _RestService_;
        redirect = spyOn(_$state_, 'go');
        scope = _$rootScope_.$new();
        controller = _$controller_('LoginController', {
            $scope: scope,
            RestService: restService,
            $state: $state
        });
    }));

    describe('successfully logging in', function(){

       it('should redirect to /blog when authenticated', function(){
            scope.model.user = {"username":"danny@ravenartmedia.com", "password":"changeme"};
            expect(scope.model.user.username).toEqual('danny@ravenartmedia.com');

           $httpBackend.expectPOST('/api/login', scope.model.user);
           scope.model.login();
           scope.$apply();
           scope.$digest();
           $httpBackend.flush();
       });
    });
});