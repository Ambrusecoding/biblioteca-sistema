import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      datasources: {
        db: {
          // Base de datos en memoria para SQLite
          // Usa file::memory:?cache=shared para permitir múltiples conexiones
          url: process.env.DATABASE_URL || 'file::memory:?cache=shared',
        },
      },
    });
  }

  // Se ejecuta cuando el módulo se inicializa (conecta a la BD)
  async onModuleInit() {
    await this.$connect();
  }

  // Se ejecuta cuando la aplicación se cierra (limpieza de conexiones)
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
