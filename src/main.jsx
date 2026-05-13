import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import BestsellerPage from './pages/BestsellerPage.jsx'
import RecipePage from './pages/RecipePage.jsx'
import LifestylePage from './pages/LifestylePage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/bestseller" element={<BestsellerPage />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
        <Route path="/lifestyle" element={<LifestylePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
