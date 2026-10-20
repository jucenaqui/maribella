import { Navigate, useParams } from 'react-router-dom'
import { useLocale } from '../context/LocaleContext'

const APPS = {
  'ancla-3-minutos': { src: '/apps/ancla-3-minutos.html', titleKey: 'recursos.appAnclaTitle' },
  'arbol-familiar': { src: '/apps/arbol-familiar.html', titleKey: 'recursos.appArbolTitle' },
  'auto-perdon-7-dias': { src: '/apps/auto-perdon-7-dias.html', titleKey: 'recursos.appPerdonTitle' },
  'balanza-dar-y-recibir': { src: '/apps/balanza-dar-y-recibir.html', titleKey: 'recursos.appBalanzaTitle' },
  'carta-para-soltar': { src: '/apps/carta-para-soltar.html', titleKey: 'recursos.appSoltarTitle' },
  'carta-del-dia': { src: '/apps/carta-del-dia.html', titleKey: 'recursos.appCartaDiaTitle' },
  'calendario-lunar': { src: '/apps/calendario-lunar.html', titleKey: 'recursos.appLunarTitle' },
  'mapa-bagua': { src: '/apps/mapa-bagua.html', titleKey: 'recursos.appBaguaTitle' },
  'limpieza-de-tu-espacio': { src: '/apps/limpieza-de-tu-espacio.html', titleKey: 'recursos.appLimpiezaTitle' },
  'fechas-que-se-repiten': { src: '/apps/fechas-que-se-repiten.html', titleKey: 'recursos.appFechasTitle' },
  'cuaderno-semanal': { src: '/apps/cuaderno-semanal.html', titleKey: 'recursos.appCuadernoTitle' },
}

export default function Microapp() {
  const { slug } = useParams()
  const { t } = useLocale()
  const app = APPS[slug]
  if (!app) return <Navigate to="/recursos" replace />

  return (
    <iframe
      title={t(app.titleKey)}
      src={app.src}
      className="block h-[calc(100dvh-4.25rem)] w-full border-0 bg-[#F2EBC4]"
    />
  )
}
