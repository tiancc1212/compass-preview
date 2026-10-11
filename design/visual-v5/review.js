/* M1 审稿专用；不会加载、改变或保存任何一集的学习状态。 */
const variants = {
  classic: { no: 'A', name: '经典探险', en: 'The Explorer', detail: '清晰、稳重，像一件真正陪你远行的探险工具。', file: 'compass_classic_v1.png', cx: .5, cy: .478, radius: .372, starRadius: .027 },
  starmap: { no: 'B', name: '星图秘境', en: 'The Stargazer', detail: '深蓝星图与精密刻纹，给未知的旅程多一点想象。', file: 'compass_starmap_v1.png', cx: .5, cy: .478, radius: .384, starRadius: .027 },
  heirloom: { no: 'C', name: '爷爷的传家宝', en: 'The Heirloom', detail: '温润旧黄铜与岁月痕迹，让故事从家中的阁楼开始。', file: 'compass_heirloom_v1.png', cx: .5, cy: .541, radius: .293, starRadius: .023 },
};
const iconPaths = {
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.6 8.4-2.1 5.1-5.1 2.1 2.1-5.1z"/>',
  speed: '<path d="M4 17a9 9 0 0 1 16 0M12 7v2M6.3 10.3l1.4 1.4m10-1.4-1.4 1.4M12 17l3-5"/><path d="M9 20h6"/>',
  play: '<path d="m8 5 11 7-11 7z"/>',
  pause: '<path d="M8 5v14M16 5v14"/>',
  book: '<path d="M12 6v15M3 4c4-1 7 0 9 2 2-2 5-3 9-2v15c-4-1-7 0-9 2-2-2-5-3-9-2z"/>',
  replay: '<path d="M4 10a8 8 0 1 1 1 8M4 4v6h6"/>',
  sound: '<path d="M4 9h4l5-4v14l-5-4H4zM17 9a5 5 0 0 1 0 6M20 6a9 9 0 0 1 0 12"/>',
  mute: '<path d="M4 9h4l5-4v14l-5-4H4zM17 9l5 6M22 9l-5 6"/>',
  star: '<path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
  home: '<path d="m3 11 9-8 9 8M5 10v11h14V10M10 21v-7h4v7"/>',
  left: '<path d="m10 5-7 7 7 7M3 12h18"/>',
  right: '<path d="m14 5 7 7-7 7M21 12H3"/>',
};
function icon(key, extra = '') { return `<svg class="ui-icon ${extra}" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[key]}</svg>`; }
const starPath = 'M50 3 63.3 32.2 95.7 36.9 72.3 59.7 77.8 91.9 50 76.7 22.2 91.9 27.7 59.7 4.3 36.9 36.7 32.2Z';
let uid = 0;
function starSVG(lit, id = ++uid) {
  return `<svg viewBox="0 0 100 100" width="100" height="100" aria-hidden="true"><defs><linearGradient id="star-${id}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${lit ? '#fff2aa' : '#796345'}"/><stop offset=".48" stop-color="${lit ? '#edbb5f' : '#453b30'}"/><stop offset="1" stop-color="${lit ? '#bd7931' : '#17242b'}"/></linearGradient></defs><path d="${starPath}" fill="url(#star-${id})" stroke="${lit ? '#fff3be' : '#aa8650'}" stroke-width="2.3"/><path d="M50 9v65l-22 12 4-28L11 39l29-3z" fill="${lit ? '#ffe69a' : '#161e23'}" opacity=".22"/></svg>`;
}
function compass(key, stars) {
  const v = variants[key];
  const circles = Array.from({length: 17}, (_, i) => {
    const angle = i * Math.PI * 2 / 17 - Math.PI / 2;
    const x = v.cx + v.radius * Math.cos(angle), y = v.cy + v.radius * Math.sin(angle);
    return `<span class="compass-slot ${i < stars ? 'is-lit' : ''}" data-slot="${i + 1}" style="left:${x*100}%;top:${y*100}%;width:${v.starRadius*200}%">${i < stars ? '<img src="assets/star_lit_v1.png" alt="" width="256" height="256">' : starSVG(false)}</span>`;
  }).join('');
  return `<div class="compass-art" data-compass="${key}" role="img" aria-label="${v.name}罗盘，已点亮 ${stars} 颗，共 17 个星槽"><img class="compass-base" src="assets/${v.file}" alt="" width="1254" height="1254"><div class="slot-layer" aria-hidden="true">${circles}</div></div>`;
}
function progress(stars) {
  return `<div class="progress" aria-label="已点亮 ${stars} 颗，共 17 颗星"><div class="mini-stars" aria-hidden="true">${Array.from({length: 17}, (_, i) => `<span class="mini-star ${i < stars ? 'is-lit' : ''}">${starSVG(i < stars)}</span>`).join('')}</div><span class="progress-copy">已点亮 <strong>${stars}</strong> / 17 颗星</span></div>`;
}
const query = new URLSearchParams(location.search);
let currentStars = Math.max(0, Math.min(5, Number(query.get('stars')) || 0));
const currentVariant = Object.hasOwn(variants, query.get('variant')) ? query.get('variant') : 'classic';
const startView = query.get('view') === 'start';
const app = document.querySelector('#app');
const urlFor = (variant, stars, view = 'start') => `?variant=${variant}&stars=${stars}&view=${view}`;
function render() {
  document.body.classList.toggle('start-view', startView);
  if (startView) renderStart(); else renderGallery();
  document.querySelectorAll('[data-star-choice]').forEach(el => el.addEventListener('click', () => {
    currentStars = Number(el.dataset.starChoice); history.replaceState({}, '', urlFor(currentVariant, currentStars, 'gallery')); render();
  }));
  document.querySelectorAll('[data-demo-button]').forEach(el => el.addEventListener('click', () => {
    const note = document.querySelector('#demo-note'); note.hidden = false; note.textContent = el.dataset.demoButton === 'go' ? '这是开始页视觉审稿；正式集成后从这里出发。' : '总部文字正在审稿，确认后接入总部入口。';
  }));
}
function renderGallery() {
  app.innerHTML = `<main class="review-shell"><header class="review-heading"><a class="brand" href="?">${icon('compass')}<span>罗盘冒险队</span></a><p class="review-phase">M1 · 视觉方案审阅</p><h1>一枚罗盘，十七段冒险。</h1><p class="review-intro">选一枚最想带上旅途的罗盘。三个方案共用清晰的星槽、学习进度与页面布局。</p></header>
  <section class="comparison" aria-label="罗盘方案对比"><div class="comparison-tools"><span class="state-label">查看星星状态</span><div class="state-switch" aria-label="点亮星星数量">${Array.from({length:6},(_,i)=>`<button type="button" data-star-choice="${i}" aria-pressed="${i===currentStars}">${i === 0 ? '0 颗' : i + ' 颗'}</button>`).join('')}</div></div><div class="variant-grid">${Object.entries(variants).map(([key,v]) => `<article class="variant-card"><div class="variant-art">${compass(key,currentStars)}</div><div class="variant-copy"><p class="variant-overline"><span>方案 ${v.no}</span><span lang="en">${v.en}</span></p><h2>${v.name}</h2><p>${v.detail}</p>${progress(currentStars)}<a class="review-start" href="${urlFor(key,currentStars)}">查看开始页 ${icon('right')}</a></div></article>`).join('')}</div></section>
  <section class="craft-sheet" aria-labelledby="craft-title"><header class="section-heading"><span class="eyebrow">共同的视觉语言</span><h2 id="craft-title">像一本正在展开的冒险手记</h2><p>罗盘负责唤起好奇，文字与操作保持轻松、清楚。</p></header><div class="craft-grid"><article class="type-specimen"><p class="spec-label">英文字体 · Source Serif 4</p><p class="english-sample" lang="en">The old needle spins.<br>A new adventure begins.</p><p class="chinese-sample">说出完整句子，打开石门，找到第一颗星！</p><p class="spec-note">英文正文使用圆润衬线；中文沿用苹方等系统字体。保留字母细节与清楚的句子间距。</p></article><article class="icon-specimen"><p class="spec-label">一套线性黄铜图标</p><div class="icon-grid">${[['compass','罗盘'],['speed','语速'],['play','播放'],['pause','暂停'],['book','字幕'],['replay','重播'],['sound','声音'],['mute','静音'],['star','星星'],['home','总部'],['left','返回'],['right','继续']].map(([key,label])=>`<div>${icon(key)}<span>${label}</span></div>`).join('')}</div><p class="spec-note">统一 24 像素网格与 2 像素描边。按钮保留文字，横屏紧凑模式仍提供朗读名称。</p></article></div><div class="palette"><span style="--swatch:#132d3a">深海军蓝 <small>#132D3A</small></span><span style="--swatch:#b58b46">黄铜 <small>#B58B46</small></span><span style="--swatch:#f3ead6">羊皮纸 <small>#F3EAD6</small></span></div></section>
  <footer class="review-footer">本页为审稿预览。罗盘选择与全部总部文字确认后，再进入引擎和总部实现。</footer></main>`;
}
function renderStart() {
  const v = variants[currentVariant];
  app.innerHTML = `<main class="start-shell"><header class="start-heading"><a class="brand" href="?stars=${currentStars}">${icon('compass')}<span>罗盘冒险队</span></a><span class="episode-tag">第 1 集</span></header><section class="start-card" aria-labelledby="episode-title"><div class="start-art">${compass(currentVariant,currentStars)}${progress(currentStars)}</div><div class="start-copy"><p class="chapter-overline"><span></span>第一站 · 埃及<span></span></p><h1 id="episode-title">金字塔的<br class="desktop-break">回声墙</h1><p class="start-subtitle">说出完整句子，打开石门，<br>找到第一颗星！</p><div class="start-actions"><button class="depart" type="button" data-demo-button="go">出发 ${icon('right')}</button><button class="back-hq" type="button" data-demo-button="hq">${icon('left')} 冒险队总部</button></div><p id="demo-note" class="demo-note" hidden role="status"></p></div></section><footer class="start-footer"><span>方案 ${v.no} · ${v.name}</span><a href="?stars=${currentStars}">返回三个方案</a></footer></main>`;
}
window.__review = {variants, get stars() { return currentStars; }, startView};
render();
