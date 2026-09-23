import { WHATSAPP } from '../data'

export default function Taller() {
  return (
    <div className="page-pad">
      <p className="eyebrow">Evento propio</p>
      <h1 className="display mt-4">
        El Camino del <span className="italic text-fuchsia">Perdón Sistémico</span>
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-beige/80">
        Encuentro de 4 horas — en línea o presencial — para máximo 15 personas. Intimidad, contención y respeto. Inversión accesible, con posibilidad de seguimiento individual.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          { k: 'Duración', v: '4 horas' },
          { k: 'Cupo', v: 'Máx. 15' },
          { k: 'Inversión taller grupal', v: 'Consultar' },
        ].map((x) => (
          <div key={x.k} className="card p-6 text-center">
            <p className="eyebrow">{x.k}</p>
            <p className="mt-2 font-serif text-3xl">{x.v}</p>
          </div>
        ))}
      </div>

      <section className="mt-16 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-3xl">Qué ocurre en el taller</h2>
          <p className="mt-4 leading-relaxed text-beige/80">
            Trabajamos lealtades invisibles, exclusiones y culpas que se repiten “sin razón”. El perdón sistémico no es olvidar: es devolverle un lugar al origen para que tu vida presente deje de pagar una deuda que no te corresponde.
          </p>
          <ul className="mt-6 space-y-3 text-beige/80">
            <li>Mapa breve de patrones familiares repetitivos</li>
            <li>Dinámicas de representación en grupo reducido</li>
            <li>Cierre de integración y pautas de los 15 días siguientes</li>
          </ul>
        </div>
        <div className="card p-8">
          <p className="eyebrow">También</p>
          <h3 className="mt-2 font-serif text-3xl">Sanar el Linaje</h3>
          <p className="mt-3 text-beige/75">
            Workshop online en vivo de constelaciones y liberación emocional. 4 horas grupales, cupo 12 personas. Inversión a convenir.
          </p>
          <p className="mt-6 text-sm text-beige/60">
            Retiro de fin de semana «Reconciliación y Calma» en colaboración con centros rurales: consultar.
          </p>
        </div>
      </section>

      <a className="btn-primary mt-12 w-full sm:w-auto" href={WHATSAPP} target="_blank" rel="noreferrer">
        Reservar plaza
      </a>
    </div>
  )
}
