import { WHATSAPP_NUMBER } from '../data'
import { useLocale } from '../context/LocaleContext'
import '../styles/integracion.css'

function Rich({ text }) {
  const parts = String(text).split(/\{\/?b\}/)
  return parts.map((part, idx) => (idx % 2 === 1 ? <b key={idx}>{part}</b> : <span key={idx}>{part}</span>))
}

export default function Integracion() {
  const { t } = useLocale()
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t('integracion.waMsg'))}`
  const pains = t('integracion.pains')
  const yes = t('integracion.yes')
  const no = t('integracion.no')
  const phases = t('integracion.phases')
  const modes = t('integracion.modes')
  const yesIfItems = t('integracion.yesIfItems')
  const seekItems = t('integracion.seekItems')
  const faq = t('integracion.faq')

  return (
    <div className="integracion">
      <section className="sec hero">
        <div className="in">
          <p className="eyebrow">{t('integracion.eyebrow')}</p>
          <h1>{t('integracion.h1')}</h1>
          <p className="promise">{t('integracion.promise')}</p>
          <p className="sub">{t('integracion.sub')}</p>
          <a className="btn" href={href} target="_blank" rel="noreferrer">{t('integracion.cta')}</a>
        </div>
      </section>

      <section className="sec">
        <div className="in">
          <h2 className="center">{t('integracion.painsTitle')}</h2>
          <div className="pains">
            {pains.map((item) => (
              <div className="pain" key={item}><Rich text={item} /></div>
            ))}
          </div>
          <p className="lead center bridge">{t('integracion.bridge')}</p>
        </div>
      </section>

      <section className="sec">
        <div className="in">
          <h2 className="center">{t('integracion.whatTitle')}</h2>
          <div className="two">
            <div className="col yes">
              <h3>{t('integracion.yesTitle')}</h3>
              <ul>{yes.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <div className="col no">
              <h3>{t('integracion.noTitle')}</h3>
              <ul>{no.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      <section className="sec paper2">
        <div className="in">
          <p className="eyebrow">{t('integracion.processEyebrow')}</p>
          <h2 className="center title-gap">{t('integracion.processTitle')}</h2>
          <div className="phases">
            {phases.map((phase) => (
              <div className="phase" key={phase.n}>
                <div className="n">{phase.n}</div>
                <div>
                  <div className="t">{phase.t}</div>
                  <div className="d">{phase.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="in">
          <h2 className="center">{t('integracion.modesTitle')}</h2>
          <div className="modes">
            {modes.map((mode) => (
              <div className="mode" key={mode.h}>
                <h3>{mode.h}</h3>
                <p>{mode.p}</p>
              </div>
            ))}
          </div>
          <p className="lead center presencial"><Rich text={t('integracion.presencial')} /></p>
        </div>
      </section>

      <section className="sec paper2">
        <div className="in">
          <p className="eyebrow">{t('integracion.aboutEyebrow')}</p>
          <h2 className="center about-title">{t('integracion.aboutTitle')}</h2>
          <div className="box">
            <div className="ph">{t('integracion.photo')}</div>
            <div className="txt">
              <p className="lead">{t('integracion.bio')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="in">
          <h2 className="center">{t('integracion.fitTitle')}</h2>
          <div className="two">
            <div className="col yes">
              <h3>{t('integracion.yesIf')}</h3>
              <ul>{yesIfItems.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <div className="col no">
              <h3>{t('integracion.seek')}</h3>
              <ul>{seekItems.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </div>
          <div className="safe">
            <p><Rich text={t('integracion.safe')} /></p>
          </div>
        </div>
      </section>

      <section className="sec paper2">
        <div className="in-narrow">
          <h2 className="center faq-title">{t('integracion.faqTitle')}</h2>
          {faq.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <div className="a">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="sec cierre">
        <div className="in-narrow">
          <h2>{t('integracion.closeTitle')}</h2>
          <p className="lead">{t('integracion.closeLead')}</p>
          <a className="btn" href={href} target="_blank" rel="noreferrer">{t('integracion.closeCta')}</a>
        </div>
      </section>
    </div>
  )
}
