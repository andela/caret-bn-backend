import 'regenerator-runtime';
import passport from 'passport';
import GooglePlusTokenStrategy from 'passport-google-plus-token';
import FacebookTokenStrategy from 'passport-facebook-token';
import utilities from '../../utils/index';
import services from '../../services/userServices';

<<<<<<< HEAD
=======

>>>>>>> 40b062c5083669c4634ae34b9d1bdb69765b8240
passport.serializeUser((user, done) => {
  done(null, user.id);
});

<<<<<<< HEAD
passport.deserializeUser(async (id, done) => {
  const selector = { where: { id } };
  done(null, await services.findOne(selector));
});

=======
>>>>>>> 40b062c5083669c4634ae34b9d1bdb69765b8240
async function getUser(query, done, scope = null) {
  done(null, await services.findOrCreate(query, scope));
}


passport.use(new GooglePlusTokenStrategy(
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

passport.use(new FacebookTokenStrategy(
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
