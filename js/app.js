// UI glue: cálculo rápido usando el modelo de calidad
function calcularPromedio() {
    // Si existe el modelo global, usa valores por defecto o ejemplo
    const defaultMetrics = {
        normas: 4,
        modelos: 5,
        estandares: 4,
        codigo: 5,
        pruebas: 4,
        usabilidad: 5
    };
    // Try to read a persisted evaluation (from evaluacion.js)
    try {
        const raw = localStorage.getItem('lastEvaluation');
        if (raw) {
            const out = JSON.parse(raw);
            const score = Number(out.score) || 0;
            const label = out.label || '';
            const avgEl = document.getElementById('promedio');
            if (avgEl) avgEl.textContent = `${score.toFixed(2)} / 5`;
            // animate radial if available
            if (typeof animateRadial === 'function') animateRadial('#radial-score', score);

            // populate results table if present
            const tbody = document.getElementById('results-body');
            if (tbody && out.details && out.details.metrics) {
                const m = out.details.metrics;
                tbody.innerHTML = `
                    <tr><td>Normas</td><td>${Number(m.normas).toFixed(2)}</td><td>--</td></tr>
                    <tr><td>Modelos</td><td>${Number(m.modelos).toFixed(2)}</td><td>--</td></tr>
                    <tr><td>Estándares</td><td>${Number(m.estandares).toFixed(2)}</td><td>--</td></tr>
                    <tr><td>Código</td><td>${Number(m.codigo).toFixed(2)}</td><td>--</td></tr>
                    <tr><td>Pruebas</td><td>${Number(m.pruebas).toFixed(2)}</td><td>--</td></tr>
                    <tr><td>Usabilidad</td><td>${Number(m.usabilidad).toFixed(2)}</td><td>--</td></tr>
                `;
            }
            return;
        }
    } catch (e) {
        console.warn('No se pudo leer lastEvaluation:', e);
    }

    // Fallback: show a default sample score using QualityModel if available
    if (typeof QualityModel !== 'undefined') {
        const weights = {
            normas: 1,
            modelos: 1,
            estandares: 1,
            codigo: 1,
            pruebas: 1,
            usabilidad: 1
        };
        const score = QualityModel.computeScore(defaultMetrics, weights);
        const avgEl = document.getElementById('promedio');
        if (avgEl) avgEl.innerText = `${score.toFixed(2)} / 5`;
        if (typeof animateRadial === 'function') animateRadial('#radial-score', score);
    } else {
        // legacy fallback
        const puntajes = [4,5,4,5,4,5];
        const suma = puntajes.reduce((a,b)=>a+b,0);
        const promedio = suma / puntajes.length;
        const avgEl = document.getElementById('promedio');
        if (avgEl) avgEl.innerText = promedio.toFixed(2) + ' / 5';
        if (typeof animateRadial === 'function') animateRadial('#radial-score', promedio);
    }
}

// Hook para el botón en resultados.html
document.addEventListener('DOMContentLoaded', ()=>{
    const btn = document.getElementById('calc-btn');
    if (btn) btn.addEventListener('click', calcularPromedio);
});

// React to changes on localStorage made from other tabs (e.g., user recalculó en evaluacion.html)
window.addEventListener('storage', (ev) => {
    if (ev.key !== 'lastEvaluation') return;
    try {
        const out = JSON.parse(ev.newValue);
        if (!out) return;
        const score = Number(out.score) || 0;
        const avgEl = document.getElementById('promedio');
        if (avgEl) avgEl.textContent = `${score.toFixed(2)} / 5`;
        if (typeof animateRadial === 'function') animateRadial('#radial-score', score);
        const tbody = document.getElementById('results-body');
        if (tbody && out.details && out.details.metrics) {
            const m = out.details.metrics;
            tbody.innerHTML = `
                <tr><td>Normas</td><td>${Number(m.normas).toFixed(2)}</td><td>--</td></tr>
                <tr><td>Modelos</td><td>${Number(m.modelos).toFixed(2)}</td><td>--</td></tr>
                <tr><td>Estándares</td><td>${Number(m.estandares).toFixed(2)}</td><td>--</td></tr>
                <tr><td>Código</td><td>${Number(m.codigo).toFixed(2)}</td><td>--</td></tr>
                <tr><td>Pruebas</td><td>${Number(m.pruebas).toFixed(2)}</td><td>--</td></tr>
                <tr><td>Usabilidad</td><td>${Number(m.usabilidad).toFixed(2)}</td><td>--</td></tr>
            `;
        }
    } catch (e) {
        console.warn('Error al procesar cambio de storage:', e);
    }
});
