"use strict";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import jsonwebtoken from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import cookieParser from "cookie-parser";
import compression from "compression";
import { OAuth2Client } from "google-auth-library";

import Posts from "./postModel.js";
import Users from "./userModel.js";
import diffInMs from "./timesup.js";

//App Config
var app = express();

const connection_url = process.env.DATABASE_URL;

const client = new OAuth2Client(process.env.GOOGLE_OAUTH);

//Middleware
app.use(
  compression({
    level: 6,
  })
);
app.use(cookieParser());

const whitelist = [
  process.env.ORIGIN1,
  process.env.ORIGIN2,
  process.env.ORIGIN3,
  process.env.ORIGIN4,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// app.use(
//   cors({
//     origin: process.env.ORIGIN1,
//     credentials: true,
//   })
// );

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

//DB Config
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/* GET ALL POSTS */
app.get("/api/posts", (request, response) => {
  Posts.find({}, function (err, posts) {
    if (err) {
      response.status(500).json({
        error: e,
      });
    } else {
      response.status(200).json(posts);
    }
  });
});

/* LOGIN AND SIGN UP */
app.post("/api/google-login", async (req, res) => {
  const { authId } = req.body;

  try {
    //check if passed token is valid
    const ticket = await client.verifyIdToken({
      idToken: authId,
      audience: process.env.GOOGLE_OAUTH,
    });

    //get metadata from the id token, to be saved in the db
    const payload = ticket.getPayload();
    let user = await Users.findOne({ email: payload?.email });

    if (!user) {
      user = await new Users({
        email: payload?.email,
        avatar: payload?.picture,
        name: payload?.name,
      });

      await user.save();
    }

    const token = jsonwebtoken.sign(
      { email: payload?.email },
      process.env.JWT_SECRET
    );

    res.status(200).json({
      success: true,
      token,
    });
  } catch (e) {
    res.status(500).json({
      error: e,
    });
  }
});

const checkTime = (req, res, next) => {
  if (diffInMs > 0) {
    next();
  } else {
    res.status(401).json({
      error: "You are not authenticated!",
    });
  }
};

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({
          error: "Token is not valid!",
        });
      }

      req.email = user.email;
      console.log(req.email);
      next();
    });
  } else {
    res.status(401).json({
      error: "You are not authenticated!",
    });
  }
};

app.get("/api/profile", verify, async (req, res) => {
  try {
    const profile = await Users.findOne({
      email: req.email,
    });
    res.status(200).json(profile);
  } catch (e) {
    res.status(401).json({
      error: e,
    });
  }
});

app.post("/api/userVoting", [checkTime, verify], async (req, res) => {
  const { postId } = req.body;

  console.log("VOOTING", postId);
  console.log("ID", req.email);

  try {
    const votingLength = await Users.findOne({ email: req.email });

    if (votingLength.voted.length < 3 && !votingLength.voted.includes(postId)) {
      await Users.updateOne({ email: req.email }, { $push: { voted: postId } });

      await Posts.updateOne({ id: postId }, { $inc: { voted: 1 } });

      res.status(200).json({ success: true });
    } else {
      res.status(403).json({
        error: "You have reached your voting limit!",
      });
    }
  } catch (e) {
    res.status(401).json({
      error: e,
    });
  }
});

app.post("/api/userUnVoting", [checkTime, verify], async (req, res) => {
  const { postId } = req.body;

  console.log("UNVOOTING", postId);
  console.log("UNID", req.email);

  try {
    const votePost = await Posts.findOne({ id: postId });
    const voteUser = await Users.findOne({ email: req.email });

    if (votePost.voted > 0 && voteUser.voted.includes(postId)) {
      await Users.updateOne(
        { email: req.email },
        {
          $pull: {
            voted: postId,
          },
        }
      );

      await Posts.updateOne({ id: postId }, { $inc: { voted: -1 } });

      res.status(200).json({ success: true });
    } else {
      res.status(403).json({
        error: "You have not voted for this post!",
      });
    }
  } catch (e) {
    res.status(401).json({
      error: e,
    });
  }
});

// app.get("/api/logout", authenticateUser, async (req, res) => {
//   req.session.destroy(function (err) {
//     // cannot access session here
//   });
// });

// app.post("/uppost", function (request, response) {
//   const dbPost = request.body;

//   Posts.create(dbPost, (err, data) => {
//     if (err) {
//       response.status(500).send(err);
//     } else {
//       response.status(201).send(data);
//     }
//   });
// });

// app.get("/delete", function (request, response) {
//   Posts.deleteMany({}, (err, data) => {
//     if (err) {
//       response.status(500).send(err);
//     } else {
//       response.status(201).send(data);
//     }
//   });
// });

app.get("/", function (request, response) {
  response.json({
    project: "Bell Club Voting App",
    developer: "Huynh Ba Quoc",
  });
});

app.listen(process.env.PORT || 5000);
