import { Play } from 'lucide-react'
import { useState } from 'react'

export default function VideoCard({ video }) {
  const [failed, setFailed] = useState(!video.src)

  const showEmbed = Boolean(video.youtubeId)
  const showFile = Boolean(video.src) && !failed && !showEmbed

  return (
    <article className="card overflow-hidden">
      <div className="relative mx-auto aspect-[9/16] max-h-[540px] w-full max-w-[300px] bg-purple">
        {showEmbed ? (
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${video.youtubeId}`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : showFile ? (
          <video
            className="h-full w-full bg-purple object-contain"
            controls
            playsInline
            preload="metadata"
            src={video.src}
            onError={() => setFailed(true)}
          />
        ) : (
          <>
            <img src={video.poster} alt="" className="h-full w-full object-cover opacity-70" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-purple/45 px-6 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-fuchsia text-white">
                <Play size={22} fill="white" />
              </span>
              <p className="max-w-xs text-sm text-beige">
                Video de quien ya tomó un diagnóstico o un proceso. Se publica aquí en cuanto esté el archivo.
              </p>
            </div>
          </>
        )}
      </div>
      <div className="p-5">
        <p className="eyebrow">{video.label}</p>
        <h3 className="mt-2 font-serif text-2xl">{video.title}</h3>
      </div>
    </article>
  )
}
