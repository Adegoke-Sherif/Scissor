import mongoose, { Schema } from "mongoose";
import validator from "validator";

const urlSchema = new Schema({
  originalUrl: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return validator.isURL(v);
      },
      message: props => `${props.value} is not a valid URL!`
    },
    index: true
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
    index: true,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9\-_.]+$/.test(v); 
      },
      message: props => `${props.value} is not a valid short URL!`
    }
  },
  customUrl: {
    type: String,
    required: false,
    default: "defaultdomain.com",
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9\-_.]+$/.test(v); // Validate custom domain format
      },
      message: props => `${props.value} is not a valid domain!`
    }
  },

  qrCodeUrl: {
    type: String,
    required: false,
    validate: {
      validator: function(v) {
        return !v || validator.isURL(v);
      },
      message: props => `${props.value} is not a valid QR code URL!`
    }
  },
  createdBy: {   
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
    index: true
  },
  clickCount: {
    type: Number,
    default: 0,
  },
  analytics: [
    {
      ipAddress: String,
      userAgent: String,
      country: String,
      city: String,
      timestamp: { type: Date, default: Date.now }
    }
  ],
}, { timestamps: true });

const Url = mongoose.model("Url", urlSchema);

export default Url;
