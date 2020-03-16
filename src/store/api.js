import axios from 'axios'
import 'firebase/auth'
import variables from '../../config/variables'

const isPrd = variables.domainsPrd.includes(document.domain)
const isStg = variables.domainsStg.includes(document.domain)

let baseSettings = {}
if (isPrd || isStg) {
  baseSettings = { baseURL: `https://api.${document.domain}/` }
} else {
  baseSettings = {} // default local
}

export const VuexAxios = axios.create(baseSettings)
VuexAxios.interceptors.request.use(request => {
  return request
})

VuexAxios.interceptors.response.use(response => {
  return response
})

export function BaseRequest ({ url, method, timeout, token, payload }) {
  return new Promise((resolve, reject) => {
    VuexAxios.defaults.headers.common.JWT = token
    VuexAxios.defaults.timeout = timeout ? 1000 * timeout : 1000 * 60
    let request = VuexAxios.get
    switch (method) {
      case 'post':
        request = VuexAxios.post
        break
      case 'patch':
        request = VuexAxios.patch
        break
      case 'delete':
        request = VuexAxios.delete
        break
      default:
        request = VuexAxios.get
        break
    }
    request(url, payload)
      .then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
  })
}
