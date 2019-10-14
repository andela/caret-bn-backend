import dotenv from 'dotenv';

dotenv.config();

const baseUrl = `${process.env.APPLICATION_HOST}:${process.env.APPLICATION_PORT}`;

<<<<<<< HEAD
=======

>>>>>>> 40b062c5083669c4634ae34b9d1bdb69765b8240
const socialAuthKeys = {
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackUrl: `${baseUrl}/api/v1/auth/google/callback/`
  },

  facebook: {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackUrl: `${baseUrl}/api/v1/auth/facebook/callback/`
  }
};

export default socialAuthKeys;
