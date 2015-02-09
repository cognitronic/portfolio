/**
 * Created by Danny Schreiber on 2/2/2015.
 */

var Portfolio = require('../models/portfolio/portfolio');

exports.getPortfolio = function(req, res){
	Portfolio.find({}).exec(function(err, portfolio){
		if(err){
			res.send('error', {
				status: 500
			});
		} else {
			res.json(portfolio);
		}
	});
};

exports.getPortfolioByTitle = function(req, res){
	var title = req.params.title.split("-").join(" ");
	Portfolio.find({title: title}, function(err, portfolio){
		if(err){
			res.send(err);
		}
		res.json(portfolio);
	});
};

exports.postPortfolio = function(req, res){
	var portfolio = new Portfolio();
	portfolio.title = req.body.title;
	portfolio.description = req.body.description;
	portfolio.isActive = req.body.isActive;
	portfolio.client = req.body.client;
	portfolio.url = req.body.url;
	portfolio.seoKeywords = req.body.seoKeywords;
	portfolio.seoDescription = req.body.seoDescription;
	portfolio.category = req.body.category;
	portfolio.workType = req.body.workType;
	portfolio.technologies = req.body.technologies;
	portfolio.imagePaths = req.body.imagePaths;

	portfolio.save(function(err){
		if(err){
			res.send(err);
		}
		res.json({message: 'Portfolio saved!', data: portfolio});
	});
};

exports.putPortfolio = function(req, res){
	var updatedPortfolio = {
		isActive: req.body.isActive,
		description: req.body.description,
		seoKeywords: req.body.seoKeywords,
		seoDescription: req.body.seoDescription,
		category: req.body.category,
		client: req.body.client,
		workType: req.body.workType,
		url: req.body.url,
		technologies: req.body.technologies,
		imagePaths: req.body.imagePaths
	};
	var title = req.params.title.split("-").join(" ");
	Portfolio.update({title: title}, updatedPortfolio, function(err, portfolio){
		if(err){
			res.send(err);
		}
		res.json({message: 'Portfolio updated', data: portfolio});
	});
};