const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const prisma = new PrismaClient();

let now = new Date().toISOString();

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

// Gets a single user
router.get("/:id", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(req.params.id),
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
router.delete("/:id", async (req, res) => {
  try {
    const user = await prisma.user.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Update a user (ex update email or password)
router.put("/:id", async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, saltRounds);

    const user = await prisma.user.update({
      where: {
        id: parseInt(req.params.id),
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
