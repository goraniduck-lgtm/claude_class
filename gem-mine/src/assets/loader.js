// 에셋 목록을 읽고 이미지를 불러온다. 없거나 실패하면 null → 코드로 그린 임시 그림을 쓴다.
const images = new Map();
let manifest = { images: {} };

export async function loadAssets(url = 'assets/assets.json') {
  try {
    const res = await fetch(url, { cache: 'no-cache' });
    if (res.ok) manifest = await res.json();
  } catch { /* 목록이 없으면 모두 임시 그림 */ }
  const base = url.replace(/[^/]*$/, '');
  const jobs = Object.entries(manifest.images || {})
    .filter(([, v]) => v && v.src)
    .map(([key, v]) => new Promise((resolve) => {
      const img = new Image();
      img.onload = () => { images.set(key, img); resolve(); };
      img.onerror = () => { console.warn('이미지를 불러오지 못함:', key, v.src); resolve(); };
      img.src = base + v.src;
    }));
  await Promise.all(jobs);
  return { count: images.size };
}

export function img(key) { return images.get(key) || null; }
export function meta(key) { return (manifest.images || {})[key] || null; }
