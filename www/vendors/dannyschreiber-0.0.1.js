/**
 * Created by Danny Schreiber on 2/3/2015.
 */
$.cloudinary.config().cloud_name = 'raven-art-media';
$.cloudinary.config().api_key = '194632662182779';
$.cloudinary.config().upload_preset = 'ormwe5hh';
/**
 * Created by Danny Schreiber on 12/30/2014.
 */

angular.module('danny.ui',
[
	'danny.ui.services',
    'danny.ui.tpls',
    'danny.ui.change-password',
    'danny.ui.login'
]);



angular.module('danny.ui.tpls', [
   'template/components/change-password.tpl.html',
    'template/components/login.tpl.html'
]);
/**
 * Created by Danny Schreiber on 1/31/2015.
 */

angular.module('danny.ui.services', [
	'danny.ui.utility.service',
	'danny.ui.post.service',
	'danny.ui.profile.service',
	'danny.ui.portfolio.service',
	'danny.ui.resume.service',
	'danny.ui.email.service'
]);
/**
 * Created by Danny Schreiber on 1/4/2015.
 */

angular.module('danny', [
	'ui.router',
	'ui.bootstrap',
	'ram-utilities.ui',
	'danny.ui',
	'angularFileUpload',
	'textAngular',
	'cloudinary'])

.config(function($httpProvider, $stateProvider, $locationProvider,  $urlRouterProvider){
		$locationProvider.html5Mode(true);
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
        .state('posts', {
            url: '/posts',
            views: {
                'main-container@': {
                    templateUrl: '/src/post/index.html',
                    controller: 'PostController as vm'
                },
                'header@': {
                    templateUrl: '/src/core/layout/header.html',
                    controllerAs: 'HeaderController'
                }
            }
        })
	    .state('posts.detail', {
		    url: '/:title',
		    views: {
			    'main-container@': {
				    templateUrl: '/src/post/detail.html',
				    controller: 'PostDetailController as vm'
			    },
			    'header@': {
				    templateUrl: '/src/core/layout/header.html',
				    controllerAs: 'HeaderController'
			    }
		    }
	    })
	    .state('portfolio', {
		    url: '/portfolio',
		    views: {
			    'main-container@': {
				    templateUrl: '/src/portfolio/list.html',
				    controller: 'PortfolioController as vm'
			    },
			    'header@': {
				    templateUrl: '/src/core/layout/header.html',
				    controllerAs: 'HeaderController'
			    }
		    }
	    })
	    .state('portfolio.detail', {
		    url: '/:title',
		    views: {
			    'main-container@': {
				    templateUrl: '/src/portfolio/detail.html',
				    controller: 'PortfolioDetailController as vm'
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
                    controller: 'AuthenticationController as auth'
                },
                'header@': {
                    templateUrl: '/src/core/layout/header.html',
                    controllerAs: 'HeaderController'
                }
            }
        })
        .state('change-password', {
            url: '/change-password',
            views: {
                'main-container@': {
                    templateUrl: '/src/core/security/change-password.html'
                },
                'header@': {
                    templateUrl: '/src/core/layout/header.html',
                    controllerAs: 'HeaderController'
                }
            }
        });
    $urlRouterProvider.otherwise('/about');
});
/**
 * Created by Danny Schreiber on 1/7/2015.
 */

(function(){ 'use strict';
    var AboutController = function(){

    };

    angular.module('danny').controller('AboutController', [AboutController]);
})();
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
/**
 * Created by Danny Schreiber on 1/26/2015.
 */
