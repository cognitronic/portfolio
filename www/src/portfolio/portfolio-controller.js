/**
 * Created by Danny Schreiber on 2/3/2015.
 */
(function(){ 'use strict';
    var PortfolioController = function(PortfolioService, UtilityService, $state){
	    var vm = this;
	    vm.portfolio = [];

	    vm.getPortfolio = getPortfolio;
		vm.editPortfolio = editPortfolio;
	    vm.addProject = addProject;

	    init();

	    function addProject(){
		    $state.go('portfolio.detail', {title: 'new'});
	    }

	    function getPortfolio(){
		    PortfolioService.getPortfolio()
			    .then(function(data){
				   vm.portfolio = data;
			    });
	    }

	    function editPortfolio(title){
		    $state.go('portfolio.detail', {title: UtilityService.formatStringForURL(title)});
	    }

	    function init(){
		    vm.getPortfolio();
	    }
    };
	angular.module('danny').controller('PortfolioController', ['PortfolioService', 'UtilityService', '$state',PortfolioController]);
})();