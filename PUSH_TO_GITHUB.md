# 📤 Instrucciones para Hacer Push a GitHub

## ✅ Estado Actual

Todos los cambios ya están **committeados localmente** en la rama `main`. Solo necesitas hacer push desde tu máquina.

### Cambios Listos para Subir:

```
✅ server.js                    - Servidor Express
✅ routes/contact.js            - Endpoint de contacto
✅ client/src/App.tsx           - Con GoogleReCaptchaProvider
✅ client/src/pages/Contact.tsx - Integración reCAPTCHA + backend
✅ package.json                 - Nuevas dependencias
✅ package-lock.json            - Lock actualizado
✅ .env.example                 - Plantilla de variables
✅ client/.env.example          - Plantilla frontend
✅ .gitignore                   - Configuración git
✅ SETUP_CONTACT_FORM.md        - Documentación completa
✅ QUICK_START.md               - Guía rápida
✅ CHANGES_SUMMARY.md           - Resumen de cambios
✅ GIT_INSTRUCTIONS.md          - Instrucciones git
✅ test-setup.js                - Script de validación
```

**NO se suben:** `.env` y `client/.env` (contienen credenciales)

## 🚀 Pasos para Hacer Push

### 1. En tu máquina local, actualiza el repositorio

```bash
cd /ruta/a/tu/lockall
git pull origin main
```

### 2. Verifica los cambios

```bash
git log --oneline -1
# Deberías ver: feat: Implement secure contact form with reCAPTCHA v3...
```

### 3. Haz push a GitHub

```bash
git push origin main
```

### 4. Verifica en GitHub

Abre: https://github.com/GabrielVCI/lockall

Deberías ver:
- ✅ El commit "feat: Implement secure contact form with reCAPTCHA v3..."
- ✅ Los archivos nuevos en la rama main
- ✅ `.env` y `client/.env` NO están visibles

## 📋 Después de Hacer Push

Una vez que hayas hecho push, para probar localmente:

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

```bash
# Copiar plantilla
cp .env.example .env
cp client/.env.example client/.env

# Editar con tus credenciales
nano .env
nano client/.env
```

**Variables requeridas en `.env`:**
```env
RECAPTCHA_SECRET_KEY=tu_secret_key
SMTP_PASS=tu_contraseña_smtp
VITE_RECAPTCHA_SITE_KEY=tu_site_key
```

### 3. Validar configuración

```bash
node test-setup.js
```

Deberías ver ✅ en todos los items.

### 4. Iniciar Backend (Terminal 1)

```bash
node server.js
```

Deberías ver:
```
✅ Server running on port 3001
📧 Contact form endpoint: POST http://localhost:3001/api/contact
```

### 5. Iniciar Frontend (Terminal 2)

```bash
npm run dev
```

Deberías ver:
```
➜  Local:   http://localhost:5173/
```

### 6. Probar Formulario

1. Ir a http://localhost:5173/contacto
2. Llenar todos los campos
3. Hacer clic en "Enviar Solicitud"
4. Ver toast de éxito
5. Revisar email en info@lockall.co

## 🔑 Obtener Claves de reCAPTCHA

1. Ir a: https://www.google.com/recaptcha/admin
2. Crear nuevo sitio
3. Seleccionar **reCAPTCHA v3**
4. Agregar dominios:
   - `localhost` (desarrollo)
   - `lockall.co` (producción)
   - `www.lockall.co` (producción)
5. Copiar:
   - **Site Key** → `VITE_RECAPTCHA_SITE_KEY`
   - **Secret Key** → `RECAPTCHA_SECRET_KEY`

## 📧 Configurar SMTP (GoDaddy/Microsoft 365)

```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@lockall.co
SMTP_PASS=tu_contraseña
```

**Nota:** Si tienes 2FA, usa una **contraseña de aplicación**.

## 📚 Documentación Disponible

- **QUICK_START.md** - Guía rápida (5 minutos)
- **SETUP_CONTACT_FORM.md** - Guía completa
- **CHANGES_SUMMARY.md** - Resumen de cambios
- **test-setup.js** - Script de validación

## ✅ Checklist Final

- [ ] Hiciste `git pull origin main`
- [ ] Verificaste el commit con `git log`
- [ ] Hiciste `git push origin main`
- [ ] Verificaste en GitHub que los cambios están
- [ ] Instalaste dependencias con `npm install`
- [ ] Copiaste `.env.example` a `.env`
- [ ] Copiaste `client/.env.example` a `client/.env`
- [ ] Configuraste las variables de entorno
- [ ] Ejecutaste `node test-setup.js` ✅
- [ ] Backend inicia sin errores
- [ ] Frontend inicia sin errores
- [ ] Formulario se envía correctamente
- [ ] Email llega a info@lockall.co

## 🎉 ¡Listo!

Una vez que todo funcione localmente, el sistema de contacto estará completamente operativo.

---

**¿Preguntas?** Revisar `SETUP_CONTACT_FORM.md` para documentación completa.
