/**
 * Created by Danny Schreiber on 1/16/2015.
 */
describe('LoginController', function(){
    var $rootScope, $scope, $httpBackend, controller, $state, loginServiceMock, LoginService, $q;



    beforeEach(function(){
        module('danny', function($provide){
            $provide.value('LoginService', {
                authenticateUser: function(){
                    return {
                        then: function(callback){
                            callback([{
                                data: {
                                    isAuthenticated: true,
                                    user: {
                                        username: 'danny@ravenartmedia.com',
                                        password: 'password'
                                    }
                                }
                            }]);
                        }
                    };
                }
            });
        });

        inject(function(_$httpBackend_, _$controller_, _$rootScope_, _$state_, _$templateCache_, _$q_, _LoginService_){
            $httpBackend = _$httpBackend_;
            LoginService = _LoginService_;
            $q = _$q_;
            $state = _$state_;
            $rootScope = _$rootScope_;
            $scope = _$rootScope_.$new();
            controller = _$controller_('LoginController as vm', {
                $scope: $scope
            });
            _$templateCache_.put('/src/about/index.html', '');
            _$templateCache_.put('/src/core/layout/header.html', '');
            _$templateCache_.put('/src/blog/index.html', '');
        });
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('successfully logging in', function(){

       it('should have a current $state of blog', function(){
           var state = 'blog';
           var user = {username: 'danny@ravenartmedia.com', password: 'changeme'};
           spyOn(LoginService, 'authenticateUser').andCallThrough();
           $scope.vm.login(user);
           $rootScope.$digest();

           expect($state.current.name).toBe(state);
       });

        it('should have the isAuthenticated property set to true', function(){

        });

        it('should have the hydrated user object', function(){

        });

    });

    describe('unsuccessful login', function(){
       it('should have a current $state of login', function(){

       }) ;

        it('should have the isAuthenticated property set to false', function(){

        });

        it('should have a null user object', function(){

        });
    });
});