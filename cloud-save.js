'use strict';
window.MovoraCloud=(()=>{
 let queue=Promise.resolve(),timer,authPending;
 const cfg=window.MOVORA_CONFIG.supabase;
 const authKey=()=>key+':auth';
 async function request(path,options={}){
  const abort=new AbortController(),timeout=setTimeout(()=>abort.abort(),15000);
  try{const res=await fetch(cfg.url+path,{...options,signal:abort.signal,headers:{apikey:cfg.publishableKey,'Content-Type':'application/json',...options.headers}});const body=await res.json();if(!res.ok)throw Error(body.message||body.msg||body.error_description||'Study server request failed');return body}finally{clearTimeout(timeout)}
 }
 async function auth(){
  if(authPending)return authPending;
  authPending=(async()=>{let session=JSON.parse(localStorage.getItem(authKey())||'null');
   if(session&&session.expires_at*1000>Date.now()+60000)return session;
   if(session)session=await request('/auth/v1/token?grant_type=refresh_token',{method:'POST',body:JSON.stringify({refresh_token:session.refresh_token})});
   else session=await request('/auth/v1/signup',{method:'POST',body:'{}'});
   if(!session.access_token)throw Error('Please enable anonymous sign-ins in Supabase.');
   session.expires_at ||= Math.floor(Date.now()/1000)+session.expires_in;localStorage.setItem(authKey(),JSON.stringify(session));return session;
  })().finally(()=>{authPending=null});return authPending;
 }
 function status(message){let box=document.querySelector('#cloud-status');if(!box){box=document.createElement('p');box.id='cloud-status';box.setAttribute('role','status');document.body.append(box)}box.textContent=message;box.hidden=!message}
 function write(completed=false){
  const responseKey=key;
  const snapshot=JSON.parse(JSON.stringify(s));
  const work=queue.catch(()=>{}).then(async()=>{
   if(responseKey!==key)return;
   const session=await auth();
   if(completed){const existing=await request('/rest/v1/movora_responses?id=eq.'+encodeURIComponent(snapshot.id)+'&select=id,completed',{headers:{Authorization:'Bearer '+session.access_token}});if(existing[0]?.completed){status('');return}}
   const row={id:snapshot.id,owner_id:session.user.id,study_version:snapshot.version,source:snapshot.source,connect_id:snapshot.source==='connect'?snapshot.connectId:null,completed,payload:snapshot};
   const result=await request('/rest/v1/movora_responses?on_conflict=id',{method:'POST',headers:{Authorization:'Bearer '+session.access_token,Prefer:'resolution=merge-duplicates,return=representation'},body:JSON.stringify(row)});
   if(!result[0]||result[0].id!==row.id||result[0].completed!==completed)throw Error('The server did not confirm your response.');status('');
  });queue=work;return work.catch(error=>{status('Your latest answers have not synced. They remain on this device. '+error.message);throw error});
 }
 function changed(){if(!s||!s.connectId||s.completedAt)return;clearTimeout(timer);timer=setTimeout(()=>write().catch(()=>{}),1500)}
 async function complete(){clearTimeout(timer);await write(true)}
 setInterval(()=>{if(typeof s!=='undefined'&&s&&!s.completedAt&&s.connectId)write().catch(()=>{})},15000);
 window.addEventListener('online',changed);
 return{changed,complete};
})();
