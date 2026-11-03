import { ImageResponse } from 'next/og';

export const alt = 'Man Mohan Singh — Software Engineer & Full-Stack Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 80, background: 'linear-gradient(135deg, #070a14 0%, #0e1424 60%, #1b1650 100%)', color: '#e8ecf8' }}>
        <div style={{ fontSize: 26, color: '#3b82f6', letterSpacing: 6 }}>PORTFOLIO</div>
        <div style={{ fontSize: 84, fontWeight: 700, marginTop: 24 }}>Man Mohan Singh</div>
        <div style={{ fontSize: 38, marginTop: 20, color: '#8b94b3' }}>Software Engineer | Full-Stack Developer</div>
        <div style={{ fontSize: 28, marginTop: 48, color: '#8b5cf6' }}>Engineering ideas into digital reality.</div>
      </div>
    ),
    size,
  );
}
