import Cursor            from './components/Cursor'
import Nav               from './components/Nav'
import { FloatingFoodHero } from './components/ui/hero-section-7'
import ProductCarousel   from './components/ProductCarousel'
import ProductListing, { RecipeCarousel } from './components/ProductListing'
import LifestyleProjects from './components/LifestyleProjects'
import Brand             from './components/Brand'
import Newsletter        from './components/Newsletter'
import Footer            from './components/Footer'
import SmoothScroll      from './components/SmoothScroll'

export default function App() {
  return (
    <SmoothScroll>
      <Cursor />
      {/* Announcement bar */}
      <div className="announcement-bar" style={{
        background: '#1a1614', color: 'rgba(240,238,234,0.65)',
        fontFamily: '"Futura LT Pro", system-ui, sans-serif',
        fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase',
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 32, padding: '10px 20px', height: 36,
      }}>
        <span>✦ Quality instead of quantity</span>
        <span className="ann-hide">✦ 9,500 independent products</span>
        <span className="ann-hide">✦ No mainstream</span>
      </div>
      <Nav />
      <main style={{ display: 'block', margin: 0, padding: 0 }}>
        <FloatingFoodHero
          title="Quality instead of quantity."
          description="9,500 independent products. No mainstream. Just honest, rare finds — from spirits and gin to craft beer, coffee & food."
        />
        <ProductCarousel />
        <ProductListing />
        <LifestyleProjects />
        <div style={{ background: '#f0eeea', padding: '0 40px 80px' }}>
          <RecipeCarousel />
        </div>
        <Brand />
        <Newsletter />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
