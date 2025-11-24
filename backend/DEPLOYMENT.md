# 🚀 Guía de Deployment - Biblioteca API

Esta guía explica cómo desplegar la API de Biblioteca en diferentes plataformas.

## 📋 Índice

- [Prerrequisitos](#prerrequisitos)
- [Opciones de Deployment](#opciones-de-deployment)
- [Docker (Recomendado)](#docker-recomendado)
- [Platforms as a Service](#platforms-as-a-service)
  - [Railway](#railway)
  - [Render](#render)
  - [Heroku](#heroku)
  - [Vercel](#vercel)
- [Servidor VPS/Dedicado](#servidor-vpsdedicado)

## ⚙️ Prerrequisitos

- Node.js 18+ instalado
- Base de datos SQLite (o PostgreSQL para producción)
- Git instalado

## 🐳 Docker (Recomendado)

Docker es **altamente recomendable** para deployment por las siguientes razones:

### ✅ ¿Por qué usar Docker?

1. **Consistencia**: Garantiza que la aplicación funcione igual en desarrollo, testing y producción
2. **Aislamiento**: Evita conflictos de dependencias con el sistema host
3. **Portabilidad**: Funciona en cualquier servidor que tenga Docker instalado
4. **Escalabilidad**: Fácil de escalar horizontalmente con Docker Compose o Kubernetes
5. **Reproducibilidad**: Cualquier desarrollador puede levantar el mismo entorno

### 📦 Construcción y Ejecución

```bash
# Construir la imagen
docker build -t biblioteca-api .

# Ejecutar el contenedor
docker run -p 3000:3000 \
  -e DATABASE_URL="file:./dev.db" \
  -v $(pwd)/prisma/dev.db:/app/prisma/dev.db \
  biblioteca-api
```

O con docker-compose:

```bash
docker-compose up -d
```

## 🌐 Platforms as a Service (PaaS)

### Railway

1. Conecta tu repositorio de GitHub a Railway
2. Railway detectará automáticamente el `Dockerfile`
3. Configura las variables de entorno:
   - `DATABASE_URL`: URL de tu base de datos
   - `PORT`: Puerto (generalmente Railway lo asigna automáticamente)
4. Deploy automático en cada push

### Render

1. Crea un nuevo "Web Service" en Render
2. Conecta tu repositorio de GitHub
3. Configuración:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start:prod`
   - **Environment Variables**:
     - `DATABASE_URL`
     - `NODE_ENV=production`
4. Render ejecutará el build y deployment

### Heroku

1. Instala Heroku CLI
2. Login: `heroku login`
3. Crea la app: `heroku create biblioteca-api`
4. Configura variables:
   ```bash
   heroku config:set DATABASE_URL="..."
   heroku config:set NODE_ENV=production
   ```
5. Deploy: `git push heroku main`

### Vercel

⚠️ **Nota**: Vercel está optimizado para aplicaciones serverless. Para NestJS, considera usar Railway o Render.

## 🖥️ Servidor VPS/Dedicado

### Con PM2 (Process Manager)

1. SSH a tu servidor
2. Instala Node.js y PM2:
   ```bash
   npm install -g pm2
   ```
3. Clona el repositorio
4. Instala dependencias: `npm install`
5. Construye la aplicación: `npm run build`
6. Ejecuta con PM2:
   ```bash
   pm2 start dist/main.js --name biblioteca-api
   pm2 save
   pm2 startup
   ```

### Con Docker en VPS

1. Instala Docker y Docker Compose en tu servidor
2. Usa los archivos Dockerfile y docker-compose.yml proporcionados
3. Ejecuta: `docker-compose up -d`

## 🔒 Variables de Entorno de Producción

Asegúrate de configurar:

```env
NODE_ENV=production
PORT=3000
DATABASE_URL=file:./prisma/production.db
```

## 📊 Monitoreo

Recomendamos usar servicios de monitoreo como:

- **Sentry** para error tracking
- **New Relic** o **Datadog** para APM
- **PM2 Plus** si usas PM2

## 🔄 CI/CD

Puedes configurar GitHub Actions para deployment automático. Ver `.github/workflows/deploy.yml` para un ejemplo.
