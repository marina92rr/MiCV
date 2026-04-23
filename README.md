# MiCV

Este proyecto trata de mi CV, está realizado con Next.js y MongoDB. 
Está dirigido para las entrevistas que quieran conocer mis trabajos, estudios y carrera profesional, de manera divertida.

## Descripción

**MiCV** es una aplicación web tipo portfolio donde se pueden mostrar proyectos, skills y secciones personales de forma visual y responsive.

## Roles según usuario

### Usuario anónimo
- Página de inicio
- Sección "Sobre mí"
- Listado de proyectos
- Vista individual de proyecto
- Listado de skills
- Página de contacto
- Diseño responsive

### Usuario registrado
- Registro de usuario
- Login
- Comentar en proyectos
- Eliminar tus propios comentarios

### Usuario administrador
- Login
- CRUD de proyectos
- CRUD de skills
- Crear, editar o eliminar contenido
- Manejo de control de comentarios
- Subida y renderizado de imágenes de proyectos

## Tecnologías utilizadas

### Frontend
- Next.js
- React
- Tailwind CSS
- JavaScript
- Bootstrap icons

### Backend
- API Routes con Next.js
- MongoDB
- Mongoose
- JWT / autenticación basada en token
- Bcrypt / encriptado de contraseñas

### Despliegue
- Vercel

## Funciones 

### Proyectos
- Crear proyectos con:
  - título
  - descripción
  - enlace
  - skills asociadas
  - logo
  - imagen principal
- Mostrar proyectos en cards
- Alternar layout visual entre cards
- Ver detalle individual de cada proyecto
- Eliminar también las imágenes físicas asociadas al proyecto

### Skills
- Crear nuevas skills
- Editar skills existentes
- Eliminar skills
- Mostrar icono y nivel

### Usuarios
- Registro
- Validación de contraseñas
- Login
- Protección de acciones administrativas

## Estructura de MyCV

```bash
public/
    projects/
src/
  app/
    api/
    about/
    auth/
    contact/
    myProjects/
    mySkills/
  components/
  data/
  hooks/
  lib/
  models/
