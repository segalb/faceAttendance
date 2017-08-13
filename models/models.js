const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let studentSchema = new Schema({
  // _id: Number,
  fname: String,
  lname: String,
  face_tokens: [String],
  image: String, // TODO: represent the person  ( will need to use s3 ==> use the image that you sign in as face token)
  classes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Classes'
    }
  ]
});

let professorSchema = Schema({
  // _id: Number,
  name: String,
  classes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Classes'
    }
  ]
});

let classesSchema = Schema({
  name: String,
  faceSet: Number,
  term: String,
  year: String,
  Students: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Student'
    }
  ],
  lectures: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Lectures'
    }
  ]
});

let lecturesSchema = Schema({
  // _id: Number,
  lecture: {
    type: Schema.Types.ObjectId,
    ref: 'lectures'
  },
  Students: [
    {
      student: {
        type: Schema.Types.ObjectId,
        ref: 'Student'
      },
      attendance: Number
    }
  ],
  date: Date
});

studentSchema.statics.findOrCreate = function(obj1, obj2, cb) {
  Student.findOne(obj1, function(err, user) {
    console.log(err, user);
    if (err)
      console.log(err);
    else if (user) {
      cb(err, user);
    } else {
      let newUser = new Student({spotifyId: obj1.spotifyId, refreshToken: obj2.refreshToken, image: obj2.image, username: obj2.username})
      newUser.save(function(err, user) {
        cb(err, user);
      });
    }
  });
};

const Professor = mongoose.model("Professor", professorSchema);
const Classes = mongoose.model("Classes", classesSchema);
const Lectures = mongoose.model('Lectures', lecturesSchema);
const Student = mongoose.model('Student', studentSchema);

module.exports = {
  User: Student,
  Professor: Professor,
  Classes: Classes,
  Lectures: Lectures
};
