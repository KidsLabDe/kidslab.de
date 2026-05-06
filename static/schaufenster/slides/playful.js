// Variant: Playful Pixel — Vanilla JS, kein React, kein Babel

const H = "font-family:'Pixelify Sans',system-ui;font-weight:700;letter-spacing:0.5px";
const SLIDE = "position:absolute;inset:0;font-family:'Inter',system-ui,sans-serif;overflow:hidden";

function pixelBg(color, opacity) {
  color = color || '#0D1B2A';
  opacity = (opacity != null) ? opacity : 0.06;
  return `<div style="position:absolute;inset:0;pointer-events:none;background-image:radial-gradient(${color} 2px,transparent 2px);background-size:24px 24px;opacity:${opacity}"></div>`;
}

function chip(text, bg, fg) {
  return `<span style="display:inline-block;padding:10px 22px;background:${bg};color:${fg};font-family:'Pixelify Sans',system-ui;font-size:24px;font-weight:600;margin-right:12px;margin-bottom:12px;white-space:nowrap">${text}</span>`;
}

function qrTag(url, label, dark, light, size) {
  dark = dark || '#0D1B2A';
  light = light || '#FFFFFF';
  size = size || 160;
  const src = QR_IMAGES[url] || '';
  return `<div style="background:${light};padding:12px;display:inline-block;text-align:center;flex-shrink:0">
    <img src="${src}" width="${size}" height="${size}" style="display:block;image-rendering:pixelated" loading="eager" alt="QR">
    <div style="color:${dark};font-family:'Pixelify Sans',system-ui;font-size:16px;margin-top:6px;letter-spacing:0.5px">${label || url}</div>
  </div>`;
}

// 1. Intro
function slideIntro() {
  return `<div style="${SLIDE};background:#0066FF;color:#FFF">
    ${pixelBg('#FFE66D', 0.15)}
    <div style="position:relative;height:100%;padding:80px 100px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between">
      <div style="display:flex;align-items:center;gap:28px">
        <img src="assets/logo.png" height="110" style="image-rendering:pixelated" loading="eager" alt="KidsLab Logo">
        <div>
          <div style="${H};font-size:72px;line-height:1">KidsLab</div>
          <div style="font-size:24px;opacity:0.9;margin-top:8px">Augsburg · seit 2020</div>
        </div>
      </div>
      <div>
        <div style="${H};font-size:150px;line-height:0.95;color:#FFE66D">Bau dir<br>deine Welt.</div>
        <div style="font-size:38px;margin-top:32px;max-width:1400px;line-height:1.3">
          Programmieren. Löten. Roboter bauen. 3D-drucken.<br>
          Bei uns lernst du Technik, indem du sie benutzt.
        </div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:flex-end">
        <div style="font-family:'Pixelify Sans',system-ui;font-size:40px">→ kidslab.de</div>
        <div style="font-size:22px;text-align:right;opacity:0.85">gemeinnützige gGmbH<br>Maker Education für junge Menschen</div>
      </div>
    </div>
  </div>`;
}

// 2. Werte
function slideValues() {
  const cards = VALUES.map((v, i) => `
    <div style="background:#0D1B2A;color:#FFE66D;padding:36px 32px">
      <div style="${H};font-size:42px;margin-bottom:14px">0${i+1}</div>
      <div style="${H};font-size:36px;margin-bottom:12px">${v.t}</div>
      <div style="font-size:20px;color:#FFF;line-height:1.4">${v.d}</div>
    </div>`).join('');
  return `<div style="${SLIDE};background:#FFE66D;color:#0D1B2A">
    ${pixelBg()}
    <div style="position:relative;padding:80px 100px;box-sizing:border-box">
      <div style="${H};font-size:44px;margin-bottom:20px;color:#0066FF">// So arbeiten wir</div>
      <div style="${H};font-size:110px;line-height:1;margin-bottom:30px;max-width:1500px">„Hilf mir, es selbst zu tun."</div>
      <div style="font-size:22px;opacity:0.6;margin-bottom:60px">— Maria Montessori</div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:24px">${cards}</div>
    </div>
  </div>`;
}

