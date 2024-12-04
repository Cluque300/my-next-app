-- DropIndex
DROP INDEX `Aviso_userId_fkey` ON `aviso`;

-- DropIndex
DROP INDEX `Calculadora_projectId_fkey` ON `calculadora`;

-- DropIndex
DROP INDEX `CalendarEvent_userId_fkey` ON `calendarevent`;

-- DropIndex
DROP INDEX `Certificados_userId_fkey` ON `certificados`;

-- DropIndex
DROP INDEX `Cursos_userId_fkey` ON `cursos`;

-- DropIndex
DROP INDEX `InscripcionCursos_cursoId_fkey` ON `inscripcioncursos`;

-- DropIndex
DROP INDEX `Inventario_userId_fkey` ON `inventario`;

-- DropIndex
DROP INDEX `Nominas_userId_fkey` ON `nominas`;

-- DropIndex
DROP INDEX `Permisos_userId_fkey` ON `permisos`;

-- DropIndex
DROP INDEX `ProjectUser_projectId_fkey` ON `projectuser`;

-- DropIndex
DROP INDEX `Vacaciones_userId_fkey` ON `vacaciones`;

-- DropIndex
DROP INDEX `VacacionesExtemporaneas_userId_fkey` ON `vacacionesextemporaneas`;

-- AlterTable
ALTER TABLE `etiqueta` ADD COLUMN `creadorId` INTEGER NULL;

-- AlterTable
ALTER TABLE `lista` ADD COLUMN `estado` VARCHAR(191) NOT NULL DEFAULT 'activo';

-- AlterTable
ALTER TABLE `tablero` ADD COLUMN `estado` VARCHAR(191) NOT NULL DEFAULT 'activo',
    ADD COLUMN `visibilidad` VARCHAR(191) NOT NULL DEFAULT 'privado';

-- AlterTable
ALTER TABLE `tarjeta` ADD COLUMN `attachments` JSON NULL,
    ADD COLUMN `dueDate` DATETIME(3) NULL,
    ADD COLUMN `estado` VARCHAR(191) NOT NULL DEFAULT 'pendiente';
