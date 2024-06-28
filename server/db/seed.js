const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("seeding the database...");

  const testUser = await prisma.user.create({
    data: {
      name: "Testuser",
      birth_year: 2014,
      email: "test@email.com",
      username: "testUser",
      password: "test",
    },
  });

  await prisma.score.create({
    data: {
      addition_score: 150,
      subtraction_score: 200,
      user_id: testUser.id,
    },
  });

  await prisma.badge.create({
    data: {
      dog: true,
      hippo: true,
      shield_dog: true,
      user_id: testUser.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
