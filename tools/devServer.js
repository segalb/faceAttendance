const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('../webpack.config.dev');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const gm = require('gm').subClass({imageMagick: true})
var mongoose = require('mongoose');

var MjpegCamera = require('mjpeg-camera');
var FileOnWrite = require('file-on-write');
var cameraRun = false;
// var fs = require('fs');

//  Create an MjpegCamera instance
var camera = new MjpegCamera({url: 'http://10.2.108.239:8081/video', motion: false});


var connect = process.env.MONGODB_URI;

global.API_URL = 'https://api-us.faceplusplus.com/facepp/v3/';
global.API_KEY = 'IvsaIHnBvfx8sdLPqFM8AhG0DNioM38H';
global.API_SECRET = 'kaASBGw6DS94MZgFmzSZ87weSQDyi-kC';
global.API_KEY_FACESET_OUTRERID = '1';
var x = 0;
let startImgAnalysis = false;
let currentSubClassID = '';
let currentFrame;
let facesArr = [];
mongoose.connect(connect);
mongoose.Promise = global.Promise;

var users = require('../users.js');

//db
var models = require('../models/models');
let User = models.User;
let Professor = models.Professor;
let Classes = models.Classes;
let Lectures = models.Lectures;

const app = express();
const compiler = webpack(config);

const host = 'http://localhost';
const port = process.env.npm_config_port
  ? process.env.npm_config_port
  : 3000;

var server = require('http').Server(app);
var io = require('socket.io')(server); //require(fileName)(server)

/*

module.exports = function(server) {
  var io = require('socket.io')(server);

  io.connect {

  ... socket handlers
  }
}

*/

var request = require('request');
var rtsp = require('rtsp-ffmpeg')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));
app.use('/', users); //use Users to manage DB


app.post('/startAnalysis', (req, res) => {
  console.log("form is working", req.body);
  startImgAnalysis = true; //scalability use redis - true false redis with camera id
  //TODO: add set time out for starting time analysis
  Classes.findById(req.body.class, function(err, classTmp) {
    if (!classTmp) {
      console.log("class not found");
      return;
    } else {
      console.log("this is class info", classTmp);
      console.log("classTmp students", classTmp.students)
      let tmpArr = classTmp.students.map((item) => {
        return {
          student: item,
          attendance:0
          }
      })
      console.log("tmp array is ", tmpArr);
      API_KEY_FACESET_OUTRERID = classTmp.faceSet; // assign new faceSet group to search within
      var newLecture = new Lectures({ students: tmpArr, date: req.body.date,name: req.body.name});
      newLecture.save(function(err, lectureTmp) {
        if (err) {
          console.log(err);
        } else {
          console.log(lectureTmp);
          currentSubClassID = lectureTmp._id; //cahnge for saclability send for local storage

          //push to class the specific lecture

          Classes.findByIdAndUpdate(classTmp._id, {
            $push: {
              "lectures": lectureTmp._id
            }
          }, {
            safe: true,
            upsert: true,
            new: true
          }, function(err, lectureTmp) {
            if (err) {
              console.log(err);
            } else {
              console.log(lectureTmp);
            }
          });

          //
          res.send({currentLecture:lectureTmp._id,studentNum:lectureTmp.students.length});
        }
      });
    }
  });
});


//api calls for info population Think of moving to routes.js
app.post('/classInfo/', function(req, res) {
  Professor.findById(req.body.id).populate('classes').exec((function(err, tmpClass) {
    res.status(200).json(tmpClass.classes);
  }));
});

app.post('/classLecture', function(req, res) {
  console.log(req.body.id);
  Classes.findById(req.body.id).populate('lectures').exec(function(err, lecture) {
    if (err) {
      console.log(err)
    }
    console.log("lecture is",lecture);
    Lectures.populate(lecture.lectures, {
      path: 'students.student',
      model: 'Student'
    }, function(err, result) {
      if (err) {
        console.log("there was seconed error", err);
      }
      res.status(200).json(result);
    });
    //console.log('lecture is ', lecture.lectures);
  });
});

//////
function gmToBuffer(data) {
  return new Promise((resolve, reject) => {
    data.stream((err, stdout, stderr) => {
      if (err) {
        return reject(err)
      }
      const chunks = []
      stdout.on('data', (chunk) => {
        chunks.push(chunk)
      })
      // these are 'once' because they can and do fire multiple times for multiple errors,
      // but this is a promise so you'll have to deal with them one at a time
      stdout.once('end', () => {
        resolve(Buffer.concat(chunks))
      })
      stderr.once('data', (data) => {
        reject(String(data))
      })
    })
  })
}

