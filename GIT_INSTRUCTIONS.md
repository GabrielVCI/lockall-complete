# 📤 Instrucciones para Subir Cambios a GitHub

## 📋 Cambios Implementados

Se han agregado los siguientes archivos y cambios:

### ✨ Archivos Nuevos

```
✅ server.js                    - Servidor Express principal
✅ routes/contact.js            - Endpoint de contacto
✅ .env                         - Variables de entorno (backend)
✅ .env.example                 - Plantilla de variables (backend)
✅ client/.env                  - Variables de entorno (frontend)
✅ client/.env.example          - Plantilla de variables (frontend)
✅ SETUP_CONTACT_FORM.md        - Guía de configuración
✅ QUICK_START.md               - Guía rápida
✅ CHANGES_SUMMARY.md           - Resumen de cambios
✅ test-setup.js                - Script de validación
✅ GIT_INSTRUCTIONS.md          - Este archivo
```

### 🔄 Archivos Modificados

```
✅ client/src/pages/Contact.tsx - Integración con reCAPTCHA y backend
✅ client/src/App.tsx           - Proveedor de reCAPTCHA
✅ package.json                 - Nuevas dependencias
✅ package-lock.json            - Lock file actualizado
```

## 🔐 Seguridad: Archivos Sensibles

⚠️ **NO SUBIR A GITHUB:**
- `.env` - Contiene credenciales reales
- `client/.env` - Contiene claves reales

✅ **SÍ SUBIR A GITHUB:**
- `.env.example` - Plantilla sin credenciales
- `client/.env.example` - Plantilla sin credenciales

## 📝 Pasos para Subir Cambios

### 1️⃣ Verificar Estado

```bash
cd /home/ubuntu/lockall
git status
```

Deberías ver archivos nuevos y modificados.

### 2️⃣ Agregar Archivos (Excluir .env)

```bash
# Agregar todos excepto .env
git add .
git reset .env
git reset client/.env
```

O agregar específicamente:

```bash
git add server.js
git add routes/
git add client/src/pages/Contact.tsx
git add client/src/App.tsx
git add package.json
git add package-lock.json
git add .env.example
git add client/.env.example
git add SETUP_CONTACT_FORM.md
git add QUICK_START.md
git add CHANGES_SUMMARY.md
git add test-setup.js
git add GIT_INSTRUCTIONS.md
```

### 3️⃣ Verificar Cambios a Subir

```bash
git status
```

Deberías ver solo archivos públicos (sin .env).

### 4️⃣ Hacer Commit

```bash
git commit -m "feat: Implement secure contact form with reCAPTCHA v3 and SMTP email integration

- Add Express backend server with /api/contact endpoint
- Integrate Google reCAPTCHA v3 for bot protection
- Implement Nodemailer for SMTP email sending
- Update Contact form component with backend integration
- Add comprehensive documentation and setup guides
- Include validation, security measures, and error handling"
```

### 5️⃣ Crear Branch (Opcional pero Recomendado)

```bash
# Crear branch para feature
git checkout -b feature/contact-form-recaptcha

# Hacer commit
git commit -m "feat: Implement secure contact form with reCAPTCHA v3 and SMTP"

# Subir branch
git push origin feature/contact-form-recaptcha
```

### 6️⃣ Subir a GitHub

```bash
# Si estás en main/master
git push origin main

# O si estás en un branch
git push origin feature/contact-form-recaptcha
```

## 🔄 Flujo Alternativo: Pull Request

Si prefieres hacer un Pull Request:

### 1. Crear Branch

```bash
git checkout -b feature/contact-form-recaptcha
```

### 2. Hacer Cambios y Commit

```bash
git add .
git reset .env client/.env
git commit -m "feat: Implement secure contact form with reCAPTCHA v3"
```

### 3. Subir Branch

```bash
git push origin feature/contact-form-recaptcha
```

### 4. Crear PR en GitHub

1. Ir a https://github.com/GabrielVCI/lockall
2. Hacer clic en "Pull requests"
3. Hacer clic en "New pull request"
4. Seleccionar tu branch
5. Agregar descripción
6. Hacer clic en "Create pull request"

## 📋 Checklist Antes de Subir

- [ ] Verificar que `.env` NO está en staging
- [ ] Verificar que `client/.env` NO está en staging
- [ ] Verificar que `.env.example` SÍ está en staging
- [ ] Verificar que `client/.env.example` SÍ está en staging
- [ ] Ejecutar `git status` y revisar archivos
- [ ] Revisar commit message
- [ ] Verificar que no hay archivos sensibles

## 🚨 Si Accidentalmente Subiste .env

Si accidentalmente subiste `.env`:

```bash
# Remover del repositorio (pero mantener localmente)
git rm --cached .env
git rm --cached client/.env

# Agregar a .gitignore
echo ".env" >> .gitignore
echo "client/.env" >> .gitignore

# Hacer commit
git commit -m "chore: Remove .env files from tracking"

# Subir
git push origin main
```

⚠️ **IMPORTANTE:** Las credenciales ya están comprometidas. Cambiar:
- Claves de reCAPTCHA
- Contraseña SMTP
- Cualquier otra credencial expuesta

## 📝 Mensaje de Commit Sugerido

```
feat: Implement secure contact form with reCAPTCHA v3 and SMTP email integration

Features:
- Add Express backend server with CORS configuration
- Implement /api/contact endpoint with reCAPTCHA verification
- Add Nodemailer integration for SMTP email sending
- Update Contact form component with backend integration
- Implement HTML escaping for security
- Add comprehensive validation and error handling

Security:
- reCAPTCHA v3 with score threshold of 0.5
- HTML input escaping to prevent injection
- CORS whitelist for authorized domains
- Email validation and field validation

Documentation:
- Add SETUP_CONTACT_FORM.md with detailed setup guide
- Add QUICK_START.md for rapid deployment
- Add CHANGES_SUMMARY.md with overview of changes
- Add test-setup.js for configuration validation

Dependencies:
- react-google-recaptcha-v3
- nodemailer
- cors
- dotenv
- html-escaper
```

## 🔗 Recursos Útiles

- [Documentación de Git](https://git-scm.com/doc)
- [GitHub Help](https://help.github.com)
- [Conventional Commits](https://www.conventionalcommits.org/)

## ✅ Verificación Final

Después de subir, verifica en GitHub:

1. Ir a https://github.com/GabrielVCI/lockall
2. Verificar que los archivos están en el repositorio
3. Verificar que `.env` NO está visible
4. Verificar que `.env.example` SÍ está visible
5. Revisar el commit en el historial

## 🎉 ¡Listo!

Una vez que los cambios estén en GitHub, otros desarrolladores pueden:

1. Clonar el repositorio
2. Copiar `.env.example` a `.env`
3. Configurar sus credenciales
4. Ejecutar `npm install`
5. Seguir la guía de `QUICK_START.md`

---

**Preguntas?** Revisar `SETUP_CONTACT_FORM.md` para documentación completa.
