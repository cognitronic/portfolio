/**
 * Created by Danny Schreiber on 1/31/2015.
 */
(function(){ 'use strict';
    var UtilityService = function(){
	    var _formatStringForURL = function(str){
		    return str.split(' ').join('-');
	    };

	    return {
		    formatStringForURL: _formatStringForURL
	    };
    };
	angular.module('danny.ui.utility.service', []).factory('UtilityService', [UtilityService]);
})();