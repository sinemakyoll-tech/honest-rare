// Honest & Rare — Figma Design System Generator
// Run this plugin inside any Figma file to generate the full design system.

const COLORS = {
  'Paper':      '#f0eeea',
  'Paper Dark': '#e8e4de',
  'Ink':        '#1a1614',
  'Ink Soft':   '#4a4542',
  'Mist':       '#8a8480',
  'Gold':       '#c4933f',
  'Champagne':  '#d4b896',
  'Ember':      '#c8622a',
  'Obsidian':   '#111010',
  'Cream':      '#f0e8d8',
};

function hex(h) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
  return r ? { r: parseInt(r[1],16)/255, g: parseInt(r[2],16)/255, b: parseInt(r[3],16)/255 } : {r:0,g:0,b:0};
}

function solid(color, opacity) {
  const fill = { type: 'SOLID', color: typeof color === 'string' ? hex(color) : color };
  if (opacity !== undefined) fill.opacity = opacity;
  return [fill];
}

async function loadFonts() {
  const families = [
    { family: 'Cormorant Garamond', style: 'Light' },
    { family: 'Cormorant Garamond', style: 'Light Italic' },
    { family: 'Futura PT', style: 'Book' },
    { family: 'Futura PT', style: 'Medium' },
  ];
  for (const f of families) {
    try { await figma.loadFontAsync(f); } catch(_) {}
  }
  // Fallback
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
}

function txt(content, fontFamily, fontStyle, size, color, x, y, parent) {
  const t = figma.createText();
  try { t.fontName = { family: fontFamily, style: fontStyle }; } catch(_) {
    t.fontName = { family: 'Inter', style: 'Regular' };
  }
  t.characters = content;
  t.fontSize = size;
  t.fills = solid(color);
  t.x = x; t.y = y;
  parent.appendChild(t);
  return t;
}

function rect(w, h, x, y, color, radius, parent, opacity) {
  const r = figma.createRectangle();
  r.resize(w, h); r.x = x; r.y = y;
  r.fills = solid(color, opacity);
  if (radius) r.cornerRadius = radius;
  parent.appendChild(r);
  return r;
}

