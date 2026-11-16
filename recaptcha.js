'use strict';
window.MovoraCaptcha=(()=>{
 let loading;
 const local=()=>location.protocol==='file:'||['localhost','127.0.0.1'].includes(location.hostname);
 function load(){
  if(!window.MOVORA_CONFIG.recaptchaSiteKey)return Promise.reject(Error('reCAPTCHA v3 is not configured yet. Please contact the researcher.'));
  if(loading)return loading;
  loading=new Promise((resolve,reject)=>{
   const script=document.createElement('script');const timeout=setTimeout(()=>{script.remove();loading=null;reject(Error('Verification timed out. Please try again.'))},15000);
   script.src='https://www.google.com/recaptcha/api.js?render='+encodeURIComponent(window.MOVORA_CONFIG.recaptchaSiteKey)+'&hl=en';script.async=true;
   script.onload=()=>grecaptcha.ready(()=>{clearTimeout(timeout);resolve()});script.onerror=()=>{clearTimeout(timeout);script.remove();loading=null;reject(Error('Verification could not load. Please check your connection and retry.'))};document.head.append(script);
  });return loading;
 }
 function mount(){const box=document.querySelector('#captcha-box');if(box)box.textContent=''}
 async function requireResponse(){
  if(local())return;
  await load();const token=await grecaptcha.execute(window.MOVORA_CONFIG.recaptchaSiteKey,{action:'study_entry'});
  const result=await window.MovoraCloud.verifyCaptcha(token);
  s.ReCaptcha_Score=result.score;s.recaptcha={version:'v3',verified:true,action:'study_entry',verifiedAt:result.verified_at};save();
 }
 return{mount,requireResponse};
})();
