import { Link } from 'react-router-dom'
import Cursor            from './components/Cursor'
import Nav               from './components/Nav'
import { FloatingFoodHero } from './components/ui/hero-section-7'
import ProductCarousel   from './components/ProductCarousel'
import ProductListing, { RecipeCarousel, CocktailCarousel } from './components/ProductListing'
import LifeMoments       from './components/LifeMoments'
import Brand             from './components/Brand'
import Newsletter        from './components/Newsletter'
import Footer            from './components/Footer'
import SmoothScroll      from './components/SmoothScroll'

export default function App() {
  return (
    <SmoothScroll>
      <Cursor />
      {/* Announcement bar */}
      <div style={{
        background: '#1a1614',
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 60,
        height: 36, overflow: 'hidden',
        display: 'flex', alignItems: 'center',
      }}>
        {/* Desktop: centered static */}
        <div className="ann-desktop" style={{
          width: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 32,
          fontFamily: '"Futura LT Pro", system-ui, sans-serif',
          fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase',
          color: 'rgba(240,238,234,0.65)',
        }}>
          <span style={{ whiteSpace: 'nowrap' }}>✦ Quality instead of quantity</span>
          <span style={{ whiteSpace: 'nowrap' }}>✦ 9,500 independent products</span>
          <span style={{ whiteSpace: 'nowrap' }}>✦ No mainstream</span>
        </div>
        {/* Mobile: scrolling ticker */}
        <div className="ann-mobile" style={{ display: 'none', width: '100%', overflow: 'hidden' }}>
          <div style={{
            display: 'flex', width: 'max-content',
            animation: 'ann-ticker 18s linear infinite',
            fontFamily: '"Futura LT Pro", system-ui, sans-serif',
            fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(240,238,234,0.65)',
          }}>
            {[0, 1].map(k => (
              <span key={k} style={{ display: 'flex', gap: 0, whiteSpace: 'nowrap' }}>
                <span style={{ padding: '0 24px' }}>✦ Quality instead of quantity</span>
                <span style={{ padding: '0 24px' }}>✦ 9,500 independent products</span>
                <span style={{ padding: '0 24px' }}>✦ No mainstream</span>
              </span>
            ))}
          </div>
        </div>
      </div>
      <Nav />
      <main style={{ display: 'block', margin: 0, padding: 0 }}>
        <FloatingFoodHero
          title="Quality,instead of quantity."
          description="9,500 independent products. No mainstream. Just honest, rare finds — from spirits and gin to craft beer, coffee & food."
        />
        <ProductCarousel />
        <ProductListing />
        <LifeMoments />
        {/* Journal CTA */}
        <div style={{
          background: '#09080b',
          borderTop: '1px solid rgba(212,184,150,0.07)',
          padding: '7rem 2rem',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontWeight: 300,
            fontSize: 'clamp(1.6rem, 3.5vw, 3rem)',
            color: 'rgba(240,232,216,0.28)',
            marginBottom: '2.5rem',
          }}>
            More in Lifestyle
          </p>
          <Link to="/lifestyle" className="btn-primary">Explore Lifestyle</Link>
        </div>
        <div className="cocktail-section" style={{ background: '#f0eeea', padding: '0 40px 80px' }}>
          <CocktailCarousel />
        </div>
        <Brand />
        <Newsletter />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
