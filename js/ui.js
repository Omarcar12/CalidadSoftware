/* ui.js
   Micro-interactions: animate radial progress and small helpers
*/
function setRadialProgress(elementSelector, value){
    // value: 0..5
    const el = document.querySelector(elementSelector);
    if (!el) return;
    const svg = el.querySelector('.circle');
    const text = el.querySelector('text');
    const pct = (Number(value) / 5) * 100;
    // stroke-dasharray animation (dash, gap)
    const dash = pct.toFixed(2);
    svg.setAttribute('stroke-dasharray', `${dash},100`);
    if (text) text.textContent = `${Number(value).toFixed(2)}`;
}

function animateRadial(elementSelector, target){
    // simple tween
    let current = 0;
    const steps = 40;
    const increment = target / steps;
    const interval = setInterval(()=>{
        current += increment;
        if (current >= target){
            current = target; clearInterval(interval);
        }
        setRadialProgress(elementSelector, current);
    }, 12);
}

document.addEventListener('DOMContentLoaded', ()=>{
    // initialise any existing radial with default (from results table average)
    const avgEl = document.getElementById('promedio');
    if (avgEl && avgEl.textContent.trim() !== ''){
        const m = parseFloat(avgEl.textContent) || 0;
        animateRadial('#radial-score', m);
    }
});

if (typeof module !== 'undefined') module.exports = { setRadialProgress, animateRadial };
