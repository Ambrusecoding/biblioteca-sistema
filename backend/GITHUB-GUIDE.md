# 📦 Guía para Subir Proyecto a GitHub

Esta guía explica paso a paso cómo subir los proyectos `biblioteca-api` y `biblioteca-dashboard` a GitHub.

## 📋 Prerrequisitos

- Cuenta de GitHub creada
- Git instalado en tu sistema
- Repositorios locales configurados

## 🚀 Pasos para Subir a GitHub

### Opción 1: Usar GitHub CLI (Más Rápido)

1. **Instalar GitHub CLI:**
   ```bash
   # Windows (con Chocolatey)
   choco install gh
   
   # O descargar desde: https://cli.github.com/
   ```

2. **Autenticarse:**
   ```bash
   gh auth login
   ```

3. **Crear repositorio y subir (API):**
   ```bash
   cd biblioteca-api
   gh repo create biblioteca-api --public --source=. --push
   ```

4. **Crear repositorio y subir (Dashboard):**
   ```bash
   cd ../biblioteca-dashboard
   gh repo create biblioteca-dashboard --public --source=. --push
   ```

### Opción 2: Usar Git Manual (Más Control)

#### Para biblioteca-api:

1. **Inicializar repositorio (si no está inicializado):**
   ```bash
   cd biblioteca-api
   git init
   ```

2. **Agregar archivos:**
   ```bash
   git add .
   ```

3. **Commit inicial:**
   ```bash
   git commit -m "Initial commit: Biblioteca API - Sistema de gestión de préstamos"
   ```

