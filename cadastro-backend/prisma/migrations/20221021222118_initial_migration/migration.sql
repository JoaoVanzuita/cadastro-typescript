-- CreateTable
CREATE TABLE "users" (
    "idUser" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("idUser")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
