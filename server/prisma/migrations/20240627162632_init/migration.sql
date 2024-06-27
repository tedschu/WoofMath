-- CreateTable
CREATE TABLE "Scores" (
    "id" SERIAL NOT NULL,
    "addition_score" INTEGER,
    "subtraction_score" INTEGER,
    "multiplication_score" INTEGER,
    "division_score" INTEGER,

    CONSTRAINT "Scores_pkey" PRIMARY KEY ("id")
);
