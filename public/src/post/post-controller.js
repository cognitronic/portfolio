/**
 * Created by Danny Schreiber on 1/17/2015.
 */
(function(){ 'use strict';
    var PostController = function(){
        var vm = this;
        var _posts = [];
        var _selectedPost = null;


        return  {
            posts: _posts,
            selectedPost: _selectedPost
        };
    };
    angular.module('danny').controller('PostController', [PostController]);
})();