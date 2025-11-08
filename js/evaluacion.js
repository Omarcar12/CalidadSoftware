document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('run-eval');
    const downloadBtn = document.getElementById('download-json');
    const resultDiv = document.getElementById('eval-result');

    function readForm() {
        const f = document.getElementById('eval-form');
        const metrics = {
            normas: parseFloat(f.normas.value) || 0,
            modelos: parseFloat(f.modelos.value) || 0,
            estandares: parseFloat(f.estandares.value) || 0,
            codigo: parseFloat(f.codigo.value) || 0,
            pruebas: parseFloat(f.pruebas.value) || 0,
            usabilidad: parseFloat(f.usabilidad.value) || 0
        };
        const weights = {
            normas: parseFloat(f.w_normas.value) || 1,
            modelos: parseFloat(f.w_modelos.value) || 1,
            estandares: parseFloat(f.w_estandares.value) || 1,
            codigo: parseFloat(f.w_codigo.value) || 1,
            pruebas: parseFloat(f.w_pruebas.value) || 1,
            usabilidad: parseFloat(f.w_usabilidad.value) || 1
        };
        return { metrics, weights };
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
        const score = QualityModel.computeScore(metrics, weights);
        const lbl = QualityModel.label(score);
        const details = { metrics, weights };
        const out = { score, label: lbl, details };
        showResult(out);
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
