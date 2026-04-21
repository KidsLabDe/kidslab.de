// Variant 1: Playful Pixel — bunt, verspielt, Pixelify Sans, kräftige Primärfarben

const playfulStyles = {
  slide: {
    position: 'absolute', inset: 0,
    background: '#FFE66D', color: '#0D1B2A',
    fontFamily: "'Inter', system-ui, sans-serif",
    padding: '80px 100px', boxSizing: 'border-box', overflow: 'hidden',
  },
  h: { fontFamily: "'Pixelify Sans', system-ui", fontWeight: 700, letterSpacing: '0.5px' },
};

function PixelBg({ color = '#0D1B2A', opacity = 0.06 }) {
  return <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
    backgroundImage: `radial-gradient(${color} 2px, transparent 2px)`,
    backgroundSize: '24px 24px', opacity }} />;
}

function Chip({ children, bg = '#0D1B2A', fg = '#FFE66D' }) {
  return <span style={{
    display: 'inline-block', padding: '10px 22px', background: bg, color: fg,
    fontFamily: "'Pixelify Sans', system-ui", fontSize: 24, fontWeight: 600,
    marginRight: 12, marginBottom: 12, whiteSpace: 'nowrap',
  }}>{children}</span>;
}

function QRTag({ url, label, dark = '#0D1B2A', light = '#FFFFFF' }) {
  return (
    <div style={{ background: light, padding: 12, display: 'inline-block', textAlign: 'center' }}>
      <QR url={url} size={160} dark={dark} light={light} />
      <div style={{ color: dark, fontFamily: "'Pixelify Sans', system-ui", fontSize: 16, marginTop: 6, letterSpacing: 0.5 }}>{label || url}</div>
    </div>
  );
}

