import { EMAIL, INSTAGRAM, PHONE_LABEL, WHATSAPP } from '../data'

export default function Contacto() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <p className="eyebrow">Contacto</p>
      <h1 className="mt-3 font-serif text-5xl text-purple">Estoy feliz de que estés acá</h1>
      <p className="mt-4 max-w-2xl text-lg text-purple/75">
        Cuando sientes una carga invisible, culpa o falta de dirección que no se resuelve con métodos convencionales, es momento de mirar el origen. Escríbeme y te acompaño.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <a href={WHATSAPP} target="_blank" rel="noreferrer" className="card p-8">
          <p className="eyebrow">WhatsApp</p>
          <h2 className="mt-3 font-serif text-3xl">{PHONE_LABEL}</h2>
          <p className="mt-2 text-sm text-purple/70">Respuesta cercana, sin prisa ni presión.</p>
        </a>
        <a href={`mailto:${EMAIL}`} className="card p-8">
          <p className="eyebrow">Email</p>
          <h2 className="mt-3 font-serif text-2xl break-all">{EMAIL}</h2>
          <p className="mt-2 text-sm text-purple/70">Consultas extensas o propuestas profesionales.</p>
        </a>
        <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="card p-8">
          <p className="eyebrow">Instagram</p>
          <h2 className="mt-3 font-serif text-3xl">@maribella_conexion</h2>
          <p className="mt-2 text-sm text-purple/70">Micro-lecciones serenas, no ruido.</p>
        </a>
      </div>

      <form
        className="card mt-12 max-w-xl p-8"
        onSubmit={(e) => {
          e.preventDefault()
          const data = new FormData(e.currentTarget)
          const text = `Hola Maribella, soy ${data.get('nombre')}. ${data.get('mensaje')}`
          window.open(`${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank')
        }}
      >
        <p className="eyebrow">Escríbeme</p>
        <label className="mt-5 block text-xs uppercase tracking-widest text-purple/60">Nombre</label>
        <input name="nombre" required className="mt-1 w-full border-b border-purple/20 bg-transparent py-2 outline-none" />
        <label className="mt-5 block text-xs uppercase tracking-widest text-purple/60">Mensaje</label>
        <textarea name="mensaje" rows="4" required className="mt-1 w-full border-b border-purple/20 bg-transparent py-2 outline-none" />
        <button type="submit" className="btn-primary mt-8">
          Enviar por WhatsApp
        </button>
      </form>
    </div>
  )
}
