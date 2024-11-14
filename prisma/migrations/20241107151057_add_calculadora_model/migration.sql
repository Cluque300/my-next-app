-- CreateTable
CREATE TABLE `Calculadora` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `projectDuration` INTEGER NOT NULL,
    `adminCost` DOUBLE NOT NULL,
    `locativeCost` DOUBLE NOT NULL,
    `machineryCost` DOUBLE NOT NULL,
    `materialCosts` DOUBLE NOT NULL,
    `otherCosts` DOUBLE NOT NULL,
    `totalCost` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `projectId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Calculadora` ADD CONSTRAINT `Calculadora_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