io.on('connection', socket => {
  console.log("here");
  if(cameraRun){
    camera.stop();
  }

  socket.on('test', data => {
    console.log(data.my);
    socket.emit('gottest', {my: "benjamin"});
  });

  socket.on('startAnalysis', data => {
    console.log("start Analysis");

    var faceSet = false;



    // var MjpegCamera = require('mjpeg-camera');
    // var FileOnWrite = require('file-on-write');
    // var fs = require('fs');

    // Create an MjpegCamera instance
    // var camera = new MjpegCamera({url: 'rtsp://admin:b12345678@10.2.107.121:80/cam/realmonitor?channel=1&subtype=0', motion: false});

    // camera.getScreenshot(function(err, frame) {
    //
    // });
    //think of keeling the name space and use only the camera base on the specific socket
  });

//**************
              // var cams = ['rtsp://admin:b12345678@10.2.107.121:80/cam/realmonitor?channel=1&subtype=0'].map(function(uri, i) {
              //   var stream = new rtsp.FFMpeg({input: uri, resolution: '640x480', quality: 3, rate: 25});
              //   stream.on('start', function() {
              //     console.log('stream ' + i + ' started');
              //   });
              //   stream.on('stop', function() {
              //     console.log('stream ' + i + ' stopped');
              //   });
              //   return stream;
              // });
//*****************


  // cams.forEach(function(camStream, i) {
    // var ns = io.of('/cam' + i);
    // ns.on('connection', function(wsocket) {
      // console.log('connected to /cam' + i);
      // var pipeStream = function(data) {
      //   wsocket.emit('data', data);

      // Create a writable stream to generate files
var fileWriter = new FileOnWrite({
  path: './frames',
  ext: '.jpeg',
  filename: function(frame) {
    return frame.name + '-' + frame.time;
  },
  transform: function(frame) {
    // console.log(frame)
    let data = frame.data;
      // socket.emit('data', data);

      //TODO: call to server all of this in a diffrent function

      // var d = gm(data, "data.jpg").resize('640', '480')
      // gmToBuffer(d).then(function(buffer) {
      //   //console.log(buffer);
      //   wsocket.emit('data', buffer);
      //
      // })

      currentFrame = data;

      var base64data = new Buffer(data).toString('base64');

      //  console.log("base64data", base64data)
      // check for face in face set
      x++;
      if (x % 5 === 0 && startImgAnalysis) {
        // if (startImgAnalysis) {
        // console.log(x);
        request.post({
          url: API_URL + 'detect',
          form: {
            'api_key': API_KEY,
            'api_secret': API_SECRET,
            'return_landmark': "1",
            'image_base64': base64data
          }
        }, function(error, response, body) {
          console.log("got return");
          facesArr = [];
          // socket.emit('drawData', {
          //   image: base64data,
          //   body: body
          // });

          var tmp = JSON.parse(body);
          console.log(tmp.faces);

          if (tmp.faces) {

            tmp.faces.forEach((item, i) => {
              facesArr.push({
                x0: item.face_rectangle.left,
                y0: item.face_rectangle.top,
                x1: (item.face_rectangle.left + item.face_rectangle.width),
                y1: (item.face_rectangle.top + item.face_rectangle.height)
              });
            });
            tmp.faces.forEach((item, i) => {

              console.log(item.face_token);
              request.post({
                url: API_URL + 'search',
                form: {
                  'api_key': API_KEY,
                  'api_secret': API_SECRET,
                  'face_token': item.face_token,
                  'outer_id': API_KEY_FACESET_OUTRERID,
                  'return_result_count': '1'
                }
              }, function(error, response, body) {
                console.log("***************************");
                console.log("face searched");
                console.log("The face token is " + item.face_token)
                console.log('body', body);
                if (JSON.parse(body).results) {
                  JSON.parse(body).results.forEach((itemTmp,index) => {
                    console.log("face token is ", itemTmp.face_token);
                    console.log("confidence is ", itemTmp.confidence);
                    if (itemTmp.confidence > 77) { //TODO: global number change to prototyp  __Ty_P_
                      User.find({
                        "face_tokens": itemTmp.face_token
                      }, function(err, findTmp) {
                        if (findTmp.length < 1) {
                          console.log("**************check this case some thing wrong there is a face in face set but not in db ******************")
                        } else {
                          console.log("find the student with the specific face token", findTmp)
                          socket.emit('RegisteredFace', {person: findTmp});

                          if(index === 0){

                            Lectures.findById(currentSubClassID, function(err,lecture){
                              if(err){
                                console.log(err);
                              }else{
                                console.log(lecture);
                                console.log("im here")
                                lecture.students.forEach((item)=>{
                                  console.log("checking",item.student.toString());
                                  console.log(findTmp[0]._id.toString());
                                  if(item.student.toString() === findTmp[0]._id.toString()){
                                    console.log("i found Benjamin change in db");
                                    item.attendance= 1;
                                  }
                                });
                                lecture.markModified('array');
                              lecture.save();
                              }
                            });
                          }

                        }
                      });
                    } else { //confidence is less then 80% new user
                      console.log("confidence is less then 80% !!!!!!!!!!!!");
                      console.log("user is not in db add him to non users", item.face_token);
                      //TODO: add the avatar thing by croping the image to the specific size

                      console.log(currentFrame);
                      console.log("faces array is", facesArr);

                      console.log(currentFrame);
                      console.log("faces array is", facesArr);
                      currentFrame = gm(data, 'image.jpg');
                      facesArr.forEach((item, i) => {
                        currentFrame.fill("none").stroke("blue", 7).drawRectangle(item.x0, item.y0, item.x1, item.y1)
                        //     console.log(buffer);
                        //     currentFrame = buffer;
                        //     // var base64Suare = new Buffer(buffer).toString('base64');
                        if (i === tmp.faces.length - 1) {
                          currentFrame = currentFrame.resize(768, 432);
                          gmToBuffer(currentFrame).then(function(buffer) {
                            console.log("i, faces", i, tmp.faces.length);
                            var base64Suare1 = buffer.toString('base64');
                            socket.emit('dataFace', base64Suare1);
                          });
                        }
                      });

                      //super important small faces
                      gm(data, 'image.jpg').crop((item.face_rectangle.width + 250), (item.face_rectangle.height + 250), (item.face_rectangle.left - 150), (item.face_rectangle.top - 200)).resize('150', '150').toBuffer('jpg', function(err, buffer) {

                        var base64FaceSquare = buffer.toString('base64');
                        socket.emit('unRegisteredFace', {
                          face_token: item.face_token,
                          faceAvatar: base64FaceSquare
                        });

                      });
                    }
                  });
                }

              });

            });

          } else { //check for errors
            if (tmp.error_message === "CONCURRENCY_LIMIT_EXCEEDED") {

              console.log("Too many Api calls", tmp.error_message);
            } else {
              console.log("issue with buffer");
              // //super important log error image
              // var fs = require('fs');
              // // console.log(base64data)
              // fs.writeFile('./camera/frames/camera-screenshot_' + Date.now() + '.jpg', data);
              // // console.log("no faces");
              // fs.writeFile('./camera/frames/camera-screenshot_' + Date.now() + '.txt', body);
            }

          }
        });
      }

    // camStream.on('data', pipeStream);
    return frame.data;
  }
});

camera.pipe(fileWriter);


       camera.start();
       cameraRun=true;


      // camera.onFrame(function(err,data){
      //   console.log(data);
      // })


      // camera.getScreenshot(function(err, data) {
      //   console.log(data);
      //   socket.emit('data', data);
      //
      //   //TODO: call to server all of this in a diffrent function
      //
      //   // var d = gm(data, "data.jpg").resize('640', '480')
      //   // gmToBuffer(d).then(function(buffer) {
      //   //   //console.log(buffer);
      //   //   wsocket.emit('data', buffer);
      //   //
      //   // })
      //
      //   currentFrame = data;
      //
      //   var base64data = new Buffer(data).toString('base64');
      //
      //   //  console.log("base64data", base64data)
      //   // check for face in face set
      //   x++;
      //   if (x % 30 === 0 && startImgAnalysis) {
      //     // if (startImgAnalysis) {
      //     // console.log(x);
      //     request.post({
      //       url: API_URL + 'detect',
      //       form: {
      //         'api_key': API_KEY,
      //         'api_secret': API_SECRET,
      //         'return_landmark': "1",
      //         'image_base64': base64data
      //       }
      //     }, function(error, response, body) {
      //       console.log("got return");
      //       facesArr = [];
      //       // socket.emit('drawData', {
      //       //   image: base64data,
      //       //   body: body
      //       // });
      //
      //       var tmp = JSON.parse(body);
      //       console.log(tmp.faces);
      //
      //       if (tmp.faces) {
      //
      //         tmp.faces.forEach((item, i) => {
      //           facesArr.push({
      //             x0: item.face_rectangle.left,
      //             y0: item.face_rectangle.top,
      //             x1: (item.face_rectangle.left + item.face_rectangle.width),
      //             y1: (item.face_rectangle.top + item.face_rectangle.height)
      //           });
      //         });
      //         tmp.faces.forEach((item, i) => {
      //
      //           console.log(item.face_token);
      //           request.post({
      //             url: API_URL + 'search',
      //             form: {
      //               'api_key': API_KEY,
      //               'api_secret': API_SECRET,
      //               'face_token': item.face_token,
      //               'outer_id': API_KEY_FACESET_OUTRERID,
      //               'return_result_count': '1'
      //             }
      //           }, function(error, response, body) {
      //             console.log("***************************");
      //             console.log("face searched");
      //             console.log("The face token is " + item.face_token)
      //             console.log('body', body);
      //             if (JSON.parse(body).results) {
      //               JSON.parse(body).results.forEach((itemTmp,index) => {
      //                 console.log("face token is ", itemTmp.face_token);
      //                 console.log("confidence is ", itemTmp.confidence);
      //                 if (itemTmp.confidence > 80) { //TODO: global number change to prototyp  __Ty_P_
      //                   User.find({
      //                     "face_tokens": itemTmp.face_token
      //                   }, function(err, findTmp) {
      //                     if (findTmp.length < 1) {
      //                       console.log("**************check this case some thing wrong there is a face in face set but not in db ******************")
      //                     } else {
      //                       console.log("find the student with the specific face token", findTmp)
      //                       socket.emit('RegisteredFace', {person: findTmp});
      //
      //                       if(index === 0){
      //
      //                         Lectures.findById(currentSubClassID, function(err,lecture){
      //                           if(err){
      //                             console.log(err);
      //                           }else{
      //                             console.log(lecture);
      //                             console.log("im here")
      //                             lecture.students.forEach((item)=>{
      //                               if(item.student.toString() === findTmp[0]._id.toString()){
      //                                 console.log("i found Benjamin change in db");
      //                                 item.attendance= 1;
      //                               }
      //                             });
      //                             lecture.markModified('array');
      //                           lecture.save();
      //                           }
      //                         });
      //                       }
      //
      //                     }
      //                   });
      //                 } else { //confidence is less then 80% new user
      //                   console.log("confidence is less then 80% !!!!!!!!!!!!");
      //                   console.log("user is not in db add him to non users", item.face_token);
      //                   //TODO: add the avatar thing by croping the image to the specific size
      //
      //                   console.log(currentFrame);
      //                   console.log("faces array is", facesArr);
      //
      //                   console.log(currentFrame);
      //                   console.log("faces array is", facesArr);
      //                   currentFrame = gm(data, 'image.jpg');
      //                   facesArr.forEach((item, i) => {
      //                     currentFrame.fill("none").stroke("blue", 7).drawRectangle(item.x0, item.y0, item.x1, item.y1)
      //                     //     console.log(buffer);
      //                     //     currentFrame = buffer;
      //                     //     // var base64Suare = new Buffer(buffer).toString('base64');
      //                     if (i === tmp.faces.length - 1) {
      //                       currentFrame = currentFrame.resize(768, 432);
      //                       gmToBuffer(currentFrame).then(function(buffer) {
      //                         console.log("i, faces", i, tmp.faces.length);
      //                         var base64Suare1 = buffer.toString('base64');
      //                         socket.emit('dataFace', base64Suare1);
      //                       });
      //                     }
      //                   });
      //
      //                   //super important small faces
      //                   gm(data, 'image.jpg').crop((item.face_rectangle.width + 250), (item.face_rectangle.height + 250), (item.face_rectangle.left - 150), (item.face_rectangle.top - 200)).resize('150', '150').toBuffer('jpg', function(err, buffer) {
      //
      //                     var base64FaceSquare = buffer.toString('base64');
      //                     socket.emit('unRegisteredFace', {
      //                       face_token: item.face_token,
      //                       faceAvatar: base64FaceSquare
      //                     });
      //
      //                   });
      //                 }
      //               });
      //             }
      //
      //           });
      //
      //         });
      //
      //       } else { //check for errors
      //         if (tmp.error_message === "CONCURRENCY_LIMIT_EXCEEDED") {
      //
      //           console.log("Too many Api calls", tmp.error_message);
      //         } else {
      //           console.log("issue with buffer");
      //           // //super important log error image
      //           // var fs = require('fs');
      //           // // console.log(base64data)
      //           // fs.writeFile('./camera/frames/camera-screenshot_' + Date.now() + '.jpg', data);
      //           // // console.log("no faces");
      //           // fs.writeFile('./camera/frames/camera-screenshot_' + Date.now() + '.txt', body);
      //         }
      //
      //       }
      //     });
      //   }
      // });
      // camStream.on('data', pipeStream);

      // wsocket.on('disconnect', function() {
      //   console.log('disconnected from /cam' + i);
      //   ns.removeAllListeners(); //ask jay if this the best way to do that -  https://stackoverflow.com/questions/26400595/socket-io-how-do-i-remove-a-namespace
      //   //think of adding the socket on disconnect
      //   console.log('I removed all listeners');
      //   camStream.removeListener('data', pipeStream);
      // });
    // });


  // });

  //

  socket.on('disconnect', () => {
    console.log("Client disconnect");
    camera.stop();
    cameraRun =false;
  });

});

server.listen(port, 'localhost', (err) => {
  if (err) {
    console.log("err", err)
  }
  console.log("lisen on port ", port);
});
