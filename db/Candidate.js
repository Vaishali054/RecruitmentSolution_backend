const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  experience: {
    type: Number
  },
  skills: {
    type: [String]
  },
  
});
module.exports=mongoose.model("candidates",candidateSchema)

