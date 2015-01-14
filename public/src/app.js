/**
 * Created by Danny Schreiber on 1/4/2015.
 */

angular.module('danny', [ 'ui.router', 'ui.bootstrap'])

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
                    controller: 'HeaderController'
                },
                'footer': {
                    templateUrl: '/src/core/layout/footer.html',
                    controller: 'FooterController'
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
                    controller: 'AboutController'
                },
                'header@': {
                    templateUrl: '/src/core/layout/header.html',
                    controller: 'HeaderController'
                }
            }
        })
        .state('blog', {
            url: '/blog',
            views: {
                'main-container@': {
                    templateUrl: '/src/blog/index.html',
                    controller: 'BlogController'
                },
                'header@': {
                    templateUrl: '/src/core/layout/header.html',
                    controller: 'HeaderController'
                }
            }
        })
        .state('contact', {
            url: '/contact',
            views: {
                'main-container@': {
                    templateUrl: '/src/contact/index.html',
                    controller: 'ContactController'
                },
                'header@': {
                    templateUrl: '/src/core/layout/header.html',
                    controller: 'HeaderController'
                }
            }
        })
        .state('login', {
            url: '/login',
            views: {
                'main-container@': {
                    templateUrl: '/src/core/security/login.html',
                    controller: 'LoginController'
                },
                'header@': {
                    templateUrl: '/src/core/layout/header.html',
                    controller: 'HeaderController'
                }
            }
        });
    $urlRouterProvider.otherwise('/about');
});