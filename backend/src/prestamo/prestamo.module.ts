import { Module } from '@nestjs/common';
import { PrestamoService } from './prestamo.service';
import { PrestamoController } from './prestamo.controller';
import { DateUtilsService } from '../utils/date-utils.service'; // Importar Utilidad
import { PrestamoRepository } from './prestamo.repository'; // Importar Repositorio
import { UsuarioRepository } from '../usuario/usuario.repository'; // 2. IMPORTAR

@Module({
  imports: [], // El PrismaModule es Global, no necesita importarse
  controllers: [PrestamoController],
  providers: [
    PrestamoService,
    PrestamoRepository, // Registrar Repositorio
    DateUtilsService, // Registrar Utilidad
    UsuarioRepository, // Registrar Repositorio
  ],
  exports: [PrestamoService, PrestamoRepository], // Opcional, para que otros módulos los usen
})
export class PrestamoModule {}
