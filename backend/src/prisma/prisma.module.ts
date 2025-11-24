import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  // Exportamos el servicio para que otros módulos puedan inyectarlo.
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
