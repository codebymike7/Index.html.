// CONFIGURACIÓN DE TU BASE DE DATOS
const SB_URL = "TU_PROJECT_URL_AQUÍ"; // Ejemplo: https://xyz.supabase.co
const SB_KEY = "TU_ANON_KEY_AQUÍ";     // La cadena larga que empieza con 'ey...'

// ESTADO GLOBAL DE LA APLICACIÓN
const store = {
    lang: localStorage.getItem('lang') || 'es',
    services: [],
    ui: {
        es: {
            title: "Soluciones <span class='text-blue-600'>Digitales</span>",
            subtitle: "Sistemas de alta eficiencia para comercios y PyMEs.",
            cta: "PEDIR PRESUPUESTO",
            demoBtn: "Online →"
        },
        en: {
            title: "Digital <span class='text-blue-600'>Solutions</span>",
            subtitle: "High-efficiency systems for global businesses.",
            cta: "GET A QUOTE",
            demoBtn: "Live Demo →"
        }
    }
};

// 1. CARGAR DATOS DESDE SUPABASE
async function init() {
    try {
        const response = await fetch(`${SB_URL}/rest/v1/services?select=*`, {
            headers: {
                "apikey": SB_KEY,
                "Authorization": `Bearer ${SB_KEY}`
            }
        });

        if (!response.ok) throw new Error("Error conectando a la base de datos");

        store.services = await response.json();
        render(); // Dibujar todo una vez que tenemos los datos
    } catch (error) {
        console.error("Fallo crítico:", error);
        document.getElementById('services-container').innerHTML = 
            "<p class='text-center text-red-500 font-bold'>Error de conexión con la base de datos.</p>";
    }
}

// 2. DIBUJAR LA INTERFAZ (RENDER)
function render() {
    const { lang, services, ui } = store;
    const t = ui[lang];

    // Actualizar Textos Estáticos
    document.getElementById('main-title').innerHTML = t.title;
    document.getElementById('main-subtitle').innerText = t.subtitle;
    document.getElementById('cta-button').innerText = t.cta;

    // Actualizar Lista de Servicios
    const container = document.getElementById('services-container');
    container.innerHTML = services.map(s => `
        <a href="${s.link}" class="demo-card shadow-sm hover:shadow-md transition-shadow">
            <div class="icon-box ${s.color} shadow-lg"><i class="fa-solid ${s.icon}"></i></div>
            <div class="flex-1">
                <h3 class="font-bold text-slate-800 text-sm">
                    ${lang === 'es' ? s.name_es : s.name_en}
                </h3>
                <p class="text-blue-600 font-bold text-[9px] uppercase tracking-wider">
                    ${t.demoBtn}
                </p>
            </div>
        </a>
    `).join('');
}

// 3. CAMBIAR IDIOMA (Global para los botones)
window.setLanguage = (newLang) => {
    store.lang = newLang;
    localStorage.setItem('lang', newLang); // Guardar preferencia en el navegador
    render();
};

// 4. CONTACTO WHATSAPP
window.solicitarPresupuesto = () => {
    const msg = store.lang === 'es' 
        ? "¡Hola Miguel! Me interesa un presupuesto." 
        : "Hello Michael! I'm interested in a quote.";
    window.open(`https://wa.me/541136139401?text=${encodeURIComponent(msg)}`, '_blank');
};

// INICIAR APP
document.addEventListener('DOMContentLoaded', init);
