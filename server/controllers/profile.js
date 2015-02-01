/**
 * Created by Danny Schreiber on 1/31/2015.
 */

var Profile = require('../models/profile/profile');

exports.getProfile = function(req, res){
	Profile.find({name: 'Danny Schreiber'}).exec(function(err, profile){
		if(err){
			res.send('error', {
				status: 500
			});
		} else {
			res.json(profile);
		}
	});
};