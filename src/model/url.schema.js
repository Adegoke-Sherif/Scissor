// import mongoose, { Schema } from "mongoose";

// const urlSchema = new Schema({
//   originalUrl: {
//     type: String,
//     required: true,
//     validate: {
//       validator: function(v) {
//         return /^(http|https):\/\/[^ "]+$/.test(v);
//       },
//       message: props => `${props.value} is not a valid URL!`
//     },
//     index: true
//   },
//   shortUrl: {
//     type: String,
//     required: true,
//     unique: true,
//     index: true,
//     validate: {
//       validator: function(v) {
//         return /^[a-zA-Z0-9\-_.]+$/.test(v); 
//       },
//       message: props => `${props.value} is not a valid short URL!`
//     }
//   },
//   customDomain: {
//     type: String,
//     required: false,
//     default: "http://localhost:127.0.0.1",
//     validate: {
//       validator: function(v) {
//         return /^[a-zA-Z0-9\-_.]+$/.test(v); // Validate custom domain format
//       },
//       message: props => `${props.value} is not a valid domain!`
//     }
//   },
//   customPath: {
//     type: String,
//     required: false,
//     unique: true,
//     sparse: true, //t
//     validate: {
//       validator: function(v) {
//         return /^[a-zA-Z0-9\-_.]+$/.test(v);
//       },
//       message: props => `${props.value} contains invalid characters!`
//     }
//   },
//   qrCodeUrl: {
//     type: String,
//   },
//   user: {   
//     type: Schema.Types.ObjectId,
//     ref: 'User',
//     required: false,
//     index: true
//   },
//   clickCount: {
//     type: Number,
//     default: 0,
//   },
//   clickDetails: [
//     {
//       ipAddress: String,
//       userAgent: String,
//       country: String,
//       city: String,
//       timestamp: { type: Date, default: Date.now }
//     }
//   ],
// }, { timestamps: true });

// const URL = mongoose.model("URL", urlSchema);

// export default URL;


import mongoose, { Schema } from "mongoose";

// Regex for validating a domain, including local domains and IP addresses
const domainPattern = /^(https?:\/\/)([a-zA-Z0-9-_\.]+(:[0-9]+)?|localhost|127\.0\.0\.1)(:[0-9]+)?$/;

const urlSchema = new Schema({
  originalUrl: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^(http|https):\/\/[^ "]+$/.test(v);
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
        return /^[a-zA-Z0-9\-_.]+$/.test(v); // Adjust regex based on your short URL format
      },
      message: props => `${props.value} is not a valid short URL!`
    }
  },
  customDomain: {
    type: String,
    required: false,
    default: "localhost", // Default to local domain if not provided
    validate: {
      validator: function(v) {
        return domainPattern.test(v); // Validate domain names, IP addresses, and local domains
      },
      message: props => `${props.value} is not a valid domain!`
    }
  },
  customPath: {
    type: String,
    required: false,
    unique: true,
    sparse: true,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9\-_.]+$/.test(v); // Ensure no special characters other than hyphen, underscore, and period
      },
      message: props => `${props.value} contains invalid characters!`
    }
  },
  qrCodeUrl: {
    type: String,
  },
  user: {   
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false,
    index: true
  },
  clickCount: {
    type: Number,
    default: 0,
  },
  clickDetails: [
    {
      ipAddress: String,
      userAgent: String,
      country: String,
      city: String,
      timestamp: { type: Date, default: Date.now }
    }
  ],
}, { timestamps: true });

const URL = mongoose.model("URL", urlSchema);

export default URL;
