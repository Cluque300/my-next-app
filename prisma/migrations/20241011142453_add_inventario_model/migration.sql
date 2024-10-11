-- CreateTable
CREATE TABLE `Inventario` (
    `id_elemento` VARCHAR(191) NOT NULL,
    `nombre_elemento` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `ubicacion` VARCHAR(191) NOT NULL,
    `tipo_elemento` VARCHAR(191) NOT NULL,
    `imagen` VARCHAR(191) NULL,
    `categoria` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` INTEGER NULL,

    PRIMARY KEY (`id_elemento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Inventario` ADD CONSTRAINT `Inventario_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
