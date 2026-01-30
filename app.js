// BASE DE DATOS LOCAL (Luego será una API)
const store = {
    lang: 'es',
    content: {
        es: {
            title: "Soluciones <span class='text-blue-600'>Digitales</span>",
            subtitle: "Sistemas de alta eficiencia para el mercado global.",
            cta: "PEDIR PRESUPUESTO",
            demo: "Ver Demo →"
        },
        en: {
            title: "Digital <span class='text-blue-600'>Solutions</span>",
            subtitle: "High-efficiency systems for the global market.",
            cta: "GET A QUOTE",
            demo: "View Demo →"
        }
    },
    services: [
        { id: 'ind', name: {es: "Industria", en: "Industry"}, icon: "fa-industry", color: "bg-slate-800", link: "industria.html" },
        { id: 'gas', name: {es: "Gastronomía", en: "Gastronomy"}, icon: "fa-utensils", color: "bg-orange-500", link: "menu.html" },
        { id: 'bar', name: {es: "Barbería", en: "Barber Shop"}, icon: "fa-scissors", color: "bg-blue-600", link: "turnos.html" },
        { id: 'real', name: {es: "Inmobiliaria", en: "Real Estate"}, icon: "fa-house", color: "bg-emerald-500", link: "propiedades.html" }
    ]
};

// FUNCIÓN DE RENDERIZADO
function render() {
    const { lang, content, services } = store;
    const t = content[lang];

    // Actualizar Textos
    document.getElementById('main-title').innerHTML = t.title;
    document.getElementById('main-subtitle').innerText = t.subtitle;
    document.getElementById('cta-button').innerText = t.cta;

    // Generar Tarjetas
    const container = document.getElementById('app-container');
    container.innerHTML = services.map(s => `
        <a href="${s.link}" class="demo-card shadow-sm">
            <div class="w-12 h-12 rounded-xl ${s.color} text-white flex items-center justify-center">
                <i class="fa-solid ${s.icon}"></i>
            </div>
            <div class="flex-1">
                <h3 class="font-bold text-slate-800">${s.name[lang]}</h3>
                <p class="text-blue-600 font-bold text-[10px] uppercase">${t.demo}</p>
            </div>
        </a>
    `).join('');
}

// CAMBIO DE IDIOMA
function setLanguage(newLang) {
    store.lang = newLang;
    render();
}

// INICIO
function contact() {
    const msg = store.lang === 'es' ? "Hola Miguel!" : "Hello Michael!";
    window.open(`https://wa.me/541136139401?text=${encodeURIComponent(msg)}`);
}

document.addEventListener('DOMContentLoaded', render);
