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

# 3. ETAPA DE CONSTRUCCIÓN (BUILD): Compila el código
FROM base AS build
WORKDIR /app
# Copia las dependencias preinstaladas (incluyendo node_modules)
COPY --from=deps /app/node_modules ./node_modules
# Copia el código fuente
COPY . .

# SOLUCIÓN FINAL: Inyecta una URL DUMMY temporal para satisfacer el prisma.config.ts.
# Esto permite que el comando 'generate' se complete sin la URL de Render.
RUN DATABASE_URL="postgresql://user:password@localhost:5432/dummy" npx prisma generate --schema prisma/schema.prisma

# Ahora sí, compila la aplicación NestJS
RUN npm run build

# 4. ETAPA DE PRODUCCIÓN (FINAL): Imagen ligera para ejecución
FROM base AS final
WORKDIR /app

# Copia solo los archivos de producción: compilados (dist) y dependencias
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Copia el esquema de Prisma (necesario para migrate deploy en runtime)
COPY prisma ./prisma/ 

# Establece el puerto de escucha
EXPOSE 3000

# Comando de inicio: Utiliza el script 'start:render' (migrate deploy && start:prod)
CMD ["npm", "run", "start:render"]