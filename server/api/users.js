const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

// Middleware to verify token and allow for loading of user data
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(500).send({ error: "No token was provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
    if (err)
      return res.status(403).send({ error: "Failed to authenticate token." });

    req.user = decodedUser.data.id;

    next();
  });
}

// Gets all users
// "Include" statement pulls in related data models / tables to the user
router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        score: true,
        badge: true,
        game_state: true,
      },
    });
    res.send(users);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// WORKS: Gets a single user
// validate and find user info
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(req.user),
      },
      include: {
        score: true,
        badge: true,
        game_state: true,
      },
    });
    res.send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Deletes a user
router.delete("/", verifyToken, async (req, res) => {
  try {
    const user = await prisma.user.delete({
      where: {
        id: parseInt(req.user),
      },
    });
    res.send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Update a user (ex update email or password)
router.put("/", verifyToken, async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, saltRounds);

    const user = await prisma.user.update({
      where: {
        id: parseInt(req.user),
      },
      data: {
        name: req.body.name,
        birth_year: req.body.birth_year,
        email: req.body.email,
        username: req.body.username,
        password: hashPassword,
      },
    });
    res.send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;

module.exports.verifyToken = verifyToken;
