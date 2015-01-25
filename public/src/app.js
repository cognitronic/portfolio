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
                    templateUrl: '/src/core/security/login.html',
                    controllerAs: 'LoginController'
                },
                'header@': {
                    templateUrl: '/src/core/layout/header.html',
                    controllerAs: 'HeaderController'
                }
            }
        });
    $urlRouterProvider.otherwise('/about');
});