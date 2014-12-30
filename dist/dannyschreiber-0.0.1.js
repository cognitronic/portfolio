/**
 * Created by Danny Schreiber on 12/30/2014.
 */

angular.module('danny.ui',
[
    'danny.ui.cache.service'
]);
/**
 * @author Danny Schreiber on 8/12/2014.
 */



(function(){ 'use strict';
    /**
     * @constructor CacheService
     * @classdesc The cache service is a wrapper for the sessionStorage object and allows for client side state management.
     *
     */
    var CacheService = function(){

        /**
         * Constants representing the available items in the cache.  This allows for using dot notation.
         *
         * @namespace
         * @property {object} UserInfo - global user info
         * @property {object} UserInfo.userData - Logged in user object
         * @memberOf CacheService
         */
        var _cacheItems = {
            UserInfo: {
                userData: 'userData',
                userId: 'userId',
                browserSupportChecked: 'browserSupportChecked'
            }
        };

        /**
         * Inserts an item into session storage object
         * @param {key} string name
         * @param {val} object value that will be stringified and stored
         * @function setItem
         * @memberOf CacheService
         */
        var _setItem = function(key, val) {
            sessionStorage.setItem(key, JSON.stringify(val));
        };

        /**
         * Retrieves an item from the cache
         * @param {item} string name of the key
         * @function getItem
         * @memberOf CacheService
         */
        var _getItem = function(item) {
            if(angular.fromJson){
                return angular.fromJson(sessionStorage.getItem(item));
            }
        };

        /**
         * Removes an item from the cache
         *
         * @param {item} string name of the key
         * @function removeItem
         * @memberOf CacheService
         */
        var _removeItem = function(item) {
            sessionStorage.removeItem(item);
        };

        /**
         *Clears all data from the local sessionStorage object
         *
         * @function clearCache
         * @memberOf CacheService
         */
        var _clearCache = function(){
            sessionStorage.clear();
        };



        return {
            setItem: _setItem,
            getItem: _getItem,
            removeItem: _removeItem,
            Items: _cacheItems,
            clearCache: _clearCache
        };
    };

    angular.module('danny.ui.cache.service', []).factory('CacheService', [CacheService]);
})();
