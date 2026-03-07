# 📧 Contact Form Setup Guide

Este documento describe cómo configurar y probar el sistema de formulario de contacto con reCAPTCHA v3 e integración SMTP.

## 📋 Requisitos Previos

- Node.js 16+ instalado
- npm o pnpm
- Claves de reCAPTCHA v3 (Google)
- Credenciales SMTP (GoDaddy/Microsoft 365)

## 🚀 Instalación Rápida

### 1. Instalar Dependencias

```bash
# Instalar todas las dependencias
npm install

# O con pnpm
pnpm install
```

Las siguientes dependencias ya han sido instaladas:
- `react-google-recaptcha-v3` - Integración de reCAPTCHA v3 en React
- `nodemailer` - Envío de emails via SMTP
- `cors` - Configuración CORS para el backend
- `dotenv` - Gestión de variables de entorno
- `html-escaper` - Escape de HTML para seguridad

### 2. Configurar Variables de Entorno

#### Backend (.env en la raíz del proyecto)

```bash
# Copiar el archivo de ejemplo
cp .env.example .env

# Editar .env con tus credenciales
nano .env
```

**Variables requeridas:**

```env
# Server
PORT=3001

# reCAPTCHA (obtener en https://www.google.com/recaptcha/admin)
RECAPTCHA_SECRET_KEY=YOUR_SECRET_KEY

# Email destino
CONTACT_TO_EMAIL=info@lockall.co

# SMTP (GoDaddy/Microsoft 365)
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@lockall.co
SMTP_PASS=YOUR_PASSWORD

# Email remitente
MAIL_FROM=Lockall Website <info@lockall.co>

# Frontend
VITE_RECAPTCHA_SITE_KEY=YOUR_SITE_KEY
VITE_API_URL=http://localhost:3001
```

#### Frontend (client/.env)

```bash
# Copiar el archivo de ejemplo
cp client/.env.example client/.env

# Editar client/.env
nano client/.env
```

**Variables requeridas:**

```env
VITE_RECAPTCHA_SITE_KEY=YOUR_SITE_KEY
VITE_API_URL=http://localhost:3001
```

### 3. Obtener Claves de reCAPTCHA v3

1. Ir a: https://www.google.com/recaptcha/admin
2. Crear un nuevo sitio
3. Seleccionar **reCAPTCHA v3**
4. Agregar dominios:
   - `localhost` (desarrollo)
   - `lockall.co` (producción)
   - `www.lockall.co` (producción)
5. Copiar las claves:
   - **Site Key** → `VITE_RECAPTCHA_SITE_KEY`
   - **Secret Key** → `RECAPTCHA_SECRET_KEY`

### 4. Configurar SMTP (GoDaddy/Microsoft 365)

#### Opción A: GoDaddy Email

```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@lockall.co
SMTP_PASS=YOUR_PASSWORD
```

#### Opción B: Microsoft 365

```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@lockall.co
SMTP_PASS=YOUR_PASSWORD
```

**Nota:** Si tienes 2FA habilitado, usa una **contraseña de aplicación** en lugar de tu contraseña normal.

## 🧪 Pruebas Locales

### Terminal 1: Iniciar Backend

```bash
# Desde la raíz del proyecto
node server.js

# Deberías ver:
# ✅ Server running on port 3001
# 📧 Contact form endpoint: POST http://localhost:3001/api/contact
```

### Terminal 2: Iniciar Frontend

```bash
# Desde la raíz del proyecto
npm run dev

# Deberías ver:
# ➜  Local:   http://localhost:5173/
```

### Terminal 3: Probar Endpoint (Opcional)

```bash
# Probar que el servidor está corriendo
curl http://localhost:3001/api/health

# Deberías recibir:
# {"ok":true,"message":"Server is running"}
```

### Prueba Manual del Formulario

1. Abrir http://localhost:5173/contacto
2. Llenar todos los campos del formulario
3. Hacer clic en "Enviar Solicitud"
4. Esperar a que se procese (reCAPTCHA + envío de email)
5. Deberías ver un toast de éxito
6. Revisar el email en info@lockall.co

