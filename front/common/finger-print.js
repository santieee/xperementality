import Fingerprint2 from 'fingerprintjs2';

export default function() { 
  return new Promise((res, rej) => {
    try{
      if (window.requestIdleCallback) {
        requestIdleCallback(() => {
          Fingerprint2.get((components) => {
            res(components); 
          });
        });
      } else {
        setTimeout(() => {
          Fingerprint2.get((components) => {
            res(components); 
          });  
        }, 500);
      }
    }catch(e){
      rej(e);
    }
  });
}