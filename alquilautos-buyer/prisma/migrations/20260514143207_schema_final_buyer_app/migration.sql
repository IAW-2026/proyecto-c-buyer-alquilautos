-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nombre" TEXT,
    "apellido" TEXT,
    "fechaNacimiento" TIMESTAMP(3),
    "tipoDocumento" TEXT,
    "numeroDocumento" TEXT,
    "licenciaConducir" TEXT,
    "direccionFacturacion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavoritePool" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FavoritePool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavoriteItem" (
    "id" SERIAL NOT NULL,
    "vehiculoExternoId" INTEGER NOT NULL,
    "poolId" INTEGER NOT NULL,

    CONSTRAINT "FavoriteItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "FavoritePool_userId_key" ON "FavoritePool"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteItem_poolId_vehiculoExternoId_key" ON "FavoriteItem"("poolId", "vehiculoExternoId");

-- AddForeignKey
ALTER TABLE "FavoritePool" ADD CONSTRAINT "FavoritePool_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteItem" ADD CONSTRAINT "FavoriteItem_poolId_fkey" FOREIGN KEY ("poolId") REFERENCES "FavoritePool"("id") ON DELETE CASCADE ON UPDATE CASCADE;
