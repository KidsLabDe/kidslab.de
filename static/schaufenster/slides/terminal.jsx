// Variant 2: Maker Terminal — dunkel, monospaced, Schaltplan-Raster

const termStyles = {
  slide: {
    position: 'absolute', inset: 0,
    background: '#0A0E14',
    color: '#E6E9EF',
    fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace",
    padding: '72px 96px',
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
};

const ACCENT = '#00FF88';
const ACCENT2 = '#FF4D6D';
const AMBER = '#FFB020';

function Grid() {
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      backgroundImage: 'linear-gradient(rgba(0,255,136,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.04) 1px, transparent 1px)',
      backgroundSize: '40px 40px',
    }} />
  );
}

function CornerBrackets({ color = ACCENT }) {
  const S = { position: 'absolute', width: 24, height: 24, border: `2px solid ${color}` };
  return <>
    <div style={{ ...S, top: 24, left: 24, borderRight: 'none', borderBottom: 'none' }} />
    <div style={{ ...S, top: 24, right: 24, borderLeft: 'none', borderBottom: 'none' }} />
    <div style={{ ...S, bottom: 24, left: 24, borderRight: 'none', borderTop: 'none' }} />
    <div style={{ ...S, bottom: 24, right: 24, borderLeft: 'none', borderTop: 'none' }} />
  </>;
}

function StatusBar({ label }) {
  return (
    <div style={{
      position: 'absolute', top: 32, left: 96, right: 96,
      display: 'flex', justifyContent: 'space-between',
      fontSize: 16, color: '#8A93A6', letterSpacing: 2,
    }}>
      <div>KIDSLAB.SYS / {label}</div>
      <div><span style={{ color: ACCENT }}>● </span>ONLINE · 1920×1080 · {new Date().toLocaleTimeString('de-DE',{hour:'2-digit',minute:'2-digit'})}</div>
    </div>
  );
}

function TermIntro() {
  return (
    <div style={termStyles.slide}>
      <Grid /><CornerBrackets /><StatusBar label="INTRO" />
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
        <div style={{ color: ACCENT, fontSize: 22, marginBottom: 40, letterSpacing: 3 }}>$ kidslab --start</div>
        <div style={{ fontFamily: "'Pixelify Sans', monospace", fontSize: 200, lineHeight: 0.9, fontWeight: 700 }}>
          KidsLab<span style={{ color: ACCENT, animation: 'blink 1s infinite' }}>_</span>
        </div>
        <div style={{ fontSize: 36, marginTop: 36, color: '#B8C0D1', maxWidth: 1400 }}>
          Maker-Space &amp; Programmier-Labor<br/>
          für junge Menschen. Augsburg, seit 2020.
        </div>
        <div style={{ marginTop: 60, display: 'flex', gap: 48, fontSize: 20 }}>
          <div><span style={{ color: '#8A93A6' }}>[ Kurse ]</span> <span style={{ color: AMBER }}>3 aktiv</span></div>
          <div><span style={{ color: '#8A93A6' }}>[ Tools ]</span> <span style={{ color: AMBER }}>3D·LEGO·ESP32</span></div>
          <div><span style={{ color: '#8A93A6' }}>[ Ziel   ]</span> <span style={{ color: AMBER }}>selber machen</span></div>
        </div>
      </div>
      <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
    </div>
  );
}

