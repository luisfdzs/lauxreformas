# LAUX Reformas · web

Web corporativa de **LAUX Reformas** (Salvaterra de Miño, Pontevedra).
Next.js 16 (App Router) + Tailwind CSS 4 + next-intl. Idiomas: castellano (`/es`, por defecto), gallego (`/gl`) e inglés (`/en`).

## Desarrollo

```bash
npm install
cp .env.example .env.local   # opcional
npm run dev                  # http://localhost:3000
npm run build && npm run lint
```

## Ramas y entornos

| Rama   | Uso                  | Despliegue (Vercel)                         |
| ------ | -------------------- | ------------------------------------------- |
| `dev`  | desarrollo (por defecto) | no se despliega                         |
| `test` | entorno de pruebas   | proyecto `lauxreformastest`                 |
| `prod` | producción           | proyecto `lauxreformas`                     |

Para publicar:

```bash
git checkout test && git merge dev && git push      # despliega en test
git checkout prod && git merge test && git push     # despliega en producción
git checkout dev
```

Cada proyecto de Vercel tiene configurada su rama de producción y un *Ignored Build Step* para que solo construya su rama.

## Dónde se cambia cada cosa

- **Datos de la empresa** (teléfono, WhatsApp, email, cifras, titular legal): `src/config/site.ts`
- **Textos** (todos los idiomas): `messages/es.json`, `messages/gl.json`, `messages/en.json`
- **Servicios**: `src/content/services.ts` (+ textos en `messages/*`)
- **Proyectos de la galería**: `src/content/projects.ts` + fotos en `public/images/projects/`
- **Municipios** (página Zonas): `src/content/zones.ts`
- **Logo**: `src/components/LogoMark.tsx` y ficheros en `public/brand/`

> Los datos de contacto, cifras, reseñas, textos legales y fotos son **provisionales** hasta tener los reales del cliente.
> Las fotos son de Unsplash (ver `public/images/CREDITS.md`).

## Variables de entorno

Ver `.env.example`.

- `NEXT_PUBLIC_SITE_URL`: URL pública (canonical, sitemap).
- `NEXT_PUBLIC_ENVIRONMENT`: `production` solo en prod (habilita la indexación en `robots.txt`).
- `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`: envío del formulario por email con [Resend](https://resend.com). Sin API key el formulario funciona, pero solo registra la solicitud en los logs.
