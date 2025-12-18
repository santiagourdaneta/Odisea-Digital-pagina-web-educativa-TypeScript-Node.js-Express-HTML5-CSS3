import './styles/main.css';

const ecoBtn = document.getElementById('eco-mode');
let ecoActivo = false;

ecoBtn?.addEventListener('click', () => {
  ecoActivo = !ecoActivo;
  ecoBtn.innerText = ecoActivo ? '🌱 Modo Ahorro: ON' : '🌱 Modo Ahorro: OFF';

  // Si el modo ahorro está activo, quitamos el desenfoque (blur) que cansa a la CPU
  document.body.classList.toggle('low-perf', ecoActivo);
});

const statusElement = document.getElementById('status');

const actualizarColorPorPresencia = (cantidad: number) => {
  // Si hay mucha gente (3+), el color se vuelve violeta eléctrico
  // Si hay poca (1-2), se mantiene cian futurista
  const color = cantidad > 2 ? '#bd00ff' : '#00d4ff';
  document.documentElement.style.setProperty('--neon', color);
};

const enviarPulsoPresencia = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/heartbeat');
        const data = await res.json();
        
        if (statusElement) {
            statusElement.innerHTML = `Exploradores en línea: <span>${data.conectados}</span>`;
            // Cambia el color si hay más de 1 persona
            const color = data.conectados > 1 ? '#00ff9d' : '#00d4ff';
            document.documentElement.style.setProperty('--neon-verde', color);
        }
    } catch (_) {
        if (statusElement) statusElement.innerText = "Sincronizando con el Núcleo...";
    }
};

// Iniciar radar
enviarPulsoPresencia();
setInterval(enviarPulsoPresencia, 5000);

// Animación de entrada suave (Scroll UX)
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target as HTMLElement;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.glass-card').forEach((card) => {
  const el = card as HTMLElement;
  el.style.opacity = '0';
  el.style.transform = 'translateY(50px)';
  el.style.transition = 'all 0.8s cubic-bezier(0.2, 1, 0.2, 1)';
  observer.observe(el);
});

const matrixEffect = () => {
    const canvas = document.getElementById('matrix-canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops: number[] = new Array(Math.floor(columns)).fill(1);

    const draw = () => {
        ctx.fillStyle = "rgba(5, 5, 5, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#00ff9d";
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    };
    setInterval(draw, 33);
};
matrixEffect();
