/**
 * Created by Danny Schreiber on 1/21/2015.
 */

describe('My portfolio application', function(){
   var $rootScope, $state, $injector, cacheServiceMock, restServiceMock, CacheService;

    beforeEach(function(){

        module('danny', function($provide){
           $provide.value('CacheService', cacheServiceMock = {});
        });

        inject(function(_$rootScope_, _$state_, _$injector_, _$templateCache_){
            $rootScope = _$rootScope_;
            $state = _$state_;
            $injector = _$injector_;

            _$templateCache_.put('/src/about/index.html', '');
            _$templateCache_.put('/src/core/layout/header.html', '');
            _$templateCache_.put('/src/core/layout/footer.html', '');

        });
    });

    it('should resolve root route properly', function(){
        var state = 'root';
        $state.go(state);
        $rootScope.$digest();

        expect($state.href(state)).toEqual('#/');
        expect($state.current.name).toBe(state);

        expect($injector.invoke($state.current.resolve.test));

        $rootScope.$digest();
        expect($state.current.name).toBe('about');

    });
});