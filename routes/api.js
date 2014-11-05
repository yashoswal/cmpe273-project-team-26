
//connect to database
var ProxyConfig = require("../models/ProxyConfigModel");
var mongoose = require("mongoose");
mongoose.connect("mongodb://ashishsjsu:ashishsjsu@novus.modulusmongo.net:27017/iQeg2igi");

var Client = require('node-rest-client').Client;

var targetArray = [];

exports.addProxyConfiguration = function(req, res){
		ProxyConfig.findOne({"clientid": req.params.id}, function(err, proxydb){
			if(err)
				res.send(err);
			
			console.log("in GET");

			proxydb.Simpleproxy.push({ targeturl: req.body.targeturl, proxyurl: req.body.proxyurl, latency: req.body.latency});

			proxydb.save(function(err, data){
				if(err) 
					res.send(err);
			  	res.send( (err === null) ? { msg: '' } : { msg: err });
			});

		});
				
}


exports.getProxyConfiguration = function(req, res){

		ProxyConfig.findOne( { "clientid" : req.params.id }, function(err, dbObj){
			if(err)
				res.send(err);
			
			console.log("in GET");
			res.json(dbObj);

		});

}

exports.addUser = function(req, res){
		
		var proxydb = new ProxyConfig;
		
		proxydb.email = "abc@example.org";
		proxydb.password = "abc";
		proxydb.clientid = "1";
		console.log(proxydb);
		proxydb.save(function(err, data){
			if(err) 
				res.send(err);	
			  res.send( (err === null) ? { msg: data } : { msg: err });
		});		
}

exports.getAllUsers = function(req, res){
		
		ProxyConfig.find( {}, function(err, dbObj){
			if(err)
				res.send(err);
			
			console.log("in GET");
			res.json(dbObj);
		});
}


exports.updateProxyConfiguration = function(req, res){
	ProxyConfig.findOne({"clientid": req.params.id}, function(err, proxydb){
			if(err)
				res.send(err);

			function removeProxy(element) {
  			return element._id != req.body.id;
			}
			var temp = proxydb.Simpleproxy.filter(removeProxy);

			proxydb.Simpleproxy = temp
			proxydb.Simpleproxy.push({ _id:req.body.id, targeturl: req.body.targeturl, proxyurl: req.body.proxyurl, latency: req.body.latency});
        	proxydb.save(function(err, data){
					if(err) 
						res.send(err);	
			  		res.send( (err === null) ? { msg: '' } : { msg: err });
				});
		});
	
}

exports.deleteProxyConfiguration = function(req, res){


		ProxyConfig.findOne({"clientid": req.params.id}, function(err, proxydb){
			if(err)
				res.send(err);

			function removeProxy(element) {
				console.log(element);
  			return element._id != req.body.id;
			}

			var temp = proxydb.Simpleproxy.filter(removeProxy);
			proxydb.Simpleproxy = temp
        	proxydb.save(function(err, data){
					if(err) 
						res.send(err);	
			  		res.send( (err === null) ? { msg: '' } : { msg: err });
				});
		});
}
