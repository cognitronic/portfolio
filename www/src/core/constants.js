/**
 * Created by Danny Schreiber on 1/28/2015.
 */

(function(){ 'use strict';
	var BASE_API = '/api/';
	/*jslint smarttabs:true */
    angular.module('danny').constant('Constants', {
	    ROUTES: {
		    POSTS: BASE_API + 'posts',
		    POST: BASE_API + 'post/',
		    PROFILE: BASE_API + 'profile'
	    },
	    CACHE: {
		    CURRENT_USER: 'currentUser',
		    CURRENT_PROFILE: 'currentProfile'
	    }
    });
})();