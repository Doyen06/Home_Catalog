const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Home     = require('../models/user-model');

const userSchema = new Schema({
  firstName:      String,
  lastName:       String,
  email:          String,
  homeName:       String,
  primaryAddress: String,
  password:       String,
  home:           {type: String, ref:'Home'}
},
{
  timestamps:     { createdAt: "created_at",
                    updatedAt: "updated_at" }
                  });

const User = mongoose.model("User", userSchema);

module.exports = User;
