/**
 * Created by Danny Schreiber on 2/5/2015.
 */

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var wellknown = require('nodemailer-wellknown');

exports.sendEmail = function(req, res){
	var config = wellknown('Godaddy');
	config.auth = {
		user: 'test@valleyfarmsupply.com',
		pass: 'password'
	};
	console.log(config);
	var transporter = nodemailer.createTransport(smtpTransport(config));

	transporter.sendMail({
		from: req.body.fromEmail,
		to: req.body.toEmail,
		subject: req.body.subject,
		text: req.body.textMessage,
		html: req.body.htmlMessage
	}, function(err, info){
		if(err){
			res.send(err);
		}

		res.json(info);
	});

};