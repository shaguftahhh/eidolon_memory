import * as THREE from 'three';

/**
 * Procedural texture generators for "THE LAST MESSAGE" 3D scene.
 * Zero external file dependencies (100% generated via HTML5 Canvas in code).
 */

export function createWoodDeskTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Dark charcoal weathered oak base
  ctx.fillStyle = '#1A1512';
  ctx.fillRect(0, 0, 512, 512);

  // Subtle wood grain lines
  ctx.strokeStyle = '#28201A';
  ctx.lineWidth = 1.5;
  for (let y = 0; y < 512; y += 4) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x <= 512; x += 32) {
      const offset = Math.sin(x * 0.02 + y * 0.05) * 2 + (Math.random() - 0.5) * 1.5;
      ctx.lineTo(x, y + offset);
    }
    ctx.stroke();
  }

  // Soft dark vignette on desk edges
  const grad = ctx.createRadialGradient(256, 256, 120, 256, 256, 280);
  grad.addColorStop(0, 'rgba(0,0,0,0)');
  grad.addColorStop(1, 'rgba(0,0,0,0.55)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

export function createWatchDialTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Aged ivory parchment face
  ctx.fillStyle = '#EDE4D1';
  ctx.fillRect(0, 0, 512, 512);

  // Outer brass chapter ring
  ctx.strokeStyle = '#8B6914';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(256, 256, 235, 0, Math.PI * 2);
  ctx.stroke();

  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(256, 256, 215, 0, Math.PI * 2);
  ctx.stroke();

  // Roman numerals
  ctx.fillStyle = '#1C1917';
  ctx.font = 'bold 32px "Cinzel", "Times New Roman", serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const numerals = ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];
  for (let i = 0; i < 12; i++) {
    const angle = (i * 30 - 90) * (Math.PI / 180);
    const x = 256 + Math.cos(angle) * 175;
    const y = 256 + Math.sin(angle) * 175;
    ctx.fillText(numerals[i], x, y);
  }

  // Brand and year
  ctx.font = '14px "Cinzel", serif';
  ctx.fillText('WALTHAM • 1898', 256, 130);
  ctx.font = 'italic 12px serif';
  ctx.fillText('Halted at Whitby', 256, 360);

  // Minute ticks
  for (let m = 0; m < 60; m++) {
    const angle = (m * 6 - 90) * (Math.PI / 180);
    const r1 = 225;
    const r2 = m % 5 === 0 ? 210 : 220;
    ctx.lineWidth = m % 5 === 0 ? 3 : 1;
    ctx.strokeStyle = '#3C3024';
    ctx.beginPath();
    ctx.moveTo(256 + Math.cos(angle) * r1, 256 + Math.sin(angle) * r1);
    ctx.lineTo(256 + Math.cos(angle) * r2, 256 + Math.sin(angle) * r2);
    ctx.stroke();
  }

  // Clock hands frozen at 7:42 (19:42 departure hour)
  // Hour hand pointing toward ~7:42
  const hourAngle = (7.7 * 30 - 90) * (Math.PI / 180);
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(256, 256);
  ctx.lineTo(256 + Math.cos(hourAngle) * 95, 256 + Math.sin(hourAngle) * 95);
  ctx.stroke();

  // Minute hand pointing toward 42 minutes (~252 deg)
  const minAngle = (42 * 6 - 90) * (Math.PI / 180);
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(256, 256);
  ctx.lineTo(256 + Math.cos(minAngle) * 145, 256 + Math.sin(minAngle) * 145);
  ctx.stroke();

  // Center pivot pin
  ctx.fillStyle = '#8B6914';
  ctx.beginPath();
  ctx.arc(256, 256, 10, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createCassetteLabelTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // Weathered cream paper label
  ctx.fillStyle = '#F2E8D5';
  ctx.fillRect(0, 0, 512, 256);

  // Red & Black vintage stripe header
  ctx.fillStyle = '#B91C1C';
  ctx.fillRect(0, 0, 512, 24);
  ctx.fillStyle = '#1C1917';
  ctx.fillRect(0, 24, 512, 8);

  ctx.fillStyle = '#FFF';
  ctx.font = 'bold 12px monospace';
  ctx.fillText('MICROCASSETTE MC-60 • NORMAL BIAS', 16, 17);

  // Handwritten note
  ctx.fillStyle = '#1E293B';
  ctx.font = 'italic bold 22px "Fraunces", serif';
  ctx.fillText('“Memories for November / Eliza”', 40, 80);

  ctx.font = '14px monospace';
  ctx.fillStyle = '#475569';
  ctx.fillText('Recorded 02.XI.2008 • Side A', 40, 115);
  ctx.fillText('TRACK: 02:44 (Voice & Rain Resonance)', 40, 140);

  // Sound waveform representation
  ctx.strokeStyle = '#D97706';
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let x = 40; x < 470; x += 6) {
    const h = Math.sin(x * 0.08) * 20 * Math.cos(x * 0.03);
    ctx.moveTo(x, 210 - Math.abs(h));
    ctx.lineTo(x, 210 + Math.abs(h));
  }
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createLetterPaperTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Aged cream parchment with stained edges
  ctx.fillStyle = '#F5EFE6';
  ctx.fillRect(0, 0, 512, 512);

  // Subtle ink stains and burnished edges
  const edgeGrad = ctx.createRadialGradient(256, 256, 150, 256, 256, 260);
  edgeGrad.addColorStop(0, 'rgba(245, 239, 230, 0)');
  edgeGrad.addColorStop(1, 'rgba(180, 140, 90, 0.45)');
  ctx.fillStyle = edgeGrad;
  ctx.fillRect(0, 0, 512, 512);

  // Cursive handwriting simulation
  ctx.fillStyle = '#261F1A';
  ctx.font = 'italic 18px "Fraunces", serif';
  ctx.fillText('14th October 1994', 40, 50);
  ctx.font = 'italic 20px "Fraunces", serif';
  ctx.fillText('My dearest Eliza,', 40, 95);

  ctx.font = 'italic 14px "Fraunces", serif';
  const lines = [
    'The air is crisp today, and the trees are finally ablaze with gold.',
    'I sit by the window writing this, wondering about the autumn in',
    'the valley. The days move slower here, yet the nights grow long.',
    'I miss our walks under the maples together. Until then, hold onto',
    'the warmth of this memory.',
    '',
    'Yours, lovingly,',
    'Thomas.'
  ];

  lines.forEach((l, idx) => {
    ctx.fillText(l, 40, 140 + idx * 30);
  });

  // Pressed dried marigold flower in corner
  ctx.fillStyle = '#D97706';
  ctx.beginPath();
  for (let p = 0; p < 8; p++) {
    const angle = (p * 45) * (Math.PI / 180);
    const px = 410 + Math.cos(angle) * 35;
    const py = 410 + Math.sin(angle) * 35;
    ctx.ellipse(px, py, 12, 22, angle, 0, Math.PI * 2);
  }
  ctx.fill();

  ctx.fillStyle = '#78350F';
  ctx.beginPath();
  ctx.arc(410, 410, 14, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createCRTScreenTexture(activeTitle: string, category: 'historical' | 'modern' | 'transitional'): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 384;
  const ctx = canvas.getContext('2d')!;

  // CRT Screen Phosphor background
  ctx.fillStyle = '#090807';
  ctx.fillRect(0, 0, 512, 384);

  // Ambient glow
  const isBlue = category === 'modern';
  const glowColor = isBlue ? 'rgba(56, 189, 248, 0.15)' : 'rgba(245, 158, 11, 0.18)';
  const primaryColor = isBlue ? '#38BDF8' : '#F59E0B';
  const textMuted = isBlue ? '#7DD3FC' : '#FDE68A';

  const screenGrad = ctx.createRadialGradient(256, 192, 20, 256, 192, 240);
  screenGrad.addColorStop(0, glowColor);
  screenGrad.addColorStop(1, 'rgba(0, 0, 0, 0.95)');
  ctx.fillStyle = screenGrad;
  ctx.fillRect(0, 0, 512, 384);

  // CRT scanlines
  ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
  for (let y = 0; y < 384; y += 3) {
    ctx.fillRect(0, y, 512, 1);
  }

  // Terminal text header
  ctx.fillStyle = primaryColor;
  ctx.font = 'bold 15px "JetBrains Mono", monospace';
  ctx.fillText('THE LAST MESSAGE // OFFLINE MEMORY GHOST', 24, 38);

  ctx.strokeStyle = primaryColor;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(24, 48);
  ctx.lineTo(488, 48);
  ctx.stroke();

  // Status flags
  ctx.font = '11px "JetBrains Mono", monospace';
  ctx.fillStyle = '#10B981';
  ctx.fillText('● RUNNING LOCALLY — NO CLOUD', 24, 72);
  ctx.fillStyle = textMuted;
  ctx.fillText('MODEL: Memoria-Ghost-7B (Q4_K_M)', 24, 92);
  ctx.fillText('NETWORK EGRESS: 0 BYTES [AIRGAPPED]', 24, 112);

  // Active Memory Focus
  ctx.fillStyle = primaryColor;
  ctx.font = 'bold 13px "JetBrains Mono", monospace';
  ctx.fillText('ACTIVE MEMORY FOCUS:', 24, 155);

  ctx.font = 'italic 16px serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(`“${activeTitle}”`, 24, 185);

  // Subtle Terminal Output
  ctx.font = '12px "JetBrains Mono", monospace';
  ctx.fillStyle = textMuted;
  ctx.fillText('> I found something you forgot.', 24, 230);
  ctx.fillText('> This photograph appears in 4 memories.', 24, 252);
  ctx.fillText('> The same story was told differently 7 years later.', 24, 274);

  // Cursor block
  ctx.fillStyle = primaryColor;
  ctx.fillRect(24, 310, 10, 16);
  ctx.font = '12px monospace';
  ctx.fillText('terminal ready --airgap active', 42, 323);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
