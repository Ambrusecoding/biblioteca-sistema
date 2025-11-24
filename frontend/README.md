# 📚 Biblioteca Dashboard

Aplicación web React con Vite para gestionar usuarios, libros y préstamos de una biblioteca. Construida con **Atomic Design** y **TypeScript**.

## 🎯 Características

- ✅ Dashboard interactivo con 3 secciones principales
- ✅ Gestión de usuarios, libros y préstamos
- ✅ Crear préstamos desde la interfaz
- ✅ Diseño responsive y moderno
- ✅ Arquitectura Atomic Design
- ✅ TypeScript para type safety
- ✅ Integración completa con la API de biblioteca

## 📋 Tabla de Contenidos

- [Prerrequisitos](#-prerrequisitos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Ejecución](#-ejecución)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Arquitectura Atomic Design](#-arquitectura-atomic-design)
- [Deployment](#-deployment)

## ⚙️ Prerrequisitos

- **Node.js** (versión 18 o superior)
- **npm** o **yarn**
- **API de Biblioteca** corriendo (ver [biblioteca-api](../biblioteca-api/README.md))

## 🚀 Instalación

### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd biblioteca-dashboard
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_BASE_URL=http://localhost:3000
```

⚠️ **Nota**: Las variables en Vite deben comenzar con `VITE_` para estar disponibles.

## ▶️ Ejecución

### Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Producción

```bash
# Construir
npm run build

# Previsualizar producción localmente
npm run preview
```

### Con Docker

```bash
# Construir la imagen
docker build -t biblioteca-dashboard .

# Ejecutar el contenedor
docker run -p 80:80 biblioteca-dashboard
```

## 🏗️ Estructura del Proyecto

```
src/
├── components/
│   ├── atoms/              # Componentes básicos (Button, Card, Badge, etc.)
│   ├── molecules/          # Componentes compuestos (Table, Modal, Input, etc.)
│   ├── organisms/          # Componentes complejos (ListaUsuarios, FormCrearPrestamo, etc.)
│   └── templates/          # Layouts (DashboardLayout)
├── pages/                  # Páginas de la aplicación
├── services/               # Servicios API
├── config/                 # Configuración (API endpoints)
├── types/                  # Tipos TypeScript
├── App.tsx                 # Componente raíz
└── main.tsx                # Punto de entrada
```

## 🎨 Arquitectura Atomic Design

Esta aplicación sigue la metodología **Atomic Design**:

### Atoms (Átomos)

Componentes básicos e indivisibles:

- `Button` - Botones reutilizables
- `Card` - Tarjetas contenedoras
- `Badge` - Etiquetas con variantes
- `Loading` - Indicadores de carga
- `Title` - Títulos tipográficos

### Molecules (Moléculas)

Combinaciones simples de átomos:

- `Table` - Tabla genérica reutilizable
- `Modal` - Modal con overlay
- `Input` - Input con label y validación
- `SectionHeader` - Encabezado de sección con acciones

### Organisms (Organismos)

Componentes complejos con lógica:

- `ListaUsuarios` - Lista completa de usuarios
- `ListaLibros` - Lista completa de libros
- `ListaPrestamos` - Lista de préstamos con funcionalidad de creación
- `FormCrearPrestamo` - Formulario completo para crear préstamos
- `Navigation` - Navegación del dashboard

### Templates (Plantillas)

Layouts de página:

- `DashboardLayout` - Layout principal con navegación

### Pages (Páginas)

Páginas completas:

- `HomePage` - Página de inicio
- `UsuariosPage` - Página de usuarios
- `LibrosPage` - Página de libros
- `PrestamosPage` - Página de préstamos

## 🎯 Funcionalidades

### Dashboard

El dashboard está dividido en dos paneles:

- **Panel Izquierdo (40%)**:
  - Lista de usuarios
  - Lista de libros
- **Panel Derecho (60%)**:
  - Lista de préstamos
  - Botón para crear nuevos préstamos

### Crear Préstamos

1. Haz clic en el botón **"+ Crear Préstamo"** en la tabla de préstamos
2. Selecciona un usuario del dropdown
3. Selecciona un libro del dropdown
4. Haz clic en **"Crear Préstamo"**
5. El préstamo se creará y la lista se actualizará automáticamente

## 🔌 Configuración de API

La aplicación se conecta automáticamente a la API usando la variable de entorno `VITE_API_BASE_URL`.

**Desarrollo**: `http://localhost:3000`
**Producción**: Configura la URL de tu API desplegada

## 🚢 Deployment

Para información detallada sobre deployment, consulta [DEPLOYMENT.md](./DEPLOYMENT.md)

### Opciones Recomendadas

1. **Vercel** (Recomendado) - Optimizado para React/Vite
2. **Netlify** - Deploy automático desde GitHub
3. **Render** - Static site deployment
4. **GitHub Pages** - Gratis para proyectos públicos

## 📝 Scripts Disponibles

- `npm run dev` - Iniciar servidor de desarrollo
- `npm run build` - Construir para producción
- `npm run preview` - Previsualizar build de producción
- `npm run lint` - Ejecutar linter

## 🛠️ Tecnologías Utilizadas

- **React 19** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **TypeScript** - Type safety
- **React Router** - Navegación
- **CSS Modules** - Estilos modulares

## 📄 Licencia

Este proyecto es privado y de uso educativo.

## 👥 Contribución

Este es un proyecto personal. Si deseas contribuir, por favor abre un issue primero.
