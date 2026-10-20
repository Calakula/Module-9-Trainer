const sh=a=>{a=[...a];for(let i=a.length;i>1;){const j=Math.random()*i--|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const $=s=>document.querySelector(s),A=$("#A"),all=Q.map((_,i)=>i);
let lang="en",page="theory",wrong=new Set(),tmr;
const t=k=>UI[lang][k];
const PG=[["theory","📘"],["cards","🃏"],["test","📝"],["match","🧩"],["blitz","⚡"],["mist","🔁"]];
function setL(l){lang=l;document.documentElement.lang=l;go(page)}
function go(p){page=p;clearInterval(tmr);$("#ti").textContent=t("ti");$("#su").textContent=t("su");
$("#nv").innerHTML=PG.map(([k,e])=>`<button class="${k==p?"on":""}" onclick="go('${k}')">${e} ${t(k)}</button>`).join("");
({theory,cards:()=>cards(1),test:()=>runTest(all),match,blitz,mist})[p]()}
function theory(){A.innerHTML=`<p class=mu>${t("note")}</p>`+TH[lang].map(s=>`<div class=card><h3>${s[0]}</h3><ul>${s[1].map(x=>`<li>${x}</li>`).join("")}</ul></div>`).join("")}
let deck,kn;
function cards(s){if(s){deck=sh(all);kn=0;fl=false}
if(!deck.length){A.innerHTML=`<div class=card><div class=big>🎉</div><h3>${t("done")}</h3><button class=pri onclick="cards(1)">${t("restart")}</button></div>`;return}
const q=Q[deck[0]];
A.innerHTML=`<p class=mu>${t("left")}: ${deck.length} · ✔ ${kn} · ${t("hint")}</p><div class="fc ${fl?"f":""}" onclick="fl=!fl;cards()">${fl?q[1].map(x=>"✔ "+x).join("<br><br>"):q[0]}</div><div class=row><button onclick="deck.push(deck.shift());fl=false;cards()">↻ ${t("again")}</button><button class=pri onclick="deck.shift();kn++;fl=false;cards()">✔ ${t("know")}</button></div>`}
let fl=false,tq,ti,ts,sel,ans,op;
function runTest(l){tq=sh(l);ti=0;ts=0;testQ()}
function testQ(){if(ti>=tq.length){const p=Math.round(ts/tq.length*100);A.innerHTML=`<div class=card><div class=big>${p>=80?"🏆":p>=50?"👍":"💪"}</div><h3>${t("res")}: ${ts}/${tq.length} (${p}%)</h3><div class=row><button class=pri onclick="go('test')">${t("restart")}</button><button onclick="go('mist')">${t("retry")} (${wrong.size})</button></div></div>`;return}
const q=Q[tq[ti]];ans=false;sel=[];op=sh([...q[1].map(x=>[x,1]),...q[2].map(x=>[x,0])]);const m=q[1].length>1;
A.innerHTML=`<div class=bar><i style="width:${ti/tq.length*100}%"></i></div><div class=card><p class=mu>${t("q")} ${ti+1}/${tq.length}${m?" · "+t("choose"):""}</p><h3>${q[0]}</h3>${op.map((o,k)=>`<button class=op id=o${k} onclick="pick(${k})">${o[0]}</button>`).join("")}<div class=row id=ac>${m?`<button class=pri onclick="grade()">${t("check")}</button>`:""}</div></div>`}
function pick(k){if(ans)return;if(Q[tq[ti]][1].length==1){sel=[k];grade();return}
sel=sel.includes(k)?sel.filter(x=>x!=k):[...sel,k];$("#o"+k).classList.toggle("sel")}
function grade(){ans=true;const ok=op.every((o,k)=>!!o[1]==sel.includes(k));
op.forEach((o,k)=>$("#o"+k).classList.add(o[1]?"ok":sel.includes(k)?"bad":"x"));
if(ok){ts++;wrong.delete(tq[ti])}else wrong.add(tq[ti]);
$("#ac").innerHTML=`<button class=pri onclick="ti++;testQ()">${t("next")} →</button>`}
function mist(){wrong.size?runTest([...wrong]):A.innerHTML=`<div class=card><div class=big>✨</div><p>${t("empty")}</p></div>`}
let bs,bl,bt;
function blitz(){bs=0;bl=60;tmr=setInterval(()=>{bl--;const e=$("#tm");if(e)e.textContent=bl;if(bl<=0){clearInterval(tmr);A.innerHTML=`<div class=card><div class=big>⚡</div><h3>${t("res")}: ${bs}</h3><button class=pri onclick="go('blitz')">${t("go")}</button></div>`}},1000);nb()}
function nb(){const i=Math.random()*Q.length|0,q=Q[i],tr=Math.random()<.5,pool=tr?q[1]:q[2];bt={tr,a:pool[Math.random()*pool.length|0],q:q[0]};
A.innerHTML=`<p class=mu>${t("blz")} · ${t("time")}: <b id=tm>${bl}</b> · ✔ ${bs}</p><div class=card><h3>${bt.q}</h3><p>→ ${bt.a}</p><div class=row><button class=pri onclick="bj(true)">${t("tr")}</button><button onclick="bj(false)">${t("fl")}</button></div></div>`}
function bj(v){if(bl<=0)return;bs+=v==bt.tr?1:-1;if(bs<0)bs=0;nb()}
let mp,ml,mr,ms,md,me;
function match(){mp=sh(P).slice(0,6);ml=sh([0,1,2,3,4,5]);mr=sh([0,1,2,3,4,5]);ms=null;md=new Set;me=0;dm()}
function dm(){const w=md.size==6;A.innerHTML=`<p class=mu>${t("pairs")} · ${t("err")}: ${me}</p><div class=cols><div>${ml.map(i=>`<button ${md.has(i)?"class=op ok disabled":""} style="${ms===i?"border-color:var(--ac);border-width:2px":""}" onclick="ml1(${i})">${mp[i][0]}</button>`).join("")}</div><div>${mr.map(i=>`<button ${md.has(i)?"class=ok disabled style=background:var(--ok);color:#fff":""} onclick="mr1(${i})">${mp[i][1]}</button>`).join("")}</div></div>${w?`<div class=card><div class=big>🎉</div><button class=pri onclick="match()">${t("restart")}</button></div>`:""}`}
function ml1(i){ms=i;dm()}
function mr1(i){if(ms===null)return;if(ms===i)md.add(i);else me++;ms=null;dm()}
go("theory");
