const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const prisma = new PrismaClient();

// Creates a new user via registration
router.post("/register", async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
    const newUser = await prisma.user.create({
      data: {
        name: req.body.name,
        birth_year: req.body.birth_year,
        email: req.body.email,
        username: req.body.username,
        password: hashPassword,
      },
    });
    res.send(newUser);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// TODO: login function

module.exports = router;
