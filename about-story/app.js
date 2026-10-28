const $=s=>document.querySelector(s),canvas=$('#field'),ctx=canvas.getContext('2d'),root=$('#journey'),panels=[...document.querySelectorAll('.panel')],sources=[...document.querySelectorAll('.source')],reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const names=['고유한 결','결을 이루는 정보','운명을 구성하는 질서','결 해석 인공지능','결의 생성','분석 체계의 완성'];
let w=innerWidth,h=innerHeight,p=0,t=0,frame=0,active=0;const clamp=x=>Math.max(0,Math.min(1,x)),ease=x=>{x=clamp(x);return x*x*(3-2*x)};
function visibility(i){return (i===0?1:ease((t-i+.35)/.55))*(i===5?1:1-ease((t-i-.65)/.45))}
function jump(i){scrollTo({top:Math.min(1,(i<4?i+.25:i===4?4.25:6.75)/9.3)*(root.offsetHeight-h),behavior:reduced?'instant':'smooth'})}
function resize(){w=innerWidth;h=innerHeight;const d=Math.min(devicePixelRatio||1,2);canvas.width=w*d;canvas.height=h*d;ctx.setTransform(d,0,0,d,0,0)}
function progress(){layoutAnnotations();p=clamp(scrollY/Math.max(1,root.offsetHeight-h));const raw=p*9.3;t=raw<4?raw:raw<6.5?4+(raw-4)/2.5:raw-1.5;active=Math.min(5,Math.floor(t+.2));panels.forEach((el,i)=>{const a=i===5?ease((t-5.65)/.45)*(1-ease((t-6.45)/.45)):visibility(i);el.style.opacity=a;el.style.transform=`translateY(${(1-ease((t-i+.35)/.55))*24-ease((t-i-.65)/.45)*18}px)`;el.style.pointerEvents=a>.8?'auto':'none';el.inert=a<.1;el.setAttribute('aria-hidden',a<.1?'true':'false')});sources.forEach((s,i)=>{const a=ease((t-.55-i*.08)/.4)*(1-ease((t-1.55)/.4));s.style.opacity=a;s.style.transform=`translateY(${(1-a)*10}px)`});document.querySelectorAll('.principles>div').forEach((el,i)=>{el.style.opacity=t<2+i*.19?.45:1});
const va=visibility(5),video=$('.system-video video');$('.system-video').style.opacity=va;$('.system-video').style.filter=`brightness(${1-ease((t-5.6)/.4)*.72+ease((t-6.5)/.4)*.47})`;const inspect=$('.system-inspect'),ia=ease((t-6.6)/.5);inspect.style.opacity=ia;inspect.style.pointerEvents=ia>.8?'auto':'none';inspect.inert=ia<.1;inspect.setAttribute('aria-hidden',ia<.1?'true':'false');if(false){if(video.paused)video.play().catch(()=>{})}else if(!video.paused)video.pause();$('#number').textContent=String(active+1).padStart(2,'0');$('#name').textContent=names[active];$('.meter i').style.width=p*100+'%';$('#next').hidden=active===5;$('#restart').hidden=active!==5;if(reduced)draw(0)}
function point(a,strand,clock,cx,cy,radius){const r=radius*(.60+.22*Math.cos(3*a+strand*.035));return [cx+r*Math.cos(2*a+clock+strand*.018),cy+r*.95*Math.sin(3*a+clock+strand*.018)]}
function draw(now){ctx.clearRect(0,0,w,h);const seconds=reduced?0:now*.00012;const observation=ease((t-1.55)/.65),flowFade=1-ease((t-2.7)/.55);if(flowFade>.001){const expansion=ease((t-.3)/.9),cx=w*.5,cy=h*.49,radius=Math.min(w*.2,h*.3)*(1+expansion*.71),clock=seconds+expansion*1.4;ctx.lineWidth=.65;
for(let s=0;s<34;s++){ctx.beginPath();for(let j=0;j<=180;j++){const q=point(j/180*Math.PI*2,s,clock,cx,cy,radius);j?ctx.lineTo(...q):ctx.moveTo(...q)}ctx.strokeStyle=`rgba(203,174,224,${(.05+expansion*.04)*flowFade*(1-observation*.55)})`;ctx.stroke()}
const cr=canvas.getBoundingClientRect();sources.forEach((s,i)=>{const label=s.querySelector('p').getBoundingClientRect(),a=ease((t-.3-i*.06)/.4)*(1-ease((t-1.7)/.3));if(a<.001)return;const sx=label.left+Math.min(label.width,160)/2-cr.left,sy=label.bottom+9-cr.top;ctx.beginPath();ctx.moveTo(sx,sy);ctx.bezierCurveTo(sx+(cx-sx)*.65,sy,cx,cy+h*.2,cx,cy);ctx.strokeStyle=`rgba(203,174,224,${a*.22})`;ctx.stroke();for(let n=0;n<8;n++){const f=(seconds+n/8+i*.12)%1,u=1-f,x=u*u*u*sx+3*u*u*f*(sx+(cx-sx)*.65)+3*u*f*f*cx+f*f*f*cx,y=u*u*u*sy+3*u*u*f*sy+3*u*f*f*(cy+h*.2)+f*f*f*cy;ctx.beginPath();ctx.arc(x,y,1.3,0,Math.PI*2);ctx.fillStyle=`rgba(203,174,224,${a*Math.sin(f*Math.PI)*.8})`;ctx.fill()}});

}
const tech=ease((t-2.65)/.55)*(1-ease((t-3.65)/.5));
if(tech>.001){ctx.save();ctx.globalAlpha=tech;const move=reduced?0:now*.00013;
// A broad, layered data surface crosses the frame. Its folds carry travelling samples.
const mesh=(u,v)=>{const theta=u*Math.PI*2.1+move*.32;const depth=.60+.40*Math.sin(theta);return [w*(.14+u*1.04)+Math.sin(theta+v*2.0)*w*.13,h*(.16+v*.72)+Math.sin(theta)*h*.26+Math.cos(v*4+theta)*h*.09,depth]};
for(let row=0;row<38;row++){const v=row/37;ctx.beginPath();for(let j=0;j<=110;j++){const q=mesh(j/110,v);j?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1])}ctx.strokeStyle=`rgba(192,173,206,${row%6===0?.35:.115})`;ctx.lineWidth=row%6===0?1.2:.65;ctx.stroke()}
for(let col=0;col<65;col++){const u=col/64;ctx.beginPath();for(let row=0;row<38;row++){const q=mesh(u,row/37);row?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1])}ctx.strokeStyle='rgba(192,173,206,.055)';ctx.lineWidth=.5;ctx.stroke()}
// Samples occupy every second former position, increasing separation.
const samples=[];
for(let i=0;i<170;i+=2){const u=(i*.618033+move*.12)%1,v=(i*.381966)%1,q=mesh(u,v),pulse=.45+.55*Math.pow(Math.sin(u*Math.PI),2);samples.push(q);ctx.beginPath();ctx.arc(q[0],q[1],1+q[2]*1.2,0,Math.PI*2);ctx.fillStyle=`rgba(238,226,250,${pulse*.95})`;ctx.fill()}
// Interpretation cycles: locate a sample, trace its neighbours, retain their relation.
const selected=[];
for(let channel=0;channel<3;channel++){
const cycle=(reduced?.45:now*.00022+channel*.29)%1,read=ease(cycle/.22),link=ease((cycle-.2)/.35),exit=1-ease((cycle-.8)/.2);
const region=Math.floor((reduced?0:now*.00022));const candidates=samples.filter(q=>q[0]>w*.59&&q[0]<w*.94&&q[1]>h*.19&&q[1]<h*.80);
if(candidates.length){const spaced=candidates.filter(q=>selected.every(r=>Math.hypot(q[0]-r[0],q[1]-r[1])>Math.min(w*.14,150)));if(!spaced.length)continue;const focus=spaced[(region+channel*7)%spaced.length];selected.push(focus);const neighbours=candidates.filter(q=>q!==focus).sort((a,b)=>Math.hypot(a[0]-focus[0],a[1]-focus[1])-Math.hypot(b[0]-focus[0],b[1]-focus[1])).slice(0,3);ctx.save();ctx.globalAlpha*=exit;
const r=6+(1-read)*17;ctx.strokeStyle='rgba(238,226,250,.9)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(focus[0]-r-4,focus[1]);ctx.lineTo(focus[0]-r+3,focus[1]);ctx.moveTo(focus[0]+r-3,focus[1]);ctx.lineTo(focus[0]+r+4,focus[1]);ctx.moveTo(focus[0],focus[1]-r-4);ctx.lineTo(focus[0],focus[1]-r+3);ctx.moveTo(focus[0],focus[1]+r-3);ctx.lineTo(focus[0],focus[1]+r+4);ctx.stroke();
neighbours.forEach((q,i)=>{const amount=ease((link-i*.12)/.65);ctx.beginPath();ctx.moveTo(focus[0],focus[1]);ctx.lineTo(focus[0]+(q[0]-focus[0])*amount,focus[1]+(q[1]-focus[1])*amount);ctx.strokeStyle='rgba(224,207,239,.65)';ctx.stroke();if(amount>.8){ctx.beginPath();ctx.arc(q[0],q[1],4,0,Math.PI*2);ctx.stroke()}});
ctx.font='11px Body, sans-serif';ctx.fillStyle='rgba(224,207,239,.9)';ctx.fillText(cycle<.22?'흐름 감지':cycle<.60?'관계 추적':'패턴 판독',focus[0]+19,focus[1]-13);
ctx.restore()}
}
// Wide luminous traces suggest information moving across the observed surface.
for(let k=0;k<3;k++){const v=.18+k*.30;ctx.beginPath();for(let j=0;j<=100;j++){const q=mesh(j/100,v);j?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1])}ctx.strokeStyle='rgba(192,173,206,.12)';ctx.lineWidth=5;ctx.stroke();ctx.strokeStyle='rgba(192,173,206,.5)';ctx.lineWidth=.9;ctx.stroke()}
const shade=ctx.createLinearGradient(0,0,w*.9,0);shade.addColorStop(0,'rgba(0,0,0,.90)');shade.addColorStop(.5,'rgba(0,0,0,.65)');shade.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=shade;ctx.fillRect(0,0,w,h);ctx.restore()}
drawSynthesis(now);updateLuminous(now);if(!reduced)frame=requestAnimationFrame(draw)}
addEventListener('scroll',progress,{passive:true});addEventListener('resize',()=>{resize();progress()});$('#next').addEventListener('click',()=>jump(Math.min(5,active+1)));$('#restart').addEventListener('click',()=>scrollTo({top:0,behavior:reduced?'instant':'smooth'}));resize();progress();if(!reduced)draw(0);