## 📊 Flujo de Funcionamiento

```
Usuario llena formulario
        ↓
Hace clic en "Enviar Solicitud"
        ↓
Frontend ejecuta reCAPTCHA v3 (executeRecaptcha)
        ↓
Obtiene token de reCAPTCHA
        ↓
Envía POST a /api/contact con token
        ↓
Backend valida campos requeridos
        ↓
Backend verifica token con Google
        ↓
Backend valida score > 0.5
        ↓
Backend envía email via SMTP
        ↓
Frontend muestra toast de éxito
        ↓
Formulario se resetea
```

## 🔒 Medidas de Seguridad Implementadas

✅ **HTML Escaping** - Todos los inputs se escapan antes de enviar en email
✅ **reCAPTCHA v3** - Protección contra bots con score threshold de 0.5
✅ **Validación de Campos** - Todos los campos requeridos se validan
✅ **CORS** - Solo se aceptan requests de dominios autorizados
✅ **Email Validation** - Validación de formato de email
✅ **Logging** - Logs detallados para debugging

## 📝 Logs y Debugging

### Backend Logs

```
📨 New contact form submission received
📊 reCAPTCHA Score: 0.85, Action: contact_form_submit
✅ Email sent successfully to info@lockall.co
```

### Errores Comunes

| Error | Causa | Solución |
|-------|-------|----------|
| `RECAPTCHA_SECRET_KEY not set` | Variable de entorno faltante | Configurar `.env` con claves válidas |
| `SMTP connection failed` | Credenciales SMTP incorrectas | Verificar usuario, contraseña y host |
| `reCAPTCHA verification failed` | Token inválido o expirado | Verificar que el site key es correcto |
| `CORS error` | Origen no autorizado | Agregar dominio a corsOptions en server.js |
| `Email validation failed` | Email inválido | Usar formato válido: usuario@dominio.com |

## 🚢 Despliegue a Producción

### Variables de Entorno Producción

```env
# .env (producción)
PORT=3001
RECAPTCHA_SECRET_KEY=prod_secret_key
CONTACT_TO_EMAIL=info@lockall.co
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@lockall.co
SMTP_PASS=prod_password
MAIL_FROM=Lockall Website <info@lockall.co>
VITE_RECAPTCHA_SITE_KEY=prod_site_key
VITE_API_URL=https://api.lockall.co
```

### CORS para Producción

Actualizar `server.js` para incluir dominios de producción:

```javascript
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://lockall.co",
    "https://www.lockall.co",
  ],
  // ... resto de configuración
};
```

### Comandos de Build

```bash
# Build frontend
npm run build

# Build backend (si es necesario)
# El backend usa Node.js directamente, no necesita build

# Iniciar en producción
NODE_ENV=production node server.js
```

## 📚 Archivos Modificados/Creados

| Archivo | Descripción |
|---------|-------------|
| `server.js` | Servidor Express principal |
| `routes/contact.js` | Endpoint de contacto con reCAPTCHA y SMTP |
| `client/src/pages/Contact.tsx` | Formulario actualizado con reCAPTCHA |
| `client/src/App.tsx` | Envuelto con GoogleReCaptchaProvider |
| `.env` | Variables de entorno backend |
| `.env.example` | Plantilla de variables backend |
| `client/.env` | Variables de entorno frontend |
| `client/.env.example` | Plantilla de variables frontend |

## 🆘 Soporte

Si encuentras problemas:

1. Verifica que todas las variables de entorno están configuradas
2. Revisa los logs en la consola del servidor
3. Asegúrate que reCAPTCHA está habilitado en Google
4. Verifica que las credenciales SMTP son correctas
5. Comprueba que los puertos 3001 y 5173 están disponibles

## 📞 Contacto

Para preguntas sobre la implementación, contacta al equipo de desarrollo.

---

**Última actualización:** Marzo 2026
**Versión:** 1.0.0
