# 📚 Biblioteca API - Gestión de Préstamos

API RESTful para la gestión de préstamos de una biblioteca. Implementada en **NestJS**, **TypeScript** y **Prisma ORM** con base de datos **SQLite**.

## 🎯 Características

- ✅ API RESTful completa con documentación OpenAPI/Swagger
- ✅ Validación de datos con class-validator
- ✅ Reglas de negocio implementadas (límite de préstamos para usuarios invitados)
- ✅ Base de datos relacional normalizada
- ✅ CORS configurado
- ✅ Documentación interactiva con Swagger UI

## 📋 Tabla de Contenidos

- [Prerrequisitos](#-prerrequisitos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Ejecución](#-ejecución)
- [Documentación API](#-documentación-api)
- [Endpoints](#-endpoints)
- [Reglas de Negocio](#-reglas-de-negocio)
- [Diagrama de Base de Datos](#-diagrama-de-base-de-datos)
- [Testing](#-testing)
- [Deployment](#-deployment)

## ⚙️ Prerrequisitos

- **Node.js** (versión 18 o superior)
- **npm** (Gestor de paquetes de Node)
- **Git** (opcional, para clonar el repositorio)

## 🚀 Instalación

### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd biblioteca-api
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
DATABASE_URL="file:./prisma/dev.db"
PORT=3000
NODE_ENV=development
CORS_ORIGIN="http://localhost:5173"
```

### 4. Inicializar la Base de Datos

```bash
# Generar el cliente de Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma migrate dev --name init
```

## ▶️ Ejecución

### Desarrollo

```bash
npm run start:dev
```

La aplicación estará disponible en `http://localhost:3000`

### Producción

```bash
# Construir
npm run build

# Ejecutar
npm run start:prod
```

### Con Docker

```bash
# Construir la imagen
docker build -t biblioteca-api .

# Ejecutar el contenedor
docker run -p 3000:3000 biblioteca-api

# O usar docker-compose
docker-compose up -d
```

## 📚 Documentación API

### Swagger UI

Una vez que la aplicación esté corriendo, accede a la documentación interactiva en:

**http://localhost:3000/api/docs**

Aquí podrás:

- Ver todos los endpoints disponibles
- Probar los endpoints directamente desde el navegador
- Ver los esquemas de datos (DTOs)
- Ver ejemplos de requests y responses

### OpenAPI JSON

El esquema OpenAPI está disponible en formato JSON:

**http://localhost:3000/api/docs-json**

## 🔌 Endpoints

### Usuarios

- `GET /api/usuario` - Obtener todos los usuarios

### Libros

- `GET /api/libro` - Obtener todos los libros

### Préstamos

- `GET /api/prestamo` - Obtener todos los préstamos
- `GET /api/prestamo/:id` - Obtener un préstamo por ID
- `POST /api/prestamo` - Crear un nuevo préstamo

### Ejemplo de Request

**Crear Préstamo:**

```bash
curl -X POST http://localhost:3000/api/prestamo \
  -H "Content-Type: application/json" \
  -d '{
    "isbn": "978-0-123456-78-9",
    "identificacionUsuario": "1234567890"
  }'
```

## 💡 Reglas de Negocio

1. **Validación de Usuarios**: Antes de crear un préstamo, el sistema valida que el usuario existe en la base de datos.

2. **Restricción de Invitados**: Los usuarios de tipo `3` (Invitado) tienen un límite estricto de **1 libro prestado** a la vez.

3. **Cálculo de Fechas**:
   - La `fechaPrestamo` se registra automáticamente con la fecha actual
   - La `fechaMaximaDevolucion` se calcula según el tipo de usuario:
     - **Afiliado (1)**: 10 días
     - **Empleado (2)**: 8 días
     - **Invitado (3)**: 7 días

## 🗄️ Diagrama de Base de Datos

Ver el diagrama entidad-relación en [DIAGRAMA-ER.md](./DIAGRAMA-ER.md) o visualizarlo directamente en GitHub.

### Modelos

- **Usuario**: Almacena información de usuarios (identificación, tipo)
- **Libro**: Almacena información de libros (ISBN, nombre)
- **Prestamo**: Tabla de relación que conecta usuarios y libros con información del préstamo

## 🧪 Testing

```bash
# Ejecutar todos los tests
npm run test

# Ejecutar tests en modo watch
npm run test:watch

# Ejecutar tests con cobertura
npm run test:cov

# Ejecutar tests end-to-end
npm run test:e2e
```

## 🚢 Deployment

Para información detallada sobre deployment, consulta [DEPLOYMENT.md](./DEPLOYMENT.md)

### Opciones de Deployment

- **Docker** (Recomendado) - Ver Dockerfile y docker-compose.yml
- **Railway** - Configuración automática con Docker
- **Render** - Deploy directo desde GitHub
- **Heroku** - Usando buildpacks
- **VPS/Dedicado** - Con PM2 o Docker

## 📝 Scripts Disponibles

- `npm run build` - Construir la aplicación
- `npm run start` - Iniciar la aplicación (compilada)
- `npm run start:dev` - Iniciar en modo desarrollo (watch)
- `npm run start:prod` - Iniciar en modo producción
- `npm run lint` - Ejecutar linter
- `npm run format` - Formatear código con Prettier
- `npm run test` - Ejecutar tests unitarios

## 🛠️ Tecnologías Utilizadas

- **NestJS** - Framework de Node.js
- **TypeScript** - Lenguaje de programación
- **Prisma ORM** - ORM para base de datos
- **SQLite** - Base de datos relacional
- **Swagger/OpenAPI** - Documentación de API
- **class-validator** - Validación de DTOs

## 📄 Licencia

Este proyecto es privado y de uso educativo.

## 👥 Contribución

Este es un proyecto personal. Si deseas contribuir, por favor abre un issue primero.

## 📧 Contacto

Para preguntas o sugerencias, por favor abre un issue en el repositorio.
