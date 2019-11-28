import { loadAsyncComponents } from '@akryum/vue-cli-plugin-ssr/client'

import { createApp } from './main'

createApp({
  async beforeApp ({
    router
  }) {
    await loadAsyncComponents({ router })
  },

  afterApp ({
    app,
    router,
      store,
  }) {
    store.replaceState(window.__INITIAL_STATE__)
    router.onReady(() => {
      // https://ssr.vuejs.org/zh/guide/data.html
      router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)

        let diffed = false
        const activated = matched.filter((c, i) => {
          return diffed || (diffed = (prevMatched[i] !== c))
        })
    
        if (!activated.length) {
          return next()
        }
    
        Promise.all(activated.map(c => {
          if (c.asyncData) {
            return c.asyncData({
              store,
              route: to,
              isClient: true,
              isServer: false
            })
          }
        })).then(() => {
          next()
        }).catch(next)
      })

      app.$mount('#app')
    })
  }
})
