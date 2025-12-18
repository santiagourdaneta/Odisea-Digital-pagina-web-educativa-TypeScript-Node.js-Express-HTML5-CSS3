import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

const viajerosActivos = new Map<string, number>();

app.get('/api/heartbeat', (req, res) => {
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
});

app.listen(3000, () => {
    console.log("\n\x1b[1m\x1b[35m=== NÚCLEO DE LA ODISEA ACTIVO ===\x1b[0m");
    console.log("📡 Monitoreando transmisiones en puerto 3000...\n");
});