// 3–5. Kurs-Slides
function slideCourse(course, colors, num) {
  const highlights = course.highlights.map(h => chip(h, colors.accent, colors.bg)).join('');
  return `<div style="${SLIDE};background:${colors.bg};color:${colors.fg}">
    <div style="display:grid;grid-template-columns:1.1fr 1fr;height:100%">
      <div style="padding:80px 80px 80px;display:flex;flex-direction:column;justify-content:space-between;position:relative;box-sizing:border-box">
        ${pixelBg(colors.accent, 0.1)}
        <div style="position:relative">
          <div style="${H};font-size:32px;color:${colors.accent};margin-bottom:20px">Kurs 0${num} / 03</div>
          <div style="${H};font-size:120px;line-height:0.9;margin-bottom:24px">${course.title}</div>
          <div style="font-size:32px;opacity:0.85;margin-bottom:40px">${course.subtitle}</div>
          <div style="font-size:26px;line-height:1.45;max-width:720px">${course.teaser}</div>
        </div>
        <div style="position:relative">
          <div style="margin-bottom:20px">${highlights}</div>
          <div style="display:flex;gap:32px;border-top:3px solid ${colors.fg};padding-top:24px;align-items:flex-end">
            <div style="flex:1">
              <div style="font-size:16px;opacity:0.6;text-transform:uppercase;letter-spacing:2px">Alter</div>
              <div style="${H};font-size:28px;margin-top:6px;white-space:nowrap">${course.age}</div>
              <div style="font-size:16px;opacity:0.6;text-transform:uppercase;letter-spacing:2px;margin-top:14px">Termin</div>
              <div style="${H};font-size:28px;margin-top:6px;white-space:nowrap">${course.when}</div>
            </div>
            ${qrTag(course.url, 'anmelden', '#0D1B2A', '#FFFFFF')}
          </div>
        </div>
      </div>
      <div style="position:relative;overflow:hidden">
        <img src="${course.image}" style="width:100%;height:100%;object-fit:cover" loading="eager" alt="${course.title}">
      </div>
    </div>
  </div>`;
}

function slideFeatured(course, c, flagText) {
  return `<div style="${SLIDE};background:${c.bg};color:${c.fg}">
    <div style="position:absolute;inset:0">
      <img src="${course.image}" style="width:100%;height:100%;object-fit:cover;opacity:0.35" loading="eager" alt="${course.title}">
    </div>
    ${pixelBg(c.accent, 0.18)}
    <div style="position:relative;height:100%;padding:70px 90px 0;box-sizing:border-box">
      <div style="display:flex;justify-content:space-between;align-items:flex-start">
        <div style="background:${c.accent};color:${c.bg};padding:14px 26px;font-family:'Pixelify Sans',system-ui;font-size:30px;font-weight:700;transform:rotate(-2deg);box-shadow:6px 6px 0 rgba(0,0,0,0.25)">★ ${flagText}</div>
        <div style="font-family:'Pixelify Sans',system-ui;font-size:28px;color:${c.accent}">${course.subtitle}</div>
      </div>
      <div style="margin-top:40px">
        <div style="${H};font-size:180px;line-height:0.9;text-shadow:4px 4px 0 rgba(0,0,0,0.25)">${course.title}</div>
        <div style="font-size:30px;margin-top:20px;max-width:1100px;line-height:1.3;background:rgba(0,0,0,0.4);padding:16px 24px;display:inline-block">${course.teaser}</div>
      </div>
    </div>
    <div style="position:absolute;bottom:70px;left:90px;right:90px;display:flex;gap:48px;align-items:flex-end;border-top:4px solid ${c.accent};padding-top:24px">
      <div>
        <div style="font-size:18px;opacity:0.7;letter-spacing:2px;text-transform:uppercase">Alter</div>
        <div style="${H};font-size:36px;margin-top:6px;white-space:nowrap">${course.age}</div>
      </div>
      <div>
        <div style="font-size:18px;opacity:0.7;letter-spacing:2px;text-transform:uppercase">Termin</div>
        <div style="${H};font-size:36px;margin-top:6px;white-space:nowrap">${course.when}</div>
      </div>
      <div style="flex:1"></div>
      ${qrTag(course.url, 'jetzt anmelden →')}
    </div>
  </div>`;
}

