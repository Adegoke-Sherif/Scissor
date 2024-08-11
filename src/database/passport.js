import passport from "passport";
import LocalStrategy from "passport-local"
import USER from "../model/user.schema.js"

passport.use(new LocalStrategy(USER.authenticate()))
passport.serializeUser(USER.serializeUser())
passport.deserializeUser(USER.deserializeUser())


export default passport;

