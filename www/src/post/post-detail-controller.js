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
			title: '',
			preview: '',
			author: CacheService.getItem(Constants.CACHE.CURRENT_USER).name,
			imagePath: '',
			comments: [],
			tags: []
		};

		vm.savePost = _savePost;
		vm.deletePost = _deletePost;

		function _savePost(){
			PostService.savePost(vm.post)
				.then(function(data){
					$state.go('posts');
				}, function(response){
					console.log(response);
				});
		}
		
		function _deletePost(){

		}

	};
	angular
		.module('danny')
		.controller('PostDetailController', ['CacheService', 'Constants', 'PostService', '$state', PostDetailController]);
})();