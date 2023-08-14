---
title: REST API Authentication on Node JS and Express JS, Using Passport JS and JWTs
description: A guide to REST API authentication using Passport JS and JWTs on a Node JS server built with Express JS
image: '/node-auth-cover.png'
date: '2021-10-20'
head:
  meta:
    - name: 'keywords'
      content: 'REST API, authentication, node js, express js, passport js, jwt, sequelize'
    - name: 'author'
      content: 'Umar Adejoh'
    - name: 'copyright'
      content: '© 2023 Umar Adejoh'
    - name: 'title'
      content: 'REST API Authentication on Node JS and Express JS, Using Passport JS and JWTs'
---

# REST API Authentication on Node JS and Express JS, Using Passport JS and JWTs

![jwt key to node/express server](/node-auth-cover.png)

I have been asked this question a fair few times, and so decided to put down my knowledge somewhere, to allow me point people towards it in the future, rather than having to repeat myself again and again. That's not very "DRY"... haha.

The question to which I am referring is "How do I handle authentication on my REST API from my Single Page Application front-end?"

I am going to describe here a simple method that makes use of eight(8) REST endpoints and a pair of JWTs, one an "access token" and another, a "refresh token". My description and code samples are as general as possible, so the base concepts are applicable wherever JWTs are usable. However, the exact technologies I have used are listed below:
+ Node JS
+ Express JS
+ PostgreSQL
+ Sequelize
+ Bcrypt JS
+ Jsonwebtoken
+ Passport JS
+ Express Cookie Parser

