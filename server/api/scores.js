const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Gets all scores
router.get("/", async (req, res) => {
  try {
    const score = await prisma.score.findMany({
      include: {
        user: true,
      },
    });
    res.send(score);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// updates a score

// CONSOLIDATE THIS INTO .USERS FILE? WOULD MAKE SOURCING USER_ID SIMPLER (ALTERNATIVE IS TO DUPLICATE TOKEN CALL FUNCTION)
router.put("/user/:user_id", async (req, res) => {
  try {
    const score = await prisma.score.update({
      where: {
        user_id: parseInt(req.params.user_id),
      },
      data: req.body,
    });
    res.send(score);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
