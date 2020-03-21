import variables from '../../../config/variables'
import { BaseRequest } from '../api'

import firebase from 'firebase/app'
import 'firebase/auth'
import { Platform } from 'quasar'
import { cfaSignIn, cfaSignOut } from 'capacitor-firebase-auth'

export function ObserveFirebaseUserAndUpdateAuthState (context) {
  firebase.auth().onAuthStateChanged((firebaseUser) => {
    if (firebaseUser) {
      context.commit('hasLoginFirebase', { hasLoginFirebase: true })
      CheckAuthState(context)
    } else {
      context.commit('hasLoginFirebase', { hasLoginFirebase: false })
      context.commit('authState', { authState: variables.AUTH_STATE_LOGOUT })
      console.log('no firebase user')
    }
  })
}

export async function CheckAuthState (context) {
  const firebaseUser = firebase.auth().currentUser
  if (!firebaseUser) {
    return
  }
  const user = await context.dispatch('GetSelfUserDetail').catch(() => null)
  const providerId = firebaseUser.providerData[0].providerId
  const onEmailVerifying = ((providerId === 'password') && !firebaseUser.emailVerified)

  let authState = null
  if (onEmailVerifying) {
    authState = variables.AUTH_STATE_ON_EMAIL_VERIFYING
  } else if (!user) {
    authState = variables.AUTH_STATE_ON_REGISTRATION
  } else {
    authState = variables.AUTH_STATE_LOGIN
  }
  console.log({ authState })
  context.commit('authState', { authState: authState })
  return authState
}

export function SendEmailVerification (context) {
  return new Promise((resolve, reject) => {
    if (firebase.auth().currentUser) {
      // firebase.auth().currentUser.sendEmailVerification(actionCodeSettings) // 確認メール送信
      firebase.auth().currentUser.sendEmailVerification() // 確認メール送信
        .then((res) => {
          console.log('send email success: ', res)
          resolve(res)
        }).catch((err) => {
          console.log('send email fail: ', err)
          reject(err)
        })
    } else {
      reject('no firebase user')
    }
  })
}

export function CreateUserWithEmailAndPassword (context, { email, password }) {
  return new Promise((resolve, reject) => {
    firebase.auth().useDeviceLanguage() // 言語をブラウザ言語に変更(デフォルトでは英語メールが送信される)
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result)
        result.user.sendEmailVerification() // 確認メール送信
          .then(() => {
            resolve()
          }).catch((err) => {
            console.log('send email fail: ', err)
            reject(err)
          })
      }).catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}

export function ResetPassword (context, { mail }) {
  return new Promise((resolve, reject) => {
    firebase.auth().sendPasswordResetEmail(mail) // 確認メール送信
      .then((res) => {
        console.log('send email success: ', res)
        resolve()
      }).catch((err) => {
        console.log('send email fail: ', err)
        reject(err)
      })
  })
}

export function LoginWithEmailAndPassword (context, { mail, password }) {
  return new Promise((resolve, reject) => {
    Logout()
      .then(() => {
        firebase.auth().signInWithEmailAndPassword(mail, password)
          .then((result) => {
            // location.reload() // observerに一任する
            CheckAuthState(context)
              .then((user) => {
                resolve(result)
              })
          }).catch((err) => {
            console.log('signInWithEmailAndPassword fail: ', err)
            reject(err)
          })
      }).catch((err) => {
        console.log(err)
      })
  })
}

export function Logout (context) {
  return new Promise((resolve, reject) => {
    firebase.auth().signOut()
      .then(() => {
        console.log('success logout from firebase web')
        const isApp = Platform.is.capacitor
        if (isApp) {
          cfaSignOut().subscribe(
            () => console.log('success logout from firebase capacitor'), resolve())
        } else {
          resolve()
        }
      }).catch((err) => {
        console.log('logout fail', err)
        reject(err)
      })
  })
}

export function GetSelfUserDetail (context) {
  return new Promise((resolve, reject) => {
    if (firebase.auth().currentUser) {
      firebase.auth().currentUser.getIdToken(false)
        .then((token) => {
          BaseRequest({ url: '/api/users/me', token: token, method: 'get' })
            .then((res) => {
              context.commit('user', { user: res.data })
              resolve(res.data)
            }).catch((err) => {
              console.log(err)
              context.commit('user', { user: null })
              reject(err)
            })
        })
    } else {
      context.commit('user', { user: null })
      reject('no firebase user')
    }
  })
}

export function RouterPushToRegisterOrLogin (context) {
  console.log(context.state.authState)
  switch (context.state.authState) {
    case variables.AUTH_STATE_LOGOUT:
      break
    case variables.AUTH_STATE_ON_EMAIL_VERIFYING:
      this.$router.push({ name: 'email-verify' })
      break
    case variables.AUTH_STATE_ON_REGISTRATION:
      this.$router.push({ name: 'registration' })
      break
    case variables.AUTH_STATE_LOGIN:
      this.$router.push({ name: 'top' })
      break
    default: // null
      console.log('not determined auth state')
  }
}

export function Register (context, { payload }) {
  console.log(firebase.auth().currentUser)
  return new Promise((resolve, reject) => {
    if (firebase.auth().currentUser) {
      firebase.auth().currentUser.getIdToken(false)
        .then((token) => {
          BaseRequest({ url: '/api/users', token: token, method: 'post', payload: payload })
            .then((res) => {
              context.commit('user', { user: res.data })
              resolve(res.data)
            }).catch((err) => {
              console.log(err)
              context.commit('user', { user: null })
              reject(err)
            })
        }).catch((err) => {
          console.log(err)
        })
    } else {
      context.commit('user', { user: null })
      reject('no firebase user')
    }
  })
}

export function SocialLogin (context, { providerId }) {
  const isApp = Platform.is.capacitor
  if (isApp) {
    nativeLogin(context, providerId)
  } else {
    redirectLogin(context, providerId)
  }
}

// for native app
function nativeLogin (context, providerId) {
  return new Promise((resolve, reject) => {
    cfaSignIn(providerId).subscribe(
      (user) => CheckAuthState(context)
        .then(() => {
          context.dispatch('RouterPushToRegisterOrLogin')
          resolve()
        })
    )
  })
}

// for web app
function redirectLogin (context, providerId) {
  return new Promise((resolve, reject) => {
    firebase.auth().useDeviceLanguage()
    let provider = null
    switch (providerId) {
      case 'twitter.com':
        provider = new firebase.auth.TwitterAuthProvider()
        break
      case 'google.com':
        provider = new firebase.auth.GoogleAuthProvider()
        break
      default:
        console.log('wrong provider')
    }
    firebase.auth().signInWithRedirect(provider)
  })
}

/*
注意
initializeより前に呼ばないとobserverが不具合尾を起こす
*/
export function GetRedirectResult (context) {
  return new Promise((resolve, reject) => {
    firebase.auth().getRedirectResult()
      .then((result) => {
        const isOauthRedirect = Boolean(result.user) // ページを開いただけなのか、Oauth直後か判別
        if (isOauthRedirect) {
          const oAuthUser = result.user
          console.log(oAuthUser)
          context.commit('oauthUser', { oauthUser: oAuthUser })
          CheckAuthState(context)
            .then(() => {
              context.dispatch('RouterPushToRegisterOrLogin')
              resolve(result)
            })
        } else {
          resolve('not login')
        }
      }).catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}
