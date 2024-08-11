import mongoose, { Schema } from "mongoose";

import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },

})

userSchema.plugin(passportLocalMongoose, { usernameField: "email"});

const USER = mongoose.model("USER", userSchema);

export default USER;



