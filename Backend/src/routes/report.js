const express=require('express');
const router=express.Router();
const User=require('../../models/User.js');
const jwt = require('../middleware/authjwt.js');
const Report = require('../../models/report.js');

router.post('/reportUser', jwt, async (req, res) => {
    reporterId = req.user.id ;
    reportedId = req.body.reportedId;
    reportType = req.body.reportType;
    description = req.body.description;

    const newReport = new Report({
      reporter: reporterId,
      reported: reportedId,
      reportType,
      description
    });

    await newReport.save();

    res.status(201).json({ message: 'Report submitted successfully.' });

})

module.exports=router;