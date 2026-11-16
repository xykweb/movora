'use strict';
window.MovoraTracking=(()=>{
 let last=performance.now(),visible=document.visibilityState!=='hidden';
 function checkpoint(){
  const now=performance.now();if(typeof s==='undefined'||!s){last=now;return}
  const elapsed=Math.max(0,(now-last)/1000);last=now;
  if(s.completedAt)return;
  s.timing ||= {pageVisibleSeconds:{},homepageVisibleSeconds:0,homepageElapsedSeconds:0,pairVisibleSeconds:{}};
  if(visible){s.timing.pageVisibleSeconds[s.page]=(s.timing.pageVisibleSeconds[s.page]||0)+elapsed;if(s.page===3){s.timing.homepageVisibleSeconds+=elapsed;const i=s.pairIndex||0;s.timing.pairVisibleSeconds[i]=(s.timing.pairVisibleSeconds[i]||0)+elapsed}}
  if(s.page===3)s.timing.homepageElapsedSeconds+=elapsed;
 }
 function event(type,detail={}){checkpoint();s.events ||= [];s.events.push({type,at:new Date().toISOString(),page:s.page,pairIndex:s.page===3?(s.pairIndex||0):null,...detail});}
 function refreshExports(){
  const zone=Intl.DateTimeFormat().resolvedOptions().timeZone;
  s.TimeZone ||= zone;
  const localDate=value=>{if(!value)return null;const d=new Date(value);if(Number.isNaN(d.getTime()))return null;return new Intl.DateTimeFormat('sv-SE',{timeZone:s.TimeZone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).format(d)};
  s.StartDateLocal=localDate(s.startedAt);s.EndDateLocal=localDate(s.completedAt);
  const ua=navigator.userAgent;
  s.DeviceType ||= /iPad|Tablet/i.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1)?'Tablet':/Mobi|Android|iPhone|iPod/i.test(ua)?'Mobile':'Desktop/Laptop';
  s.BrowserType ||= /Edg\//.test(ua)?'Edge':/OPR\//.test(ua)?'Opera':/Firefox|FxiOS/.test(ua)?'Firefox':/Chrome|CriOS/.test(ua)?'Chrome':/Safari/.test(ua)?'Safari':'Other';

  if(!Object.prototype.hasOwnProperty.call(s,'ReCaptcha_Score'))s.ReCaptcha_Score=null;
  s.genreOrder=s.pairs.map(p=>p.genre);
  s.stimulusManifest=s.pairs.flatMap((pair,index)=>pair.items.map((item,side)=>({...item,genre:pair.genre,genreId:pair.id,presentationOrder:index+1,side:side===0?'left':'right',longTitle:item.titleId.endsWith('a')?1:0,mapping:pair.mapping})));
  s.selectionByGenre=Object.fromEntries(s.pairs.map((pair,i)=>{const choice=s.choices[i];return[pair.genre,choice?{longTitle:choice.titleId.endsWith('a')?1:0,titleId:choice.titleId,title:choice.title,posterId:choice.posterId,presentationOrder:i+1,side:pair.items.findIndex(x=>x.posterId===choice.posterId)===0?'left':'right',confirmedAt:choice.chosenAt}:null]}));
  s.environment ||= {userAgent:navigator.userAgent,language:navigator.language,platform:navigator.platform,screenWidth:screen.width,screenHeight:screen.height,timeZone:Intl.DateTimeFormat().resolvedOptions().timeZone};
 }
 setInterval(()=>{if(typeof s!=='undefined'&&s){checkpoint();refreshExports();localStorage.setItem(key,JSON.stringify(s))}},1000);
 document.addEventListener('visibilitychange',()=>{if(typeof s!=='undefined'&&s){event(document.visibilityState==='hidden'?'tab_hidden':'tab_visible');visible=document.visibilityState!=='hidden';save()}});
 window.addEventListener('pagehide',()=>{if(typeof s!=='undefined'&&s){event('page_leave');save()}});
 document.addEventListener('input',e=>{if(typeof s==='undefined'||!s||!e.target.name)return;const input=e.target;if(!['INPUT','TEXTAREA','SELECT'].includes(input.tagName))return;event('answer_change',{field:input.name,value:input.value});if(s.page===1){s.activities=[1,2,3].map(i=>document.querySelector(`[name=a${i}]`).value)}else if(s.page>=5&&s.page<=9){s.answers[input.name]=Number(input.value)}else if(s.page===10){s.demographics ||= {};s.demographics[input.name]=input.value}save()});
 return {checkpoint,event,refreshExports};
})();
