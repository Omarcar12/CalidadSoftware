# Proyecto: Calidad de Software (sitio)

Este repositorio contiene un sitio estático (HTML/CSS/JS) orientado a explicar y evaluar la calidad de software en proyectos educativos.

Contenido principal:
- `index.html` - Página principal.
- `normas.html`, `modelos.html`, `estandares.html`, `codigo.html`, `pruebas.html`, `resultados.html` - Secciones del proyecto.
- `evaluacion.html` - Página para evaluar cuantitativamente un aplicativo (formulario + cálculo 0-5).
- `demo_app.html` - Mini-aplicativo educativo de ejemplo para evaluar.
- `css/estilo.css` - Estilos.
- `js/quality-model.js` - Modelo cuantitativo para calcular puntuación (0..5) a partir de métricas y pesos.
- `js/evaluacion.js` - Lógica de la página de evaluación (interacción y descarga JSON).

Cómo probar localmente:

1. Abrir `index.html` en el navegador (doble clic o desde el editor).
2. Ir a "Evaluación" y probar diferentes puntajes; luego descargar el resultado en JSON.

Despliegue público (sugerido):
- Subir el repositorio a GitHub y activar GitHub Pages (Settings -> Pages) apuntando a la rama `main` o `gh-pages`.
- Alternativamente, usar Netlify o Vercel para publicar la carpeta como sitio estático.

Generar documento PDF en formato APA:
- He incluido `project_document.md` (plantilla). Abre el archivo en un editor y exporta a PDF (por ejemplo: Visual Studio Code -> Print -> Save as PDF, o usar pandoc).

Si quieres, continúo con:
- Mejorar contenido escrito de cada sección (APA, referencias, conclusiones y recomendaciones).
- Generar el `project_document.md` con contenido completo (y luego exportarlo a PDF si quieres que lo haga en HTML/MD y te guíe para convertirlo).
- Publicar en GitHub Pages (si me das permiso para crear archivo de configuración o instrucciones adicionales).

Publicar este sitio en GitHub Pages (pasos rápidos)

1) Crea un repositorio en GitHub (https://github.com/new). No añadas README/License desde la web (para evitar conflictos: lo hacemos localmente).

2) En PowerShell (Windows), en la carpeta del proyecto (`c:\Users\omarc\OneDrive\Desktop\Calidad Software`):

```powershell
git init
git add .
git commit -m "Initial site: Calidad de Software"
git branch -M main
# sustituye <USERNAME> y <REPO> con tu usuario y el nombre del repo que creaste en GitHub
git remote add origin https://github.com/<USERNAME>/<REPO>.git
git push -u origin main
```

Nota: si tu carpeta está en OneDrive puedes tener conflictos con Git; si ves errores considera mover la carpeta fuera de OneDrive temporalmente.

3) La GitHub Actions workflow `./github/workflows/deploy-pages.yml` que añadí subirá el contenido al sistema de GitHub Pages automáticamente cada vez que hagas push a `main`. Cuando el workflow termine (unos minutos) tu sitio estará disponible en:

```
https://<USERNAME>.github.io/<REPO>/
```

4) Alternativa manual: en la configuración del repositorio (Settings -> Pages) puedes seleccionar la rama `gh-pages` o `main` y la carpeta `/ (root)` si prefieres no usar Actions.

Si quieres, puedo:
- Generar un `CNAME` si vas a usar un dominio personalizado.
- Ayudarte a crear el repo en GitHub (te doy los pasos exactos o el contenido para pegar en la web).
- Probar el sitio después del despliegue y ajustar rutas relativas si algo falla.