(function(){ 'use strict';
    var ramLogin = function($state){

        var link = function($scope, $element){

            $scope.user = {};
            $element.find('#login').bind('click', function(evt){
                if($scope.onSubmit && typeof $scope.onSubmit === 'function'){
                    $scope.onSubmit({user: $scope.user});
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
                    '<div class="col-md-4 col-md-offset-4 col-xs-12 col-xs-offset-2">' +
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
/**
 * Created by Danny Schreiber on 1/14/2015.
 */

(function(){ 'use strict';
    var ContactController = function($scope){

    };
    angular.module('danny').controller('ContactController', ['$scope', ContactController]);
})();
/**
 * Created by Danny Schreiber on 1/28/2015.
 */

(function(){ 'use strict';
	var BASE_API = 'http://admin.abracadaniel.net/api/';
	//var BASE_API = 'http://localhost:3000/api/';
	/*jslint smarttabs:true */
    angular.module('danny').constant('Constants', {
	    ROUTES: {
		    POSTS: BASE_API + 'posts',
		    ALL_POSTS: BASE_API + 'all-posts',
		    POST: BASE_API + 'post/',
		    PROFILE: BASE_API + 'profile',
		    PORTFOLIO: BASE_API + 'portfolio',
		    RESUME: BASE_API + 'resume',
		    SENDMAIL: BASE_API + 'email'
	    },
	    CACHE: {
		    CURRENT_USER: 'currentUser',
		    CURRENT_PROFILE: 'currentProfile'
	    }
    });
})();
/**
 * Created by Danny Schreiber on 2/6/2015.
 */

(function(){ 'use strict';
    var EmailService = function(RestService, Constants, $q){

	    var _sendMail = function(email){
		    var deferred = $q.defer();
		    var _success = function(data){deferred.resolve(data);};
		    var _error = function(data){deferred.resolve(data);};
		    RestService.postData(Constants.ROUTES.SENDMAIL, null, null, email, _success, '', _error, {showLoader: true});
		    return deferred.promise;
	    };



	    return {
		    sendMail: _sendMail
	    };
    };
    angular.module('danny.ui.email.service', []).factory('EmailService', ['RestService', 'Constants', '$q', EmailService]);
})();

/**
 * Created by Danny Schreiber on 1/7/2015.
 */
(function(){ 'use strict';
    var FooterController = function(){

    };

    angular.module('danny').controller('FooterController', [FooterController]);
})();
/**
 * Created by Danny Schreiber on 1/7/2015.
 */

(function(){ 'use strict';
    var HeaderController = function(){

    };

    angular.module('danny').controller('HeaderController', [HeaderController]);
})();
/**
 * Created by Danny Schreiber on 1/31/2015.
 */

(function(){ 'use strict';
    var ProfileService = function(RestService, Constants, $q){

	    var _getProfile = function(){
		    var deferred = $q.defer();
		    var _success = function(data){deferred.resolve(data);};
		    var _error = function(data){deferred.resolve(data);};
		    RestService.getData(Constants.ROUTES.PROFILE, null, null, _success, '', _error, {showLoader: true});
		    return deferred.promise;
	    };

	    return {
		    getProfile: _getProfile
	    };
    };

	angular.module('danny.ui.profile.service', []).factory('ProfileService', ['RestService', 'Constants', '$q', ProfileService]);
})();
/**
 * Created by Danny Schreiber on 1/11/2015.
 */

(function(){ 'use strict';
    var AuthenticationController = function(LoginService){
        var auth = this;
        var _message = 'turd';
        var _user = {};

        var _onSubmit = function(user){
            if(user){
	            LoginService.authenticateUser(user);
            }
        };

        return {
            onSubmit: _onSubmit,
            message: _message,
            user: _user
        };
    };

    angular.module('danny').controller('AuthenticationController',['LoginService',AuthenticationController]);
})();
/**
 * Created by Danny Schreiber on 1/20/2015.
 */

(function(){ 'use strict';
    var LoginService = function(RestService, CacheService, Constants, $state){

        var _authenticateUser = function(user) {

	        var _success = function (data) {
		        if (data.user) {
			        CacheService.setItem(Constants.CACHE.CURRENT_USER, data.user);
			        $state.go('posts');
		        } else {
			        CacheService.getItem(Constants.CACHE.CURRENT_USER);
			        //TODO: implement toastr or something to display error.
		        }
	        };

	        var _error = function (data) {
		        console.log(data);
	        };

	        RestService.postData('/api/login', null, null, {
		        username: user.username,
		        password: user.password
	        }, _success, '', _error, {showLoader: true});
        };

        return {
            authenticateUser: _authenticateUser
        };
    };
    angular.module('danny').factory('LoginService', ['RestService', 'CacheService', 'Constants', '$state', LoginService]);
})();
/**
 * Created by Danny Schreiber on 1/31/2015.
 */
(function(){ 'use strict';
    var UtilityService = function(){
	    var _formatStringForURL = function(str){
		    return str.split(' ').join('-').trim();
	    };

	    return {
		    formatStringForURL: _formatStringForURL
	    };
    };
	angular.module('danny.ui.utility.service', []).factory('UtilityService', [UtilityService]);
})();
/**
 * Created by Danny Schreiber on 2/3/2015.
 */
(function(){ 'use strict';
    var PortfolioController = function(PortfolioService, UtilityService, $state){
	    var vm = this;
	    vm.portfolio = [];

	    vm.getPortfolio = getPortfolio;
		vm.editPortfolio = editPortfolio;
	    vm.addProject = addProject;

	    init();

	    function addProject(){
		    $state.go('portfolio.detail', {title: 'new'});
	    }

	    function getPortfolio(){
		    PortfolioService.getPortfolio()
			    .then(function(data){
				   vm.portfolio = data;
			    });
	    }

	    function editPortfolio(title){
		    $state.go('portfolio.detail', {title: UtilityService.formatStringForURL(title)});
	    }

	    function init(){
		    vm.getPortfolio();
	    }
    };
	angular.module('danny').controller('PortfolioController', ['PortfolioService', 'UtilityService', '$state',PortfolioController]);
})();
/**
 * Created by Danny Schreiber on 2/3/2015.
 */
(function(){ 'use strict';
    var PortfolioDetailController = function(PortfolioService, UtilityService, Constants, $state){
	    var vm = this;

	    vm.portfolio = {
		    description: '',
		    isActive: true,
		    client: '',
		    title: '',
		    workType: '',
		    url: '',
		    category: '',
		    imagePaths: [],
		    technologies: []
	    };

	    vm.savePortfolio = _savePortfolio;
	    vm.deletePortfolio = _deletePortfolio;
	    vm.init = _init;

	    vm.init();

	    function _savePortfolio(){
		    PortfolioService.savePortfolio(vm.portfolio, $state.params.title)
			    .then(function(data){
				    $state.go('portfolio');
			    }, function(response){
				    console.log(response);
			    });
	    }

	    function _deletePortfolio(){

	    }

	    function _init(){
		    if($state.params.title !== 'new'){
			    PortfolioService.getPortfolioByTitle($state.params.title)
				    .then(function(data){
					    console.log(data);
					    if(data[0]){
						    data[0].technologies = data[0].technologies.join(', ');
						    data[0].imagePaths = data[0].imagePaths.join(', ');
						    vm.portfolio = data[0];
					    }
				    });
		    }
	    }
    };
	angular.module('danny').controller('PortfolioDetailController', ['PortfolioService', 'UtilityService', 'Constants', '$state', PortfolioDetailController]);
})();
/**
 * Created by Danny Schreiber on 2/2/2015.
 */

(function(){ 'use strict';
	var PortfolioService = function(RestService, Constants, $q){

		var _formatStringForUrl = function(str){
			return str.split(' ').join('-');
		};

		var _formatTagsForSaving = function(tags){
			if(Object.prototype.toString.call(tags) === '[object Array]'){
				return tags;
			}
			return tags.split(',');
		};

		var _getPortfolio = function(){
			var deferred = $q.defer();
			var _success = function(data){deferred.resolve(data);};
			var _error = function(data){deferred.resolve(data);};
			RestService.getData(Constants.ROUTES.PORTFOLIO, null, null, _success, '', _error, {showLoader: true});
			return deferred.promise;
		};

		var _getPortfolioByTitle = function(title){
			var deferred = $q.defer();
			var _success = function(data){deferred.resolve(data);};
			var _error = function(data){deferred.resolve(data);};
			RestService.getData(Constants.ROUTES.PORTFOLIO + '/' + _formatStringForUrl(title), null, null, _success, '', _error, {showLoader: true});
			return deferred.promise;
		};

		var _savePortfolio = function(portfolio, title){
			var deferred = $q.defer();
			var _success = function(data){deferred.resolve(data);};
			var _error = function(data){deferred.resolve(data);};

			portfolio.technologies = _formatTagsForSaving(portfolio.technologies);
			portfolio.imagePaths = _formatTagsForSaving(portfolio.imagePaths);
			if(title === 'new'){
				RestService.postData(Constants.ROUTES.PORTFOLIO, null, null, portfolio, _success, '', _error, {showLoader: true});
			} else {
				RestService.putPostData(Constants.ROUTES.PORTFOLIO + '/' + _formatStringForUrl(title), null, null, portfolio, _success, '', _error, {showLoader: true});
			}
			return deferred.promise;
		};

		var _deletePortfolio = function(post){

		};

		return {
			getPortfolio: _getPortfolio,
			getPortfolioByTitle: _getPortfolioByTitle,
			savePortfolio: _savePortfolio,
			deletePortfolio: _deletePortfolio
		};
	};

	angular.module('danny.ui.portfolio.service', []).factory('PortfolioService', ['RestService', 'Constants', '$q', PortfolioService]);
})();

/**
 * Created by Danny Schreiber on 1/17/2015.
 */

(function(){ 'use strict';
    var PostController = function(PostService, UtilityService, $state){
        var vm = this;
        vm.posts = {};
	    vm.addPost = addPost;
	    vm.editPost = editPost;

	    function addPost(){
		    $state.go('posts.detail', {title: 'new'});
	    }

	    function editPost(title){
		    $state.go('posts.detail', {title: UtilityService.formatStringForURL(title)});
	    }

        function getPosts(){
            PostService.getPosts()
                .then(function(data){
                    vm.posts = data;
		            console.log(data);
                });
        }

	    function getAllPosts(){
		    PostService.getAllPosts()
			    .then(function(data){
				    vm.posts = data;
				    console.log(data);
			    });
	    }

        function init(){
            getAllPosts();
        }

        init();
    };
    angular.module('danny').controller('PostController', ['PostService', 'UtilityService', '$state', PostController]);
})();
/**
 * Created by Danny Schreiber on 1/29/2015.
 */
(function () {
	'use strict';
	var PostDetailController = function (CacheService, Constants, PostService, $state) {


		var vm = this;

		vm.post = {
			postBody: '',
			isActive: true,
			isPosted: false,
			seoKeywords: '',
			seoDescription: '',
			title: '',
			preview: '',
			author: 'Danny Schreiber',
			imagePath: '',
			comments: [],
			tags: []
		};

		vm.savePost = _savePost;
		vm.deletePost = _deletePost;
		vm.init = _init;

		vm.init();

		function _savePost(){
			PostService.savePost(vm.post, $state.params.title)
				.then(function(data){
					$state.go('posts');
				}, function(response){
					console.log(response);
				});
		}
		
		function _deletePost(){

		}

		function _init(){
			if($state.params.title !== 'new'){
				PostService.getPost($state.params.title)
					.then(function(data){
						if(data[0]){
							data[0].tags = data[0].tags.join(', ');
							vm.post = data[0];
						}
					});
			}
		}

	};
	angular
		.module('danny')
		.controller('PostDetailController', ['CacheService', 'Constants', 'PostService', '$state', PostDetailController]);
})();
/**
 * Created by Danny Schreiber on 1/28/2015.
 */
(function(){ 'use strict';
    var PostService = function(RestService, Constants, $q){

	    var _formatStringForUrl = function(str){
		    return str.split(' ').join('-');
	    };

	    var _formatTagsForSaving = function(tags){
		    return tags.split(',');
	    };
	    var _getPosts = function(){
			var deferred = $q.defer();
			var _success = function(data){deferred.resolve(data);};
			var _error = function(data){deferred.resolve(data);};
			RestService.getData(Constants.ROUTES.POSTS, null, null, _success, '', _error, {showLoader: true});
			return deferred.promise;
		};

	    var _getPost = function(title){
		    var deferred = $q.defer();
		    var _success = function(data){deferred.resolve(data);};
		    var _error = function(data){deferred.resolve(data);};
		    RestService.getData(Constants.ROUTES.POST + _formatStringForUrl(title), null, null, _success, '', _error, {showLoader: true});
		    return deferred.promise;
	    };

	    var _getAllPosts = function(){
		    var deferred = $q.defer();
		    var _success = function(data){deferred.resolve(data);};
		    var _error = function(data){deferred.resolve(data);};
		    RestService.getData(Constants.ROUTES.ALL_POSTS, null, null, _success, '', _error, {showLoader: true});
		    return deferred.promise;
	    };

	    var _savePost = function(post, title){
		    var deferred = $q.defer();
		    var _success = function(data){deferred.resolve(data);};
		    var _error = function(data){deferred.resolve(data);};

		    post.tags = _formatTagsForSaving(post.tags);
		    if(title === 'new'){
			    RestService.postData(Constants.ROUTES.POSTS, null, null, post, _success, '', _error, {showLoader: true});
		    } else {
			    console.log('title: ', title);
			    RestService.putPostData(Constants.ROUTES.POST + _formatStringForUrl(title), null, null, post, _success, '', _error, {showLoader: true});
		    }
		    return deferred.promise;
	    };

	    var _deletePost = function(post){

	    };

		return {
			getPosts: _getPosts,
			getAllPosts: _getAllPosts,
			getPost: _getPost,
			savePost: _savePost,
			deletePost: _deletePost
		};
    };

	angular.module('danny.ui.post.service', []).factory('PostService', ['RestService', 'Constants', '$q', PostService]);
})();
/**
 * Created by Danny Schreiber on 2/4/2015.
 */

(function(){ 'use strict';
    var ResumeService = function(RestService, Constants, $q){

	    var _getResume = function(title){
		    var deferred = $q.defer();
		    var _success = function(data){deferred.resolve(data);};
		    var _error = function(data){deferred.resolve(data);};
		    RestService.getData(Constants.ROUTES.RESUME, null, null, _success, '', _error, {showLoader: true});
		    return deferred.promise;
	    };

	    var _saveResume = function(post, title){
		    var deferred = $q.defer();
		    var _success = function(data){deferred.resolve(data);};
		    var _error = function(data){deferred.resolve(data);};
		    RestService.postData(Constants.ROUTES.RESUME, null, null, post, _success, '', _error, {showLoader: true});
		    return deferred.promise;
	    };

	    return {
		    getResume: _getResume,
		    saveResume: _saveResume
	    };
    };

	angular.module('danny.ui.resume.service', []).factory('ResumeService', ['RestService', 'Constants', '$q', ResumeService]);
})();