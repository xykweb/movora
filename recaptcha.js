'use strict';
window.MovoraCaptcha=(()=>{
  let loading,widget;
  const local=()=>location.protocol==='file:'||['localhost','127.0.0.1'].includes(location.hostname);
  function load(){
    if(window.grecaptcha?.render)return Promise.resolve();
    if(loading)return loading;
    loading=new Promise((resolve,reject)=>{
      const script=document.createElement('script');
      const timeout=setTimeout(()=>{script.remove();loading=null;reject(Error('Verification took too long. Please retry.'))},15000);
      window.movoraCaptchaReady=()=>{clearTimeout(timeout);resolve()};
      script.src='https://www.google.com/recaptcha/api.js?onload=movoraCaptchaReady&render=explicit&hl=en';
      script.async=true;script.defer=true;
      script.onerror=()=>{clearTimeout(timeout);script.remove();loading=null;reject(Error('Verification could not load. Please check your connection and retry.'))};
      document.head.append(script);
    });return loading;
  }
  async function mount(){
    const box=document.querySelector('#captcha-box');if(!box)return;
    if(local()){box.textContent='Local preview: verification is disabled.';return}
    const status=document.querySelector('#captcha-status');
    try{
      await load();if(!box.isConnected)return;
      widget=grecaptcha.render(box,{sitekey:window.MOVORA_CONFIG.recaptchaSiteKey,callback:()=>{status.textContent='Verification completed.'},'expired-callback':()=>{status.textContent='Verification expired. Please complete it again.'},'error-callback':()=>{status.textContent='Verification failed. Please check your connection and retry.'}});
    }catch(error){status.textContent=error.message;const retry=document.createElement('button');retry.type='button';retry.textContent='Retry verification';retry.onclick=()=>{retry.remove();mount()};box.append(retry)}
  }
  function requireResponse(){
    if(local())return;
    if(widget===undefined||!window.grecaptcha?.getResponse(widget))throw Error('Please complete the verification before continuing.');
    // A browser response is not a trusted verification. Backend enforcement is pending.
  }
  return {mount,requireResponse};
})();