function drawSynthesis(now){const alpha=visibility(4);if(alpha<.001)return;const m=ease((t-4.08)/.7),cx=w*.74,cy=h*.5,R=Math.min(w*.23,h*.34);ctx.save();ctx.globalAlpha=alpha;
for(let row=0;row<22;row++)for(let col=0;col<64;col++){const u=col/63,v=row/21,a=u*Math.PI*2,r=R*(.24+v*.76),wx=cx+(u-.5)*R*2.5,wy=cy+(v-.5)*R*.6+Math.sin(u*8+now*.0003+v*2)*R*.34,rx=cx+Math.cos(a)*r,ry=cy+Math.sin(a)*r;ctx.globalAlpha=alpha*(row%4===2?1-ease((m-.25)/.65):1);ctx.beginPath();ctx.arc(wx+(rx-wx)*m,wy+(ry-wy)*m,1+(row%5===0?.5:0),0,Math.PI*2);ctx.fillStyle=`rgba(${Math.round(192+49*m)},${Math.round(173+78*m)},${Math.round(206-94*m)},${.25+.55*(1-v*.5)})`;ctx.fill()}
if(m<.78){ctx.save();ctx.strokeStyle='#e5d5ef';ctx.lineWidth=.8;
const sample=k=>{const u=.15+k*.17,v=.3+(k%2)*.3,a=u*Math.PI*2,r=R*(.24+v*.76),wx=cx+(u-.5)*R*2.5,wy=cy+(v-.5)*R*.6+Math.sin(u*8+now*.0003+v*2)*R*.34;return [wx+(cx+Math.cos(a)*r-wx)*m,wy+(cy+Math.sin(a)*r-wy)*m]};
for(let channel=0;channel<(m<.28?2:0);channel++){const cycle=reduced?channel+.65:now/3400+channel*2.5,k=Math.floor(cycle)%5,f=cycle%1,pt=sample(k),previous=sample((k+4)%5),seek=ease(f/.38),lock=ease((f-.38)/.22),fade=1-ease((f-.86)/.14),x=previous[0]+(pt[0]-previous[0])*seek,y=previous[1]+(pt[1]-previous[1])*seek,size=20-12*lock,len=5;ctx.globalAlpha=alpha*.8*fade;ctx.beginPath();for(const sx of [-1,1])for(const sy of [-1,1]){ctx.moveTo(x+sx*(size-len),y+sy*size);ctx.lineTo(x+sx*size,y+sy*size);ctx.lineTo(x+sx*size,y+sy*(size-len))}ctx.stroke();if(lock>.05){ctx.globalAlpha=alpha*lock*fade;ctx.fillStyle='#e5d5ef';ctx.beginPath();ctx.arc(pt[0],pt[1],2.5,0,Math.PI*2);ctx.fill();const neighbour=sample((k+1)%5);ctx.globalAlpha*=.3;ctx.beginPath();ctx.moveTo(...pt);ctx.lineTo(pt[0]+(neighbour[0]-pt[0])*lock,pt[1]+(neighbour[1]-pt[1])*lock);ctx.stroke()}}
for(let k=0;k<5;k++){const [x,y]=sample(k);ctx.globalAlpha=alpha*.35;ctx.fillStyle='#e5d5ef';ctx.beginPath();ctx.arc(x,y,1.4,0,Math.PI*2);ctx.fill();if(m>.28){ctx.globalAlpha=alpha*.8;ctx.fillStyle='#f1fb70';ctx.font='12px Body';ctx.fillText(['木','火','土','金','水'][k],x+12,y-10)}}ctx.restore()}
const lineMix=ease((m-.45)/.5);for(let row=2;row<22;row+=4){ctx.beginPath();for(let col=0;col<=128;col++){const u=col/128,v=row/21,a=u*Math.PI*2,rr=R*(.24+v*.76),wx=cx+(u-.5)*R*2.5,wy=cy+(v-.5)*R*.6+Math.sin(u*8+now*.0003+v*2)*R*.34,rx=cx+Math.cos(a)*rr,ry=cy+Math.sin(a)*rr,x=wx+(rx-wx)*m,y=wy+(ry-wy)*m;col?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.globalAlpha=alpha*lineMix*.7;ctx.strokeStyle='#f1fb70';ctx.lineWidth=.7;ctx.stroke()}ctx.globalAlpha=alpha*m;ctx.strokeStyle='#f1fb70';ctx.fillStyle='#f1fb70';ctx.lineWidth=.65;const pts=[];for(let i=0;i<5;i++){const a=-Math.PI/2+i*Math.PI*2/5,x=cx+Math.cos(a)*R*.70,y=cy+Math.sin(a)*R*.70;pts.push([x,y]);ctx.beginPath();ctx.arc(x,y,R*.12,0,Math.PI*2);ctx.stroke();ctx.font=`${R*.13}px Display`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(['火','土','金','水','木'][i],x,y)}for(let i=0;i<5;i++){ctx.beginPath();ctx.moveTo(...pts[i]);ctx.lineTo(...pts[(i+2)%5]);ctx.globalAlpha=alpha*m*.3;ctx.stroke()}ctx.globalAlpha=alpha*m;ctx.font=`${R*.32}px serif`;ctx.textAlign='center';ctx.textBaseline='alphabetic';const yinMetrics=ctx.measureText('☯');const yinX=cx+(yinMetrics.actualBoundingBoxLeft-yinMetrics.actualBoundingBoxRight)/2;const yinY=cy+(yinMetrics.actualBoundingBoxAscent-yinMetrics.actualBoundingBoxDescent)/2;ctx.fillText('☯',yinX,yinY);ctx.restore();document.querySelectorAll('.morph-rules li').forEach((el,i)=>el.classList.toggle('selected',i===(m<.28?0:m<.78?1:2)))}

function layoutAnnotations(){} // The detail overlay uses the video's actual rendered coordinates.
function updateInspection(video){
 const box=$('.system-inspect');if(t<6.55)return;
 if(!box._ready){
  box._ready=true;
  box.querySelectorAll('button[data-part]').forEach(button=>{
   const select=()=>{box._manual=Number(button.dataset.part);box._scroll=scrollY;updateInspection(video)};
   button.addEventListener('pointerenter',select);button.addEventListener('focus',select);button.addEventListener('click',select);
  });
 }
 if(Math.abs(scrollY-(box._scroll??scrollY))>10)box._manual=null;
 const index=box._manual??Math.min(3,Math.floor(clamp((t-6.75)/1.02)*4));
 const details=[
 ['중심 연결부','집중','중앙으로 모이는 연결의 밀도','중앙의 음양을 둘러싼 연결 집합을 확대합니다. 여러 경로가 한 영역에 모이는 구조를 집중으로 읽습니다.'],
 ['오행 관측부','변화','관측 지점 사이의 신호 이동','오행 관측부와 인접한 신호 경로를 확대합니다. 신호가 이동하는 방향과 강도의 차이를 변화로 읽습니다.'],
 ['연결 경로','연속성','지점과 지점 사이의 이어짐','관측 지점에서 중앙으로 이어지는 경로를 확대합니다. 경로가 이어지거나 끊기는 양상을 연속성으로 읽습니다.'],
 ['외곽 순환부','반복','동심원 위에 되돌아오는 신호','외곽 궤도의 반복되는 눈금과 신호를 확대합니다. 같은 경로를 따라 되돌아오는 구조를 반복으로 읽습니다.']];
 const regions=[[.50,.53,.13],[.72,.59,.14],[.57,.64,.11],[.50,.22,.13]],r=regions[index],d=details[index];
 box.querySelectorAll('button[data-part]').forEach((el,i)=>{el.classList.toggle('selected',i===index);el.setAttribute('aria-pressed',String(i===index))});
 $('.detail-number').textContent=`0${index+1} / ${d[0]}`;$('.detail-title').textContent=d[1];$('.detail-rule').textContent=d[2];$('.detail-description').textContent=d[3];
 if(video.readyState<2||!video.videoWidth)return;
 const zoom=$('#detail-crop'),zc=zoom.getContext('2d'),vw=video.videoWidth,vh=video.videoHeight;
 const side=Math.min(vw,vh)*r[2]*2.8,sx=Math.max(0,Math.min(vw-side,r[0]*vw-side/2)),sy=Math.max(0,Math.min(vh-side,r[1]*vh-side/2));
 zc.drawImage(video,sx,sy,side,side,0,0,640,640);
 const overlay=$('#detail-overlay'),oc=overlay.getContext('2d'),bounds=overlay.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2);overlay.width=Math.round(bounds.width*dpr);overlay.height=Math.round(bounds.height*dpr);oc.setTransform(dpr,0,0,dpr,-bounds.left*dpr,-bounds.top*dpr);
 const vr=video.getBoundingClientRect(),scale=Math.max(vr.width/vw,vr.height/vh),ox=vr.left+(vr.width-vw*scale)/2,oy=vr.top+(vr.height-vh*scale)/2;
 const x=ox+r[0]*vw*scale,y=oy+r[1]*vh*scale,rad=Math.min(w,h)*r[2]*(index===3?.63:1);
 oc.fillStyle='rgba(0,0,0,.72)';oc.fillRect(bounds.left,bounds.top,bounds.width,bounds.height);oc.globalCompositeOperation='destination-out';oc.beginPath();oc.arc(x,y,rad,0,Math.PI*2);oc.fill();oc.globalCompositeOperation='source-over';
 oc.strokeStyle='#f1df45';oc.lineWidth=1.25;oc.beginPath();oc.arc(x,y,rad,0,Math.PI*2);oc.stroke();
 const card=$('.detail-card').getBoundingClientRect(),ex=card.right,ey=card.top+card.height*.35,angle=Math.atan2(ey-y,ex-x);
 oc.beginPath();oc.moveTo(x+Math.cos(angle)*rad,y+Math.sin(angle)*rad);oc.lineTo(ex+24,ey);oc.lineTo(ex,ey);oc.stroke();

}

