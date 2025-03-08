const mongoose = require("mongoose");

let studentSchema = mongoose.Schema({

      mentorList :
      [
        {
          type: mongoose.Schema.Types.ObjectId ,
          ref : 'Mentor'
        }
      ]
,
      education :
      [
        {
          institute : String,
          grade: String ,
          qualification: String ,
        }
      ]
      ,
      isDisabled: {
        type : Boolean ,
        default : false 
      }
      
  });
  
  
  let studentModel = User.discriminator("Student", studentSchema);
  module.exports = studentModel;