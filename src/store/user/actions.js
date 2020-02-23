import { BaseRequest } from '../vuex_axios'
import firebase from 'firebase/app'
import 'firebase/auth'

export async function UpdateUserInfo (context, { userDetail }) {
  if (firebase.auth().currentUser) {
    const token = await firebase.auth().currentUser.getIdToken(false).catch((err) => { console.error(err); return null })
    BaseRequest({ url: '/api/v1/users/self', token: token, payload: userDetail, method: 'patch' })
      .then((res) => res.data)
      .catch((err) => { console.log(err); throw new Error(err) })
  } else {
    console.error('no firebase user')
  }
}
