document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('run-eval');
    const downloadBtn = document.getElementById('download-json');
    const resultDiv = document.getElementById('eval-result');

    function readForm() {
        const f = document.getElementById('eval-form');
        const metrics = {
            normas: !isNaN(parseFloat(f.normas.value)) ? parseFloat(f.normas.value) : 0,
            modelos: !isNaN(parseFloat(f.modelos.value)) ? parseFloat(f.modelos.value) : 0,
            estandares: !isNaN(parseFloat(f.estandares.value)) ? parseFloat(f.estandares.value) : 0,
            codigo: !isNaN(parseFloat(f.codigo.value)) ? parseFloat(f.codigo.value) : 0,
            pruebas: !isNaN(parseFloat(f.pruebas.value)) ? parseFloat(f.pruebas.value) : 0,
            usabilidad: !isNaN(parseFloat(f.usabilidad.value)) ? parseFloat(f.usabilidad.value) : 0
        };
        const weights = {
            normas: (()=>{const v=parseFloat(f.w_normas.value); return (!isNaN(v)&&isFinite(v))?v:1})(),
            modelos: (()=>{const v=parseFloat(f.w_modelos.value); return (!isNaN(v)&&isFinite(v))?v:1})(),
            estandares: (()=>{const v=parseFloat(f.w_estandares.value); return (!isNaN(v)&&isFinite(v))?v:1})(),
            codigo: (()=>{const v=parseFloat(f.w_codigo.value); return (!isNaN(v)&&isFinite(v))?v:1})(),
            pruebas: (()=>{const v=parseFloat(f.w_pruebas.value); return (!isNaN(v)&&isFinite(v))?v:1})(),
            usabilidad: (()=>{const v=parseFloat(f.w_usabilidad.value); return (!isNaN(v)&&isFinite(v))?v:1})()
        };
        return { metrics, weights };
    }

    function validateWeights(weights){
        const keys = Object.keys(weights||{});
        for(const k of keys){
            const w = weights[k];
            if (!isFinite(w) || isNaN(w) || w < 0) return { ok:false, key:k, value:w };
        }
        return { ok:true };
    }

    function showResult(scoreObj) {
        resultDiv.innerHTML = `
            <h2>Resultado</h2>
            <p>Puntuación final: <strong>${scoreObj.score.toFixed(2)}</strong> / 5</p>
            <p>Etiqueta: <strong>${scoreObj.label}</strong></p>
            <pre>${JSON.stringify(scoreObj.details, null, 2)}</pre>
        `;
    }

    btn.addEventListener('click', () => {
        const { metrics, weights } = readForm();
        const msgArea = document.getElementById('form-message');
        // validate weights
        const v = validateWeights(weights);
        if (!v.ok){
            if (msgArea) msgArea.innerHTML = `<strong style="color:#ffb3a7">Error:</strong> El peso para <code>${v.key}</code> no es válido (${v.value}). Usa un número >= 0.`;
            return;
        }
        const score = QualityModel.computeScore(metrics, weights);
        const lbl = QualityModel.label(score);
        const details = { metrics, weights };
        const out = { score, label: lbl, details };
        showResult(out);
        // clear message
        const msgArea2 = document.getElementById('form-message'); if (msgArea2) msgArea2.innerHTML = '';
        // animate radial in results page if present
        const avgEl = document.getElementById('promedio');
        if (avgEl) {
            avgEl.textContent = `${score.toFixed(2)} / 5`;
        }
        if (typeof animateRadial === 'function') animateRadial('#radial-score', score);
        // store for download and persist so resultados.html can read it
        window._lastEval = out;
        try {
            localStorage.setItem('lastEvaluation', JSON.stringify(out));
        } catch (e) {
            // If storage is not available, keep in-memory only
            console.warn('No se pudo guardar en localStorage:', e);
        }
    });

    // 'Usar ejemplo' button behavior: fills the form with example values
    const exampleBtn = document.getElementById('use-example');
    if (exampleBtn){
        exampleBtn.addEventListener('click', ()=>{
            const f = document.getElementById('eval-form');
            if (!f) return;
            f.normas.value = 4; f.modelos.value = 5; f.estandares.value = 4; f.codigo.value = 5; f.pruebas.value = 4; f.usabilidad.value = 5;
            f.w_normas.value = 1; f.w_modelos.value = 1; f.w_estandares.value = 1; f.w_codigo.value = 1; f.w_pruebas.value = 1; f.w_usabilidad.value = 1;
            // optionally run evaluation automatically
            // btn.click(); // uncomment if you prefer auto-run
            const msgArea = document.getElementById('form-message'); if (msgArea) msgArea.innerHTML = '<em>Ejemplo cargado — ajusta valores y pulsa "Calcular evaluación"</em>';
        });
    }

    downloadBtn.addEventListener('click', () => {
        const data = window._lastEval || { error: 'No hay evaluación disponible. Ejecute primero.' };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'evaluacion_calidad.json';
        a.click();
        URL.revokeObjectURL(url);
    });
});
