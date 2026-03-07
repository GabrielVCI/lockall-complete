# 🚀 Guía Rápida - Sistema de Contacto

## ⚡ Inicio Rápido (5 minutos)

### 1️⃣ Configurar Variables de Entorno

```bash
# Backend (.env en la raíz)
cp .env.example .env
nano .env

# Frontend (client/.env)
cp client/.env.example client/.env
nano client/.env
```

**Mínimo requerido en `.env`:**
```env
RECAPTCHA_SECRET_KEY=tu_secret_key_aqui
SMTP_PASS=tu_contraseña_aqui
VITE_RECAPTCHA_SITE_KEY=tu_site_key_aqui
```

### 2️⃣ Instalar Dependencias

```bash
npm install
```

### 3️⃣ Ejecutar Pruebas de Configuración

```bash
node test-setup.js
```

Deberías ver ✅ en todos los items.

### 4️⃣ Iniciar Backend (Terminal 1)

```bash
node server.js
```

Deberías ver:
```
✅ Server running on port 3001
📧 Contact form endpoint: POST http://localhost:3001/api/contact
```

### 5️⃣ Iniciar Frontend (Terminal 2)

```bash
npm run dev
```

Deberías ver:
```
➜  Local:   http://localhost:5173/
```

### 6️⃣ Probar Formulario

1. Abrir http://localhost:5173/contacto
2. Llenar todos los campos
3. Hacer clic en "Enviar Solicitud"
4. Esperar respuesta (2-3 segundos)
5. Ver toast de éxito
6. Revisar email en info@lockall.co

## 🔑 Obtener Claves de reCAPTCHA

1. Ir a: https://www.google.com/recaptcha/admin
2. Crear nuevo sitio
3. Seleccionar **reCAPTCHA v3**
4. Agregar dominios: `localhost`, `lockall.co`, `www.lockall.co`
5. Copiar claves a `.env`

## 📧 Configurar SMTP

### GoDaddy/Microsoft 365

```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@lockall.co
SMTP_PASS=tu_contraseña
```

## 🧪 Pruebas Rápidas

### Verificar Backend

```bash
curl http://localhost:3001/api/health
# Respuesta: {"ok":true,"message":"Server is running"}
```

### Verificar Validación

```bash
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"institution":"Test"}'
# Respuesta: {"ok":false,"message":"Field \"country\" is required"}
```

## 🐛 Solucionar Problemas

| Problema | Solución |
|----------|----------|
| Puerto 3001 en uso | Cambiar `PORT` en `.env` |
| CORS error | Verificar que frontend está en `http://localhost:5173` |
| Email no se envía | Verificar credenciales SMTP en `.env` |
| reCAPTCHA falla | Verificar que site key es correcta |
| Formulario no envía | Abrir DevTools (F12) y revisar Network tab |

## 📁 Archivos Importantes

| Archivo | Propósito |
|---------|-----------|
| `server.js` | Servidor Express |
| `routes/contact.js` | Lógica de contacto |
| `client/src/pages/Contact.tsx` | Formulario |
| `client/src/App.tsx` | Proveedor reCAPTCHA |
| `.env` | Variables backend |
| `client/.env` | Variables frontend |

## 📚 Documentación Completa

Para más detalles, ver: `SETUP_CONTACT_FORM.md`

## ✅ Checklist de Prueba

- [ ] Configurar `.env` con credenciales
- [ ] Ejecutar `node test-setup.js` ✅
- [ ] Backend inicia sin errores
- [ ] Frontend inicia sin errores
- [ ] Página de contacto carga correctamente
- [ ] Formulario se envía correctamente
- [ ] Email llega a info@lockall.co
- [ ] Toast de éxito aparece
- [ ] Formulario se resetea después de envío

## 🚀 Listo para Producción

Una vez que todo funciona localmente:

1. Actualizar `.env` con credenciales de producción
2. Actualizar CORS en `server.js` con dominios de producción
3. Usar `VITE_API_URL=https://api.lockall.co` en producción
4. Deployar backend y frontend
5. Verificar que emails se envían correctamente

---

**¿Necesitas ayuda?** Ver `SETUP_CONTACT_FORM.md` para documentación completa.
