import { Navigate, useParams } from 'react-router-dom'
import { useLocale } from '../context/LocaleContext'

const APPS = {
  'ancla-3-minutos': { src: '/apps/ancla-3-minutos.html', titleKey: 'recursos.appAnclaTitle' },
  'arbol-familiar': { src: '/apps/arbol-familiar.html', titleKey: 'recursos.appArbolTitle' },
  'auto-perdon-7-dias': { src: '/apps/auto-perdon-7-dias.html', titleKey: 'recursos.appPerdonTitle' },
  'balanza-dar-y-recibir': { src: '/apps/balanza-dar-y-recibir.html', titleKey: 'recursos.appBalanzaTitle' },
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
