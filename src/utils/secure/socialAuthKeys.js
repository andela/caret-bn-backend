import dotenv from 'dotenv';

dotenv.config();

const baseUrl = `${process.env.APPLICATION_HOST}:${process.env.APPLICATION_PORT}`;
const socialAuthKeys = {
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackUrl: `${baseUrl}/api/v1/auth/google/callback`
  },

  facebook: {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackUrl: `${baseUrl}/api/v1/auth/facebook/callback/`
  }
};

export default socialAuthKeys;
