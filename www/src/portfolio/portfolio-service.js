/**
 * Created by Danny Schreiber on 2/2/2015.
 */

(function(){ 'use strict';
	var PortfolioService = function(RestService, Constants, $q){

		var _formatStringForUrl = function(str){
			return str.split(' ').join('-');
		};

		var _formatTagsForSaving = function(tags){
			return tags.split(',');
		};

		var _getPortfolio = function(){
			var deferred = $q.defer();
			var _success = function(data){deferred.resolve(data);};
			var _error = function(data){deferred.resolve(data);};
			RestService.getData(Constants.ROUTES.PORTFOLIO, null, null, _success, '', _error, {showLoader: true});
			return deferred.promise;
		};

		var _getPortfolioByTitle = function(title){
			var deferred = $q.defer();
			var _success = function(data){deferred.resolve(data);};
			var _error = function(data){deferred.resolve(data);};
			RestService.getData(Constants.ROUTES.PORTFOLIO + '/' + _formatStringForUrl(title), null, null, _success, '', _error, {showLoader: true});
			return deferred.promise;
		};

		var _savePortfolio = function(portfolio, title){
			var deferred = $q.defer();
			var _success = function(data){deferred.resolve(data);};
			var _error = function(data){deferred.resolve(data);};

			portfolio.technologies = _formatTagsForSaving(portfolio.technologies);
			portfolio.imagePaths = _formatTagsForSaving(portfolio.imagePaths);
			if(title === 'new'){
				RestService.postData(Constants.ROUTES.PORTFOLIO, null, null, portfolio, _success, '', _error, {showLoader: true});
			} else {
				RestService.putPostData(Constants.ROUTES.PORTFOLIO + '/' + _formatStringForUrl(title), null, null, portfolio, _success, '', _error, {showLoader: true});
			}
			return deferred.promise;
		};

		var _deletePortfolio = function(post){

		};

		return {
			getPortfolio: _getPortfolio,
			getPortfolioByTitle: _getPortfolioByTitle,
			savePortfolio: _savePortfolio,
			deletePortfolio: _deletePortfolio
		};
	};

	angular.module('danny.ui.portfolio.service', []).factory('PortfolioService', ['RestService', 'Constants', '$q', PortfolioService]);
})();
