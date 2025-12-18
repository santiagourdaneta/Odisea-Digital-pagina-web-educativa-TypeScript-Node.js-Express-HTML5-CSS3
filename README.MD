# 🚀 Odisea Digital: Fullstack Ultra-Light

![Deployment Status](https://github.com/santiagourdaneta/Odisea-Digital-pagina-web-educativa-TypeScript-Node.js-Express-HTML5-CSS3/actions/workflows/deploy.yml/badge.svg)
![TypeScript](https://img.shields.io/badge/language-TypeScript-3178C6?logo=typescript)
![Express](https://img.shields.io/badge/backend-Express-000000?logo=express)

**Odisea Digital** es una pagina web educativa diseñada con un enfoque en **rendimiento extremo** y **UX futurista**. El proyecto demuestra cómo construir una arquitectura moderna (Frontend + Backend) que sea capaz de correr fluidamente en hardware antiguo.

---

## 🌟 Características Principales

* **⚡ Arquitectura Ultra-Ligera:** Construido con Vite y TypeScript para una carga casi instantánea.
* **📡 Telemetría en Tiempo Real:** Sistema de *Heartbeat* que detecta usuarios activos sin usar WebSockets pesados.
* **🛡️ Castillo de Seguridad:** Implementación de *Rate Limiting* y validación de CORS.
* **🌱 Modo Eco (UX):** Función integrada para desactivar efectos visuales pesados (Glassmorphism) y ahorrar CPU.
* **🤖 CI/CD Ready:** Configuración lista para CircleCI que garantiza código impecable mediante Linting automático.

---

## 🏗️ Estructura del Proyecto

```text
├── .circleci/          # Configuración de Integración Continua
├── server/             # Cerebro (Backend) - Node.js + Express
├── src/                # Cara (Frontend) - HTML5, CSS3 Moderno, TS
│   ├── styles/         # Glassmorphism & Animaciones
│   └── main.ts         # Lógica de presencia y scroll
├── eslint.config.js    # Inspector de calidad de código
└── vite.config.ts      # Configuraciones de optimización de archivos

🚀 Instalación y Uso

1. Clonar y preparar

git clone [https://github.com/santiagourdaneta/Odisea-Digital-pagina-web-educativa-TypeScript-Node.js-Express-HTML5-CSS3](https://github.com/santiagourdaneta/Odisea-Digital-pagina-web-educativa-TypeScript-Node.js-Express-HTML5-CSS3)
cd Odisea-Digital-pagina-web-educativa-TypeScript-Node.js-Express-HTML5-CSS3
npm install

2. Encender el Cerebro (Backend)

npx tsx server/index.ts

3. Encender la Interfaz (Frontend)

npm run dev

🛠️ Stack Tecnológico

Tecnología y Propósito

Vite - Compilación ultra-rápida y optimización de assets.
TypeScript - Seguridad de tipos y prevención de errores en desarrollo.
Express - Servidor minimalista para gestión de presencia.
ESLint 9 - Garantía de código limpio y profesional.
CircleCI - Automatización de pruebas y despliegue.

📐 Conceptos de Informática Enseñados

El proyecto guía al usuario a través de 4 capas fundamentales:

Sistemas: El flujo de energía y bits.
Algoritmos: La lógica y recetas de resolución.
Estructuras de Datos: El orden y organización de la información.
Programación: La interfaz entre el humano y la máquina.

👨‍💻 Autor

https://github.com/santiagourdaneta/ - GitHub

Este proyecto fue desarrollado bajo la filosofía de "Código Limpio" y "Eficiencia Energética".

