'use strict';
const main=document.querySelector('#main'),header=document.querySelector('#header'),menu=document.querySelector('#menu');
const palette={nan:'#CBAEE0',jeol:'#F9D2D6',gok:'#BAD4E8',dan:'#D6E4AB'};
const backIcon='<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M27 16H5m11-11L5 16l11 11"/></svg>';
const menuIcon='<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
let cleanup=()=>{},previousFocus=null,lastRoute='home',consultReturn='home';
const state={wish:'',waterTime:0};
function scale(){const s=innerWidth>760?innerWidth/1440:1,r=document.documentElement;r.style.setProperty('--scale',s);r.style.setProperty('--screen-h',innerHeight/s+'px');r.style.setProperty('--card-scale',Math.min(innerWidth/1440,innerHeight/940));}
addEventListener('resize',scale);scale();
function go(route){if(location.hash==='#'+route)render();else location.hash=route}
function headerHTML(route){const back=route.startsWith('knot/')?'knot-types':({'knot-types':'knots',water:'offering',wish:'water',complete:'wish'}[route]);header.innerHTML=`<div class="header-inner">${back?`<a class="back" href="#${back}" aria-label="뒤로가기">${backIcon}</a>`:'<a class="logo" href="#home" aria-label="신명원 홈"><img src="assets/logo.png" alt="神命院 신명원"></a>'}${route==='home'?'<nav class="home-nav" aria-label="주 메뉴"><a href="#about">신명원 시스템</a><a href="#knots">결 풀이</a><a href="#offering">소원 보내기</a></nav>':`<a class="consult-link" href="#consult">상담 신청</a><button class="menu-toggle" aria-label="메뉴 열기" aria-haspopup="dialog">${menuIcon}</button>`}</div>`;if(route==='consult')header.querySelector('.header-inner').innerHTML='<a class="logo" href="#home" aria-label="신명원 홈"><img src="assets/logo.png" alt="神命院 신명원"></a><a class="consult-close" href="#'+consultReturn+'" aria-label="상담 안내 닫기">×</a>';header.querySelector('.menu-toggle')?.addEventListener('click',()=>{previousFocus=document.activeElement;menu.showModal()})}
menu.querySelector('.menu-close').onclick=()=>menu.close();
menu.querySelectorAll('a').forEach(a=>a.onclick=()=>menu.close());
menu.addEventListener('click',e=>{const r=menu.getBoundingClientRect();if(e.target===menu&&(e.clientX<r.left||e.clientX>r.right))menu.close()});
menu.addEventListener('close',()=>{if(previousFocus?.isConnected)previousFocus.focus()});
const aboutSections=[
 {label:'01 — 인생의 결',heading:'모든 인간에게는<br>고유한 결이 존재합니다.',paragraphs:['나무와 돌에 저마다의 결이 있듯, 사람의 삶에도 고유한 방향이 있습니다.','태어난 순간의 조건과 살아온 환경, 축적된 경험이 만나 형성된 삶의 구조.<br>신명원은 이를 ‘인생의 결’이라 부릅니다.'],note:'같은 선택도, 결에 따라 다른 결과로 이어집니다.'},
 {label:'02 — 운명을 구성하는 질서',heading:'보이지 않는 삶의 질서를<br>세 가지 구조로 읽습니다.',paragraphs:['신명원은 동양의 전통 사상에서 삶의 조건과 변화, 질서를 바라보는 관점을 가져옵니다.'],principles:[['사주팔자','시간의 구조','태어난 연월일시를 삶이 시작되는 최초의 좌표로 읽습니다.'],['음양오행','변화의 구조','기운이 서로 영향을 주고받으며 만드는 변화와 균형을 읽습니다.'],['성리학','질서의 구조','자연과 인간의 삶을 관통하는 원리와 질서를 바라봅니다.']]},
 {label:'03 — 결 해석 인공지능',heading:'오래된 운명의 질서를<br>인공지능으로 재해석하다.',paragraphs:['2041년, 신명원은 전통적인 운명 해석 체계를 인공지능 기반의 분석 모델로 재구성했습니다.','태어난 순간의 조건과 현재의 생체 신호, 행동 데이터를 함께 분석해 보이지 않던 결을 시각적 구조로 드러냅니다.'],note:'선천적 조건과 후천적 변화를 함께 읽는, 결 해석 인공지능.'}
];
const legacyAboutSections=[
 {kind:'tree',image:'about-tree.png',heading:'우리는 왜 빌어왔을까',paragraphs:['앞날을 알 수 없을 때, 마음만으로는 닿을 수 없을 때.<br>사람들은 저마다의 방식으로 소원을 빌었습니다.','맑은 물 한 그릇을 올리는 마음, 나무에 소원을 매다는 마음.<br>신명원은 그 마음에서 이야기를 시작합니다.']},
 {kind:'person',image:'about-person.png',heading:'답을 내려주는 곳이 아니라,<br>마음의 결을 들여다보는 곳.',paragraphs:['신명원은 현대인의 풀리지 않는 고민을 ‘결’이라는 형태로 바라보는 디지털 신당입니다.','전통의 신당을 그대로 옮기는 대신, 오늘의 언어와 감각으로 다시 만나봅니다.<br>불확실한 삶 앞에서 잠시 멈추고 자신에게 맺힌 마음을 살펴보는 공간입니다.']},
 {kind:'flow',image:'about-flow.png',heading:'보이지 않아도,<br>우리 안에 흐르는 결.',paragraphs:['나뭇결, 물결, 살결처럼 결에는 방향과 흐름이 있습니다.<br>우리의 마음에도 반복되는 경험을 따라 만들어진 흐름이 있습니다.','자꾸 엉키거나, 마지막에 꺾이거나, 애쓸수록 조여들거나, 이어지지 않는 마음.<br>신명원은 삶에서 반복되는 고민의 양상을 네 가지 ‘마음의 결’로 바라봅니다.']}
];
function heading(title,sub){return `<div class="page-heading"><h1>${title}</h1><p>${sub}</p></div>`}
function bowl(last=false){return `<div class="bowl" aria-hidden="true"><img class="bowl-reference" src="assets/bowl-reference.png" alt="">${last?'':'<div class="water-surface"><video id="water-video" src="assets/video/water.mp4" poster="assets/water-first.jpg" playsinline muted preload="auto"></video></div>'}</div>`}

