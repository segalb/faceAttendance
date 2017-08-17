var express = require('express');
var router = express.Router();
var models = require('./models/models');
var User = models.User;
var Professor = models.Professor;
var Classes = models.Classes;
var SubClass = models.SubClass;
let Lectures = models.Lectures;
var request = require('request');

//Manage DB Writes

// router.post('/signup', function(req, res) {
//   var newUser = new User({
//     fname: req.body.fname,
//     lname: req.body.lname,
//     face_tokens: [req.body.face_tokens],
//     image: req.body.image,
//     classes: []
//   });
//   newUser.save(function(err, user) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(user);
//       res.sendStatus(200);
//       // res.redirect('login');
//     }
//   });
//   //TODO: write to face set
// });

//Manage professor write

router.post('/addprofessor', function(req, res) {
  var newProfessor = new Professor({name: req.body.name, classes: req.body.classes});
  newProfessor.save(function(err, user) {
    if (err) {
      console.log(err);
    } else {
      console.log(user);
      res.status(200).json(user);
      // res.redirect('login');
    }
  });
});

router.post('/addClass', function(req, res) {
  var newClasses = new Classes({
    name: req.body.name,
    faceSet: req.body.faceSet,
    term: req.body.term,
    year: req.body.year,
    Students: [],
    lectures: []
  });
  newClasses.save(function(err, classTmp) {
    if (err) {
      console.log(err);
    } else {
      console.log("successful added class", classTmp);
      // If we saved the class add the realtion ship to the professor array
      Professor.findByIdAndUpdate('597b5e12a1537a32985322cc', {
        $push: {
          "classes": classTmp._id
        }
      }, {
        safe: true,
        upsert: true,
        new: true
      }, function(err, professorTmp) {
        if (err) {
          console.log(err);
        } else {
          console.log(professorTmp);
          res.status(200).end();
        }
      });
    }
  });
});

// main login routes

router.get('/login', function(req, res) {
  console.log("login")
  res.render('login');
});


router.post('/signup', function(req, res) {
  let newUser = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    face_tokens: [req.body.face_token],
    image: req.body.image
  });
  newUser.save(function(err, user) {
    if (err) {
      console.log(err);
    } else {
      console.log(user);

      //add face to face++ data set
      request.post({
        url: global.API_URL + 'faceset/addface',
        form: {
          'api_key': global.API_KEY,
          'api_secret': global.API_SECRET,
          'face_tokens': req.body.face_token,
          'outer_id': '1'
        }
      }, function(error, response,body) {
        console.log("Added face to horizones face set");
        console.log('body', body);
        res.sendStatus(200);
      });
      if(req.body.class){
        var user_id = mongoose.Types.ObjectId(user._id);

        Classes.findByIdAndUpdate(req.body.class, {
          $push: {
            "students": user_id
          }
        }, {
          safe: true,
          upsert: true,
          new: true
        }, function(err, classTemp) {
          if (err) {
            console.log(err);
          } else {
            console.log(classTemp);
          }
        });

        //
        Lectures.findByIdAndUpdate(req.body.lecture, {
          $push: {
            "students": {
              student: user_id,
              attendance:1
              }
          }
        }, {
          safe: true,
          upsert: true,
          new: true
        }, function(err, classTemp) {
          if (err) {
            console.log(err);
          } else {
            console.log('succes',classTemp);
          }
        });
      }
    }
  });
});



// router.get('/auth/spotify', passport.authenticate('spotify', {scope: ['user-read-email', 'user-read-private', 'user-modify-playback-state', 'user-read-playback-state'] }));
//
// router.get('/auth/spotify/callback',passport.authenticate('spotify', { failureRedirect: '/login' }),
//   function(req, res) {
//     console.log("HERE");
//   res.redirect('/');
// });

// router.get('/logout',function(req,res){
//   req.logout();
//   res.redirect('/login');
// })
module.exports = router;
