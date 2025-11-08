/*
  QualityModel: simple quantitative evaluator
  - computeScore(metrics, weights): metrics is an object with keys (normas, modelos, estandares, codigo, pruebas, usabilidad)
  - weights: object with same keys, values >=0
  Returns value in range 0..5
*/
const QualityModel = (() => {
    function normalize(value) {
        // ensure between 0 and 5
        const v = Number(value);
        if (isNaN(v)) return 0;
        return Math.min(5, Math.max(0, v));
    }

    function computeScore(metrics, weights) {
        const keys = ['normas','modelos','estandares','codigo','pruebas','usabilidad'];
        let totalWeight = 0;
        let weightedSum = 0;
        keys.forEach(k => {
            const w = weights && weights[k] ? Number(weights[k]) : 1;
            const m = metrics && metrics[k] !== undefined ? normalize(metrics[k]) : 0;
            totalWeight += w;
            weightedSum += m * w;
        });
        if (totalWeight === 0) return 0;
        // result is between 0..5 already
        return weightedSum / totalWeight;
    }

    // Utility: map score to qualitative label
    function label(score) {
        if (score >= 4.5) return 'Excelente';
        if (score >= 3.5) return 'Bueno';
        if (score >= 2.5) return 'Aceptable';
        if (score >= 1.5) return 'Bajo';
        return 'Deficiente';
    }

    return { computeScore, label };
})();

if (typeof module !== 'undefined') module.exports = QualityModel;
