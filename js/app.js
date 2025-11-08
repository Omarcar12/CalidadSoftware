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
        document.getElementById("promedio").innerText = `Calificación final: ${score.toFixed(2)} / 5`;
    } else {
        // Fallback al comportamiento anterior
        const puntajes = [4,5,4,5,4,5];
        const suma = puntajes.reduce((a,b)=>a+b,0);
        const promedio = suma / puntajes.length;
        document.getElementById("promedio").innerText = "Calificación final: " + promedio.toFixed(2) + " / 5";
    }
}

// Hook para el botón en resultados.html
document.addEventListener('DOMContentLoaded', ()=>{
    const btn = document.getElementById('calc-btn');
    if (btn) btn.addEventListener('click', calcularPromedio);
});
