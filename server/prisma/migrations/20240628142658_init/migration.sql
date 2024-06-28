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

-- CreateTable
CREATE TABLE "Badge" (
    "id" SERIAL NOT NULL,
    "dog" BOOLEAN DEFAULT false,
    "hippo" BOOLEAN DEFAULT false,
    "shield_dog" BOOLEAN DEFAULT false,
    "frog" BOOLEAN DEFAULT false,
    "dove" BOOLEAN DEFAULT false,
    "cat" BOOLEAN DEFAULT false,
    "fish" BOOLEAN DEFAULT false,
    "cow" BOOLEAN DEFAULT false,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Badge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game_state" (
    "id" SERIAL NOT NULL,
    "json_setting" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Game_state_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_stats" (
    "id" SERIAL NOT NULL,
    "total_logins" INTEGER NOT NULL,
    "last_login" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "User_stats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Score_user_id_key" ON "Score"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Badge_user_id_key" ON "Badge"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Game_state_user_id_key" ON "Game_state"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_stats_user_id_key" ON "User_stats"("user_id");

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Badge" ADD CONSTRAINT "Badge_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game_state" ADD CONSTRAINT "Game_state_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_stats" ADD CONSTRAINT "User_stats_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
