import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  // Constructor compatible con Prisma v6.
  // La conexión se maneja automáticamente a través de DATABASE_URL o el archivo dev.db.
  constructor() {
    super({
      log: ['warn', 'error'],
    });
  }

  async onModuleInit() {
    // Establece la conexión con la base de datos.
    await this.$connect();
  }

  async onModuleDestroy() {
    // Cierra la conexión al apagar la aplicación.
    await this.$disconnect();
  }
}
