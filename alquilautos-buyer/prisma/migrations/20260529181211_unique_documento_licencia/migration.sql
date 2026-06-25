/*
  Warnings:

  - A unique constraint covering the columns `[numeroDocumento]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[licenciaConducir]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_numeroDocumento_key" ON "User"("numeroDocumento");

-- CreateIndex
CREATE UNIQUE INDEX "User_licenciaConducir_key" ON "User"("licenciaConducir");
