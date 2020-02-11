import { initServer, initClient } from '@/common/initApp';
export const actions = {
  nuxtServerInit(ctx, ctxApp) {
    initServer(ctx, ctxApp);
  },
  nuxtClientInit(ctx){
    initClient(ctx);
  }
};