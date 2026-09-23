import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LocaleProvider } from './context/LocaleContext.jsx'
import { RegionProvider } from './context/RegionContext.jsx'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LocaleProvider>
        <RegionProvider>
          <App />
        </RegionProvider>
      </LocaleProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
