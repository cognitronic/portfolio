/**
 * Created by Danny Schreiber on 1/25/2015.
 */

(function(){ 'use strict';
    angular.module('danny.mocks')
        .factory('PostFixtures', PostFixtures);

    var _blogList = getJSONFixture('post/post-list.json');
    var _post = getJSONFixture('post/post.json');

    function PostFixtures(){
        return {
            blogList: _blogList.posts,
            post: _post
        };
    }
})();