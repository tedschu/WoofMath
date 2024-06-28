const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Gets all users
// "Include" statement pulls in related data models / tables to the user
router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        score: true,
        badge: true,
        game_state: true,
        user_stats: true,
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
        user_stats: true,
      },
    });
    res.send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
