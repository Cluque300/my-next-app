-- CreateTable
CREATE TABLE `Adjunto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `tarjetaId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Adjunto` ADD CONSTRAINT `Adjunto_tarjetaId_fkey` FOREIGN KEY (`tarjetaId`) REFERENCES `Tarjeta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
