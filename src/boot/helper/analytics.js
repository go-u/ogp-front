import { uid } from 'quasar'

export default {
  // https://quasar.dev/quasar-cli/developing-cordova-apps/managing-google-analytics
  logEvent (category, action, label, sessionId = null) {
    window.dataLayer.push({ // GTMのVariablesに追加
      appEventCategory: category,
      appEventAction: action,
      appEventLabel: label,
      sessionId: sessionId,
      cid: getCid()
    })
    window.dataLayer.push({ event: 'appEvent' }) // GTMのTriggersに追加
  },

  // https://quasar.dev/quasar-cli/developing-cordova-apps/managing-google-analytics
  logPage (path, name, sessionId = null) {
    window.dataLayer.push({ // GTMのVariablesに追加
      screenPath: path,
      screenName: name,
      sessionId: sessionId,
      cid: getCid()
    })
    window.dataLayer.push({ event: 'appScreenView' }) // GTMのTriggersに追加
  }
}

// https://jannerantala.com/tutorials/quasar-framework-google-tag-manager-and-analytics-setup-for-an-spa-website/
function getCid () {
  // We need an unique identifier for this session
  // We store it in a localStorage, but you may use cookies, too
  if (!localStorage.cid) {
    localStorage.cid = uid()
  }
  return localStorage.cid
}
