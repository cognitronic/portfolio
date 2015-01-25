/**
 * Created by Danny Schreiber on 1/17/2015.
 */
(function(){ 'use strict';
    var BlogController = function(){
        var vm = this;
        var _posts = [];
        var _selectedPost = null;

        vm = {
            posts: _posts,
            selectedPost: _selectedPost
        };
    };
    angular.module('danny').controller('BlogController', [BlogController]);
})();