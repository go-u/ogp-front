import firebase from 'firebase/app'
import 'firebase/auth'
import { Platform } from 'quasar'
import firebaseConfig from '../../../config/firebase'
import variables from '../../../config/variables'

const isPrd = variables.domainsPrd.includes(document.domain)
const isStg = variables.domainsStg.includes(document.domain)
if (isPrd) {
  firebase.initializeApp(firebaseConfig.firebaseConfigPrd)
} else if (isStg) {
  firebase.initializeApp(firebaseConfig.firebaseConfigStg)
} else { // default local
  firebase.initializeApp(firebaseConfig.firebaseConfigLocal)
}
firebase.auth().useDeviceLanguage()

export async function Initialize (context) {
  context.dispatch('native/ChangeStatusBar', { color: '#2e2e2e' }, { root: true })
  context.dispatch('native/InitializePushNotification', {}, { root: true })
  if (!Platform.is.capacitor) {
    // getRedirectResultはfirebaseのObserve登録前に呼び出す必用が有る
    // 処理に時間がかかるためアプリでは省略する
    try {
      await context.dispatch('auth/GetRedirectResult', {}, { root: true })
    } catch (e) {
      console.log(e)
    }
  }
  context.dispatch('auth/ObserveFirebaseUserAndUpdateAuthState', {}, { root: true })
}
