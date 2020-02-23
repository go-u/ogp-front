import ga from './helper/analytics'
import config from '../../config/config'

export default ({ router, store }) => {
  router.afterEach((to, from) => {
    if (config.domainsPrd.includes(document.domain) || config.domainsDev.includes(document.domain)) {
      // ga.logPage(to.path, to.name, 'not-login') // login-less site
      if (store.state.auth.user) {
        ga.logPage(to.path, to.name, store.state.auth.user.username)
      } else {
        ga.logPage(to.path, to.name, 'not-login')
      }
    }
  })
}
