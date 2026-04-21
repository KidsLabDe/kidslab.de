// Shared data for all variants

const KIDSLAB = {
  tagline: 'Digitale Bildung für junge Menschen',
  website: 'kidslab.de',
  instagram: '@kidslabaugsburg',
  phone: '0821-99951920',
  email: 'info@kidslab.de',
  address: 'Herrenhäuser 17, Fischertor · Augsburg',
  whatsapp: 'wa.me/4982199951920',
};

const COURSES = [
  {
    key: 'minnimaker',
    title: 'MinniMaker',
    subtitle: 'Basteln · Bauen · Entdecken',
    age: '8 – 12 Jahre',
    when: 'Montag · 16:00 – 18:00',
    teaser: 'Ein Thema, mehrere Wochen — tüfteln mit rotem Faden, Teamgefühl und greifbaren Ergebnissen.',
    highlights: ['3D-Drucken', 'Löten', 'LED-Projekte'],
    image: 'assets/course-minnimaker-1.png',
    url: 'kidslab.de/kurse/minnimaker-nachmittag/',
  },
  {
    key: 'lego',
    title: 'Lego Robotics',
    subtitle: 'Roboter bauen · Programmieren',
    age: '8 – 12 Jahre',
    when: 'Wöchentlich · KidsLab Augsburg',
    teaser: 'Mit LEGO Spike Prime entstehen Roboter, die sich bewegen, greifen und auf ihre Umgebung reagieren.',
    highlights: ['Motoren & Sensoren', 'Blöcke-Programmierung', 'Wöchentliche Challenges'],
    image: 'assets/course-lego-1.jpg',
    url: 'kidslab.de/kurse/lego-robotics/',
  },
  {
    key: 'hacker',
    title: 'HackerWerkstatt 12+',
    subtitle: 'Technik verstehen, nicht nur benutzen',
    age: '12 – 18 Jahre',
    when: 'Freitag · 15:00 – 16:30',
    teaser: 'Staffel #3 — ESP32 & NeoPixel: Leuchtende Pixelkunst. 5 Termine ab 27. März 2026.',
    highlights: ['ESP32 Microcontroller', 'NeoPixel LEDs', 'Eigenes Projekt'],
    image: 'assets/course-lego-3.jpg',
    url: 'kidslab.de/kurse/hackerwerkstatt/',
  },
];

const PROJECTS = [
  {
    key: 'gameslab',
    title: 'GamesLab',
    subtitle: 'Game-Design-Workshops für Schulen',
    teaser: '1.500+ Schüler:innen, 3 Jahrgänge. Eintägige Workshops — vormittags kommt eine Klasse, abends sind es Spieleentwickler. Abschluss: der Augsburger GamesPreis, verliehen von Digitalminister Dr. Fabian Mehring.',
    stats: [
      { v: '1.500+', l: 'Schüler:innen' },
      { v: '4,03/5', l: 'Bewertung' },
      { v: '59 %', l: 'wollen selbst Spiele bauen' },
    ],
    image: 'assets/gameslab-winners.jpg',
    url: 'kidslab.de/gameslab/',
  },
  {
    key: 'demokratie',
    title: 'Demokratie in Minecraft',
    subtitle: 'Zukunftswerkstätten für junge Menschen',
    teaser: 'Jugendliche bauen ihre Stadt neu — in Minetest. Aus Pixeln werden Pläne. Am Ende: Zukunftsverträge mit echten Bürgermeister:innen. Seit 2022 in 47 bayerischen Kommunen, 200+ Projektideen.',
    stats: [
      { v: '47', l: 'Kommunen in Bayern' },
      { v: '200+', l: 'Projektideen' },
      { v: '50+', l: 'Zukunftswerkstätten' },
    ],
    image: 'assets/minecraft-city.png',
    url: 'kidslab.de/demokratie-in-minecraft/',
  },
];

const GALLERY = [
  'assets/course-minnimaker-2.png',
  'assets/course-lego-2.jpg',
  'assets/course-minnimaker-3.png',
  'assets/gameslab-workshop.jpg',
  'assets/course-lego-3.jpg',
  'assets/gp-02.jpg',
];

const VALUES = [
  { t: 'Selber machen', d: 'Kurze Theorie, dann loslegen.' },
  { t: 'Im Team', d: 'Die besten Ideen entstehen zusammen.' },
  { t: 'Präsentation', d: 'Jeder zeigt, was er gebaut hat.' },
  { t: 'Open Source', d: 'Alles frei verfügbar — zuhause weitermachen.' },
];

// Simple QR code component using Google Chart API style via qrserver
// Using inline SVG generator: we'll use qrcode.js via CDN at runtime for proper QR
// Instead: use a simple img tag pointing to api.qrserver.com (public QR API)
function QR({ url, size = 180, dark = '#0D1B2A', light = '#FFFFFF' }) {
  const full = 'https://' + url.replace(/^https?:\/\//, '');
  const d = dark.replace('#', '');
  const l = light.replace('#', '');
  const src = `https://api.qrserver.com/v1/create-qr-code/?size=${size*2}x${size*2}&data=${encodeURIComponent(full)}&color=${d}&bgcolor=${l}&margin=2&qzone=1`;
  return <img src={src} style={{ width: size, height: size, display: 'block', imageRendering: 'pixelated' }} alt={`QR ${url}`} />;
}

Object.assign(window, { KIDSLAB, COURSES, PROJECTS, GALLERY, VALUES, QR });
