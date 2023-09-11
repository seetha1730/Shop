const { Schema, model } = require('mongoose');
 
const userSchema = new Schema(
  {
   
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    firstName: {
      type: String,
      trim: true,
      required: [true, 'firstname is required.']
      
    },
    lastName: {
      type: String,
      trim: true,
      required: false
      
    },
    gender: { 
      type: String ,
      required: [true, 'gender is required.'],
     
    },
    country:{
      type: String,
      required: [true, 'country is required.'],
     },
     terms:{
      type: String,
      required: [true, 'terms is required.'],
     },
     newsletter:{
      type: String,
     }


  },
  {
    timestamps: true
  }
);
 
module.exports = model('User', userSchema);