async function run() {
  await loadFonts();

  // ── PAGE 1: Colors ──────────────────────────────────────────
  const p1 = figma.currentPage;
  p1.name = '🎨 Colors';

  const cf = figma.createFrame();
  cf.name = 'Brand Color Palette';
  cf.resize(1280, 520);
  cf.fills = solid('#ffffff');
  p1.appendChild(cf);

  txt('Honest & Rare — Brand Colors', 'Cormorant Garamond', 'Light', 32, '#1a1614', 48, 40, cf);

  Object.entries(COLORS).forEach(([name, color], i) => {
    const col = i % 5, row = Math.floor(i / 5);
    const x = 48 + col * 235, y = 110 + row * 170;
    const sw = rect(195, 110, x, y, color, 12, cf);
    sw.strokes = [{ type: 'SOLID', color: {r:0,g:0,b:0}, opacity: 0.07 }];
    sw.strokeWeight = 1;
    txt(name, 'Inter', 'Medium', 11, '#1a1614', x, y + 118, cf);
    txt(color.toUpperCase(), 'Inter', 'Regular', 10, '#8a8480', x, y + 133, cf);
  });

  // ── PAGE 2: Typography ──────────────────────────────────────
  const p2 = figma.createPage(); p2.name = '✍️ Typography';
  figma.currentPage = p2;

  const tf = figma.createFrame();
  tf.name = 'Type Specimens';
  tf.resize(1280, 980);
  tf.fills = solid('#f0eeea');
  p2.appendChild(tf);

  txt('Typography', 'Inter', 'Regular', 10, '#8a8480', 60, 40, tf);

  txt('Liquid Gold,', 'Cormorant Garamond', 'Light', 88, '#1a1614', 60, 60, tf);
  const italic = txt('Ancient Groves.', 'Cormorant Garamond', 'Light Italic', 88, '#c4933f', 60, 158, tf);

  txt('Display — Cormorant Garamond Light / 88px', 'Inter', 'Regular', 9, '#8a8480', 60, 280, tf);
  rect(600, 1, 60, 300, '#c4933f', 0, tf, 0.3);

  txt('Honest is rare. Rare is honest.', 'Cormorant Garamond', 'Light', 52, '#1a1614', 60, 320, tf);
  txt('Heading — Cormorant Garamond Light / 52px', 'Inter', 'Regular', 9, '#8a8480', 60, 398, tf);
  rect(600, 1, 60, 415, '#c4933f', 0, tf, 0.3);

  txt('We work with four family-owned estates in Tuscany, Umbria, Sicily, and Puglia.\nEach one has farmed the same groves for at least a century.', 'Inter', 'Regular', 15, '#4a4542', 60, 435, tf);
  txt('Body — Futura LT Pro Book / 15px', 'Inter', 'Regular', 9, '#8a8480', 60, 510, tf);
  rect(600, 1, 60, 527, '#c4933f', 0, tf, 0.3);

  txt('THE COLLECTION', 'Inter', 'Medium', 10, '#8a8480', 60, 547, tf);
  txt('Label — Futura LT Pro / 10px / 0.4em tracking', 'Inter', 'Regular', 9, '#8a8480', 60, 566, tf);
  rect(600, 1, 60, 582, '#c4933f', 0, tf, 0.3);

  txt('€34', 'Cormorant Garamond', 'Light', 48, '#c4933f', 60, 602, tf);
  txt('Price — Cormorant Garamond Light / 48px', 'Inter', 'Regular', 9, '#8a8480', 60, 672, tf);

  // ── PAGE 3: Components ──────────────────────────────────────
  const p3 = figma.createPage(); p3.name = '🧩 Components';
  figma.currentPage = p3;

  // — Nav —
  const nav = figma.createFrame();
  nav.name = 'Nav / Desktop';
  nav.resize(1440, 80);
  nav.fills = solid('#f0eeea');
  nav.x = 0; nav.y = 0;
  p3.appendChild(nav);

  txt('HONEST & RARE', 'Cormorant Garamond', 'Light', 16, '#1a1614', 40, 27, nav);
  ['COLLECTION','LIFESTYLE','STORY','JOURNAL'].forEach((l, i) => {
    txt(l, 'Inter', 'Regular', 9, '#8a8480', 860 + i * 110, 33, nav);
  });
  rect(110, 40, 1300, 20, '#1a1614', 0, nav);
  txt('SHOP NOW', 'Inter', 'Medium', 9, '#f0eeea', 1323, 31, nav);

  // — Hero —
  const hero = figma.createFrame();
  hero.name = 'Hero / FloatingFoodHero';
  hero.resize(1440, 900);
  hero.fills = solid('#f0eeea');
  hero.x = 0; hero.y = 120;
  p3.appendChild(hero);

  txt('Liquid Gold,', 'Cormorant Garamond', 'Light', 96, '#1a1614', 490, 290, hero);
  txt('Ancient Groves.', 'Cormorant Garamond', 'Light Italic', 96, '#c4933f', 455, 400, hero);
  rect(40, 1, 700, 520, '#c4933f', 0, hero, 0.6);
  txt('Cold-pressed. Uncompromising.\nFor the table that deserves it.', 'Inter', 'Regular', 14, '#8a8480', 610, 535, hero);

  // Image placeholders
  const imgs = [
    { x: 40, y: 80, w: 320, h: 260, label: 'Bread + olive oil\n(top-left)' },
    { x: 1080, y: 60, w: 200, h: 260, label: 'Bottle closeup\n(top-right)' },
    { x: 1100, y: 580, w: 240, h: 280, label: 'Glass jug\n(bottom-right)' },
    { x: 40, y: 560, w: 200, h: 280, label: 'Dark bottle\n(bottom-left)' },
  ];
  imgs.forEach(({ x, y, w, h, label }) => {
    const ph = rect(w, h, x, y, '#e8e4de', 16, hero);
    ph.strokes = [{ type: 'SOLID', color: hex('#c4933f'), opacity: 0.15 }];
    ph.strokeWeight = 1;
    txt(label, 'Inter', 'Regular', 10, '#8a8480', x + 12, y + h/2 - 14, hero);
  });

  // CTAs
  rect(190, 50, 600, 650, '#1a1614', 0, hero);
  txt('SHOP THE COLLECTION', 'Inter', 'Medium', 9, '#f0eeea', 619, 666, hero);
  const btn2 = rect(130, 50, 805, 650, '#f0eeea', 0, hero);
  btn2.strokes = [{ type: 'SOLID', color: hex('#1a1614'), opacity: 0.2 }];
  btn2.strokeWeight = 1;
  txt('OUR STORY', 'Inter', 'Regular', 9, '#1a1614', 842, 666, hero);

  // — Product Slide —
  const prod = figma.createFrame();
  prod.name = 'Product Slide — Antico';
  prod.resize(1440, 900);
  prod.fills = solid('#f5f2ec');
  prod.x = 0; prod.y = 1060;
  p3.appendChild(prod);

  // Left info
  txt('01 / 06', 'Inter', 'Regular', 10, '#8a8480', 96, 160, prod);

  // Badge
  const badge = rect(92, 28, 96, 202, '#ffffff', 20, prod, 0.72);
  badge.strokes = [{ type: 'SOLID', color: {r:1,g:1,b:1} }];
  badge.strokeWeight = 1;
  txt('BESTSELLER', 'Inter', 'Regular', 8, '#8a8480', 107, 211, prod);

  txt('H&R', 'Cormorant Garamond', 'Light', 72, '#1a1614', 96, 246, prod);
  txt('Antico', 'Cormorant Garamond', 'Light Italic', 72, '#c4933f', 96, 322, prod);
  txt('SIGNATURE EXPRESSION · FRANTOIO · TUSCANY', 'Inter', 'Regular', 9, '#8a8480', 96, 418, prod);
  rect(40, 1, 96, 448, '#c4933f', 0, prod, 0.6);
  txt('Robust and peppery with notes of fresh-cut grass,\ngreen tomato, and a lingering almond finish.', 'Inter', 'Regular', 13, '#8a8480', 96, 466, prod);
  txt('€34', 'Cormorant Garamond', 'Light', 40, '#c4933f', 96, 570, prod);
  rect(150, 48, 188, 568, '#1a1614', 0, prod);
  txt('ADD TO BAG', 'Inter', 'Medium', 9, '#f0eeea', 213, 584, prod);

  // Right photo area
  const photoArea = rect(792, 900, 648, 0, '#e8e4de', 0, prod);
  txt('Full-bleed editorial photograph\n(olive oil lifestyle image)', 'Inter', 'Regular', 13, '#8a8480', 900, 418, prod);

  // Glass card
  const glass = rect(178, 96, 1200, 720, '#ffffff', 16, prod, 0.72);
  glass.strokes = [{ type: 'SOLID', color: {r:1,g:1,b:1} }];
  glass.strokeWeight = 1;
  glass.effects = [{ type: 'DROP_SHADOW', color: {r:26/255,g:22/255,b:20/255,a:0.09}, offset:{x:0,y:8}, radius:32, visible: true, blendMode: 'NORMAL' }];
  txt('ORIGIN', 'Inter', 'Regular', 8, '#8a8480', 1216, 738, prod);
  txt('Tuscany', 'Cormorant Garamond', 'Light', 18, '#1a1614', 1216, 754, prod);
  rect(146, 1, 1216, 780, '#c4933f', 0, prod, 0.3);
  txt('€34', 'Cormorant Garamond', 'Light', 22, '#c4933f', 1216, 788, prod);

  // — Newsletter —
  const news = figma.createFrame();
  news.name = 'Newsletter';
  news.resize(1440, 580);
  news.fills = solid('#111010');
  news.x = 0; news.y = 2000;
  p3.appendChild(news);

  txt('Join the Circle', 'Inter', 'Regular', 10, '#8a8480', 657, 100, news);
  txt('Hear from the grove', 'Cormorant Garamond', 'Light', 60, '#f0eeea', 500, 130, news);
  txt('before anyone else.', 'Cormorant Garamond', 'Light Italic', 60, '#d4b896', 520, 206, news);

  const inp = rect(340, 52, 520, 400, '#ffffff', 4, news, 0.06);
  inp.strokes = [{ type: 'SOLID', color: {r:1,g:1,b:1}, opacity: 0.12 }];
  inp.strokeWeight = 1;
  txt('Your email address', 'Inter', 'Regular', 13, '#f0eeea', 544, 416, news);
  rect(140, 52, 873, 400, '#f0eeea', 0, news);
  txt('SUBSCRIBE', 'Inter', 'Medium', 10, '#1a1614', 896, 418, news);

  // — Footer —
  const foot = figma.createFrame();
  foot.name = 'Footer';
  foot.resize(1440, 480);
  foot.fills = solid('#06050a');
  foot.x = 0; foot.y = 2620;
  p3.appendChild(foot);

  txt('HONEST & RARE', 'Cormorant Garamond', 'Light', 16, '#f0eeea', 60, 80, foot);
  txt('Premium olive oil crafted for tables that\ndeserve it. Grove to bottle. No compromise.', 'Inter', 'Regular', 12, '#f0eeea', 60, 112, foot);

  [['COLLECTION',['H&R Antico','H&R Verde','H&R Riserva','H&R Biologico']],
   ['LIFESTYLE',['Recipes','Cocktails','The Journal','Gift Sets']],
   ['COMPANY',['Our Story','The Estates','Philosophy','Awards']],
   ['CONTACT',['Wholesale','Estate Visits','hello@honestandrare.com']]
  ].forEach(([head, links], ci) => {
    const cx = 380 + ci * 270;
    txt(head, 'Inter', 'Medium', 9, '#8a8480', cx, 80, foot);
    links.forEach((link, li) => {
      txt(link, 'Inter', 'Regular', 12, '#f0eeea', cx, 112 + li * 28, foot);
    });
  });

  rect(1320, 1, 60, 420, '#d4b896', 0, foot, 0.08);
  txt('© 2024 Honest & Rare S.r.l. — Firenze, Italia. All rights reserved.', 'Inter', 'Regular', 11, '#f0eeea', 60, 440, foot);

  // ── PAGE 4: Design Tokens ──────────────────────────────────
  const p4 = figma.createPage(); p4.name = '🔧 Design Tokens';
  figma.currentPage = p4;

  const tk = figma.createFrame();
  tk.name = 'Design Tokens';
  tk.resize(1280, 900);
  tk.fills = solid('#ffffff');
  p4.appendChild(tk);

  txt('Design Tokens', 'Cormorant Garamond', 'Light', 32, '#1a1614', 48, 40, tk);

  const tokenSections = [
    { label: 'Spacing', tokens: ['4px', '8px', '12px', '16px', '24px', '32px', '48px', '64px', '80px', '96px'] },
    { label: 'Border Radius', tokens: ['4px', '8px', '12px', '16px', '20px', '9999px (pill)'] },
    { label: 'Font Size', tokens: ['9px (label)', '10px (caption)', '11px', '13px (body-sm)', '15px (body)', '24px (h4)', '36px (h3)', '52px (h2)', '72px (h1)', '96px (display)'] },
    { label: 'Letter Spacing', tokens: ['0 (normal)', '0.24em (nav links)', '0.35em (labels)', '0.4em (ultra labels)', '0.5em (ultra-wide)'] },
  ];

  tokenSections.forEach(({ label, tokens }, si) => {
    const sy = 110 + si * 170;
    txt(label, 'Inter', 'Medium', 11, '#1a1614', 48, sy, tk);
    rect(500, 1, 48, sy + 18, '#c4933f', 0, tk, 0.3);
    tokens.forEach((token, ti) => {
      const tx = 48 + ti * 118;
      const tb = rect(104, 40, tx, sy + 28, '#f0eeea', 8, tk);
      tb.strokes = [{ type: 'SOLID', color: hex('#e8e4de') }];
      tb.strokeWeight = 1;
      txt(token, 'Inter', 'Regular', 9, '#4a4542', tx + 8, sy + 42, tk);
    });
  });

  figma.currentPage = p1;
  figma.viewport.scrollAndZoomIntoView([cf]);
}

run()
  .then(() => figma.notify('✅ Honest & Rare Design System generated!', { timeout: 4000 }))
  .catch(e => figma.notify('❌ ' + e.message, { error: true }))
  .finally(() => figma.closePlugin());
