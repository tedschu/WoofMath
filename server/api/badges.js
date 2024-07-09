const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Updates a badge (e.g. when a user wins a new badge)

// CONSOLIDATE THIS INTO .USERS FILE? WOULD MAKE SOURCING USER_ID SIMPLER
// ALTERNATIVE IS TO DUPLICATE TOKEN CALL FUNCTION TO GRAB ID, OR, TO PASS PARAMS
router.put("/", async (req, res) => {
  try {
    const user_badges = await prisma.badge.update({
      where: {
        user_id: parseInt(req.params.user_id),
      },
      data: req.body,
    });
    res.send(user_badges);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
