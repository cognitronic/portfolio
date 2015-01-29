/**
 * Created by Danny Schreiber on 1/11/2015.
 */
var mongoose = require('mongoose');
var User = require('../models/user/user');
var Post = require('../models/post/post');

module.exports = function(config){
  mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback(){
       console.log(config.db + ' has been opened');
    });

  User.find({}).exec(function(err, collection){
    if(collection.length === 0){
      User.create({firstName: 'Danny', lastName: 'Schreiber', email: 'danny@ravenartmedia.com', password: 'changeme'});
    }
  });
};

Post.find({}).exec(function(err, collection){
  if(collection.length === 0){
    Post.create({
      isActive: true,
      isPosted: true,
      title: 'Test Post',
      preview: 'Just testing out this whole post biznizz',
      postBody: 'Just testing out this whole post biznizz.  You know itz <b>Crazy</b>',
      author: 'Danny Schreiber',
      tags: ['Testing', 'NodeJS'],
      imagePath: 'https://fbcdn-sphotos-c-a.akamaihd.net/hphotos-ak-xaf1/v/t1.0-9/10270293_10202130462759080_1854853220338196886_n.jpg?oh=42a12431d713c27e7bb747a503d083b7&oe=555E0DB7&__gda__=1432762883_614ba23064b7e9b95bc19a4950d54883',
      comments: [{name: 'Namastaimee', body:'Hey there big boy', email: 'namastaimee@doittome.com'}]
    });
  }
});