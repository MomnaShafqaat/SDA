const mongoose = require("mongoose");

let mentorSchema = mongoose.Schema({
  
      isVerified: {
        type: Boolean ,
        default: false 
      } ,

      skills: [String]
      ,

      pendingRequests: [
        {
            type: mongoose.Schema.Types.ObjectId ,
            ref : 'Student' 
        }
      ],

      menteeList :
      [
        {
          type: mongoose.Schema.Types.ObjectId ,
          ref : 'Student' 
        }
      ]
,
      qualification :
      [
        {
          institute : String,
          grade: String ,
          cv : String 
        }
      ]

      ,
      reviews:[{
        review: String ,
        reviewer: {
          type : mongoose.Schema.Types.ObjectId , //for admin to keep records and remove or report students leaving abusive remarks
          ref : 'Student'
        }
      }]
      ,
      isDisabled:{
        type: Boolean ,
        default : false 
      }

      ,
      ratings : {
        count : Number ,
        average : Number ,
        rating :{
          type : Number ,
          min: 0,
          max: 5,
          default: 0
        }
        
      }

    
  });
  
  
  let mentorModel = User.discriminator("Mentor", mentorSchema);

  module.exports = mentorModel;