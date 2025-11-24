import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  // Constructor simplificado para leer DATABASE_URL del entorno.
  // El error se resuelve porque ya no tiene la propiedad 'datasources'.
  constructor() {
    super({
      // Se recomienda mantener un log.
      log: ['warn', 'error'],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
