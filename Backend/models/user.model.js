const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
    username: {
        type : String ,
        required: true ,
        unique : true ,
        minlength : 3 ,
      } ,

      name : String,
      profilePictureUrl : String  ,

      password: {
        type : String,
        required : true 
      } ,

      description: String ,

      currentRole: {
        type: Schema.Types.ObjectId,
        refPath: 'roleType'  // Dynamically use the roleType to populate the correct model
      },

      roleType: {
        type: String,
        required: true,
        default : "Student" ,
        enum: ['Mentor', 'Student' , 'Admin']
      }
      ,

      previousRole:{
        type: Schema.Types.ObjectId,
        refPath: 'roleType'
      }

    
  });
  
  
  let userModel = mongoose.model("User", userSchema);
  module.exports = userModel;