import { createApp } from './app';

const isDev = process.env.NODE_ENV !== 'production';

export default (context: any) => {
  return new Promise((resolve, reject) => {
    const s: any = isDev && Date.now();
    const { app, router, store } = createApp();

    const { url } = context;
    const { fullPath } = router.resolve(url).route;

    if (fullPath !== url) {
      return reject({ url: fullPath });
    }

    router.push(url);

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) {
        return reject({ code: 404 });
      }
      Promise.all(matchedComponents.map(({ asyncData }: any) => asyncData && asyncData({
        store,
        route: router.currentRoute
      }))).then(() => {
        isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`);
        context.state = store.state;
        resolve(app);
      }).catch(reject);
    }, reject);
  });
};
