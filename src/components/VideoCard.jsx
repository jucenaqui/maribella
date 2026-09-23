import { Play } from 'lucide-react'
import { useState } from 'react'
import { useLocale } from '../context/LocaleContext'

export default function VideoCard({ video }) {
  const { t } = useLocale()
  const [failed, setFailed] = useState(!video.src)

  const showEmbed = Boolean(video.youtubeId)
  const showFile = Boolean(video.src) && !failed && !showEmbed

  return (
    <article className="card flex h-full w-full max-w-[340px] flex-col overflow-hidden rounded-2xl">
      <div className="relative aspect-[9/16] w-full bg-purple">
        {showEmbed ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${video.youtubeId}`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : showFile ? (
          <video
            className="absolute inset-0 h-full w-full bg-purple object-cover"
            controls
            playsInline
            preload="metadata"
            src={video.src}
            onError={() => setFailed(true)}
          />
        ) : (
          <>
            <img src={video.poster} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-purple/45 px-6 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-fuchsia text-white">
                <Play size={22} fill="white" />
              </span>
              <p className="max-w-xs text-sm text-beige">{t('voces.pending')}</p>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow">{video.label}</p>
        <h3 className="mt-2 line-clamp-2 min-h-[3.5rem] font-serif text-2xl leading-snug">{video.title}</h3>
      </div>
    </article>
  )
}
