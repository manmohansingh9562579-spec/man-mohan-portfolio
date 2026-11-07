import { ImageResponse } from 'next/og';

export const alt = 'Man Mohan Singh — Software Engineer & Full-Stack Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const runtime = 'edge';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 76, background: '#0a0d11', color: '#eaf0f4', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(120,155,180,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(120,155,180,.08) 1px, transparent 1px)', backgroundSize: '52px 52px' }} />
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', maxWidth: 740 }}>
          <div style={{ fontSize: 18, color: '#65b8ff', letterSpacing: 5 }}>MAN MOHAN SINGH <span style={{ color: '#4ddcc9' }}> / 01</span></div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, marginTop: 25 }}>Build. Engineer.<br />Innovate.</div>
          <div style={{ fontSize: 27, marginTop: 26, color: '#aab8c2' }}>Software Engineer · Full-Stack Developer</div>
          <div style={{ fontSize: 20, marginTop: 35, color: '#83929d' }}>Indore, India  ·  Medi-Caps University</div>
        </div>
        <svg width="300" height="300" viewBox="0 0 300 300" style={{ position: 'relative' }} fill="none">
          <path d="M34 80 102 38 174 84 260 46 267 156 196 252 112 198 40 254 34 80M102 38 112 198M174 84 196 252M34 80 196 252M260 46 112 198" stroke="#65b8ff" strokeOpacity=".55" strokeWidth="2" strokeDasharray="5 8" />
          {[[34, 80], [102, 38], [174, 84], [260, 46], [267, 156], [196, 252], [112, 198], [40, 254]].map(([cx, cy], index) => <circle key={index} cx={cx} cy={cy} r={index === 6 ? 9 : 6} fill={index === 6 ? '#4ddcc9' : '#d6efff'} />)}
        </svg>
      </div>
    ),
    size,
  );
}