// 6. GamesLab
function slideGamesLab() {
  const p = PROJECTS[0];
  const stats = p.stats.map(s => `
    <div>
      <div style="${H};font-size:52px;color:#FFE66D;line-height:1">${s.v}</div>
      <div style="font-size:18px;opacity:0.85;margin-top:6px">${s.l}</div>
    </div>`).join('');
  return `<div style="${SLIDE};background:#6B2DDB;color:#FFF">
    ${pixelBg('#FFE66D', 0.12)}
    <div style="display:grid;grid-template-columns:1.2fr 1fr;height:100%">
      <div style="padding:70px 70px 70px;position:relative;display:flex;flex-direction:column;justify-content:space-between;box-sizing:border-box">
        <div>
          <div style="display:inline-block;background:#FFE66D;color:#0D1B2A;padding:10px 20px;font-family:'Pixelify Sans',system-ui;font-size:24px;margin-bottom:20px">⭐ Für Schulen · kostenlos</div>
          <div style="${H};font-size:150px;line-height:0.9;margin-bottom:16px">GamesLab</div>
          <div style="font-size:28px;color:#FFE66D;margin-bottom:24px">${p.subtitle}</div>
          <div style="font-size:22px;line-height:1.5;max-width:780px">${p.teaser}</div>
        </div>
        <div>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-bottom:24px;border-top:3px solid #FFE66D;padding-top:24px">
            ${stats}
          </div>
          <div style="display:flex;align-items:center;gap:24px">
            ${qrTag(p.url, 'gameslab')}
            <div style="font-size:22px;opacity:0.85;line-height:1.4">
              Schirmherr: Bayerns Digitalminister<br>
              <span style="${H};font-size:26px;color:#FFE66D">Dr. Fabian Mehring</span>
            </div>
          </div>
        </div>
      </div>
      <div style="position:relative;overflow:hidden">
        <img src="${p.image}" style="width:100%;height:100%;object-fit:cover" loading="eager" alt="GamesLab">
        <div style="position:absolute;top:30px;right:30px;background:#FFE66D;color:#0D1B2A;padding:10px 16px;font-family:'Pixelify Sans',system-ui;font-size:22px">Augsburger GamesPreis</div>
      </div>
    </div>
  </div>`;
}

// 7. Demokratie in Minecraft
function slideDemokratie() {
  const p = PROJECTS[1];
  const stats = p.stats.map(s => `
    <div>
      <div style="${H};font-size:64px;color:#00FF88;line-height:1">${s.v}</div>
      <div style="font-size:20px;color:#FFF;margin-top:6px">${s.l}</div>
    </div>`).join('');
  return `<div style="${SLIDE};background:#0D1B2A;color:#FFE66D">
    <div style="position:absolute;inset:0">
      <img src="${p.image}" style="width:100%;height:100%;object-fit:cover;opacity:0.35" loading="eager" alt="Minecraft City">
    </div>
    ${pixelBg('#00FF88', 0.14)}
    <div style="position:relative;height:100%;padding:70px 90px 0;box-sizing:border-box">
      <div style="display:inline-block;background:#00FF88;color:#0D1B2A;padding:12px 22px;font-family:'Pixelify Sans',system-ui;font-size:26px;margin-bottom:24px;transform:rotate(-1.5deg)">🏛️ Politische Bildung · seit 2022</div>
      <div style="${H};font-size:155px;line-height:0.9;color:#FFF;text-shadow:3px 3px 0 rgba(0,0,0,0.4)">
        Demokratie<br><span style="color:#00FF88">in Minecraft.</span>
      </div>
      <div style="font-size:26px;margin-top:20px;color:#FFE66D;max-width:1300px;line-height:1.4;background:rgba(0,0,0,0.5);padding:14px 22px;display:inline-block">
        ${p.teaser}
      </div>
    </div>
    <div style="position:absolute;bottom:70px;left:90px;right:90px;display:flex;gap:48px;align-items:flex-end;border-top:4px solid #00FF88;padding-top:24px">
      ${stats}
      <div style="flex:1"></div>
      ${qrTag(p.url, 'mehr erfahren')}
    </div>
  </div>`;
}

