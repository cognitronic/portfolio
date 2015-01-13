/**
 * Created by Danny Schreiber on 1/6/2015.
 */

exports.index = function(req, res){
    res.sendfile('./public/src/index.html');
};