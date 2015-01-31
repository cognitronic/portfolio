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

        function init(){
            getPosts();
        }

        init();
    };
    angular.module('danny').controller('PostController', ['PostService', 'UtilityService', '$state', PostController]);
})();