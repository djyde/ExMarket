var db = require('mongoskin').db('localhost/exten');
var fs = require('fs');

exports.getExt = function(callback){
	db.collection('ext').find().sort({like: -1}).toArray(function(err,result){
		callback(err,result);
	});
}

exports.getAllExt = function(callback){
	db.collection('ext').find().sort({pass: 1}).toArray(function(err,result){
		callback(err,result);
	})
}

exports.getExtByType = function(type,callback){
	db.collection('ext').find({type: type}).sort({like: -1}).toArray(function(err,result){
		callback(err,result);
	});
}

exports.pushExt = function(name,type,desc,callback){
	db.collection('ext').insert({
		name: name,
		type: type,
		desc: desc,
		like: 0,
		pass: 0,
		created: Date.now()
	},function(err,result){
		callback(err,result);
	})
}

exports.plusOne = function(eid,callback){
	db.collection('ext').update({_id: db.ObjectID.createFromHexString(eid)},{"$inc": {"like": 1}},function(err){
		callback(err);
	});
}

exports.moveFiles = function(origin_dir,target_dir,callback){
	fs.rename(origin_dir,target_dir,function(err){
		callback(err);
	})
}

exports.checkUser = function(username,psw,callback){
	db.collection('user').find({username: username}).toArray(function(err,result){
		callback(err,result);
	})
}

exports.pass = function(id,callback){
	db.collection('ext').update({_id: db.ObjectID.createFromHexString(id)}, {"$set": {"pass": 1}},function(err){
		callback(err);
	})
}