// 1. Intro
function PlayfulIntro() {
  return (
    <div style={{ ...playfulStyles.slide, background: '#0066FF', color: '#FFF' }}>
      <PixelBg color="#FFE66D" opacity={0.15} />
      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <img src="assets/logo.png" style={{ height: 110, imageRendering: 'pixelated' }} />
          <div>
            <div style={{ ...playfulStyles.h, fontSize: 72, lineHeight: 1 }}>KidsLab</div>
            <div style={{ fontSize: 24, opacity: 0.9, marginTop: 8 }}>Augsburg · seit 2020</div>
          </div>
        </div>
        <div>
          <div style={{ ...playfulStyles.h, fontSize: 150, lineHeight: 0.95, color: '#FFE66D' }}>
            Bau dir<br />deine Welt.
          </div>
          <div style={{ fontSize: 38, marginTop: 32, maxWidth: 1400, lineHeight: 1.3 }}>
            Programmieren. Löten. Roboter bauen. 3D-drucken.<br />
            Bei uns lernst du Technik, indem du sie benutzt.
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ fontFamily: "'Pixelify Sans', system-ui", fontSize: 40 }}>→ kidslab.de</div>
          <div style={{ fontSize: 22, textAlign: 'right', opacity: 0.85 }}>
            gemeinnützige gGmbH<br />Maker Education für junge Menschen
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. Werte
function PlayfulValues() {
  return (
    <div style={playfulStyles.slide}>
      <PixelBg />
      <div style={{ position: 'relative' }}>
        <div style={{ ...playfulStyles.h, fontSize: 44, marginBottom: 20, color: '#0066FF' }}>// So arbeiten wir</div>
        <div style={{ ...playfulStyles.h, fontSize: 110, lineHeight: 1, marginBottom: 30, maxWidth: 1500 }}>„Hilf mir, es selbst zu tun."</div>
        <div style={{ fontSize: 22, opacity: 0.6, marginBottom: 60 }}>— Maria Montessori</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {VALUES.map((v, i) => (
            <div key={i} style={{ background: '#0D1B2A', color: '#FFE66D', padding: '36px 32px' }}>
              <div style={{ ...playfulStyles.h, fontSize: 42, marginBottom: 14 }}>0{i+1}</div>
              <div style={{ ...playfulStyles.h, fontSize: 36, marginBottom: 12 }}>{v.t}</div>
              <div style={{ fontSize: 20, color: '#FFF', lineHeight: 1.4 }}>{v.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Normal course slide (MinniMaker)
function PlayfulCourse({ course, index }) {
  const colors = [
    { bg: '#FF6B6B', fg: '#FFF', accent: '#FFE66D' },
    { bg: '#FFE66D', fg: '#0D1B2A', accent: '#0066FF' },
    { bg: '#0D1B2A', fg: '#FFE66D', accent: '#FF6B6B' },
  ][index];
  return (
    <div style={{ ...playfulStyles.slide, background: colors.bg, color: colors.fg, padding: 0 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', height: '100%' }}>
        <div style={{ padding: '80px 80px 60px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
          <PixelBg color={colors.accent} opacity={0.1} />
          <div style={{ position: 'relative' }}>
            <div style={{ ...playfulStyles.h, fontSize: 32, color: colors.accent, marginBottom: 20 }}>Kurs 0{index+1} / 03</div>
            <div style={{ ...playfulStyles.h, fontSize: 130, lineHeight: 0.9, marginBottom: 24 }}>{course.title}</div>
            <div style={{ fontSize: 32, opacity: 0.85, marginBottom: 40 }}>{course.subtitle}</div>
            <div style={{ fontSize: 26, lineHeight: 1.45, maxWidth: 720 }}>{course.teaser}</div>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ marginBottom: 24 }}>
              {course.highlights.map((h, i) => <Chip key={i} bg={colors.accent} fg={colors.bg}>{h}</Chip>)}
            </div>
            <div style={{ display: 'flex', gap: 32, borderTop: `3px solid ${colors.fg}`, paddingTop: 24, alignItems: 'flex-end' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, opacity: 0.6, textTransform: 'uppercase', letterSpacing: 2 }}>Alter</div>
                <div style={{ ...playfulStyles.h, fontSize: 28, marginTop: 6, whiteSpace: 'nowrap' }}>{course.age}</div>
                <div style={{ fontSize: 16, opacity: 0.6, textTransform: 'uppercase', letterSpacing: 2, marginTop: 14 }}>Termin</div>
                <div style={{ ...playfulStyles.h, fontSize: 28, marginTop: 6, whiteSpace: 'nowrap' }}>{course.when}</div>
              </div>
              <QRTag url={course.url} label="anmelden" dark={colors.bg === '#0D1B2A' ? '#0D1B2A' : '#0D1B2A'} light="#FFFFFF" />
            </div>
          </div>
        </div>
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <img src={course.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>
    </div>
  );
}

// Hero featured course (HackerWerkstatt + Lego)
function PlayfulFeatured({ course, colorSet, flagText }) {
  const c = colorSet;
  return (
    <div style={{ ...playfulStyles.slide, background: c.bg, color: c.fg, padding: 0 }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <img src={course.image} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }} />
      </div>
      <PixelBg color={c.accent} opacity={0.18} />
      <div style={{ position: 'relative', height: '100%', padding: '70px 90px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{
            background: c.accent, color: c.bg, padding: '14px 26px',
            fontFamily: "'Pixelify Sans', system-ui", fontSize: 30, fontWeight: 700,
            transform: 'rotate(-2deg)', boxShadow: '6px 6px 0 rgba(0,0,0,0.25)',
          }}>★ {flagText}</div>
          <div style={{ fontFamily: "'Pixelify Sans', system-ui", fontSize: 28, color: c.accent }}>{course.subtitle}</div>
        </div>
        <div>
          <div style={{ ...playfulStyles.h, fontSize: 220, lineHeight: 0.88, textShadow: '4px 4px 0 rgba(0,0,0,0.25)' }}>{course.title}</div>
          <div style={{ fontSize: 34, marginTop: 28, maxWidth: 1100, lineHeight: 1.3, background: 'rgba(0,0,0,0.4)', padding: '18px 26px', display: 'inline-block' }}>{course.teaser}</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, auto) 1fr auto', gap: 40, alignItems: 'flex-end', borderTop: `4px solid ${c.accent}`, paddingTop: 24 }}>
          <div>
            <div style={{ fontSize: 18, opacity: 0.7, letterSpacing: 2, textTransform: 'uppercase' }}>Alter</div>
            <div style={{ ...playfulStyles.h, fontSize: 38, marginTop: 6, whiteSpace: 'nowrap' }}>{course.age}</div>
          </div>
          <div>
            <div style={{ fontSize: 18, opacity: 0.7, letterSpacing: 2, textTransform: 'uppercase' }}>Termin</div>
            <div style={{ ...playfulStyles.h, fontSize: 38, marginTop: 6, whiteSpace: 'nowrap' }}>{course.when}</div>
          </div>
          <div />
          <QRTag url={course.url} label="jetzt anmelden →" />
        </div>
      </div>
    </div>
  );
}

// GamesLab project spotlight
function PlayfulGamesLab() {
  const p = PROJECTS[0];
  return (
    <div style={{ ...playfulStyles.slide, background: '#6B2DDB', color: '#FFF', padding: 0 }}>
      <PixelBg color="#FFE66D" opacity={0.12} />
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', height: '100%' }}>
        <div style={{ padding: '70px 70px 60px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'inline-block', background: '#FFE66D', color: '#0D1B2A', padding: '10px 20px', fontFamily: "'Pixelify Sans', system-ui", fontSize: 24, marginBottom: 20 }}>
              ⭐ Für Schulen · kostenlos
            </div>
            <div style={{ ...playfulStyles.h, fontSize: 170, lineHeight: 0.9, marginBottom: 16 }}>GamesLab</div>
            <div style={{ fontSize: 30, color: '#FFE66D', marginBottom: 28 }}>{p.subtitle}</div>
            <div style={{ fontSize: 24, lineHeight: 1.5, maxWidth: 780 }}>{p.teaser}</div>
          </div>
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 28, borderTop: '3px solid #FFE66D', paddingTop: 24 }}>
              {p.stats.map((s, i) => (
                <div key={i}>
                  <div style={{ ...playfulStyles.h, fontSize: 56, color: '#FFE66D', lineHeight: 1 }}>{s.v}</div>
                  <div style={{ fontSize: 18, opacity: 0.85, marginTop: 6 }}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <QRTag url={p.url} label="gameslab" />
              <div style={{ fontSize: 22, opacity: 0.85, lineHeight: 1.4 }}>
                Schirmherr: Bayerns Digitalminister<br/>
                <span style={{ ...playfulStyles.h, fontSize: 28, color: '#FFE66D' }}>Dr. Fabian Mehring</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <img src={p.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', top: 30, right: 30, background: '#FFE66D', color: '#0D1B2A', padding: '10px 16px', fontFamily: "'Pixelify Sans', system-ui", fontSize: 22 }}>
            Augsburger GamesPreis
          </div>
        </div>
      </div>
    </div>
  );
}

// Demokratie in Minecraft
function PlayfulDemokratie() {
  const p = PROJECTS[1];
  return (
    <div style={{ ...playfulStyles.slide, background: '#0D1B2A', color: '#FFE66D', padding: 0 }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <img src={p.image} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35, filter: 'saturate(0.9)' }} />
      </div>
      <PixelBg color="#00FF88" opacity={0.14} />
      <div style={{ position: 'relative', height: '100%', padding: '70px 90px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'inline-block', background: '#00FF88', color: '#0D1B2A', padding: '12px 22px', fontFamily: "'Pixelify Sans', system-ui", fontSize: 26, marginBottom: 24, transform: 'rotate(-1.5deg)' }}>
            🏛️ Politische Bildung · seit 2022
          </div>
          <div style={{ ...playfulStyles.h, fontSize: 180, lineHeight: 0.88, color: '#FFF', textShadow: '3px 3px 0 rgba(0,0,0,0.4)' }}>
            Demokratie<br/><span style={{ color: '#00FF88' }}>in Minecraft.</span>
          </div>
          <div style={{ fontSize: 30, marginTop: 28, color: '#FFE66D', maxWidth: 1300, lineHeight: 1.4, background: 'rgba(0,0,0,0.5)', padding: '18px 26px', display: 'inline-block' }}>
            {p.teaser}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto) 1fr auto', gap: 40, alignItems: 'flex-end', borderTop: '4px solid #00FF88', paddingTop: 24 }}>
          {p.stats.map((s, i) => (
            <div key={i}>
              <div style={{ ...playfulStyles.h, fontSize: 72, color: '#00FF88', lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: 20, color: '#FFF', marginTop: 6 }}>{s.l}</div>
            </div>
          ))}
          <div />
          <QRTag url={p.url} label="mehr erfahren" />
        </div>
      </div>
    </div>
  );
}

// Gallery
function PlayfulGallery() {
  return (
    <div style={{ ...playfulStyles.slide, background: '#0D1B2A', color: '#FFE66D', padding: 60 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 32 }}>
        <div style={{ ...playfulStyles.h, fontSize: 80 }}>Das passiert<br />im KidsLab.</div>
        <div style={{ fontSize: 24, opacity: 0.7 }}>#echtescooleprojekte</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', gap: 16, height: 760 }}>
        {GALLERY.map((src, i) => (
          <div key={i} style={{ overflow: 'hidden', position: 'relative' }}>
            <img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// CTA / Contact with WhatsApp QR + website QR
function PlayfulCTA() {
  return (
    <div style={{ ...playfulStyles.slide, background: '#FF6B6B', color: '#FFF' }}>
      <PixelBg color="#FFE66D" opacity={0.12} />
      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ ...playfulStyles.h, fontSize: 36, color: '#FFE66D', marginBottom: 20 }}>Komm rein, sag Hallo</div>
          <div style={{ ...playfulStyles.h, fontSize: 150, lineHeight: 0.9, marginBottom: 40 }}>
            Wir sind<br/>hier drin. ッ
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto auto', gap: 48, alignItems: 'flex-end' }}>
          <div>
            <div style={{ opacity: 0.8, fontSize: 18, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 10 }}>Besuch uns</div>
            <div style={{ ...playfulStyles.h, fontSize: 32, lineHeight: 1.2 }}>{KIDSLAB.address}</div>
            <div style={{ fontSize: 20, marginTop: 16, opacity: 0.9 }}>📸 Instagram {KIDSLAB.instagram}</div>
          </div>
          <div>
            <div style={{ opacity: 0.8, fontSize: 18, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 10 }}>Schreib uns</div>
            <div style={{ ...playfulStyles.h, fontSize: 30 }}>{KIDSLAB.email}</div>
            <div style={{ ...playfulStyles.h, fontSize: 30, marginTop: 6 }}>{KIDSLAB.phone}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ background: '#FFF', padding: 12, display: 'inline-block' }}>
              <img src="assets/qr-whatsapp.png" style={{ width: 170, height: 170, display: 'block' }} />
            </div>
            <div style={{ ...playfulStyles.h, fontSize: 20, marginTop: 10, color: '#FFE66D' }}>WhatsApp ↑</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <QRTag url="kidslab.de" label="kidslab.de" />
          </div>
        </div>
      </div>
    </div>
  );
}

window.PlayfulVariant = {
  slides: [
    PlayfulIntro,
    PlayfulValues,
    () => <PlayfulCourse course={COURSES[0]} index={0} />,
    () => <PlayfulFeatured course={COURSES[1]} colorSet={{ bg: '#0066FF', fg: '#FFF', accent: '#FFE66D' }} flagText="Highlight-Kurs" />,
    () => <PlayfulFeatured course={COURSES[2]} colorSet={{ bg: '#0D1B2A', fg: '#FFE66D', accent: '#FF6B6B' }} flagText="Aktuelle Staffel" />,
    PlayfulGamesLab,
    PlayfulDemokratie,
    PlayfulGallery,
    PlayfulCTA,
  ],
};
