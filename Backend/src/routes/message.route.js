const express=require('express');
const router=express.Router();
const Mentor=require('../../models/message.js');
const User=require('../../models/User.js');
const Message=require('../../models/message.js');
//To display users on sidebar or in popup tab of chatting section
router.get('/getUsersForSidebar',async(req,res)=>{

    try{
        console.log("REQ.AUTH:", req.auth);
        const auth0Id = req.auth.payload.sub; //Getting auth0Id from token payload (logged inUser)
        console.log("Auth0 ID from token:", auth0Id);
        
        const loggedInUser = await User.findOne({ auth0Id: auth0Id }); //Using that id to get the user which is logged in
        console.log("LOGGED IN USER :",loggedInUser);

        const filteredUsers= await User.find({_id:{$ne:loggedInUser._id},role: { $ne: loggedInUser.role } //finding all other users except the loggedIn 1 to display list
        });//use .select("-password") to dont get fields which you dont want 
        
        res.status(200).json(filteredUsers);
    }
    catch(err){
        res.status(500).json({ message: err.message });

    }
})

//To load Chat with a User
router.get('/:auth0Id', async (req, res) => {
    try {
      const { auth0Id: userToChatAuth0Id } = req.params; //get id of the user you want to chat with
      const myAuth0Id = req.auth.payload.sub; //Your id (Getting from Token payload)
  
      // Get MongoDB IDs
      const myUser = await User.findOne({ auth0Id: myAuth0Id });   //Getting Your info from User model
      const userToChat = await User.findOne({ auth0Id: userToChatAuth0Id }); //Getting Info of user you want to Chat with 
      console.log("myUser:",myUser);
      console.log("userToChat",userToChat);
      if (!myUser || !userToChat) {
        return res.status(404).json({ error: "User not found" });
      }
    const messages = await Message.find({
        $or: [
          { sender: myUser._id, reciever: userToChat._id },
          { sender: userToChat._id, reciever: myUser._id }
        ]
      })
      .populate('sender', 'auth0Id name picture role') // Joins auth0Id,name,picture and role to sender and basically mmakes a sender obj
      .sort({ timestamp: 1 });                         // which now just instead of authId contains these fields
  
      res.status(200).json(messages);
    } catch (err) {
      console.log("Error in getting messages against id", err.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });


  

  router.post('/send/:auth0Id', async (req, res) => {
    try {
      const { content } = req.body;
      const recieverAuth0Id = req.params.auth0Id; //id to send to
      const senderAuth0Id = req.auth.payload.sub; //my id
      
        console.log("receiever : ",recieverAuth0Id);
        console.log("sender : ",senderAuth0Id)

      //to get object id of sender and reciever
      const reciever = await User.findOne({ auth0Id: recieverAuth0Id });

      const sender = await User.findOne({ auth0Id: senderAuth0Id });
      console.log(reciever);
      console.log(sender);

  
      if (!sender || !reciever) {
        return res.status(404).json({ error: "Sender or Receiver not found" });
        
      }
      
       // let imageUrl;
        // if (image){
        //     //if image code to upload it to cloudinary;
        // }

      const newMessage = new Message({ //New Message
        sender: sender._id,
        reciever: reciever._id,
        content: content,
        //image:imageUrl,
      });
  
      await newMessage.save(); //Saving Message in database
       //Realtime functionality using socket.io;
        //
        //
  
      res.status(200).json(newMessage);
    } catch (err) {
      console.log("Error in Sending message Route", err.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });

module.exports=router;