function render(){
 cleanup();cleanup=()=>{};
 let route=location.hash.slice(1)||'home';
 if(!['home','about','knots','knot-types','consult','offering','water','wish','complete',...knots.map(k=>'knot/'+k.key)].includes(route)){go('home');return}
 if(route==='complete'&&!state.wish){go('wish');return}
 if(route==='consult'&&lastRoute!=='consult')consultReturn=lastRoute;lastRoute=route;document.body.dataset.route=route;headerHTML(route);window.scrollTo(0,0);
 const names={consult:'상담 신청',home:'마음의 결',about:'신명원 시스템',knots:'결 풀이',offering:'소원 봉헌',water:'청수 올리기',wish:'물결 위에 마음을 얹으세요',complete:'봉헌 완료'};
 document.title=`神命院 신명원 v4 — ${names[route]||'결 풀이'}`;
 if(route==='home'){
  main.innerHTML='<section class="scene home"><video class="home-art" src="assets/home-main02.mp4" autoplay muted loop playsinline preload="auto" aria-hidden="true"></video><div class="home-copy"><h1>요즘, 잘 풀리지 않는<br>일이 있습니까?</h1><p>당신을 옭아매던 꼬인 결들.<br>신명원은 끊기고, 이어지지 않는 마음의 결을 들여다봅니다.</p></div></section>';
 }else if(route==='about'){
  main.innerHTML='<iframe class="about-lab-frame" allow="autoplay" src="about-story/index.html?v=v4-video-3" title="신명원 시스템 — 일곱 이야기"></iframe>';
 }else if(route==='knots'||route==='knot-types'){
  const tag={nan:'단단히 엉켜<br>풀리지 않는 흐름',jeol:'닿으려 할수록<br>꺾여 나가는 흐름',gok:'감길수록 더 깊이<br>죄어드는 흐름',dan:'이어지던 것이 끊겨<br>맺히지 못하는 흐름'};
  main.innerHTML=`<section class="scene knots">${heading('풀리지 않는 마음에도 저마다 다른 결이 있습니다','당신의 어려움을 골라주세요')}<div class="cards">${knots.map(k=>`<a class="knot-card ${k.key}" href="#knot/${k.key}"><h2>${k.name}</h2><p>${tag[k.key]}</p><img class="card-art ${k.key}" src="assets/${k.key}.png" alt="${k.name} 조형"></a>`).join('')}</div></section>`;
  main.querySelector('.knots').id='knot-selection';
  if(route==='knots'){main.innerHTML='';
  main.insertAdjacentHTML('afterbegin',`<div class="knot-intro">
  <section class="ki-scene ki-opening"><div class="ki-art" aria-hidden="true"><img src="assets/nan.png" alt=""></div><div class="ki-copy"><span class="ki-label">01 · 결의 이상</span><h1>모든 결이 온전하게<br>흐르는 것은 아닙니다</h1><p>타고난 방향과 현재의 삶이 어긋나거나,<br>외부의 변화가 균형을 흔들면 결의 흐름에도 이상이 생깁니다.</p><p>신명원은 그 어긋남의 형태를 ‘꼬인 결’로 바라봅니다.</p><button class="ki-skip" type="button">네 가지 결 바로 보기 <span>↓</span></button></div></section>
  <div class="ki-analysis"><section class="ki-analysis-stage"><div class="ki-analysis-heading"><span class="ki-label">02 · 결의 이상 분석</span><h2>흐름의 어긋남을 읽고<br>그 원인을 살핍니다</h2></div><div class="ki-orbit" aria-hidden="true"><svg class="ki-network" viewBox="0 0 600 600" aria-hidden="true"></svg></div><ol class="ki-steps">${[['정보 대조','출생 정보와 경험, 환경의 기록을 함께 살핍니다'],['흐름 비교','개인의 고유한 방향과 현재 흐름의 차이를 비교합니다'],['이상 식별','흐름이 얽히거나 꺾이고, 조이거나 끊기는 지점을 찾습니다'],['구조 해석','발견한 이상과 주변의 관계를 분석해 결의 상태를 해석합니다']].map((x,i)=>`<li><span>0${i+1}</span><div><h3>${x[0]}</h3><p>${x[1]}</p></div></li>`).join('')}</ol></section></div>
  <section class="ki-scene ki-restoration"><div class="ki-art" aria-hidden="true"><video src="assets/knot-restoration.mp4" muted loop playsinline preload="auto"></video></div><div class="ki-copy"><span class="ki-label">03 · 결풀이</span><h2>결을 거스르지 않고,<br>본래의 방향을 되찾습니다</h2><p>결풀이는 자신에게 이미 존재하는 질서를 발견하고,<br>그 흐름과 어긋나는 요소를 조정하는 과정입니다.</p><p>자신의 결에 맞는 방향을 따라<br>삶의 선택을 다시 구성합니다.</p><div class="ki-explore"><p>당신의 삶은 어떤 결로 흐르고 있을까요</p><a href="#knot-types">결의 모습 살펴보기 <span aria-hidden="true">→</span></a></div></div></section></div>`);
  main.querySelector('.ki-skip').onclick=()=>go('knot-types');
  cleanup=setupKnotIntro();
  }
 }else if(route.startsWith('knot/')){
  const k=knots.find(k=>route==='knot/'+k.key);
  main.innerHTML=`<section class="scene detail ${k.key}"><div class="detail-copy"><div class="detail-title"><h1>${k.name}</h1><p>${k.tag}</p></div><p class="description">${k.name}은 ${k.description}</p><div class="symptoms"><h2>주요 증상</h2><ul>${k.symptoms.map(s=>`<li>${s}</li>`).join('')}</ul></div><div class="stats"><div class="stat-row"><h2 class="stat-title">현재 ${k.name} 보유자</h2><strong>${k.count.toLocaleString('ko-KR')} 명</strong></div><div class="gauge" role="meter" aria-label="${k.name} 보유 비율" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${k.percent}"><span style="width:${k.percent}%"></span></div><p>전체 결 진단자 수의 ${k.percent}%가 ${k.name}을 보유하고 있습니다.</p></div></div><div class="detail-art"><video src="assets/video/knot-${k.key}.mp4" autoplay loop muted playsinline aria-label="${k.name} 움직이는 조형"></video></div></section>`;
  const v=main.querySelector('video');v.muted=true;v.play().catch(()=>{});cleanup=()=>{v.pause();v.removeAttribute('src');v.load()};
 }else if(route==='consult'){
  main.innerHTML='<section class="scene consult"><div class="consult-copy"><span class="eyebrow">神命院</span><h1>당신의 결을 만날 준비 중입니다</h1><p>상담 신청과 요금제는 준비 중입니다.<br>그동안 네 가지 결을 둘러보고, 마음에 담아둔 소원을 남겨보세요.</p><div class="consult-actions"><a href="#knots">결 풀이 둘러보기</a><a href="#offering">소원 보내기</a></div></div></section>';
 }else if(route==='offering'){
  state.wish='';state.waterTime=0;
  main.innerHTML=`<section class="scene offering">${heading('요즘, 당신의 고민은 무엇인가요?','당신의 소원을 신명원에 빌어보세요')}<a class="ritual-button" href="#water">소원 봉헌하기</a></section>`;
 }else if(route==='water'){
  main.innerHTML=`<section class="scene water">${heading('청수를 올리세요','맑은 물이 차오르는 동안 마음을 가다듬어 주세요')}${bowl()}<div class="aura" aria-hidden="true"><i></i><i></i></div><button class="hold-target" aria-label="화면을 길게 눌러 청수를 채워주세요"></button><progress class="water-progress" max="1" value="0" aria-label="청수 채우기"></progress><p class="hold-caption">화면을 길게 눌러 청수를 채워주세요.</p></section>`;
  cleanup=setupWater();
 }else if(route==='wish'){
  main.innerHTML=`<section class="scene wish">${heading('물결 위에 마음을 얹으세요','지금 가장 간절한 바람을 한 문장으로 남겨주세요')}${bowl(true)}<form class="wish-form"><label for="wish-input" class="sr-only">당신의 소원</label><input id="wish-input" name="wish" type="text" maxlength="500" autocomplete="off" placeholder="예: 원하는 대학교에 꼭 합격하고 싶어요" aria-describedby="input-error"><p class="input-error" id="input-error" role="alert"></p><button class="sr-only" type="submit">소원 봉헌하기</button></form></section>`;
  const form=main.querySelector('form'),input=form.elements.wish;input.value=state.wish;let composing=false;
  input.addEventListener('compositionstart',()=>composing=true);input.addEventListener('compositionend',()=>composing=false);
  input.addEventListener('keydown',e=>{if(e.key==='Enter'&&(e.isComposing||composing||e.keyCode===229))e.preventDefault()});
  input.oninput=()=>{state.wish=input.value;main.querySelector('#input-error').textContent='';input.removeAttribute('aria-invalid')};
  form.onsubmit=e=>{e.preventDefault();if(composing)return;const text=input.value.trim();if(!text){main.querySelector('#input-error').textContent='물결 위에 남길 소원을 입력해 주세요.';input.setAttribute('aria-invalid','true');input.focus();return}state.wish=text;go('complete')};
 }else if(route==='complete'){
  main.innerHTML=`<section class="scene complete">${heading('마음이 물결에 닿았습니다','당신의 소원이 신명원에 정식으로 봉헌되었습니다')}<p class="offered-wish"></p><a class="ritual-button" href="#offering">봉헌 마치기</a></section>`;
  main.querySelector('.offered-wish').textContent=state.wish;
 }
 if(['offering','water','wish','complete'].includes(route)){const pageCleanup=cleanup,glowCleanup=setupCursorGlow();cleanup=()=>{glowCleanup();pageCleanup()}}
 main.focus({preventScroll:true});
 document.querySelector('#announcement').textContent=names[route]||'결 상세';
}
// Every audio fade keeps its tail alive across a route transition.
function audioTrack(src){const audio=new Audio(src);audio.preload='auto';audio.volume=0;let raf=0;const fade=(target,ms,pause=false)=>{cancelAnimationFrame(raf);const from=audio.volume,start=performance.now();function tick(now){const t=Math.min(1,(now-start)/ms);audio.volume=Math.max(0,Math.min(1,from+(target-from)*(t*t*(3-2*t))));if(t<1)raf=requestAnimationFrame(tick);else if(pause)audio.pause()}raf=requestAnimationFrame(tick)};return{audio,fade,stop(){cancelAnimationFrame(raf);audio.pause();audio.src=''}}}
function setupWater(){
 const video=main.querySelector('#water-video'),progress=main.querySelector('progress'),target=main.querySelector('.hold-target'),aura=main.querySelector('.aura');
 const drops=audioTrack('assets/audio/water-drops.mp3'),fill=audioTrack('assets/audio/water-fill.mp3');drops.audio.loop=true;
 let held=false,done=false,disposed=false,frame=0,auraStopped=false,transitionTimer=0;
 video.muted=true;
 const startDrops=()=>{if(disposed||held||done)return;drops.audio.play().then(()=>drops.fade(.7,250)).catch(()=>{})};
 const restore=()=>{video.currentTime=Math.min(state.waterTime,Math.max(0,video.duration-.03));progress.value=video.duration?video.currentTime/video.duration:0};
 if(video.readyState>=1)restore();else video.addEventListener('loadedmetadata',restore,{once:true});
 function update(){if(disposed)return;state.waterTime=video.currentTime;progress.value=video.duration?Math.min(1,video.currentTime/video.duration):0;frame=requestAnimationFrame(update)}frame=requestAnimationFrame(update);
 function stopAura(){if(auraStopped)return;auraStopped=true;aura.querySelectorAll('i').forEach(r=>{const a=r.getAnimations()[0];if(!a)return;const timing=a.effect.getComputedTiming(),progress=timing.progress;if(progress===null||progress<.02){a.cancel();return}const left=(1-progress)*4800;setTimeout(()=>{a.cancel();r.style.opacity='0'},left);a.effect.updateTiming({iterations:Math.ceil((a.currentTime+(timing.delay||0))/4800)+1})})}
 function start(){if(disposed||held||done)return;held=true;stopAura();drops.fade(0,220,true);video.play().catch(()=>{held=false;document.querySelector('.hold-caption')?.replaceChildren('화면을 다시 길게 눌러주세요.');startDrops()});fill.audio.play().then(()=>{if(held&&!disposed)fill.fade(.8,600);else fill.fade(0,900,true)}).catch(()=>{})}
 function end(){if(!held)return;held=false;video.pause();fill.fade(0,900,true);if(!disposed&&!done)startDrops()}
 function pointerdown(e){if(e.button!==0)return;e.preventDefault();target.setPointerCapture(e.pointerId);start()}
 function keydown(e){if((e.key===' '||e.key==='Enter')&&!e.repeat){e.preventDefault();start()}}
 function keyup(e){if(e.key===' '||e.key==='Enter'){e.preventDefault();end()}}
 target.addEventListener('pointerdown',pointerdown);target.addEventListener('pointerup',end);target.addEventListener('pointercancel',end);target.addEventListener('lostpointercapture',end);target.addEventListener('keydown',keydown);target.addEventListener('keyup',keyup);
 const onBlur=()=>end();const onVisibility=()=>{if(document.hidden){end();drops.fade(0,250,true)}else startDrops()};
 addEventListener('blur',onBlur);document.addEventListener('visibilitychange',onVisibility);
 const unlock=()=>{if(!held)startDrops()};document.addEventListener('pointerdown',unlock);document.addEventListener('keydown',unlock);
 video.onended=()=>{if(disposed)return;done=true;held=false;progress.value=1;state.waterTime=video.duration;fill.fade(0,900,true);main.querySelector('.water').classList.add('leaving');transitionTimer=setTimeout(()=>{if(!disposed)go('wish')},450)};startDrops();
 return()=>{disposed=true;held=false;clearTimeout(transitionTimer);cancelAnimationFrame(frame);video.pause();video.onended=null;video.removeEventListener('loadedmetadata',restore);video.removeAttribute('src');video.load();drops.fade(0,250,true);fill.fade(0,900,true);setTimeout(()=>{drops.stop();fill.stop()},1000);removeEventListener('blur',onBlur);document.removeEventListener('visibilitychange',onVisibility);document.removeEventListener('pointerdown',unlock);document.removeEventListener('keydown',unlock)};
}
function setupKnotIntro(){
 const root=main.querySelector('.knot-intro'),analysis=root.querySelector('.ki-analysis'),stage=root.querySelector('.ki-analysis-stage'),steps=[...root.querySelectorAll('.ki-steps li')],orbit=root.querySelector('.ki-orbit'),scenes=[...root.querySelectorAll('.ki-scene')];let frame=0;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,clamp=x=>Math.max(0,Math.min(1,x)),ease=x=>{x=clamp(x);return x*x*(3-2*x)};
 scenes.forEach(el=>{const pin=document.createElement('div');pin.className='ki-pin';while(el.firstChild)pin.append(el.firstChild);el.append(pin)});
 if(reduced)root.classList.add('ki-reduced');
 const network=orbit.querySelector('.ki-network');
 const routes=Array.from({length:18},(_,i)=>{const d=i-8.5;return `<path d="M${65+d*1.4} ${240+d*8} C${100+d*2} ${75+d*3},${390+d*3} ${85+d*4},${390+d*2} ${250+d*4} C${390+d*2} ${390+d*4},${150+d*2} ${400+d*3},${205+d} ${245+d*3} C${245+d*2} ${145+d*2},${475+d*2} ${240+d*3},${480+d} ${440+d*3}"/>`}).join('');
 network.innerHTML=`<defs><clipPath id="ki-window"><circle class="ki-cut" cx="240" cy="230" r="64"/></clipPath></defs>
 <g class="ki-route-base">${routes}</g>
 <g class="ki-cross-sections">${Array.from({length:11},(_,i)=>`<path d="M${100+i*32} ${160+Math.sin(i*.7)*40}l12 100"/>`).join('')}</g>
 <g class="ki-interior" clip-path="url(#ki-window)">${routes}
 <path class="ki-abnormal" d="M170 205 C210 180 275 300 240 325 S180 265 270 265 S365 375 400 345"/>
 <path class="ki-abnormal" d="M230 200 L310 240 L290 310 L365 370"/></g>
 <g class="ki-samples">${[[240,230],[355,300],[245,320],[330,240],[170,160],[400,180],[440,370],[210,380]].map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="2.5"/><text x="${x+9}" y="${y-9}">0${i+1}</text>`).join('')}</g>
 <circle class="ki-target" r="64"/><circle class="ki-target-dot" r="3"/>
 <text class="ki-reading" x="300" y="565" text-anchor="middle"></text>`;
 const targets=[[240,230],[355,300],[245,320],[330,240]],readings=['01 / 기록과 관측 정보 대조','02 / 기준 흐름과 현재 경로 비교','03 / 얽힘과 꺾임의 위치 식별','04 / 주변 연결 관계 해석'];
 const movie=root.querySelector('.ki-restoration video');let playing=false;

 function paint(){frame=0;const p=clamp(-analysis.getBoundingClientRect().top/Math.max(1,analysis.offsetHeight-stage.offsetHeight)),active=Math.min(3,Math.floor(p*4));steps.forEach((el,i)=>{el.classList.toggle('active',i===active);el.setAttribute('aria-current',i===active?'step':'false')});orbit.style.setProperty('--gather',0);orbit.style.setProperty('--element-opacity',reduced?1:ease(p/.18));
 const local=ease(p>=1?1:(p*4)%1),previous=targets[Math.max(0,active-1)],next=targets[active],x=previous[0]+(next[0]-previous[0])*local,y=previous[1]+(next[1]-previous[1])*local;
 network.querySelectorAll('.ki-cut,.ki-target,.ki-target-dot').forEach(el=>{el.setAttribute('cx',x);el.setAttribute('cy',y)});
 network.querySelector('.ki-reading').textContent=readings[active];network.style.transform=`scale(${.94+ease(p)*.06})`;
 const mr=movie.closest('.ki-scene').getBoundingClientRect(),visible=mr.top<innerHeight&&mr.bottom>0;if(visible&&!playing){playing=true;movie.play().catch(()=>{playing=false})}else if(!visible&&playing){movie.pause();playing=false;}scenes.forEach(el=>{const pin=el.querySelector('.ki-pin'),t=clamp(-el.getBoundingClientRect().top/Math.max(1,el.offsetHeight-pin.offsetHeight)),reveal=reduced?1:ease((t-.12)/.43),copy=el.querySelector('.ki-copy'),art=el.querySelector('.ki-art');copy.style.opacity=reveal;copy.style.transform=`translateY(${(1-reveal)*38}px)`;copy.style.visibility=reveal<.01?'hidden':'visible';copy.inert=reveal<.1;art.style.transform=`translateY(${reduced?0:-t*65}px) scale(${reduced?1:.85+t*.42}) rotate(${reduced?0:t*12}deg)`;art.style.opacity=reduced?.32:1-reveal*.7})}
 function request(){if(!frame)frame=requestAnimationFrame(paint)}paint();addEventListener('scroll',request,{passive:true});addEventListener('resize',request);return()=>{movie.pause();cancelAnimationFrame(frame);removeEventListener('scroll',request);removeEventListener('resize',request)};
}
function setupLegacyAbout(){
 const sections=[...main.querySelectorAll('.legacy-section')];let frame=0;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const clamp=x=>Math.max(0,Math.min(1,x));
 function paint(){frame=0;sections.forEach(section=>{const r=section.getBoundingClientRect(),enter=clamp((innerHeight-r.top)/(innerHeight*.7)),leave=clamp(r.bottom/(innerHeight*.4)),opacity=reduced?1:Math.min(enter,leave),copy=section.querySelector('.legacy-copy'),art=section.querySelector('.legacy-art-wrap');copy.style.opacity=1;copy.style.transform=`translateY(${reduced?0:(1-enter)*45-(1-leave)*30}px)`;art.style.opacity=opacity;art.style.transform=`translateY(${reduced?0:(1-enter)*60-(1-leave)*40}px)`})}
 function request(){if(!frame)frame=requestAnimationFrame(paint)}paint();addEventListener('scroll',request,{passive:true});addEventListener('resize',request);return()=>{cancelAnimationFrame(frame);removeEventListener('scroll',request);removeEventListener('resize',request)};
}
function setupAboutStory(){
 const root=main.querySelector('.about-story'),stage=root.querySelector('.story-stage'),panels=[...root.querySelectorAll('.story-copy')],visual=root.querySelector('.story-visual'),knot=root.querySelector('.story-knot'),flow=root.querySelector('.story-flow'),index=root.querySelector('.story-index'),bar=root.querySelector('.story-progress i');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 let frame=0;
 const clamp=x=>Math.max(0,Math.min(1,x));
 const smooth=x=>{x=clamp(x);return x*x*(3-2*x)};
 function paint(){frame=0;if(reduced)return;const distance=Math.max(1,root.offsetHeight-innerHeight),p=clamp(-root.getBoundingClientRect().top/distance),t=p*5.6;
 panels.forEach((panel,i)=>{const enter=i===0?1:smooth((t-(i-.38))/.55),leave=i===panels.length-1?1:1-smooth((t-(i+.62))/.55),opacity=Math.min(enter,leave);panel.style.opacity=opacity;panel.style.transform=`translateY(${(1-enter)*48-(1-leave)*48}px)`;panel.style.visibility=opacity<.01?'hidden':'visible';panel.inert=opacity<.5;panel.setAttribute('aria-hidden',opacity<.5?'true':'false')});
 const motion=clamp(t/2.6);visual.style.transform=`translate3d(-50%,${-50-motion*9}%,0) rotate(${-9+motion*34}deg) scale(${.88+motion*.55})`;
 const early=clamp(t/2.6),cross=smooth((early-.48)/.42),firstOut=1-smooth((t-2.62)/.55);knot.style.opacity=(1-cross)*firstOut;flow.style.opacity=cross*firstOut;
 root.querySelectorAll('.story-legacy-art').forEach((art,j)=>{const i=j+3,enter=smooth((t-(i-.38))/.55),leave=i===5?1:1-smooth((t-(i+.62))/.55);art.style.opacity=Math.min(enter,leave);art.style.transform=`translateY(${(1-enter)*48-(1-leave)*48}px) scale(${1+clamp(t-i)*.04})`});
 index.textContent=String(Math.min(6,Math.floor(t+.35)+1)).padStart(2,'0')+' / 06';bar.style.transform=`scaleX(${p})`;
 }
 const request=()=>{if(!frame)frame=requestAnimationFrame(paint)};
 if(reduced)root.classList.add('reduced-story');else{paint();addEventListener('scroll',request,{passive:true});addEventListener('resize',request)}
 return()=>{cancelAnimationFrame(frame);removeEventListener('scroll',request);removeEventListener('resize',request)};
}
let lastPointer=null;
function setupCursorGlow(){
 const glow=document.createElement('div');glow.className='cursor-glow';glow.setAttribute('aria-hidden','true');document.body.append(glow);
 const move=e=>{if(e.pointerType==='touch')return;lastPointer={x:e.clientX,y:e.clientY};glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px';glow.style.opacity='1'};
 const hide=()=>{glow.style.opacity='0';lastPointer=null};
 if(lastPointer)move({clientX:lastPointer.x,clientY:lastPointer.y});
 document.addEventListener('pointermove',move);document.documentElement.addEventListener('pointerleave',hide);window.addEventListener('blur',hide);
 return()=>{glow.remove();document.removeEventListener('pointermove',move);document.documentElement.removeEventListener('pointerleave',hide);window.removeEventListener('blur',hide)};
}
addEventListener('hashchange',render);render();
