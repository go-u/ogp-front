import { BaseRequest } from '../vuex_axios'
import firebase from 'firebase/app'
import 'firebase/auth'

export async function Get (context) {
  const ogps = await BaseRequest({ url: '/api/v1/ogps', method: 'get' })
    .then((res) => res.data)
    .catch((err) => { console.log(err); return [] })
  context.commit('ogps', { ogps: ogps })
  return ogps
}

export async function Preview (context, { payload }) {
  const ogpInfo = await BaseRequest({ url: '/api/v1/ogps/preview', method: 'post', payload: payload })
    .then((res) => res.data)
    .catch((err) => { console.log(err.response); throw new Error(err.response.data.error) })
  context.commit('preview', { preview: ogpInfo })
  return ogpInfo
}

export async function Add (context, { payload }) {
  if (firebase.auth().currentUser) {
    const token = await firebase.auth().currentUser.getIdToken(false).catch((err) => { console.error(err); return null })
    await BaseRequest({ url: '/api/v1/ogps', method: 'post', payload: payload, token: token })
  }
}

export async function Delete (context, { payload }) {
  if (firebase.auth().currentUser) {
    const token = await firebase.auth().currentUser.getIdToken(false).catch((err) => { console.error(err); return null })
    await BaseRequest({ url: '/api/v1/ogps/delete', method: 'post', payload: payload, token: token })
  }
}
