import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(cors());

const viajerosActivos = new Map<string, number>();

// Función para guardar logs
const logger = (mensaje: string, tipo: 'ERROR' | 'INFO' = 'INFO') => {
    const timestamp = new Date().toISOString();
    const logFila = `[${timestamp}] [${tipo}]: ${mensaje}\n`;
    
    // Imprime en consola con color
    const color = tipo === 'ERROR' ? '\x1b[31m' : '\x1b[32m';
    console.log(`${color}${logFila}\x1b[0m`);

    // Guarda en el archivo error.log
    fs.appendFileSync(path.join(__dirname, 'error.log'), logFila);
};
 
// ruta para detectar viajeros
app.get('/api/heartbeat', (req, res) => {

    try {

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    const ipString = ip.toString();
    const ahora = Date.now();

    // Si la IP no estaba en el mapa, es un nuevo viajero
    if (!viajerosActivos.has(ipString)) {
        console.log(`\x1b[32m[ENTRADA]\x1b[0m Nuevo viajero detectado desde: ${ipString} 🛰️`);
    }

    viajerosActivos.set(ipString, ahora);

    // Limpieza de los que se fueron
    for (const [uIp, ultimo] of viajerosActivos.entries()) {
        if (ahora - ultimo > 10000) {
            viajerosActivos.delete(uIp);
            console.log(`\x1b[31m[SALIDA]\x1b[0m Un viajero ha dejado la órbita. 🚀`);
        }
    }

    res.json({ conectados: viajerosActivos.size });

    logger("Pulso recibido correctamente", 'INFO');
    res.json({ conectados: 1 });
     } catch (error) {
        logger(`Fallo en el pulso: ${error}`, 'ERROR');
        res.status(500).json({ error: "Error interno del núcleo" });
    }
});

app.listen(3000, () => {
    console.log("\n\x1b[1m\x1b[35m=== NÚCLEO DE LA ODISEA ACTIVO ===\x1b[0m");
    console.log("📡 Monitoreando transmisiones en puerto 3000...\n");
});