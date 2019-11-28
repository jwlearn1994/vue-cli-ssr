import { createApp } from './main'

const prepareUrlForRouting = url => {
  const { BASE_URL } = process.env
  return url.startsWith(BASE_URL.replace(/\/$/, ''))
    ? url.substr(BASE_URL.length)
    : url
}

export default context => {
  return new Promise(async (resolve, reject) => {
    const {
      app,
      router,
      store,
    } = await createApp()

    router.push(prepareUrlForRouting(context.url))

    router.onReady(() => {
      // https://ssr.vuejs.org/zh/guide/data.html
      const matchedComponents = router.getMatchedComponents()

      Promise.all(matchedComponents.map(async Component => {
        if (Component.asyncData) {
          const res = await Component.asyncData({
            store,
            route: router.currentRoute,
            isClient: false,
            isServer: true
          });
          return res;
        }
      })).then(() => {
        context.state = store.state
        resolve(app)
      }).catch(reject)

    }, reject)
  })
}