function TermValues() {
  return (
    <div style={termStyles.slide}>
      <Grid /><CornerBrackets color={AMBER} /><StatusBar label="PHILOSOPHY.MD" />
      <div style={{ marginTop: 40 }}>
        <div style={{ color: AMBER, fontSize: 22, letterSpacing: 3, marginBottom: 24 }}># philosophy</div>
        <div style={{ fontFamily: "'Pixelify Sans', monospace", fontSize: 96, lineHeight: 1.05, marginBottom: 16, maxWidth: 1600 }}>
          "Hilf mir, es selbst<br/>zu tun."
        </div>
        <div style={{ fontSize: 20, color: '#8A93A6', marginBottom: 64 }}>// Maria Montessori</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {VALUES.map((v, i) => (
            <div key={i} style={{ border: `1px solid #1E2530`, padding: 28, background: '#0F141C' }}>
              <div style={{ color: ACCENT, fontSize: 18, marginBottom: 16 }}>0{i+1} ━━━</div>
              <div style={{ fontSize: 32, fontWeight: 600, marginBottom: 12, color: '#FFF' }}>{v.t}</div>
              <div style={{ fontSize: 18, color: '#B8C0D1', lineHeight: 1.5 }}>{v.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TermCourse({ course, index }) {
  const accents = [ACCENT, AMBER, ACCENT2];
  const A = accents[index];
  return (
    <div style={termStyles.slide}>
      <Grid /><CornerBrackets color={A} /><StatusBar label={`COURSE_0${index+1}.CFG`} />
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 60, height: '100%', alignItems: 'center', marginTop: 20 }}>
        <div>
          <div style={{ color: A, fontSize: 22, letterSpacing: 3, marginBottom: 20 }}>
            &gt; course/{course.key}
          </div>
          <div style={{ fontFamily: "'Pixelify Sans', monospace", fontSize: 110, lineHeight: 0.95, marginBottom: 16, color: '#FFF' }}>
            {course.title}
          </div>
          <div style={{ fontSize: 26, color: A, marginBottom: 32 }}>// {course.subtitle}</div>
          <div style={{ fontSize: 22, lineHeight: 1.55, color: '#B8C0D1', marginBottom: 40, maxWidth: 800 }}>
            {course.teaser}
          </div>
          <div style={{ fontFamily: 'inherit', fontSize: 20, background: '#0F141C', border: `1px solid ${A}33`, padding: 24, marginBottom: 24 }}>
            <div style={{ marginBottom: 8 }}><span style={{ color: '#8A93A6' }}>age   </span>= <span style={{ color: AMBER }}>"{course.age}"</span></div>
            <div style={{ marginBottom: 8 }}><span style={{ color: '#8A93A6' }}>when  </span>= <span style={{ color: AMBER }}>"{course.when}"</span></div>
            <div><span style={{ color: '#8A93A6' }}>tools </span>= [{course.highlights.map(h => <span key={h} style={{ color: ACCENT }}>"{h}", </span>)}]</div>
          </div>
          <div style={{ fontSize: 22, color: A }}>&gt; anmelden auf <span style={{ textDecoration: 'underline' }}>kidslab.de</span> _</div>
        </div>
        <div style={{ position: 'relative', height: 720, border: `2px solid ${A}`, padding: 8 }}>
          <img src={course.image} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(1.05) saturate(1.1)' }} />
          <div style={{
            position: 'absolute', top: -14, left: 20, background: '#0A0E14',
            padding: '0 12px', color: A, fontSize: 16, letterSpacing: 2,
          }}>IMG · {course.key.toUpperCase()}.jpg</div>
        </div>
      </div>
    </div>
  );
}

function TermGallery() {
  return (
    <div style={termStyles.slide}>
      <Grid /><CornerBrackets color={ACCENT2} /><StatusBar label="GALLERY/*" />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 36, marginTop: 20 }}>
        <div>
          <div style={{ color: ACCENT2, fontSize: 22, letterSpacing: 3, marginBottom: 16 }}>$ ls gallery/</div>
          <div style={{ fontFamily: "'Pixelify Sans', monospace", fontSize: 84, lineHeight: 1 }}>
            was läuft<br/>hier so?
          </div>
        </div>
        <div style={{ fontSize: 18, color: '#8A93A6', textAlign: 'right' }}>
          {GALLERY.length} files<br/>from /ueber-kidslab
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', gap: 12, height: 660 }}>
        {GALLERY.map((src, i) => (
          <div key={i} style={{ position: 'relative', overflow: 'hidden', border: '1px solid #1E2530' }}>
            <img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(1.05)' }} />
            <div style={{
              position: 'absolute', bottom: 8, left: 8, background: '#0A0E14CC',
              padding: '4px 10px', color: ACCENT, fontSize: 12, letterSpacing: 1,
            }}>img_{String(i+1).padStart(3,'0')}.jpg</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TermCTA() {
  return (
    <div style={termStyles.slide}>
      <Grid /><CornerBrackets /><StatusBar label="CONTACT.INIT" />
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: 20 }}>
        <div style={{ color: ACCENT, fontSize: 22, letterSpacing: 3, marginBottom: 24 }}>$ ./visit.sh</div>
        <div style={{ fontFamily: "'Pixelify Sans', monospace", fontSize: 168, lineHeight: 0.9, marginBottom: 72 }}>
          Komm<br/>vorbei.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, fontSize: 20, marginBottom: 48 }}>
          {[
            ['ADDR', KIDSLAB.address],
            ['MAIL', KIDSLAB.email],
            ['FON ', KIDSLAB.phone],
          ].map(([k, v]) => (
            <div key={k} style={{ borderLeft: `3px solid ${ACCENT}`, paddingLeft: 20 }}>
              <div style={{ color: '#8A93A6', letterSpacing: 3, marginBottom: 10 }}>{k}</div>
              <div style={{ fontSize: 26, color: '#FFF' }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #1E2530', paddingTop: 32, display: 'flex', justifyContent: 'space-between', fontSize: 24 }}>
          <div style={{ color: ACCENT }}>→ kidslab.de</div>
          <div style={{ color: '#B8C0D1' }}>IG {KIDSLAB.instagram} · WA {KIDSLAB.whatsapp}</div>
        </div>
      </div>
    </div>
  );
}

window.TerminalVariant = {
  slides: [TermIntro, TermValues,
    () => <TermCourse course={COURSES[0]} index={0} />,
    () => <TermCourse course={COURSES[1]} index={1} />,
    () => <TermCourse course={COURSES[2]} index={2} />,
    TermGallery, TermCTA],
};
