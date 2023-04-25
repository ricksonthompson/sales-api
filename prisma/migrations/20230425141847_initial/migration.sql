-- CreateEnum
CREATE TYPE "EPaymentMethod" AS ENUM ('CREDIT_CARD', 'PIX', 'CASH');

-- CreateTable
CREATE TABLE "Sale" (
    "id" UUID NOT NULL,
    "customer" VARCHAR(255) NOT NULL,
    "flavor" VARCHAR(255) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitaryValue" REAL NOT NULL,
    "amount" REAL NOT NULL,
    "paymentMethod" "EPaymentMethod" NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sale_id_key" ON "Sale"("id");
