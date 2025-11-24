import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  // Soporta múltiples orígenes separados por espacio o coma
  const corsOriginEnv = process.env.CORS_ORIGIN || 'http://localhost:5173';
  const corsOrigins = corsOriginEnv.split(/[,\s]+/).filter(Boolean);
  
  app.enableCors({
    origin: corsOrigins.length > 1 ? corsOrigins : corsOrigins[0],
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  // Configurar el pipe de validación globalmente
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  // Configurar Swagger/OpenAPI
  const config = new DocumentBuilder()
    .setTitle('Biblioteca API')
    .setDescription(
      'API RESTful para la gestión de préstamos de una biblioteca. Documentación completa de todos los endpoints disponibles.',
    )
    .setVersion('1.0')
    .addTag('usuarios', 'Operaciones relacionadas con usuarios')
    .addTag('libros', 'Operaciones relacionadas con libros')
    .addTag('prestamos', 'Operaciones relacionadas con préstamos')
    .addServer('http://localhost:3000', 'Servidor de desarrollo')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'Biblioteca API - Documentación',
    customCss: '.swagger-ui .topbar { display: none }',
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`🚀 Aplicación ejecutándose en: http://localhost:${port}`);
  console.log(
    `📚 Documentación Swagger disponible en: http://localhost:${port}/api/docs`,
  );
}
bootstrap();
