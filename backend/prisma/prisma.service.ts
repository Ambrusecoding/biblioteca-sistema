import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  // Constructor simplificado para leer DATABASE_URL del entorno.
  // El error se resuelve porque ya no tiene la propiedad 'datasources'.
  // En src/prisma/prisma.service.ts (Versión corregida)
  constructor() {
    super({
      log: ['warn', 'error'], // <-- La primera propiedad está en la línea 11 de la versión corregida
    });
  }
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
