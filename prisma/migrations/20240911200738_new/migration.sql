/*
  Warnings:

  - Added the required column `estadoUsuario` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `estadoUsuario` VARCHAR(191) NOT NULL,
    ADD COLUMN `foto` VARCHAR(191) NULL;
