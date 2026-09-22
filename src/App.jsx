import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Servicios from './pages/Servicios.jsx'
import Sobre from './pages/Sobre.jsx'
import Contacto from './pages/Contacto.jsx'
import Mentoria from './pages/Mentoria.jsx'
import Taller from './pages/Taller.jsx'
import Recursos from './pages/Recursos.jsx'
import Cotizador from './pages/Cotizador.jsx'
import Voces from './pages/Voces.jsx'

function Page({ theme, children }) {
  return <Layout theme={theme}>{children}</Layout>
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Page theme="light"><Home /></Page>} />
      <Route path="/servicios" element={<Page theme="light"><Servicios /></Page>} />
      <Route path="/cotizador" element={<Page theme="light"><Cotizador /></Page>} />
      <Route path="/sobre" element={<Page theme="light"><Sobre /></Page>} />
      <Route path="/voces" element={<Page theme="light"><Voces /></Page>} />
      <Route path="/contacto" element={<Page theme="light"><Contacto /></Page>} />
      <Route path="/mentoria" element={<Page theme="dark"><Mentoria /></Page>} />
      <Route path="/taller" element={<Page theme="dark"><Taller /></Page>} />
      <Route path="/recursos" element={<Page theme="dark"><Recursos /></Page>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
