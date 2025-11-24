import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

<<<<<<< HEAD
@Module({
  // Exportamos el servicio para que otros módulos puedan inyectarlo.
=======
@Global()
@Module({
>>>>>>> 2d4e546 (Todo en funcionamiento rama local origina)
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
