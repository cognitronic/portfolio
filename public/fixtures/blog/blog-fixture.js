/**
 * Created by Danny Schreiber on 1/25/2015.
 */

(function(){ 'use strict';
    angular.module('danny.mocks')
        .factory('BlogFixtures', BlogFixtures);

    var _blogList = getJSONFixture('blog/blog-list.json');
    var _post = getJSONFixture('blog/post.json');

    function BlogFixtures(){
        return {
            blogList: _blogList.posts,
            post: _post
        };
    }
})();