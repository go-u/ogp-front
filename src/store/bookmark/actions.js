import { BaseRequest } from '../vuex_axios'
import firebase from 'firebase/app'
import 'firebase/auth'

export async function GetBookmarks (context) { // routeはthis.$route
  if (firebase.auth().currentUser) {
    const token = await firebase.auth().currentUser.getIdToken(false).catch((err) => { console.error(err); return null })
    const bookmarks = await BaseRequest({ url: '/api/v1/bookmarks', method: 'get', token: token })
      .then((res) => res.data)
      .catch((err) => { console.log(err); return [] })
    context.commit('bookmarks', { bookmarks: bookmarks })
    return bookmarks
  }
}

export async function Add (context, { payload }) {
  if (firebase.auth().currentUser) {
    const token = await firebase.auth().currentUser.getIdToken(false).catch((err) => { console.error(err); return null })
    console.log(payload)
    await BaseRequest({ url: '/api/v1/bookmarks', method: 'post', payload: payload, token: token })
      .then((res) => res.data)
      .catch((err) => { console.log(err); throw new Error(err) })
  }
}

export async function Delete (context, { payload }) {
  if (firebase.auth().currentUser) {
    const token = await firebase.auth().currentUser.getIdToken(false).catch((err) => { console.error(err); return null })
    console.log(payload)
    await BaseRequest({ url: '/api/v1/bookmarks/delete', method: 'post', payload: payload, token: token })
      .then((res) => res.data)
      .catch((err) => { console.log(err); throw new Error(err) })
  }
}
