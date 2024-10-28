-- CreateTable
CREATE TABLE `Certificados` (
    `id_certificado` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `nombre_certificado` VARCHAR(191) NOT NULL,
    `usuario_sube_certificado` VARCHAR(191) NOT NULL,
    `fecha_subida` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `archivo_certificado` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_certificado`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Nominas` (
    `id_nomina` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `usuario_sube_nomina` VARCHAR(191) NOT NULL,
    `nombre_nomina` VARCHAR(191) NOT NULL,
    `fecha_subida` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `archivo_nomina` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_nomina`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Certificados` ADD CONSTRAINT `Certificados_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nominas` ADD CONSTRAINT `Nominas_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
