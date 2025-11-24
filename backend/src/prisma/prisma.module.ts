import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Opcional: Para no tener que importar PrismaModule en todos lados
@Module({
  providers: [PrismaService], // Aquí registras el servicio
  exports: [PrismaService], // ¡IMPORTANTE! Aquí lo expones para que otros lo usen
})
export class PrismaModule {}
