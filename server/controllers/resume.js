/**
 * Created by Danny Schreiber on 2/4/2015.
 */

var Resume = require('../models/resume/resume');

exports.getResume = function(req, res){
	Resume.find({}).exec(function(err, resume){
		if(err){
			res.send('error', {
				status: 500
			});
		} else {
			res.json(resume);
		}
	});
};


exports.putResume = function(req, res){
	var updatedResume = {
		workHistory: req.body.workHistory,
		devSkills: req.body.devSkills,
		designSkills: req.body.designSkills,
		envSkills: req.body.envSkills,
		clients: req.body.clients,
		pathToResume: req.body.pathToResume
	};
	Resume.update({}, updatedResume, function(err, resume){
		if(err){
			res.send(err);
		}
		res.json({message: 'Resume updated', data: resume});
	});
};