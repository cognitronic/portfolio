/**
 * Created by Danny Schreiber on 2/3/2015.
 */
(function(){ 'use strict';
    var PortfolioDetailController = function(PortfolioService, UtilityService, Constants, $state){
	    var vm = this;

	    vm.portfolio = {
		    description: '',
		    isActive: true,
		    client: '',
		    title: '',
		    workType: '',
		    url: '',
		    category: '',
		    imagePaths: [],
		    technologies: []
	    };

	    vm.savePortfolio = _savePortfolio;
	    vm.deletePortfolio = _deletePortfolio;
	    vm.init = _init;

	    vm.init();

	    function _savePortfolio(){
		    PortfolioService.savePortfolio(vm.portfolio, $state.params.title)
			    .then(function(data){
				    $state.go('portfolio');
			    }, function(response){
				    console.log(response);
			    });
	    }

	    function _deletePortfolio(){

	    }

	    function _init(){
		    if($state.params.title !== 'new'){
			    PortfolioService.getPortfolioByTitle($state.params.title)
				    .then(function(data){
					    console.log(data);
					    if(data[0]){
						    data[0].technologies = data[0].technologies.join(', ');
						    data[0].imagePaths = data[0].imagePaths.join(', ');
						    vm.portfolio = data[0];
					    }
				    });
		    }
	    }
    };
	angular.module('danny').controller('PortfolioDetailController', ['PortfolioService', 'UtilityService', 'Constants', '$state', PortfolioDetailController]);
})();