// Variant 3: Warm Studio — freundlich, ruhig, elternkompatibel. Creme-Töne, große Fotos.

const warmStyles = {
  slide: {
    position: 'absolute', inset: 0,
    background: '#F5EFE6',
    color: '#1F2937',
    fontFamily: "'Inter', system-ui, sans-serif",
    padding: '80px 120px',
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
};

const WARM_BLUE = '#2A5F8F';
const WARM_TERRA = '#C87B5C';
const WARM_INK = '#1F2937';
const WARM_CREAM = '#F5EFE6';

function WarmHeader({ label, num, total }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 60 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <img src="assets/logo.png" style={{ height: 48 }} />
        <div style={{ fontFamily: "'Pixelify Sans', system-ui", fontSize: 28, color: WARM_INK }}>KidsLab</div>
      </div>
      <div style={{ fontSize: 16, color: '#6B7280', letterSpacing: 2, textTransform: 'uppercase' }}>
        {label} · {num}/{total}
      </div>
    </div>
  );
}

function WarmIntro() {
  return (
    <div style={warmStyles.slide}>
      <WarmHeader label="Willkommen" num="01" total="07" />
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 80, alignItems: 'center', height: 840 }}>
        <div>
          <div style={{ fontSize: 22, color: WARM_TERRA, marginBottom: 24, fontWeight: 500, letterSpacing: 1 }}>
            Maker Education · Augsburg seit 2020
          </div>
          <div style={{ fontFamily: "'Pixelify Sans', system-ui", fontSize: 140, lineHeight: 0.95, marginBottom: 36, color: WARM_INK }}>
            Technik<br/>zum<br/><span style={{ color: WARM_BLUE }}>Anfassen.</span>
          </div>
          <div style={{ fontSize: 30, lineHeight: 1.4, color: '#374151', maxWidth: 720 }}>
            Programmieren, löten, Roboter bauen, 3D-drucken —
            bei uns lernen Kinder und Jugendliche Technik,
            indem sie sie gestalten.
          </div>
          <div style={{ marginTop: 48, display: 'inline-block', borderTop: `2px solid ${WARM_INK}`, paddingTop: 24 }}>
            <div style={{ fontSize: 18, color: '#6B7280', marginBottom: 8 }}>Eine Initiative der</div>
            <div style={{ fontSize: 26, fontWeight: 600 }}>gemeinnützigen KidsLab gGmbH</div>
          </div>
        </div>
        <div style={{ position: 'relative', height: 760 }}>
          <img src="assets/lab-01.jpg" style={{
            width: '100%', height: '100%', objectFit: 'cover',
            borderRadius: 8, boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
          }} />
          <div style={{
            position: 'absolute', bottom: -24, left: -24,
            background: WARM_CREAM, padding: '20px 28px',
            border: `2px solid ${WARM_INK}`,
            fontFamily: "'Pixelify Sans', system-ui", fontSize: 28,
          }}>
            → kidslab.de
          </div>
        </div>
      </div>
    </div>
  );
}

