import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'motion/react'
import Cursor from '../components/Cursor'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import MeetTheMaker from '../components/MeetTheMaker'

const SERIF = '"Cormorant Garamond", Georgia, serif'
const BRAND = '"Born Ready Slanted", cursive'

const TEAM = [
  { name: 'Yascha',    role: 'Founder & All-Drinker',       desc: 'Loves beverages with a passion. Homebrews beer, distills liqueurs, roasts coffee. His curiosity about flavor, craft, and culture drives H&R\'s product vision.', drink: 'Whiskey, beer, specialty sodas' },
  { name: 'Alex',      role: 'Founder & Tech-Allrounder',   desc: 'Built a cocktail robot in 2019. Now building the platform that connects makers with people who care. Believes in technology that serves real purpose.', drink: 'Bourbon, wheat beer' },
  { name: 'Lisa',      role: 'Brand Professional',          desc: 'Self-employed brand consultant. Ensures H&R\'s story is told with consistency and passion. Loves helping great products shine.', drink: 'Aged beer with champagne yeast' },
  { name: 'Matthias',  role: 'Power SEO Analyst',           desc: 'SEO freelancer since 2011. Makes sure our stories and products are discovered. Obsessed with creating flawless user experiences.', drink: 'Beer, whisky, coffee' },
  { name: 'Anastasia', role: 'Catalog & Marketing Manager', desc: 'Burns for quality food and craftsmanship. Passionate about small producers and their stories. Ensures new makers and products are discovered.', drink: 'Beer, gin' },
  { name: 'Christoph', role: 'Beer Lover & Marketing Lead', desc: 'Brings digital know-how to support regional makers. Believes in using technology to make exceptional products accessible.', drink: 'Hoppy beers with fruity flavors' },
]

const MANIFESTO = [
  'Quality beats quantity. Every product is curated.',
  'Stories matter. Products aren\'t anonymous commodities.',
  'Makers deserve visibility. Their craft deserves respect.',
  'Community is real. We\'re not just a platform; we\'re a movement.',
  'Discovery is an experience. Not a transaction.',
  'Sustainability counts. Fresh, direct, ecological.',
  'Fair pricing is possible. When middlemen are eliminated.',
]

function FadeIn({ children, delay = 0, className = '', style }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} className={className} style={style}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}

const INPUT_STYLE = {
  width: '100%', background: 'none',
  border: 'none', borderBottom: '1px solid rgba(26,22,20,0.15)',
  padding: '12px 0', outline: 'none',
  fontFamily: '"Cormorant Garamond", Georgia, serif',
  fontSize: '1rem', color: '#1a1614',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box',
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  if (sent) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 0' }}>
        <p style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 300, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#1a1614', marginBottom: 16 }}>
          Thank you.
        </p>
        <div style={{ width: 40, height: 1, background: '#c4933f', margin: '0 auto 16px' }} />
        <p style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontStyle: 'italic', fontSize: '1rem', color: 'rgba(26,22,20,0.45)' }}>
          We'll be in touch shortly.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {[
          { key: 'name', label: 'Your Name', type: 'text' },
          { key: 'email', label: 'Email Address', type: 'email' },
        ].map(f => (
          <div key={f.key}>
            <label style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(26,22,20,0.35)', display: 'block', marginBottom: 8 }}>{f.label}</label>
            <input
              type={f.type}
              required
              value={form[f.key]}
              onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
              style={INPUT_STYLE}
              onFocus={e => e.target.style.borderBottomColor = '#c4933f'}
              onBlur={e => e.target.style.borderBottomColor = 'rgba(26,22,20,0.15)'}
            />
          </div>
        ))}
      </div>

      <div>
        <label style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(26,22,20,0.35)', display: 'block', marginBottom: 8 }}>Subject</label>
        <select
          value={form.subject}
          onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
          required
          style={{ ...INPUT_STYLE, cursor: 'none' }}
          onFocus={e => e.target.style.borderBottomColor = '#c4933f'}
          onBlur={e => e.target.style.borderBottomColor = 'rgba(26,22,20,0.15)'}
        >
          <option value="" disabled>Select a topic…</option>
          <option>General Enquiry</option>
          <option>Order Support</option>
          <option>Wholesale & Trade</option>
          <option>Become a Maker</option>
          <option>Press & Media</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(26,22,20,0.35)', display: 'block', marginBottom: 8 }}>Message</label>
        <textarea
          rows={5}
          required
          value={form.message}
          onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
          style={{ ...INPUT_STYLE, resize: 'none' }}
          onFocus={e => e.target.style.borderBottomColor = '#c4933f'}
          onBlur={e => e.target.style.borderBottomColor = 'rgba(26,22,20,0.15)'}
        />
      </div>

      <button
        type="submit"
        className="btn-primary"
        style={{ alignSelf: 'flex-start', padding: '14px 36px', fontSize: 10, cursor: 'none' }}
      >
        Send Message
      </button>
    </form>
  )
}