// 8. Galerie — background-image statt <img> vermeidet 6× Reflow beim Laden
function slideGallery() {
  const items = GALLERY.map(src =>
    `<div style="background:url('${src}') center/cover no-repeat"></div>`
  ).join('');
  return `<div style="${SLIDE};background:#0D1B2A;color:#FFE66D">
    <div style="padding:60px;box-sizing:border-box;height:100%;display:flex;flex-direction:column">
      <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:28px;flex-shrink:0">
        <div style="${H};font-size:76px">Das passiert<br>im KidsLab.</div>
        <div style="font-size:24px;opacity:0.7">#echtescooleprojekte</div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(2,1fr);gap:16px;flex:1;min-height:0">
        ${items}
      </div>
    </div>
  </div>`;
}

// 9. CTA / Kontakt
function slideCTA() {
  return `<div style="${SLIDE};background:#FF6B6B;color:#FFF">
    ${pixelBg('#FFE66D', 0.12)}
    <div style="position:relative;height:100%;padding:80px 100px 80px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between">
      <div>
        <div style="${H};font-size:36px;color:#FFE66D;margin-bottom:20px">Komm rein, sag Hallo</div>
        <div style="${H};font-size:140px;line-height:0.9">Wir sind<br>hier drin. ッ</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr auto auto;gap:40px;align-items:flex-end">
        <div>
          <div style="opacity:0.8;font-size:18px;text-transform:uppercase;letter-spacing:2px;margin-bottom:10px">Besuch uns</div>
          <div style="${H};font-size:30px;line-height:1.2">${KIDSLAB.address}</div>
          <div style="font-size:20px;margin-top:16px;opacity:0.9">📸 Instagram ${KIDSLAB.instagram}</div>
        </div>
        <div>
          <div style="opacity:0.8;font-size:18px;text-transform:uppercase;letter-spacing:2px;margin-bottom:10px">Schreib uns</div>
          <div style="${H};font-size:28px">${KIDSLAB.email}</div>
          <div style="${H};font-size:28px;margin-top:6px">${KIDSLAB.phone}</div>
        </div>
        <div style="text-align:center">
          <div style="background:#FFF;padding:12px;display:inline-block">
            <img src="assets/qr-whatsapp.png" width="160" height="160" style="display:block" alt="WhatsApp QR">
          </div>
          <div style="${H};font-size:18px;margin-top:8px;color:#FFE66D">WhatsApp ↑</div>
        </div>
        <div style="text-align:center">
          ${qrTag('kidslab.de', 'kidslab.de')}
        </div>
      </div>
    </div>
  </div>`;
}

window.PlayfulVariant = {
  slides: [
    slideIntro,
    slideValues,
    () => slideCourse(COURSES[0], { bg: '#FF6B6B', fg: '#FFF', accent: '#FFE66D' }, 1),
    () => slideFeatured(COURSES[1], { bg: '#0066FF', fg: '#FFF', accent: '#FFE66D' }, 'Highlight-Kurs'),
    () => slideFeatured(COURSES[2], { bg: '#0D1B2A', fg: '#FFE66D', accent: '#FF6B6B' }, 'Aktuelle Staffel'),
    slideGamesLab,
    slideDemokratie,
    slideGallery,
    slideCTA,
  ],
};