function WarmValues() {
  return (
    <div style={warmStyles.slide}>
      <WarmHeader label="So arbeiten wir" num="02" total="07" />
      <div style={{ maxWidth: 1200, marginBottom: 60 }}>
        <div style={{ fontSize: 22, color: WARM_TERRA, marginBottom: 20 }}>Unser Ansatz</div>
        <div style={{ fontFamily: "'Pixelify Sans', system-ui", fontSize: 96, lineHeight: 1.05, color: WARM_INK }}>
          „Hilf mir, es selbst zu tun."
        </div>
        <div style={{ fontSize: 22, color: '#6B7280', marginTop: 16 }}>— Maria Montessori</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginTop: 40 }}>
        {VALUES.map((v, i) => (
          <div key={i} style={{ borderTop: `3px solid ${WARM_BLUE}`, paddingTop: 24 }}>
            <div style={{ fontSize: 20, color: WARM_TERRA, fontWeight: 600, marginBottom: 14 }}>0{i+1}</div>
            <div style={{ fontFamily: "'Pixelify Sans', system-ui", fontSize: 40, marginBottom: 14, color: WARM_INK }}>{v.t}</div>
            <div style={{ fontSize: 22, lineHeight: 1.5, color: '#4B5563' }}>{v.d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WarmCourse({ course, index }) {
  const reverse = index % 2 === 1;
  return (
    <div style={warmStyles.slide}>
      <WarmHeader label="Kurs" num={`0${index+3}`} total="07" />
      <div style={{
        display: 'grid',
        gridTemplateColumns: reverse ? '1fr 1.1fr' : '1.1fr 1fr',
        gap: 80, alignItems: 'center', height: 800,
        direction: reverse ? 'rtl' : 'ltr',
      }}>
        <div style={{ direction: 'ltr' }}>
          <div style={{ fontSize: 22, color: WARM_TERRA, marginBottom: 20, letterSpacing: 1 }}>
            {course.subtitle}
          </div>
          <div style={{ fontFamily: "'Pixelify Sans', system-ui", fontSize: 130, lineHeight: 0.95, marginBottom: 36, color: WARM_INK }}>
            {course.title}
          </div>
          <div style={{ fontSize: 28, lineHeight: 1.45, color: '#374151', marginBottom: 48, maxWidth: 680 }}>
            {course.teaser}
          </div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 44 }}>
            {course.highlights.map((h, i) => (
              <span key={i} style={{
                fontSize: 20, padding: '10px 20px',
                background: WARM_INK, color: WARM_CREAM, borderRadius: 100,
              }}>{h}</span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 60, borderTop: `1px solid ${WARM_INK}33`, paddingTop: 28 }}>
            <div>
              <div style={{ fontSize: 16, color: '#6B7280', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>Alter</div>
              <div style={{ fontSize: 32, fontWeight: 600, color: WARM_BLUE }}>{course.age}</div>
            </div>
            <div>
              <div style={{ fontSize: 16, color: '#6B7280', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>Termin</div>
              <div style={{ fontSize: 32, fontWeight: 600, color: WARM_BLUE }}>{course.when}</div>
            </div>
          </div>
        </div>
        <div style={{ direction: 'ltr', position: 'relative', height: 800 }}>
          <img src={course.image} style={{
            width: '100%', height: '100%', objectFit: 'cover',
            borderRadius: 8, boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
          }} />
        </div>
      </div>
    </div>
  );
}

function WarmGallery() {
  return (
    <div style={{ ...warmStyles.slide, padding: '80px 80px' }}>
      <WarmHeader label="Eindrücke" num="06" total="07" />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 40 }}>
        <div style={{ fontFamily: "'Pixelify Sans', system-ui", fontSize: 88, lineHeight: 1, color: WARM_INK }}>
          Bei uns<br/>im Lab.
        </div>
        <div style={{ fontSize: 22, color: '#6B7280', textAlign: 'right', maxWidth: 400 }}>
          Jeden Tag entstehen hier neue Projekte — Roboter, Spiele, Leuchtfiguren, Experimente.
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', gap: 20, height: 700 }}>
        {GALLERY.map((src, i) => (
          <div key={i} style={{ overflow: 'hidden', borderRadius: 8, boxShadow: '0 8px 20px rgba(0,0,0,0.08)' }}>
            <img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function WarmCTA() {
  return (
    <div style={{ ...warmStyles.slide, background: WARM_INK, color: WARM_CREAM }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 60 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <img src="assets/logo.png" style={{ height: 48, filter: 'brightness(1.2)' }} />
          <div style={{ fontFamily: "'Pixelify Sans', system-ui", fontSize: 28 }}>KidsLab</div>
        </div>
        <div style={{ fontSize: 16, color: '#9CA3AF', letterSpacing: 2, textTransform: 'uppercase' }}>
          Kontakt · 07/07
        </div>
      </div>
      <div style={{ marginBottom: 72 }}>
        <div style={{ fontSize: 22, color: WARM_TERRA, marginBottom: 24 }}>Lust vorbeizukommen?</div>
        <div style={{ fontFamily: "'Pixelify Sans', system-ui", fontSize: 170, lineHeight: 0.95, color: WARM_CREAM }}>
          Hallo sagen.<br/>
          <span style={{ color: WARM_TERRA }}>Mitmachen.</span>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48, borderTop: `1px solid ${WARM_CREAM}33`, paddingTop: 40 }}>
        <div>
          <div style={{ fontSize: 16, color: '#9CA3AF', letterSpacing: 2, marginBottom: 12, textTransform: 'uppercase' }}>Vor Ort</div>
          <div style={{ fontSize: 26, fontWeight: 500, lineHeight: 1.4 }}>{KIDSLAB.address}</div>
        </div>
        <div>
          <div style={{ fontSize: 16, color: '#9CA3AF', letterSpacing: 2, marginBottom: 12, textTransform: 'uppercase' }}>Schreib uns</div>
          <div style={{ fontSize: 26, fontWeight: 500 }}>{KIDSLAB.email}</div>
          <div style={{ fontSize: 22, fontWeight: 400, marginTop: 6, color: '#D1D5DB' }}>{KIDSLAB.phone}</div>
        </div>
        <div>
          <div style={{ fontSize: 16, color: '#9CA3AF', letterSpacing: 2, marginBottom: 12, textTransform: 'uppercase' }}>Online</div>
          <div style={{ fontFamily: "'Pixelify Sans', system-ui", fontSize: 36, color: WARM_TERRA }}>kidslab.de</div>
          <div style={{ fontSize: 20, marginTop: 8, color: '#D1D5DB' }}>Instagram {KIDSLAB.instagram}</div>
        </div>
      </div>
    </div>
  );
}

window.WarmVariant = {
  slides: [WarmIntro, WarmValues,
    () => <WarmCourse course={COURSES[0]} index={0} />,
    () => <WarmCourse course={COURSES[1]} index={1} />,
    () => <WarmCourse course={COURSES[2]} index={2} />,
    WarmGallery, WarmCTA],
};
