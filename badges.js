// Compass Crew role badges – brass compass medallions. Reusable across all episodes.
// badge(role, {size, variant}) -> SVG string. role: S subject, V verb, L link verb (=V), O object, C complement.
export const ROLES={
 S:{name:'主语',q:'谁',token:'s',sym:'person'},
 V:{name:'谓语',q:'做什么',token:'v',sym:'bolt'},
 L:{name:'系动词',q:'是 / 看起来',token:'v',sym:'bolt'},
 O:{name:'宾语',q:'什么',token:'o',sym:'target'},
 C:{name:'表语',q:'怎样 / 在哪',token:'c',sym:'star'}};
const SYM={
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
 if(v==='flat'){return `<svg class="badge badge-flat" width="${size}" height="${size}" viewBox="0 0 100 100" role="img" aria-label="${label}"><circle cx="50" cy="50" r="46" fill="var(--role-${t})" stroke="var(--brass-dark)" stroke-width="5"/>${SYM[r.sym+'_line']('#fff',6)}</svg>`;}
 const loop=v==='medal-loop';const vb=loop?'0 -14 100 114':'0 0 100 100';const h=loop?size*1.14:size;
 return `<svg class="badge badge-medal" width="${size}" height="${h}" viewBox="${vb}" role="img" aria-label="${label}">
 <defs><radialGradient id="${id}e" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="var(--role-${t}-hi)"/><stop offset="1" stop-color="var(--role-${t})"/></radialGradient>
 <linearGradient id="${id}b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="var(--brass-hi)"/><stop offset=".5" stop-color="var(--brass)"/><stop offset="1" stop-color="var(--brass-dark)"/></linearGradient></defs>
 ${loop?`<circle cx="50" cy="-4" r="7" fill="none" stroke="url(#${id}b)" stroke-width="4"/>`:''}
 <circle cx="50" cy="50" r="48" fill="url(#${id}b)"/>
 <circle cx="50" cy="50" r="42" fill="none" stroke="var(--brass-dark)" stroke-width="1.5" stroke-dasharray="3 3" opacity=".7"/>
 <path d="M50 92l-4-6h8z" fill="var(--brass-dark)"/>
 <circle cx="50" cy="50" r="36" fill="var(--brass-dark)"/>
 <circle cx="50" cy="50" r="34" fill="url(#${id}e)"/>
 <ellipse cx="40" cy="33" rx="16" ry="8" fill="#fff" opacity=".18"/>
 <g>${SYM[r.sym](t==='c'?'#fff8e0':'var(--brass-sym)',6)}</g>${t==='c'?`<g opacity=".55">${SYM.star_line('var(--brass-dark)',2.5)}</g>`:''}</svg>`;}
