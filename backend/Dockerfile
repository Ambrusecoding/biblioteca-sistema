# Etapa 1: Construcción
FROM node:20-alpine AS builder # 🚨 CORRECCIÓN 1: Cambiar a Node 20

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependencias
RUN npm i --legacy-peer-deps

# Copiar código fuente
COPY . .

# Generar Prisma Client
RUN npx prisma generate

# Construir la aplicación
RUN npm run build

# Etapa 2: Producción
FROM node:20-alpine # 🚨 CORRECCIÓN 2: Cambiar a Node 20

WORKDIR /app

# Instalar solo dependencias de producción
COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci --only=production && \
    npx prisma generate

# Copiar archivos construidos desde la etapa de builder
COPY --from=builder /app/dist ./dist

# Crear directorio para la base de datos
RUN mkdir -p ./prisma && chmod 777 ./prisma

# Exponer el puerto
EXPOSE 3000

# Variable de entorno por defecto
ENV NODE_ENV=production
ENV PORT=3000

# Comando para iniciar la aplicación
CMD ["node", "dist/main.js"]