4. **Crear repositorio en GitHub:**
   - Ve a [github.com/new](https://github.com/new)
   - Nombre: `biblioteca-api`
   - Descripción: "API RESTful para gestión de préstamos de biblioteca"
   - Elige público o privado
   - **NO** inicialices con README, .gitignore o licencia (ya los tienes)
   - Click "Create repository"

5. **Conectar repositorio local con GitHub:**
   ```bash
   git remote add origin https://github.com/TU-USUARIO/biblioteca-api.git
   # Reemplaza TU-USUARIO con tu nombre de usuario de GitHub
   ```

6. **Subir código:**
   ```bash
   git branch -M main
   git push -u origin main
   ```

#### Para biblioteca-dashboard:

Repite los mismos pasos, pero usando:
- Nombre del repo: `biblioteca-dashboard`
- Descripción: "Dashboard React para gestión de préstamos de biblioteca"

```bash
cd biblioteca-dashboard
git init
git add .
git commit -m "Initial commit: Biblioteca Dashboard - Frontend React"
git remote add origin https://github.com/TU-USUARIO/biblioteca-dashboard.git
git branch -M main
git push -u origin main
```

### Opción 3: Repositorio Monorepo (Todo en uno)

Si prefieres tener ambos proyectos en un solo repositorio:

1. **Crear estructura de monorepo:**
   ```bash
   cd C:\Programacion
   git init
   ```

2. **Agregar archivos:**
   ```bash
   git add biblioteca-api/
   git add biblioteca-dashboard/
   ```

3. **Commit:**
   ```bash
   git commit -m "Initial commit: Sistema de gestión de biblioteca - API y Dashboard"
   ```

4. **Crear repositorio en GitHub** llamado `biblioteca-sistema`

5. **Conectar y subir:**
   ```bash
   git remote add origin https://github.com/TU-USUARIO/biblioteca-sistema.git
   git branch -M main
   git push -u origin main
   ```

## 📝 Configurar .gitignore

Asegúrate de que ambos proyectos tengan `.gitignore` configurado. Ya están incluidos y cubren:
- `node_modules/`
- `dist/`
- `.env`
- Archivos de base de datos `.db`
- Logs y archivos temporales

## 🖼️ Subir Diagrama ER como Imagen

### Opción 1: Usar el diagrama Mermaid (Ya incluido)

El archivo `DIAGRAMA-ER.md` contiene un diagrama Mermaid que GitHub renderiza automáticamente. Solo necesitas asegurarte de que esté en el repositorio.

### Opción 2: Crear imagen PNG/JPG

1. **Exportar diagrama desde herramienta visual:**
   - Usa [dbdiagram.io](https://dbdiagram.io)
   - O [draw.io](https://app.diagrams.net/)
   - O cualquier herramienta ERD

2. **Guardar como imagen:**
   - Formato recomendado: PNG o SVG
   - Nombre: `diagrama-er.png` o `diagrama-er.svg`

3. **Agregar a repositorio:**
   ```bash
   # En biblioteca-api
   git add diagrama-er.png
   git commit -m "Add: Diagrama Entidad-Relación de la base de datos"
   git push
   ```

4. **Referenciar en README:**
   ```markdown
   ## Diagrama ER
   
   ![Diagrama ER](./diagrama-er.png)
   ```

## 📚 Verificar Documentación

Antes de subir, verifica que incluyas:

- ✅ `README.md` - Documentación principal
- ✅ `DIAGRAMA-ER.md` - Diagrama de base de datos
- ✅ `DEPLOYMENT.md` - Guía de deployment
- ✅ `package.json` - Dependencias
- ✅ `.gitignore` - Archivos excluidos
- ✅ `LICENSE` (opcional) - Licencia del proyecto

## 🔒 Seguridad: Variables de Entorno

⚠️ **IMPORTANTE**: Nunca subas archivos `.env` al repositorio.

Tu `.gitignore` ya incluye `.env`, pero verifica:

```bash
# Verificar que .env no está en el staging
git status

# Si aparece .env accidentalmente, eliminarlo:
git rm --cached .env
```

Crea un `.env.example` como plantilla:

```bash
# biblioteca-api/.env.example
DATABASE_URL="file:./prisma/dev.db"
PORT=3000
NODE_ENV=development
CORS_ORIGIN="http://localhost:5173"
```

```bash
# biblioteca-dashboard/.env.example
VITE_API_BASE_URL=http://localhost:3000
```

## ✅ Checklist Pre-Deploy

Antes de subir, verifica:

- [ ] Todos los archivos sensibles están en `.gitignore`
- [ ] `README.md` está completo y actualizado
- [ ] Diagrama ER está incluido (como archivo o Mermaid)
- [ ] Todas las dependencias están en `package.json`
- [ ] Scripts de build funcionan correctamente
- [ ] No hay archivos de base de datos reales (solo ejemplos)
- [ ] Documentación de deployment está incluida

## 🎯 Post-Deploy: Configurar GitHub

Después de subir:

1. **Agregar descripción al repositorio**
   - Ve a Settings > General
   - Agrega descripción y temas (tags)

2. **Configurar README como página principal**
   - El `README.md` aparecerá automáticamente en la página principal

3. **Agregar topics/tags:**
   - `nestjs`
   - `react`
   - `typescript`
   - `prisma`
   - `sqlite`
   - `library-management`

4. **Configurar GitHub Pages (opcional para dashboard):**
   - Settings > Pages
   - Source: Deploy from a branch
   - Branch: `main` / folder: `dist`

## 🔗 URLs Recomendadas

Si usas nombres de repositorio estándar:
- API: `https://github.com/TU-USUARIO/biblioteca-api`
- Dashboard: `https://github.com/TU-USUARIO/biblioteca-dashboard`

## 📧 Problemas Comunes

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/TU-USUARIO/biblioteca-api.git
```

### Error: "refusing to merge unrelated histories"
```bash
git pull origin main --allow-unrelated-histories
```

### Error: Autenticación requerida
```bash
# Usar Personal Access Token
git remote set-url origin https://TU-TOKEN@github.com/TU-USUARIO/biblioteca-api.git
```

## 🎓 Recursos Adicionales

- [GitHub Docs](https://docs.github.com/)
- [Git Handbook](https://guides.github.com/introduction/git-handbook/)
- [Git Ignore Patterns](https://git-scm.com/docs/gitignore)

