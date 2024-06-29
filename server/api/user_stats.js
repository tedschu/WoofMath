const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Gets all user stats
router.get("/", async (req, res) => {
  try {
    const userStats = await prisma.user_stats.findMany({
      include: {
        user: true,
      },
    });
    res.send(userStats);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Gets stats for a single user
router.get("/:user_id", async (req, res) => {
  try {
    const userStats = await prisma.user_stats.findUnique({
      where: {
        user_id: parseInt(req.params.user_id),
      },
      include: {
        user: true,
      },
    });
    res.send(userStats);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//TODO: INCREMENTS LOGIN COUNT BY 1

//TODO: ADDS LAST LOGIN

module.exports = router;
