import 'regenerator-runtime';
import passport from 'passport';
import GoogleOAuth from 'passport-google-oauth';
import FacebookStrategy from 'passport-facebook';
import utilities from '../../utils/index';
import services from '../../services/userServices';

async function getUser(query, done, scope = null) {
  done(null, await services.findOrCreate(query, scope));
}
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

const GoogleStrategy = GoogleOAuth.OAuth2Strategy;

passport.use(new GoogleStrategy(
  utilities.strategy(
    utilities.keys.google.clientID,
    utilities.keys.google.clientSecret,
    utilities.keys.google.callbackUrl
  ),
  (
    (request, accessToken, refreshToken, profile, done) => {
      getUser(
        utilities.strategyQueries.GoogleStrategyQuery(profile),
        done,
        utilities.queryScopes.users.responseScope
      );
    }
  )
));

passport.use(new FacebookStrategy(
  utilities.strategy(
    utilities.keys.facebook.clientID,
    utilities.keys.facebook.clientSecret,
    utilities.keys.facebook.callbackUrl
  ),
  (
    (request, accessToken, refreshToken, profile, done) => {
      getUser(
        utilities.strategyQueries.FacebookStrategyQuery(profile),
        done,
        utilities.queryScopes.users.responseScope
      );
    }
  )
));
