import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { CartProvider } from './context/CartContext.jsx'
import App from './App.jsx'
import BestsellerPage from './pages/BestsellerPage.jsx'
import RecipePage from './pages/RecipePage.jsx'
import LifestylePage from './pages/LifestylePage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import CartPage from './pages/CartPage.jsx'
import BrandPage from './pages/BrandPage.jsx'
import BrandingPage from './pages/BrandingPage.jsx'
import PitchDeckPage from './pages/PitchDeckPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import OrderSuccessPage from './pages/OrderSuccessPage.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/bestseller" element={<BestsellerPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/recipe/:id" element={<RecipePage />} />
          <Route path="/lifestyle" element={<LifestylePage />} />
          <Route path="/brand" element={<BrandPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/branding" element={<BrandingPage />} />
          <Route path="/pitch" element={<PitchDeckPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  </StrictMode>,
)
