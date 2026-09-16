# Maribella

Sitio de marca para **Maribella · la sanación en todas tus dimensiones**.

Arquitectura editorial inspirada en [sandraflorez.com](https://www.sandraflorez.com/) (hero 2 columnas, menú en versalitas, tarjetas de caminos, CTA WhatsApp) con paleta propia:

- Fucsia `#D6236B`
- Morado `#4B2E63`
- Beige `#EDE3D3`

## Páginas

**Light (beige)**  
Inicio · Servicios · Voces · Sobre mí · Contacto

**Dark (morado)**  
Mentoría · Taller · Recursos

### Voces (no “recomendaciones”)

La sección se llama **Voces** porque no son reseñas de un producto: son personas que tomaron un **diagnóstico** o un **proceso**.

Para los dos videos, elige una:

1. Copia los archivos a `public/videos/despues-del-diagnostico.mp4` y `public/videos/un-proceso.mp4`
2. O pega el ID de YouTube en `src/data.js` → `voces.videos[].youtubeId`

## Desarrollo

```bash
cd maribella
npm install
npm run dev
```

Abre http://localhost:5174/
