-- DropForeignKey
ALTER TABLE `aviso` DROP FOREIGN KEY `Aviso_userId_fkey`;

-- DropForeignKey
ALTER TABLE `calculadora` DROP FOREIGN KEY `Calculadora_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `calendarevent` DROP FOREIGN KEY `CalendarEvent_userId_fkey`;

-- DropForeignKey
ALTER TABLE `certificados` DROP FOREIGN KEY `Certificados_userId_fkey`;

-- DropForeignKey
ALTER TABLE `cursos` DROP FOREIGN KEY `Cursos_userId_fkey`;

-- DropForeignKey
ALTER TABLE `inscripcioncursos` DROP FOREIGN KEY `InscripcionCursos_cursoId_fkey`;

-- DropForeignKey
ALTER TABLE `inscripcioncursos` DROP FOREIGN KEY `InscripcionCursos_userId_fkey`;

-- DropForeignKey
ALTER TABLE `inventario` DROP FOREIGN KEY `Inventario_userId_fkey`;

-- DropForeignKey
ALTER TABLE `nominas` DROP FOREIGN KEY `Nominas_userId_fkey`;

-- DropForeignKey
ALTER TABLE `noticia` DROP FOREIGN KEY `Noticia_userId_fkey`;

-- DropForeignKey
ALTER TABLE `permisos` DROP FOREIGN KEY `Permisos_userId_fkey`;

-- DropForeignKey
ALTER TABLE `projectuser` DROP FOREIGN KEY `ProjectUser_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `projectuser` DROP FOREIGN KEY `ProjectUser_userId_fkey`;

-- DropForeignKey
ALTER TABLE `vacaciones` DROP FOREIGN KEY `Vacaciones_userId_fkey`;

-- DropForeignKey
ALTER TABLE `vacacionesextemporaneas` DROP FOREIGN KEY `VacacionesExtemporaneas_userId_fkey`;

-- CreateTable
CREATE TABLE `Tablero` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lista` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `posicion` INTEGER NOT NULL,
    `tableroId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tarjeta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `posicion` INTEGER NOT NULL,
    `listaId` INTEGER NOT NULL,
    `userId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Etiqueta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TableroUsuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `tableroId` INTEGER NOT NULL,

    UNIQUE INDEX `TableroUsuario_userId_tableroId_key`(`userId`, `tableroId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_TarjetaEtiquetas` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_TarjetaEtiquetas_AB_unique`(`A`, `B`),
    INDEX `_TarjetaEtiquetas_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
