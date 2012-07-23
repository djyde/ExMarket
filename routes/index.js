
/*
 * GET home page.
 */
var models = require('../models');
var path = require('path');

exports.index = function(req, res){
	models.getExt(function(err,result){
		if(err) return res.send('error');
		res.render('index',{result: result});
	})
};

exports.getExt = function(req,res){
	var type = req.params.type;
	if(type === "shop" || type === "work" || type === "tool" || type === "social" || type === "news" || type === "other")
		{
			models.getExtByType(type, function(err,result){
				if(err) return res.send('error');
				res.render('index',{result: result});
				//console.log(type);
			});
		}else res.send('这个地方不存在哦!');
}

exports.pushExt = function(req,res){
	var name = req.body.name;
	var type = req.body.type;
	var desc = req.body.desc;
	var pic_path = req.files.pic.path;
	var pic_name = req.files.pic.name;
	var crx_path = req.files.crx.path;
	var crx_name = req.files.crx.name;
	var final_pic_path = name + pic_name;
	var final_crx_path = name + crx_name;
	models.pushExt(name,type,desc,final_pic_path,final_crx_path,function(err,result){
		if(err) return res.send('error');
        console.log(req.files);
		models.moveFiles(path.normalize(__dirname + '/../' + pic_path), path.normalize(__dirname + '/../public/images/PassImg/') + name + pic_name,function(err){
        	if(err) return res.send('move error');
		});
		models.moveFiles(path.normalize(__dirname + '/../' + crx_path), path.normalize(__dirname + '/../public/crx/PassCrx/') + name + crx_name,function(err){
			if(err) return res.send('move error');
		});
		res.redirect('/');
	});
};

exports.like = function(req,res){
	var eid = req.body.id;
	models.plusOne(eid,function(err){
		if(err) alert('like error');
	});
};

exports.admin = function(req, res){
	models.getAllExt(function(err,result){
		if(err) res.send('error');
		res.render('admin',{result: result});
	})
};

exports.doInsert = function(req,res){
	var name = req.body.name;
	var type = req.body.type;
	var desc = req.body.desc;
  models.doInsert(name,type,desc,function(err,result){
  	if(err) return res.send('500 error');
  	res.redirect('/');
  });
}

exports.login = function(req,res){
	res.render('login');
}

exports.doLogin = function(req,res){
	var username = req.body.username;
	var psw = req.body.psw;
	models.checkUser(username,psw,function(err,result){
		if(err) return res.send('error');
		if(result[0].psw === psw){
			res.cookie('ifLogin','OK');
			res.redirect('/admin');
		}else res.redirect('/login');
	})
}

exports.checkLogin = function(req,res,next){
	console.log(req.cookies.ifLogin);
	if(req.cookies.ifLogin === 'OK'){
		next();
	}else res.redirect('/login');
}

exports.pass = function(req,res){
	var id = req.body.id;

	models.pass(id,function(err,result){
		if(err) res.send('error');
		res.redirect('/admin');
	});
}