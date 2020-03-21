import { BaseRequest } from '../api'
import firebase from 'firebase/app'
import 'firebase/auth'

export async function GetBookmarks (context) { // routeはthis.$route
  if (firebase.auth().currentUser) {
    const token = await firebase.auth().currentUser.getIdToken(false).catch((err) => { console.error(err); return null })
    const bookmarks = await BaseRequest({ url: '/api/bookmarks', method: 'get', token: token })
      .then(res => res.data)
      .catch(err => { console.error(err) })
    context.commit('bookmarks', { bookmarks: bookmarks })
    return bookmarks
  }
}

export async function Add (context, { payload }) {
  if (firebase.auth().currentUser) {
    const token = await firebase.auth().currentUser.getIdToken(false).catch((err) => { console.error(err); return null })
    console.log(payload)
    await BaseRequest({ url: '/api/bookmarks', method: 'post', payload: payload, token: token })
      .then(res => res.data)
      .catch(err => { console.error(err) })
  }
}

export async function Delete (context, { payload }) {
  if (firebase.auth().currentUser) {
    const token = await firebase.auth().currentUser.getIdToken(false).catch((err) => { console.error(err); return null })
    console.log(payload)
    await BaseRequest({ url: '/api/bookmark/delete', method: 'post', payload: payload, token: token })
      .then(res => res.data)
      .catch(err => { console.error(err) })
  }
}