function instrumentGeometry(){return {cx:w*.5,cy:h*.57,R:Math.min(w*.43,h*.70),tilt:.40}}
function drawInstrument(now){const alpha=visibility(5);if(alpha<.001)return;const {cx,cy,R,tilt}=instrumentGeometry(),clock=reduced?0:now*.000035,dim=1-ease((t-5.6)/.4)*.8+ease((t-6.5)/.4)*.65;ctx.save();ctx.globalAlpha=alpha*dim;ctx.translate(cx,cy);ctx.scale(1,tilt);ctx.strokeStyle='#f1df45';ctx.fillStyle='#f1df45';
const ring=(r,a,b,width,opacity)=>{ctx.save();ctx.globalAlpha*=opacity;ctx.lineWidth=width;ctx.beginPath();ctx.arc(0,0,r,a,b);ctx.stroke();ctx.restore()};
// Offset planes give the instrument a shallow, architectural depth.
for(let layer=0;layer<3;layer++){ctx.save();ctx.translate(0,layer*R*.065);ring(R*(1.04-layer*.025),0,Math.PI*2,1,.13);ctx.restore()}
[.22,.28,.43,.56,.69,.80,.88,1].forEach((v,i)=>{ring(R*v,0,Math.PI*2,i%3===0?1.4:.7,.22+i*.045);const shift=clock*(i%2?-1:1)*(1+i*.14);for(let j=0;j<3;j++){const a=shift+j*Math.PI*2/3+i*.23;ring(R*v,a,a+.28+i*.025,i%2?2:4,.70)}});
for(let band=0;band<3;band++){const rad=R*(.76+band*.11),shift=clock*(band===1?-.6:.4);ctx.save();ctx.rotate(shift);ctx.lineWidth=band===0?1.4:.8;ctx.globalAlpha*=.48;for(let i=0;i<144;i++){const a=i*Math.PI*2/144,len=i%12===0?R*.045:R*.016;ctx.beginPath();ctx.moveTo(Math.cos(a)*rad,Math.sin(a)*rad);ctx.lineTo(Math.cos(a)*(rad+len),Math.sin(a)*(rad+len));ctx.stroke()}ctx.restore()}
// A few evenly spaced signals travel along their own orbits.
for(let band=0;band<2;band++)for(let i=0;i<8;i++){const a=i*Math.PI/4+clock*(band?-.8:1),rad=R*(band?.88:.56);ctx.beginPath();ctx.arc(Math.cos(a)*rad,Math.sin(a)*rad,2.3,0,Math.PI*2);ctx.fill()}
const pts=[];for(let i=0;i<5;i++){const a=-Math.PI/2+i*Math.PI*2/5,x=Math.cos(a)*R*.43,y=Math.sin(a)*R*.43;pts.push([x,y]);ctx.save();ctx.translate(x,y);ring(R*.09,0,Math.PI*2,1,.8);ring(R*.105,0,Math.PI*1.7,1,.35);ctx.scale(1,1/tilt);ctx.font=`${Math.max(17,R*.055)}px serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(['火','土','金','水','木'][i],0,0);ctx.restore()}
ctx.save();ctx.globalAlpha*=.22;ctx.lineWidth=.7;for(let i=0;i<5;i++){ctx.beginPath();ctx.moveTo(...pts[i]);ctx.lineTo(...pts[(i+2)%5]);ctx.stroke()}ctx.restore();
// Draw the yin-yang as vector geometry for crisp rendering at any size.
ctx.save();ctx.scale(1,1/tilt);const q=R*.065;ctx.beginPath();ctx.arc(0,0,q,-Math.PI/2,Math.PI/2);ctx.arc(0,q/2,q/2,Math.PI/2,-Math.PI/2,true);ctx.arc(0,-q/2,q/2,Math.PI/2,-Math.PI/2);ctx.fill();ctx.beginPath();ctx.arc(0,0,q,0,Math.PI*2);ctx.lineWidth=1;ctx.stroke();ctx.fillStyle='#000';ctx.beginPath();ctx.arc(0,-q/2,q*.13,0,Math.PI*2);ctx.fill();ctx.fillStyle='#f1df45';ctx.beginPath();ctx.arc(0,q/2,q*.13,0,Math.PI*2);ctx.fill();ctx.restore();ctx.restore()}

function updateLuminous(now){const art=$('.luminous-art'),enter=ease((t-5.05)/.55),dim=1-ease((t-5.6)/.4)*.78+ease((t-6.5)/.4)*.58;art.style.opacity=enter;art.style.filter=`brightness(${dim})`;art.style.transform=`translateY(${(1-enter)*65}px) scale(${.94+enter*.06})`;art.style.clipPath='none';const img=art.querySelector('video');
// Keep playback inside the fully illuminated section of the source clip.
const mode=t<4.75?'hidden':(t>=6.55||reduced?'inspect':'play');
if(!img._safePlayback){
 img._safePlayback=true;img.loop=false;img.muted=true;img.defaultMuted=true;img.playsInline=true;
 const sync=()=>{
  if(!Number.isFinite(img.duration)||img.readyState<1)return;
  const end=Math.min(12.5,img.duration-.1),start=Math.min(2.5,end),hold=Math.max(start,Math.min(img.currentTime,end-.15));
  if(img._mode==='hidden'){img.pause();return}
  if(img._mode==='inspect'){
   img.pause();
   if(!img.seeking&&Math.abs(img.currentTime-hold)>.08)img.currentTime=hold;
   return;
  }
  if(!img.seeking&&img.currentTime>=end)img.currentTime=start;
  if(img.paused&&!img._playPending){
   img._playPending=true;
   img.play().catch(()=>{}).finally(()=>{img._playPending=false;if(img._mode!=='play')img.pause()});
  }
 };
 img._syncSafePlayback=sync;
 for(const event of ['loadedmetadata','loadeddata','canplay','seeked','timeupdate','ended'])img.addEventListener(event,sync);
}
if(img._mode!==mode){img._mode=mode;img._syncSafePlayback()}
if(mode==='play'&&(img.currentTime>=12.5||(img.paused&&!img._playPending&&(!img._retryAt||now-img._retryAt>1000)))){img._retryAt=now;img._syncSafePlayback();}
img.style.transform='none';updateInspection(img);
if(enter>.01&&mode!=='inspect'){const rect=art.getBoundingClientRect(),cx=rect.left+rect.width*.5,cy=rect.top+rect.height*.54,rx=rect.width*.42,ry=rect.height*.35;ctx.save();ctx.globalAlpha=enter*dim*.65;ctx.strokeStyle='#ffdf27';ctx.lineWidth=1;for(let i=0;i<3;i++){const a=(reduced||mode==='inspect'?0:now*.00005)*(i%2?-1:1)+i*2.1;ctx.beginPath();ctx.ellipse(cx,cy,rx*(1-i*.12),ry*(1-i*.12),0,a,a+.25);ctx.stroke();ctx.fillStyle='#ffdf27';ctx.beginPath();ctx.arc(cx+Math.cos(a)*rx*(1-i*.12),cy+Math.sin(a)*ry*(1-i*.12),2,0,Math.PI*2);ctx.fill()}ctx.restore()}}
