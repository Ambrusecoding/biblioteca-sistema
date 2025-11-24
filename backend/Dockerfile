# 1. ETAPA BASE: Define la imagen de Node LTS (estable)
FROM node:20-slim AS base
# Define el directorio de trabajo dentro del contenedor
WORKDIR /app

# 2. ETAPA DE DEPENDENCIAS: Instala solo las librerías
FROM base AS deps
WORKDIR /app
# Copia solo los archivos de configuración de NPM
COPY package.json package-lock.json ./

# RUN: Instala las dependencias, ignorando los scripts (incluido el generate de Prisma)
RUN npm install --ignore-scripts

# 🚨 CORRECCIÓN: Instala OpenSSL, requerido por Prisma para la conexión a la base de datos.
RUN apt-get update -y && apt-get install -y openssl 

# 3. ETAPA DE CONSTRUCCIÓN (BUILD): Compila el código
FROM base AS build
WORKDIR /app
# Copia las dependencias preinstaladas (incluyendo node_modules)
COPY --from=deps /app/node_modules ./node_modules

# 🚨 ROMPE EL CACHÉ (SOLUCIÓN TS2353): Este comando fuerza la invalidación de la capa COPY . .
RUN touch .cache_buster

# Copia el código fuente (contiene el PrismaService corregido)
COPY . . 

# Solución para DATABASE_URL: Se inyecta una URL DUMMY temporal para que 'prisma generate' funcione.
RUN DATABASE_URL="postgresql://user:password@localhost:5432/dummy" npx prisma generate --schema prisma/schema.prisma

# Ahora sí, compila la aplicación NestJS
RUN npm run build

# 4. ETAPA DE PRODUCCIÓN (FINAL): Imagen ligera para ejecución
# CORRECCIÓN DE RUNTIME: Cambiamos a la imagen node:20 (no slim) para asegurar que las variables de entorno se lean.
FROM node:20 AS final
WORKDIR /app

# CORRECCIÓN DE ERROR ENOENT: Copia los archivos de configuración para poder ejecutar npm start
COPY package.json package-lock.json ./

# Copia solo los archivos de producción: compilados (dist) y dependencias
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Copia el esquema de Prisma (necesario para migrate deploy en runtime)
COPY prisma ./prisma/ 

# Establece el puerto de escucha
EXPOSE 3000

# 🚨 CORRECCIÓN DEFINITIVA DE DATASOURCE EN RUNTIME:
# Ejecuta el comando de migración y luego el de inicio, forzando la exportación de la variable para que Prisma la vea.
CMD ["/bin/sh", "-c", "env DATABASE_URL=$DATABASE_URL npx prisma migrate deploy && npm run start:prod"]