export default function BrandPage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <>
      <Cursor />
      <div style={{
        background: '#1a1614', color: 'rgba(240,238,234,0.65)',
        fontFamily: '"Futura LT Pro", system-ui, sans-serif',
        fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase',
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 32, padding: '10px 20px', height: 36,
      }}>
        <span style={{ whiteSpace: 'nowrap' }}>✦ Quality instead of quantity</span>
        <span className="ann-hide">✦ 9,500 independent products</span>
        <span className="ann-hide">✦ No mainstream</span>
      </div>
      <Nav top={36} showToggle={false} />

      <main style={{ paddingTop: 108, background: '#f0eeea' }}>

        {/* ── HERO ── */}
        <section ref={heroRef} className="relative overflow-hidden" style={{ background: '#e8e4de', paddingTop: '8rem', paddingBottom: '8rem' }}>
          <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" style={{ y: bgY }}>
            <span style={{ fontFamily: SERIF, fontSize: 'clamp(6rem, 20vw, 20rem)', color: 'rgba(26,22,20,0.04)', fontWeight: 300, whiteSpace: 'nowrap', letterSpacing: '0.05em' }}>HONEST</span>
          </motion.div>

          <div className="relative px-6 md:px-16 max-w-screen-xl mx-auto text-center">
            <FadeIn>
              <p className="section-label-dark mb-8">Our Story</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="font-display font-light leading-none mb-8" style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)', color: '#1a1614', letterSpacing: '-0.01em' }}>
                We built H&amp;R<br />
                <span style={{ fontFamily: BRAND, fontStyle: 'normal', color: '#7a9a6e', display: 'block' }}>because we believe.</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="gold-rule mx-auto mb-8" />
              <p className="font-body font-light text-base leading-loose mx-auto" style={{ color: 'rgba(26,22,20,0.45)', maxWidth: 560 }}>
                Exceptional, regional products deserve to be discovered. Here's how it all started.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ── HOW IT ALL STARTED ── */}
        <section style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
          <div className="px-6 md:px-16 max-w-screen-xl mx-auto">
            <FadeIn>
              <p className="section-label-dark mb-6">The Beginning</p>
              <h2 className="font-display font-light leading-tight mb-6" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)', color: '#1a1614', letterSpacing: '-0.01em' }}>How It All Started</h2>
              <p className="font-body font-light text-base leading-loose mb-16" style={{ color: 'rgba(26,22,20,0.45)', maxWidth: 640 }}>
                Yascha and Alex discovered the same problem: there are countless exceptional beverages and gourmet products hidden in small batches and local regions. Brilliant makers. Limited visibility. They decided to change that.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <FadeIn delay={0.1}>
                <div className="overflow-hidden" style={{ aspectRatio: '4/5' }}>
                  <img src="https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=900&q=90&auto=format&fit=crop" alt="" className="w-full h-full object-cover" style={{ opacity: 0.88 }} />
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <h3 className="font-display font-light mb-6" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: '#1a1614', lineHeight: 1.15 }}>A Simple Idea</h3>
                <div className="gold-rule mb-8" />
                <p className="font-body font-light text-base leading-loose mb-5" style={{ color: 'rgba(26,22,20,0.5)' }}>
                  We're not here to be the center of attention. Our goal is to connect people who care about craftsmanship with the makers who pour their passion into exceptional products.
                </p>
                <p className="font-body font-light text-base leading-loose mb-8" style={{ color: 'rgba(26,22,20,0.5)' }}>
                  We've all experienced it — discovering a drink so special, so unique, that you wonder why it's not available everywhere. That's the moment we knew we needed to build something different.
                </p>
                <div style={{ borderTop: '1px solid rgba(26,22,20,0.08)', paddingTop: 24, marginBottom: 24 }}>
                  <p className="font-body font-light text-sm leading-loose" style={{ color: 'rgba(26,22,20,0.5)' }}>
                    <span style={{ color: '#1a1614', fontWeight: 500 }}>The H&R Promise —</span> Direct from maker to you. No warehouse. No middleman. Just exceptional products and the stories behind them.
                  </p>
                </div>
                <p className="font-body font-light text-base leading-loose" style={{ color: 'rgba(26,22,20,0.5)' }}>
                  Today, we work with 900+ independent makers. Each has a unique story. Each brings something exceptional to the table.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── PHILOSOPHY ── */}
        <section style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
          <div className="px-6 md:px-16 max-w-screen-xl mx-auto">
            <FadeIn>
              <p className="section-label-dark mb-6">Philosophy</p>
              <h2 className="font-display font-light leading-tight mb-6" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)', color: '#1a1614', letterSpacing: '-0.01em' }}>What Drives Us</h2>
              <p className="font-body font-light text-base leading-loose mb-16" style={{ color: 'rgba(26,22,20,0.45)', maxWidth: 640 }}>
                Our team consists of gourmet fanatics, amateur brewers, liqueur makers, gin and tonic fans and amateur coffee roasters. Our curiosity drives us to explore the gourmet landscape and make the best non-mainstream products available to you.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-16">
              <FadeIn delay={0.1}>
                <h3 className="font-display font-light mb-6" style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)', color: '#1a1614' }}>Quality Over Everything</h3>
                <div className="gold-rule mb-8" />
                <p className="font-body font-light text-base leading-loose mb-5" style={{ color: 'rgba(26,22,20,0.5)' }}>
                  We work every day to offer the best possible product range and the best shopping experience. Our aim is to make it easy for you to find and order exceptional snacks, gourmet products and drinks.
                </p>
                <p className="font-body font-light text-base leading-loose" style={{ color: 'rgba(26,22,20,0.5)' }}>
                  Our marketplace constantly expands while we make sure to offer fair prices despite handcrafting and small batches.
                </p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0" style={{ borderTop: '1px solid rgba(26,22,20,0.08)' }}>
                  {[
                    { title: 'Why No Warehouse?', items: ['Orders come directly from producers', 'Products are fresher', 'More ecological approach', 'Producers know best storage methods', 'Eliminated intermediate logistics'] },
                    { title: 'Fair & Transparent', items: ['Equal platform for all producers', 'Producers have own online stores', 'Fair pricing despite handcrafting', 'Small batch products', 'Almost all sellers offer free shipping'] },
                  ].map((col, i) => (
                    <div key={col.title} className="pt-8 pb-4 md:px-6" style={{ borderRight: i === 0 ? '1px solid rgba(26,22,20,0.08)' : 'none' }}>
                      <h4 className="font-body font-light mb-5" style={{ fontSize: '0.82rem', color: '#1a1614', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{col.title}</h4>
                      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {col.items.map(item => (
                          <li key={item} className="font-body font-light text-sm leading-loose" style={{ color: 'rgba(26,22,20,0.5)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                            <span style={{ color: '#c4933f', flexShrink: 0, fontSize: 9, marginTop: 4 }}>✦</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── MEET THE MAKER ── */}
        <MeetTheMaker />

        {/* ── OUR BELIEF ── */}
        <section style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
          <div className="px-6 md:px-16 max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <FadeIn>
              <p className="section-label-dark mb-6">Manifesto</p>
              <h2 className="font-display font-light leading-tight mb-6" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)', color: '#1a1614', letterSpacing: '-0.01em' }}>Our Belief</h2>
              <div className="gold-rule mb-8" />
              <p className="font-body font-light text-base leading-loose" style={{ color: 'rgba(26,22,20,0.5)', maxWidth: 480 }}>
                When you order from H&R, you're not just buying products. You're joining a community of people who share a belief: exceptional products and the makers behind them matter.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, borderTop: '1px solid rgba(26,22,20,0.08)' }}>
                {MANIFESTO.map((item, i) => (
                  <li key={i} className="font-body font-light text-sm leading-loose" style={{
                    color: 'rgba(26,22,20,0.55)',
                    padding: '16px 0',
                    borderBottom: '1px solid rgba(26,22,20,0.08)',
                    display: 'flex', gap: 16, alignItems: 'flex-start',
                  }}>
                    <span style={{ color: '#c4933f', flexShrink: 0, fontSize: 9, marginTop: 4 }}>✦</span>
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </section>

        {/* ── TEAM ── */}
        <section style={{ background: '#e8e4de', paddingTop: '8rem', paddingBottom: '8rem' }}>
          <div className="px-6 md:px-16 max-w-screen-xl mx-auto">
            <FadeIn>
              <p className="section-label-dark mb-6">The People</p>
              <h2 className="font-display font-light leading-tight mb-6" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)', color: '#1a1614', letterSpacing: '-0.01em' }}>Meet Our Team</h2>
              <p className="font-body font-light text-base leading-loose mb-16" style={{ color: 'rgba(26,22,20,0.45)', maxWidth: 560 }}>
                Gourmet fanatics, amateur brewers, liqueur makers, gin &amp; tonic fans, and coffee roasters. We live and breathe what we do.
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0" style={{ borderTop: '1px solid rgba(26,22,20,0.08)' }}>
              {TEAM.map((member, i) => (
                <FadeIn key={member.name} delay={(i % 3) * 0.08}>
                  <div className="py-10 px-0 md:px-8" style={{
                    borderBottom: '1px solid rgba(26,22,20,0.08)',
                    borderRight: i % 3 < 2 ? '1px solid rgba(26,22,20,0.08)' : 'none',
                  }}>
                    <p className="font-display font-light mb-1" style={{ fontSize: '1.5rem', color: '#1a1614' }}>{member.name}</p>
                    <p className="section-label mb-4" style={{ fontSize: 9, letterSpacing: '0.2em' }}>{member.role}</p>
                    <p className="font-body font-light text-sm leading-loose mb-4" style={{ color: 'rgba(26,22,20,0.5)' }}>{member.desc}</p>
                    <p className="font-body font-light" style={{ fontSize: '0.75rem', color: 'rgba(26,22,20,0.3)', fontStyle: 'italic' }}>{member.drink}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ background: '#1a1614', paddingTop: '8rem', paddingBottom: '8rem', position: 'relative', overflow: 'hidden' }}>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span style={{ fontFamily: SERIF, fontSize: 'clamp(6rem, 20vw, 20rem)', color: 'rgba(240,238,234,0.03)', fontWeight: 300, whiteSpace: 'nowrap', letterSpacing: '0.05em' }}>RARE</span>
          </div>
          <div className="relative px-6 md:px-16 max-w-screen-xl mx-auto text-center">
            <FadeIn>
              <h2 className="font-display font-light leading-tight mb-6" style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', color: '#f0eeea', letterSpacing: '-0.01em' }}>
                Ready to discover your<br />
                <span style={{ fontFamily: BRAND, fontStyle: 'normal', color: '#7a9a6e' }}>next favourite?</span>
              </h2>
              <div className="gold-rule mx-auto mb-8" />
              <p className="font-body font-light text-base leading-loose mx-auto mb-10" style={{ color: 'rgba(240,238,234,0.4)', maxWidth: 480 }}>
                Join a community of explorers, makers, and believers. Find exceptional products that match your lifestyle.
              </p>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                <a href="/" className="btn-primary">Browse the Selection</a>
                <a href="#collection" className="btn-ghost-light">Start Your Journey</a>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
          <div className="px-6 md:px-16 max-w-screen-xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
              <FadeIn>
                <p className="section-label-dark mb-6">Get in Touch</p>
                <h2 className="font-display font-light mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#1a1614', letterSpacing: '-0.01em' }}>Contact Us</h2>
                <div className="gold-rule mb-8" />
                <p className="font-body font-light text-base leading-loose mb-8" style={{ color: 'rgba(26,22,20,0.45)', maxWidth: 400 }}>
                  Whether you're a curious customer, an independent maker, or a wholesale partner — we'd love to hear from you.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[
                    { label: 'General Enquiries', value: 'hello@honestandrare.com' },
                    { label: 'Wholesale & Trade', value: 'trade@honestandrare.com' },
                    { label: 'Become a Maker', value: 'makers@honestandrare.com' },
                  ].map(item => (
                    <div key={item.label} style={{ borderBottom: '1px solid rgba(26,22,20,0.08)', paddingBottom: 16 }}>
                      <p style={{ fontFamily: '"Futura LT Pro", system-ui, sans-serif', fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(26,22,20,0.35)', marginBottom: 4 }}>{item.label}</p>
                      <p style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: '1rem', color: '#c4933f' }}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>

              <FadeIn delay={0.15}>
                <ContactForm />
              </FadeIn>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
