// Compass Crew role badges – brass compass medallions. Reusable across all episodes.
// badge(role, {size, variant}) -> SVG string. role: S subject, V verb, L link verb (=V), O object, C complement.
export const ROLES={
 S:{name:'主语',q:'谁',token:'s',sym:'person'},
 V:{name:'谓语',q:'做什么',token:'v',sym:'bolt'},
 L:{name:'系动词',q:'是 / 看起来',token:'v',sym:'bolt'},
 O:{name:'宾语',q:'什么',token:'o',sym:'target'},
 C:{name:'表语',q:'怎样 / 在哪',token:'c',sym:'star'},
 // Non-finite FORM badges (S16+): octagonal brass rim = "form" (what shape the verb takes), round rim = "role" (job in the sentence).
 TD:{name:'不定式',q:'to do · 还没做 / 目的',token:'td',sym:'arrow',form:true},
 DO:{name:'省略 to 的不定式',q:'do · 光杆动词',token:'td',sym:'arrow_hollow',form:true},
 ING:{name:'动名词 / 现在分词',q:'doing · 正在做 / 做这件事',token:'ing',sym:'loop',form:true},
 ED:{name:'过去分词',q:'done · 被…的 / 已完成',token:'ed',sym:'check',form:true}};
const OCT=(r)=>{const p=[];for(let i=0;i<8;i++){const a=Math.PI/8+i*Math.PI/4;p.push((50+r*Math.cos(a)).toFixed(1)+','+(50+r*Math.sin(a)).toFixed(1));}return p.join(' ');};
const SYM={
 arrow:(c)=>`<path d="M24 44h30V30l24 20-24 20V56H24z" fill="${c}"/>`,
 arrow_line:(c,w)=>`<path d="M25 44h29V31l23 19-23 19V56H25z" fill="none" stroke="${c}" stroke-width="${w}" stroke-linejoin="round"/>`,
 arrow_hollow:(c)=>`<path d="M26 45h28V33l21 17-21 17V55H26z" fill="none" stroke="${c}" stroke-width="6" stroke-linejoin="round"/>`,
 arrow_hollow_line:(c,w)=>`<path d="M26 45h28V33l21 17-21 17V55H26z" fill="none" stroke="${c}" stroke-width="${w}" stroke-dasharray="7 5" stroke-linejoin="round"/>`,
 loop:(c)=>`<path d="M50 26a24 24 0 1 1-22 14" fill="none" stroke="${c}" stroke-width="8" stroke-linecap="round"/><path d="M18 30l16 2-6 14z" fill="${c}"/>`,
 loop_line:(c,w)=>`<path d="M50 27a23 23 0 1 1-21 14" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/><path d="M19 31l15 2-6 13z" fill="${c}"/>`,
 check:(c)=>`<path d="M27 51l15 15 32-34" fill="none" stroke="${c}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>`,
 check_line:(c,w)=>`<path d="M28 51l14 14 30-32" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`,
 person:(c,w)=>`<circle cx="50" cy="40" r="11" fill="${c}"/><path d="M29 72c0-13 9-20 21-20s21 7 21 20z" fill="${c}"/>`,
 person_line:(c,w)=>`<circle cx="50" cy="40" r="10" fill="none" stroke="${c}" stroke-width="${w}"/><path d="M30 71c0-12 9-19 20-19s20 7 20 19z" fill="none" stroke="${c}" stroke-width="${w}" stroke-linejoin="round"/>`,
 bolt:(c)=>`<path d="M56 24 34 54h14l-6 22 24-32H52z" fill="${c}"/>`,
 bolt_line:(c,w)=>`<path d="M56 24 34 54h14l-6 22 24-32H52z" fill="none" stroke="${c}" stroke-width="${w}" stroke-linejoin="round"/>`,
 target:(c,w)=>`<circle cx="50" cy="50" r="22" fill="none" stroke="${c}" stroke-width="5"/><circle cx="50" cy="50" r="12" fill="none" stroke="${c}" stroke-width="5"/><circle cx="50" cy="50" r="4" fill="${c}"/>`,
 target_line:(c,w)=>`<circle cx="50" cy="50" r="21" fill="none" stroke="${c}" stroke-width="${w}"/><circle cx="50" cy="50" r="11" fill="none" stroke="${c}" stroke-width="${w}"/><circle cx="50" cy="50" r="3" fill="${c}"/>`,
 star:(c)=>`<path d="M50 24c3 16 10 23 26 26-16 3-23 10-26 26-3-16-10-23-26-26 16-3 23-10 26-26z" fill="${c}"/>`,
 star_line:(c,w)=>`<path d="M50 25c3 15 10 22 25 25-15 3-22 10-25 25-3-15-10-22-25-25 15-3 22-10 25-25z" fill="none" stroke="${c}" stroke-width="${w}" stroke-linejoin="round"/>`};
let uid=0;
export function badge(role,{size=48,variant}={}){const r=ROLES[role]||ROLES.S;const v=variant||(size>=40?'medal':'flat');const id='bd'+(uid++);const t=r.token;
 const label=`${r.name}（${r.q}）`;
 if(v==='flat'){return `<svg class="badge badge-flat" width="${size}" height="${size}" viewBox="0 0 100 100" role="img" aria-label="${label}">${r.form?`<polygon points="${OCT(47)}" fill="var(--role-${t})" stroke="var(--brass-dark)" stroke-width="5" stroke-linejoin="round"/>`:`<circle cx="50" cy="50" r="46" fill="var(--role-${t})" stroke="var(--brass-dark)" stroke-width="5"/>`}${SYM[r.sym+'_line']('#fff',6)}</svg>`;}
 const loop=v==='medal-loop';const vb=loop?'0 -14 100 114':'0 0 100 100';const h=loop?size*1.14:size;
 return `<svg class="badge badge-medal" width="${size}" height="${h}" viewBox="${vb}" role="img" aria-label="${label}">
 <defs><radialGradient id="${id}e" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="var(--role-${t}-hi)"/><stop offset="1" stop-color="var(--role-${t})"/></radialGradient>
 <linearGradient id="${id}b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="var(--brass-hi)"/><stop offset=".5" stop-color="var(--brass)"/><stop offset="1" stop-color="var(--brass-dark)"/></linearGradient></defs>
 ${loop?`<circle cx="50" cy="-4" r="7" fill="none" stroke="url(#${id}b)" stroke-width="4"/>`:''}
 ${r.form?`<polygon points="${OCT(50)}" fill="url(#${id}b)" stroke-linejoin="round"/>`:`<circle cx="50" cy="50" r="48" fill="url(#${id}b)"/>`}
 <circle cx="50" cy="50" r="42" fill="none" stroke="var(--brass-dark)" stroke-width="1.5" stroke-dasharray="3 3" opacity=".7"/>
 <path d="M50 92l-4-6h8z" fill="var(--brass-dark)"/>
 <circle cx="50" cy="50" r="36" fill="var(--brass-dark)"/>
 <circle cx="50" cy="50" r="34" fill="url(#${id}e)"/>
 <ellipse cx="40" cy="33" rx="16" ry="8" fill="#fff" opacity=".18"/>
 <g>${SYM[r.sym](t==='c'?'#fff8e0':'var(--brass-sym)',6)}</g>${t==='c'?`<g opacity=".55">${SYM.star_line('var(--brass-dark)',2.5)}</g>`:''}</svg>`;}
