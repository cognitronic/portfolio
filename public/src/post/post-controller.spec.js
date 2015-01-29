/**
 * Created by Danny Schreiber on 1/25/2015.
 */

describe('Post Controller: ', function(){
    beforeEach(module('danny'));
    beforeEach(module('danny.mocks'));
    beforeEach(registerProvide);
    beforeEach(inject(init));

    var $scope, $controller, $httpBackend;
    var BlogFixtures;

    function registerProvide(){
        module(function($provide){

        });
    }

    function init(_$rootScope_, _$controller_, _$httpBackend_, _BlogFixtures_){
        $scope = _$rootScope_.$new();
        $httpBackend = _$httpBackend_;
        BlogFixtures = _BlogFixtures_;
        $controller = _$controller_('PostController as vm', {
            $scope: $scope
        });

        $scope.vm.posts = BlogFixtures.blogList;
    }

    afterEach(function(){
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('when getting all posts', function(){
        it('the posts object should not be null', function(){
            expect($scope.vm.posts).not.toBeNull();
            expect($scope.vm.posts.length).toBe(3);
            expect($scope.vm.posts[0].title).toBe('title one');
       });
    });
});