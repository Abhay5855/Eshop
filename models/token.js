const moongoose = require("mongoose");
const { ObjectId } = moongoose.Schema;
const {Schema} = moongoose;


const tokenSchema = new Schema({

     token : {

           type : String,
           required : true,
     },

     userId : {

          ref : "User",
          type : ObjectId,
          required : true,
     },
      
     createdAt : {

        type : Date,
        default : Date.now(),
        expires : 3600,
     }

}, {timestamps : true});


module.exports = moongoose.model("Token" , tokenSchema);