/**
 * ODISEA DIGITAL - NÚCLEO DEL SERVIDOR (v1.0.0)
 * Stack: Node.js + Express + TypeScript
 * Propósito: Gestión de presencia en tiempo real y logging de auditoría.
 */

import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import rateLimit from 'express-rate-limit';
import { fileURLToPath } from 'url';

// --- CONFIGURACIÓN DE RUTAS MODERNAS (ESM) ---
// En módulos ES, __dirname no existe por defecto. Aquí la recreamos.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOG_FILE_PATH = path.join(__dirname, 'error.log');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Base de datos volátil para seguimiento de usuarios (IP -> Timestamp)
const activos = new Map<string, number>();

// Limitador de tasa para rutas sensibles (como /admin/logs)
const logRateLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minuto
    max: 5,              // máximo 5 solicitudes por minuto
    message: "Demasiadas solicitudes a los logs del sistema. Por favor, espere un minuto antes de intentar nuevamente.",
    standardHeaders: true, // devuelve los headers RateLimit estándar
    legacyHeaders: false,  // deshabilita los headers X-RateLimit obsoletos
});

/**
 * SISTEMA DE LOGGING PROFESIONAL
 * Registra eventos en la terminal y en un archivo físico .log
 */
const registrarEvento = (mensaje: string, tipo: 'ERROR' | 'INFO' = 'INFO') => {
    const timestamp = new Date().toISOString();
    const logFila = `[${timestamp}] [${tipo}]: ${mensaje}\n`;
    
    // Output en terminal con colores ANSI
    const color = tipo === 'ERROR' ? '\x1b[31m' : '\x1b[32m';
    console.log(`${color}${logFila}\x1b[0m`);

    // Persistencia en archivo (appendFileSync crea el archivo si no existe)
    try {
        fs.appendFileSync(LOG_FILE_PATH, logFila);
    } catch (err) {
        console.error("CRITICAL: No se pudo escribir en el sistema de archivos", err);
    }
};

/**
 * @route GET /api/heartbeat
 * @desc Recibe pulsos de presencia del frontend y gestiona el conteo de usuarios.
 */
app.get('/api/heartbeat', (req: Request, res: Response) => {
    try {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
        const ipString = Array.isArray(ip) ? ip[0] : ip;
        const ahora = Date.now();

        // Detectar si es un usuario nuevo
        if (!activos.has(ipString)) {
            registrarEvento(`Nuevo explorador detectado desde: ${ipString}`, 'INFO');
        }

        activos.set(ipString, ahora);

        // Limpieza de sesiones inactivas (más de 10 segundos sin pulso)
        for (const [uIp, ultimoPulso] of activos.entries()) {
            if (ahora - ultimoPulso > 10000) {
                activos.delete(uIp);
                registrarEvento(`Explorador desconectado: ${uIp}`, 'INFO');
            }
        }

        res.json({ 
            status: "online", 
            conectados: activos.size,
            timestamp: ahora 
        });

    } catch (error) {
        registrarEvento(`Fallo en el pulso: ${error}`, 'ERROR');
        res.status(500).json({ error: "Fallo en el Núcleo" });
    }
});

/**
 * @route GET /admin/logs
 * @desc Visualización remota de registros del sistema (Ruta secreta).
 */
app.get('/admin/logs', logRateLimiter, (req: Request, res: Response) => {
    try {
        if (!fs.existsSync(LOG_FILE_PATH)) {
            return res.status(404).send("<h1>No hay registros aún.</h1>");
        }
        
        const logs = fs.readFileSync(LOG_FILE_PATH, 'utf8');
        res.send(`
            <html>
                <body style="background: #050505; color: #00ff9d; font-family: monospace; padding: 20px;">
                    <h2 style="border-bottom: 1px solid #333;">ODISEA DIGITAL - LOGS DEL SISTEMA</h2>
                    <pre>${logs}</pre>
                    <script>setInterval(() => location.reload(), 5000);</script>
                </body>
            </html>
        `);
    } catch (error) {
        res.status(500).send("Error al leer logs.");
    }
});

// Inicialización del Servidor
app.listen(PORT, () => {
    console.clear(); // Limpia la terminal para un inicio elegante
    console.log("\x1b[1m\x1b[35m");
    console.log("=========================================");
    console.log("   🚀 NÚCLEO DE LA ODISEA ACTIVO         ");
    console.log("   📡 PUERTO: " + PORT                   );
    console.log("=========================================");
    console.log("\x1b[0m");
    registrarEvento("Servidor reiniciado y listo para transmisiones.");
});