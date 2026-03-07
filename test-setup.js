#!/usr/bin/env node

/**
 * Script de validación de configuración
 * Verifica que todas las variables de entorno necesarias estén configuradas
 */

import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Cargar variables de entorno
dotenv.config();

const requiredEnvVars = [
  { name: "RECAPTCHA_SECRET_KEY", type: "backend", description: "reCAPTCHA Secret Key" },
  { name: "CONTACT_TO_EMAIL", type: "backend", description: "Email de destino" },
  { name: "SMTP_HOST", type: "backend", description: "Host SMTP" },
  { name: "SMTP_PORT", type: "backend", description: "Puerto SMTP" },
  { name: "SMTP_USER", type: "backend", description: "Usuario SMTP" },
  { name: "SMTP_PASS", type: "backend", description: "Contraseña SMTP" },
  { name: "MAIL_FROM", type: "backend", description: "Email remitente" },
];

const requiredFiles = [
  "server.js",
  "routes/contact.js",
  "client/src/pages/Contact.tsx",
  "client/src/App.tsx",
  ".env",
  "client/.env",
];

console.log("\n🔍 Validando configuración del formulario de contacto...\n");

// Verificar archivos
console.log("📁 Verificando archivos...");
let filesOk = true;
for (const file of requiredFiles) {
  const filePath = path.join(__dirname, file);
  const exists = fs.existsSync(filePath);
  const status = exists ? "✅" : "❌";
  console.log(`  ${status} ${file}`);
  if (!exists) filesOk = false;
}

// Verificar variables de entorno
console.log("\n🔐 Verificando variables de entorno...");
let envOk = true;
for (const envVar of requiredEnvVars) {
  const value = process.env[envVar.name];
  const isSet = value && value !== `YOUR_${envVar.name}` && !value.includes("YOUR_");
  const status = isSet ? "✅" : "⚠️";
  console.log(`  ${status} ${envVar.name} - ${envVar.description}`);
  if (!isSet) envOk = false;
}

// Verificar dependencias
console.log("\n📦 Verificando dependencias...");
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, "package.json"), "utf-8"));
const requiredDeps = [
  "react-google-recaptcha-v3",
  "nodemailer",
  "cors",
  "dotenv",
  "html-escaper",
  "express",
];

let depsOk = true;
for (const dep of requiredDeps) {
  const isInstalled = packageJson.dependencies[dep] || packageJson.devDependencies[dep];
  const status = isInstalled ? "✅" : "❌";
  console.log(`  ${status} ${dep}`);
  if (!isInstalled) depsOk = false;
}

// Resumen
console.log("\n📊 Resumen de validación:\n");
console.log(`  Archivos: ${filesOk ? "✅ OK" : "❌ Faltan archivos"}`);
console.log(`  Variables de entorno: ${envOk ? "✅ OK" : "⚠️ Faltan configurar"}`);
console.log(`  Dependencias: ${depsOk ? "✅ OK" : "❌ Faltan instalar"}`);

// Instrucciones
if (!envOk) {
  console.log("\n📝 Próximos pasos:\n");
  console.log("1. Editar .env con tus credenciales:");
  console.log("   nano .env\n");
  console.log("2. Obtener claves de reCAPTCHA:");
  console.log("   https://www.google.com/recaptcha/admin\n");
  console.log("3. Configurar SMTP (GoDaddy/Microsoft 365):");
  console.log("   SMTP_HOST=smtp.office365.com");
  console.log("   SMTP_PORT=587");
  console.log("   SMTP_USER=tu-email@lockall.co");
  console.log("   SMTP_PASS=tu-contraseña\n");
}

// Estado final
const allOk = filesOk && depsOk;
console.log(allOk ? "✅ ¡Listo para probar!\n" : "❌ Hay problemas por resolver\n");

process.exit(allOk && envOk ? 0 : 1);
