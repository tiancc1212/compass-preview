// Shared 2D compass: the approved B / starmap composition, 17 independent slots.
const version = new URL(import.meta.url).searchParams.get('v') || '5';
const asset = file => new URL(`./compass/${file}?v=${version}`, import.meta.url).href;
export const COMPASS_ASSETS = Object.freeze({
 base512: asset('compass_base_v5_512.webp'), base1024: asset('compass_base_v5_1024.webp'),
 starLit: asset('star_lit_v5.webp'), starUnlit: asset('star_unlit_v5.webp'), glow: asset('glow_v5.webp'),
});
const slotData = await fetch(asset('compass_slots_v5.json')).then(response => {
 if (!response.ok) throw new Error('罗盘星槽资料加载失败');
 return response.json();
});
export const COMPASS_SLOTS = Object.freeze(slotData.slots);
const valid = value => (typeof value === 'number' || (typeof value === 'string' && /^(?:[1-9]|1[0-7])$/.test(value))) && Number.isInteger(Number(value)) && Number(value) >= 1 && Number(value) <= 17;
export const normalizeStars = stars => [...new Set(Array.from(stars || []).filter(valid).map(Number))].sort((a,b) => a-b);
export function readStars() {
 try { const value = JSON.parse(localStorage.getItem('cc_stars') || '[]'); return Array.isArray(value) ? normalizeStars(value) : []; }
 catch { return []; }
}
export function isFinaleUnlocked(stars = readStars()) {
 const completed = new Set(normalizeStars(stars));
 return Array.from({length:16}, (_,i) => i+1).every(no => completed.has(no));
}
// Preserve all prior array entries (including old string values/duplicates); only append a new star.
// A malformed record is never overwritten. The caller can still show the in-session reward.
export function saveStar(no) {
 if (!valid(no)) return false;
 try {
  const previous = JSON.parse(localStorage.getItem('cc_stars') || '[]');
  if (!Array.isArray(previous)) return false;
  if (!normalizeStars(previous).includes(Number(no))) previous.push(Number(no));
  localStorage.setItem('cc_stars', JSON.stringify(previous)); return true;
 } catch { return false; }
}
const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
export function renderCompass({stars = [], id = '', className = '', label = '', sizes = '(max-width: 640px) 78vw, 480px'} = {}) {
 const completed = new Set(normalizeStars(stars));
 return `<div ${id ? `id="${escape(id)}"` : ''} class="compass-art ${escape(className)}" data-compass="starmap" role="img" aria-label="${escape(label || `星图罗盘，已点亮 ${completed.size} 颗，共 17 个星槽`)}"><img class="compass-base" src="${COMPASS_ASSETS.base512}" srcset="${COMPASS_ASSETS.base512} 512w, ${COMPASS_ASSETS.base1024} 1024w" sizes="${escape(sizes)}" alt="" width="1024" height="1024" fetchpriority="high"><div class="compass-slot-layer" aria-hidden="true">${COMPASS_SLOTS.map(slot => `<span class="compass-slot ${completed.has(slot.no) ? 'is-lit' : ''}" data-slot="${slot.no}" style="left:${slot.x*100}%;top:${slot.y*100}%;width:${slot.r*200}%"><img src="${completed.has(slot.no) ? COMPASS_ASSETS.starLit : COMPASS_ASSETS.starUnlit}" alt="" width="256" height="256"></span>`).join('')}</div></div>`;
}
export function renderStarProgress(stars = []) {
 const completed = new Set(normalizeStars(stars));
 return `<div class="compass-progress" role="img" aria-label="已点亮 ${completed.size} 颗，共 17 颗星"><div class="compass-mini-stars" aria-hidden="true">${Array.from({length:17}, (_,i) => `<img class="compass-mini-star ${completed.has(i+1)?'is-lit':''}" data-star="${i+1}" src="${completed.has(i+1)?COMPASS_ASSETS.starLit:COMPASS_ASSETS.starUnlit}" alt="" width="256" height="256">`).join('')}</div><span class="compass-progress-copy">已点亮 <strong>${completed.size}</strong> / 17 颗星</span></div>`;
}
export function lightCompassSlot(element, no, {animate = false} = {}) {
 const slot = element?.querySelector(`[data-slot="${Number(no)}"]`);
 if (!slot) return;
 slot.classList.add('is-lit'); slot.querySelector('img').src = COMPASS_ASSETS.starLit;
 if (animate && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  slot.classList.add('just-lit'); setTimeout(() => slot.classList.remove('just-lit'),600);
 }
 element.setAttribute('aria-label',`星图罗盘，已点亮 ${element.querySelectorAll('.compass-slot.is-lit').length} 颗，共 17 个星槽`);
}
