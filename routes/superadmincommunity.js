const express = require('express');
const path = require('path');
var bodyParser = require('body-parser')
const app = express.Router();
const multer = require('multer');
var passport=require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var nodemailer = require('nodemailer');

var SongSchema = require('mongoose').model('UsersNames').schema

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost/myDB';

var communitys = new mongoose.Schema({
	"photoloc":String,
	"name":String,
	"members":String,
	"rule":String,
	"communityloc":String,
	"createdate":String,
	"description":String,
	"owner":String,
	"status":String,
  "ownerid":String,
  "request":Array,
  "managers":Array,
  "invited":Array,
   "users": [{'type': mongoose.Schema.Types.ObjectId , 'ref':UsersNames}]
})

// var communitys =  mongoose.model('communitys', communitys);

// var communityjoined = new mongoose.Schema({
//   "commintyname":String,
//   "communityid":String,
//   "members":Array  
// })

// var commjoined =  mongoose.model('joinedmembers', communityjoined);

// var communityrequested = new mongoose.Schema({
//   "commintyname":String,
//   "communityid":String,
//   "members":Array  
// })

// var commrequested =  mongoose.model('requestedmembers', communityrequested);

// app.post('/getUsers',function(req,res) {
//   if(req.session.isLogin){
// console.log("----------------------"+req.body._id);

// // var members = {"_id": req.body._id, "name": "Rishabh","photoloc":"/images/logo.png"};
// // communitys.findOneAndUpdate({"_id":req.body._id}, {$push: {users: members}},function(err,result)
// //   {
// //     console.log("update"+result);
// //   });
// communitys
// .findOne({ "_id" : req.body._id })
// .populate('users') // only works if we pushed refs to person.eventsAttended
// .exec(function(err, person) {
//     if (err) return handleError(err);
//     console.log(person);
// });


//   communitys.find({"_id":req.body._id}, function(err, result){
     
//   res.send(JSON.stringify(result.users));
// });

// } else {
//     res.redirect('/');
//   }
// })

app.post('/getCommunityLists' , function(req, res) {
  console.log(req.body);
      communitys.countDocuments(function(e,count){
      var start=parseInt(req.body.start);
      var len=parseInt(req.body.length);

      communitys.find({}).skip(start).limit(len)
    .then(data=> {
      
       if (req.body.customsearch!="")
                    {
                        data = data.filter((value) => {
                            return value.name.includes(req.body.customsearch)
                        })
                    }
    
      res.send({"recordsTotal": count, "recordsFiltered" : count, data})
     })
     .catch(err => {
      res.send(err)
    })
  });
})


app.post('/communityupdate',function(req,res) {
  if(req.session.isLogin){
  communitys.updateOne({"_id":req.body.id},{$set:{"name":req.body.name,"status":req.body.status}},function(error,result){       
    if(error)
      throw error;
    else {
    }
    res.send("true");
  })
  } else {
    res.redirect('/');
  }
})

app.get('/getArrayOwnCommunity',function(req,res) {
  if(req.session.isLogin){
    console.log("okokok")
    communitys.find({'ownerid':req.session._id}, function(err, result){
     console.log(result);
      res.send(result);
});

} else {
    res.redirect('/');
  }
})

app.get('/getArrayOtherCommunity',function(req,res) {
  if(req.session.isLogin){
    console.log("okokok")
    communitys.find({'ownerid':{"$ne":req.session._id}}, function(err, result){
     console.log(result);
      res.send(result);
});

} else {
    res.redirect('/');
  }
})


app.post('/addCommunity',function (req, res) {
  if(req.session.isLogin){
    let newProduct = new communitys({
  "photoloc":"images/defaultCommunity.jpg",
  "name":req.body.name,
  "members":[req.session.name],
  "rule":req.session.rule,
  "communityloc":"Not Known",
  "createdate":req.session.createdate,
  "description":req.session.description,
  "owner":req.session.name,
  "status":"false",
  "ownerid":req.session._id  
    })
    newProduct.save()
     .then(data => {
       console.log(data)
       res.send("true")
     })
     .catch(err => {
       console.error(err)
       res.send(error)
     })
   }else {
    res.redirect('/');
}
})

var storage = multer.diskStorage({
      destination : './public/uploads/',
      filename : function(req, file, callback)
      {
        photoname='community'+req.session._id +path.extname(file.originalname);
        req.session.data.photoloc ='uploads/'+ photoname;
        callback(null,photoname);
      }
    })

     var upload = multer({
      storage : storage,
    }).single('file');

app.post('/uploadphotoCommunity',(req,res)=>{
  upload(req,res,(err)=>{
        if(err)
        {
          throw err;
        }
        else{
          console.log(req.file);
          console.log(photoname);
          communitys.updateOne({"_id":req.session._id},{$set:{"photoloc":'uploads/'+photoname}},function(error,result){
        
           })

          console.log();
          req.session.data.photoloc = 'uploads/community'+photoname;
            
        }
      })

})

app.get('/getAllActive',function(req,res) {
  if(req.session.isLogin){

    communitys.find({'status':"Active"}, function(err, result){
     console.log(result);
      res.send(result);
});

} else {
    res.redirect('/');
  }
})

app.post('/updatecomm',function(req,res) {
  if(req.session.isLogin){
    communitys.findOneAndUpdate({"_id":req.body._id},{"name":req.body.name,"description":req.body.description,"rule":req.body.rule},function(err,result)
  {
    if(err)
      throw err
    else
    {
      communitys.findOne({"_id":req.body._id},function(err,result)
    {
      if(err)
        throw err;
      else
      {
        res.send("true")
      }
    })
    }
  });


} else {
    res.redirect('/');
  }
})


app.get('/:pro' , (req,res)=>{
  if(req.session.isLogin){
    var id=req.params.pro.toString()

    communitys.findOne({"_id":id},function(err,result)
    {
      if(err)
        throw err;
      else
      {
        console.log(result)
        console.log(result.communityloc)
        res.render('manageCommunity',{data:req.session.data,data2:result})
      }
    })
  } else {
    res.redirect('/');
  }  
})

app.get('/edit/:pro' , (req,res)=>{
  if(req.session.isLogin){
    var id=req.params.pro.toString()

    communitys.findOne({"_id":id},function(err,result)
    {
      if(err)
        throw err;
      else
      {
        console.log(result)
        console.log(result.communityloc)
        res.render('editcommunity',{data:req.session.data,data2:result})
      }
    })
  } else {
    res.redirect('/');
  }  
})

module.exports = app;