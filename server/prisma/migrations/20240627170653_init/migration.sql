/*
  Warnings:

  - You are about to drop the `Scores` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Scores";

-- CreateTable
CREATE TABLE "Score" (
    "id" SERIAL NOT NULL,
    "addition_score" INTEGER,
    "subtraction_score" INTEGER,
    "multiplication_score" INTEGER,
    "division_score" INTEGER,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "birth_year" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Score_user_id_key" ON "Score"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