The code for this is available in open source repositories on my Github at:
- [ Typescript Version](https://github.com/stradox4u/node-typescript-auth-starter).
- [ Javascript Version](https://github.com/stradox4u/node-js-auth)

# Table of Contents
+ [App.js Setup](#app.js-setup)
+ [Utilities Setup](#utilities-setup)
  + [Passport Setup](#passport-setup)
  + [Sequelize Setup](#sequelize-setup)
+ [User Registration](#user-registration)
+ [User Login](#user-login)
+ [Email Verification](#email-verification)
+ [Resend Verification Email](#resend-verification-email)
+ [Request Password Reset](#request-password-reset)
+ [Update Password](#update-password)
+ [User Logout](#user-logout)
+ [Tokens Refresh](#tokens-refresh)

## App.js Setup
[*Back to Contents*](#table-of-contents)

To start, we would initialize an empty Node JS project with Express JS. We would then initialize our database connection, and the necessary middlewares and routes in our entry file, usually *app.js* as below:

```js
const express = require('express')
const sequelize = require(./utils/database)
const cookieParser = require('cookie-parser')
const passport = require('./utils/passport')
const regRoute = require('./routes/signupRoute')
const authRoutes = require('./routes/authRoutes')

const port = process.env.PORT
const routePrefix = '/api/v1'
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

app.use(`${routePrefix}/register`, regRoutes)
app.use(`${routePrefix}/auth`, authRoutes)

app.use(passport.initialize())

const checkDbConn = () => {
  return sequelize
    .authenticate()
    .then((connection: any) => {
      console.log("Connection to database successful!")
    })
    .catch((err) => {
      console.log("Unable to connect to database!")
    })
}

checkDbConn()

app.listen(port)
```


## Utilities Setup
[*Back to Contents*](#table-of-contents)

You would have noticed that I seem to have a folder called *utils* from where I am calling the setups for my *Sequelize* database connection, as well as *Passport.js*. This is done to have a bit better separation of concerns and to keep the *app.js* file as lean as possible.

### Passport Setup
[*Back to Contents*](#table-of-contents)

My setup for *Passport.js* is as shown below:


``` js
const passport = require('passport')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const db = require('../../models')

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  function (username, password, done) {
    return User.findOne({ email: username }).exec()
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'Incorrect Email!' })
        }
        return bcrypt.compare(password, user.password)
          .then(result => {
            if (!result) {
              return done(null, false, { message: 'Incorrect password!' })
            }
            return done(null, user)
          })
      })
      .catch(err => {
        return done(err)
      })
  }))

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_JWT_SECRET
},
  function (jwt_payload, done) {
    return User.findOne({ _id: jwt_payload.userId }).exec()
      .then(user => {
        if (user) {
          return done(null, user)
        } else {
          return done(null, false)
        }
        /** Alternatively
       * return done(null, user || false)
       */
      })
      .catch(err => {
        return done(err, false)
      })
  }))

module.exports = passport
```

Here, I am using two of *Passport.js*'s strategies, the **local** and **jwt**. 

The local strategy accepts an email and password, to authenticate the user. This strategy is only used for the *login* endpoint, and you could easily switch it out for whatever strategy you prefer, perhaps even oAuth.

The *jwt* strategy is used for all other routes in the application where the user needs to be authenticated before being granted access to the API resources. This strategy receives a *jwt* passed as a *Bearer Token* with the *Authorization* header sent with the request. This token could be encoded with relevant information such as user role, etc, so as to be able to allow/block access to specific routes without making calls to the database.

### Sequelize Setup
[*Back to Contents*](#table-of-contents)

The database setup I am using here is a PostgreSQL database, managed by *Sequelize*, and using migrations. To set this up for yourself, you could follow the instructions at [ sequelize migrations ](https://sequelize.org/master/manual/migrations.html). The database is setup and migrated with a user model, having the following fields and data types:
+ name: string
+ email: email
+ password: string
+ reset password token: string
+ email verification timestamp: date
+ blacklisted tokens: array

My database connection setup is as shown below:

```js
const  Sequelize = require("sequelize")

const dbUser: string = process.env.DB_USERNAME!
const dbName: string = process.env.DB_NAME!
const dbPass: string = process.env.DB_PASSWORD!

const sequelize = new Sequelize(
  dbName, dbUser, dbPass, {
    host: 'localhost',
    dialect: 'postgres'
  }
)

module.exports = sequelize
```

## User Registration
[*Back to Contents*](#table-of-contents)

Our first action would be to register the users, and for this, we shall be hitting the signup endpoint. The route setup is imported in the *app.js* and tied to the app, but it's setup is as below:

```js
const express = require( 'express')
const { body } = require('express-validator')

const db = require('../../models')

const { postRegisterUser } = require( '../controllers/registerController')

const router = express.Router()

router.post("/user",
  [
    // Use express-validator to validate the user inputs
  ],
  postRegisterUser
)

module.exports = router
```

This route makes use of *Express Validator* to validate the user inputs, and then the request is passed to the **postRegisterUser** function in the *signup controller*. Here, the user is created and saved to the database. In addition, we can fire off an event here that sends an email to the user asking them to verify their email address. The general setup for this email is shown below:

```js
exports.sendVerificationMail = (user) => {
  try {
    const token = generateToken(
      // Generate a token here, encoding the user Id
    )
    const verifyUrl = `${process.env.APP_FRONTEND_URL}/verify/email/?token=${token}`

    // Send an email to the user with the generated link.
  } catch (err: any) {
    throw err
  }
}
```

## User Login
[*Back to Contents*](#table-of-contents)

Having registered, the next action should be user login. This is achieved by hitting an API endpoint that would receive the email address and password, and authenticate the user that way. The route setup is shown below:

```js
router.post('/login',
  passport.authenticate('local', { session: false }),
  authController.postLogin
)
```

This setup means that even before we reach the controller action, our user has already been authenticated by *Passport JS*, and added to the request object as a *req.user* field. Our login controller action therefore has the task of taking that user from the request object, filtering it to hide confidential fields, as well as returning the access and refresh tokens. The setup for this is show below:

```js
exports.postLogin = async (req, res, next) => {
  try {
    const token = // Generate access token (jwt) here

    const expiry = // Get the timestamp of the time when the access token should expire

    const refreshToken = // Generate refresh token here, encoding only user id

    const user = // Filter the user object to hide confidential fields

    res.cookie('refresh_cookie', refreshToken, {
      expires: expiry,
      httpOnly: true,
      sameSite: 'None',
      secure: true,
    }).status(200).json({
      token: token,
      expires_in: // expiry time in milliseconds,
      user: user
    })
  } catch (err) {
    // Handle errors
  }
}
```

We return a response here, setting a cookie with its contents being the string of the refresh token. The cookie must also be set to be httpOnly, as well as secure, to improve security. Also sent with the response, is the access token, which must be stored only in memory on the front-end. This usually means storing it in the application state, leading to it being lost on page reload. Not to worry, the refresh token would solve this problem as you shall see later. The access token should also be short-lived, between 10 and 15 minutes.

## Email Verification
[*Back to Contents*](#table-of-contents)

Verifying the user's email would be our third action. To do this, we would need to hit an API endpoint that would take the token from the request, decode this token and find the relevant user in our database. This endpoint normally is setup as a **PATCH** or **PUT** route. It would then update that user's *email verified timestamp* with the current time.

Here's some sample code for this operation:

```js
exports.patchVerifyEmail = async (req: any, res: any, next: NextFunction) => {
  try {
    const token = req.body.token
    const decodedToken = // Decode supplied token here

    const userId = decodedToken.userId

    const updatedUser = await db.User.update(
      {
        email_verified_at: new Date(),
      },
      {
        where: { id: userId },
        returning: true,
      }
    )
    if (!updatedUser) {
      // Throw an error warning of verification failure
    }
    const filteredUser = // Filter the user model and hide confidential fields

    res.status(200).json({
      message: "Email successfully verified",
      user: filteredUser,
    })
  } catch (err: any) {
   // Handle errors
  }
}
```

# Resend Verification Email
[*Back to Contents*](#table-of-contents)

We might have some parts of our application that we want to allow access to only people who have verified their identity by verifying their email. The token sent at registration, might have expired if the user waits too long before attempting verification, and so to counteract this, we need a way for the user to request for another verification link.

This is achieved by hitting an API endpoint, where an action is fired sending an email to the logged in user's email.

In order for this route to work, the user would need to be logged in. We can ensure this by passing a **Passport JS** middleware to the route to check that the user is logged in. The route setup is shown below:

```js
router.post('/verify/resend/:userId',
  passport.authenticate('jwt', { session: false }),
  isOwner,
  authController.postResendVerificationMail
)
```


## Request Password Reset
[*Back to Contents*](#table-of-contents)

It is normal for some users to forget their passwords, and so we must also provide a way for them to be able to set a new password even without remembering the old one. We achieve this by hitting an API endpoint where we receive the user's email address, search against our database with it, and on finding the user, send them an email with a link encoded with their *id* to allow them to reset their password, while also saving the reset token to the user model in the database.

The code for the controller action called by this route is like below:
```js
exports.postRequestPasswordReset = async (req, res, next) => {
  try {
    // Throw an error if validation fails

    const user = await db.User.findOne({ where: {email: req.body.email} })
    if (!user) {
      // Throw not found error
    }
    const token = // Generate token, encoding user id

    const resetUrl = process.env.APP_FRONTEND_URL + '/password/update?token=' + token

    user.reset password token = token
    await user.save()

   // Send email with the reset link to the user's email

    res.status(200).json({
      message: 'Reset link sent successfully'
    })
  } catch (err) {
   // Handle errors
  }
}
```

## Update Password
[*Back to Contents*](#table-of-contents)

After the user clicks on the link we sent in the previous step, we would take them to a page on our front-end where we would then have them enter a new password twice. We would also take the token from the URL and append it to the request body.

The password update action is achieved by hitting a **PATCH** or **PUT** API endpoint that takes the confirmed password and the token, and updates the user in our database with the new password. We would need to only update the user in the database if the token supplied matches the one stored on the user model, and the id encoded in the token matches the same user.

The code for this is as below:

```js
exports.patchPasswordUpdate = async (req, res, next) => {
  try {
    // Handle validation errors

    const decodedToken =// Decode supplied token
    const hashedPw = hash the supplied password

    const updatedUser = await db.User.update(
      {
        password: hashedPw,
        password_reset_token: null,
      },
      {
        where: {
          id: decodedToken.userId,
          password_reset_token: token,
        },
        returning: true,
      }
    )
    if (!updatedUser) {
      const error = new Error("Password update failed!")
      throw error
    }
   // Send user an email alerting them that password was successfully changed

    res.status(200).json({
      message: "Password successfully updated",
    })
  } catch (err) {
   // Handle errors
  }
}
```

## User Logout
[*Back to Contents*](#table-of-contents)

This is normally the most painful point where *jwts* are concerned. A JWT once created, cannot be altered in any way, as it is readonly. This means that even if a user chooses to log out of our application, for as long as their tokens are valid, they could be used to access said user's account. The access token is not particularly dangerous here as it is short lived anyway, and the logout action on the front-end should also remove the access token from the app state.

To counter this, it is necessary to keep some information on which refresh tokens have been logged out by the user; a blacklist of sorts. You could choose to keep all of these in a separate table, or you could do as I prefer and keep them in an array on the user model. I have called this array *blacklisted tokens*.

The general flow is that when a user logs out, we hit an API endpoint that authenticates the user using their access token. This endpoint then calls a controller action that adds the current refresh token to the blacklisted tokens array, and then removes the user from the request object.

The code for this action is like thus:

```js
exports.postLogout = async (req, res, next) => {
  try {
    const user = await db.User.update(
      {
        blacklisted_tokens: Sequelize.fn(
          "array_append",
          Sequelize.col("blacklisted_tokens"),
          req.cookies.refresh_cookie
        ),
      },
      {
        where: { id: req.user.id },
        returning: true,
      }
    )
    if (!user) {
      // Throw not found error
    }
    req.logout()

    res.status(200).json({
      message: "Logged out",
    })
  } catch (err: any) {
    // Handle errors
  }
}
```

## Tokens Refresh
[*Back to Contents*](#table-of-contents)

The final action we have to setup would be to allow the user, once logged in to be able to stay logged in even after the short lived access token expires. This requires us to use the refresh token, finally.

To do this, we hit an API endpoint where the only required parameter is the refresh token, which is passed in as a cookie. To get this to work, depending on your particular setup you might need to massage the *samesite* and *secure* attributes of your cookie at the point where it is set (your login action).

The code to make this happen is as below:

```js
exports.postRefreshTokens = async (req, res, next) => {
  const refToken = req.cookies.refresh_cookie
  try {
    const decodedToken = // Decode the supplied token
    const { userId } = decodedToken
    const user = await db.User.findOne({
      where: { id: userId },
    })
    if (!user) {
      // Throw not found error
    }
    if (user.blacklisted_tokens?.includes(refToken)) {
      // Throw unauthorized error
    }
    const { token, refreshToken } = createTokens(user) // Create a new pair of tokens
    const filteredUser = filterUser(user) // Hide confidential fields from the user model
    const expiry = getExpiry()

    res
      .cookie("refresh_cookie", refreshToken, {
        expires: expiry,
        httpOnly: true,
        // sameSite: "None",
        // secure: true,
      })
      .status(200)
      .json({
        token: token,
        expires_in: // Time till access token expires in milliseconds,
        user: filteredUser,
      })
  } catch (err: any) {
   // Handle errors
  }
}
```

To make the front-end work, we would also need to do the following:
> Each time the app initializes, we hit this refresh token endpoint, and if our supplied cookie is valid, the user is automatically logged in. This allows us to preserve the logged in state of the user across browser reloads and even if the user stays away from the application for an extended period of time. As long as our refresh token is still valid, the user would be automatically logged in once the app initializes.

> On successful login, we should set a function on the front-end that hits this refresh token endpoint to renew the pair of tokens, just before the access token expires. This could be achieved using a *setInterval* function. This would handle silent refreshes of the access token, keeping the user logged in for as long as the app is running.

Congratulations! If you've been able to follow along up to this point, you now know how to user JWTs for authentication on a REST API from a Single Page Application. 

Thanks for reading.