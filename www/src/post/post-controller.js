/**
 * Created by Danny Schreiber on 1/17/2015.
 */

(function(){ 'use strict';
    var PostController = function(PostService){
        var vm = this;
        vm.posts = {};
	    vm.addPost = addPost;

	    function addPost(){
			PostService.addPost('new');
	    }

        function getPosts(){
            PostService.getPosts()
                .then(function(data){
                    vm.posts = data;
		            console.log(data);
                });
        }

        function init(){
            getPosts();
        }

        init();
    };
    angular.module('danny').controller('PostController', ['PostService', PostController]);
})();