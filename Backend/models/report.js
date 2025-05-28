const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    reporter : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'user' ,
    },
    reported : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'user'
    } ,
    reportType: {
    type: String,
    enum: ['Misconduct', 'Inappropriate Language', 'Absence', 'Harassment', 'Other'],
    required: true
  },
    description : {
        type: String,
        required: true
    },
    });
  
  const report = mongoose.model("report", reportSchema);
  module.exports = report;
  