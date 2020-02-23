export function authState (state, payload) {
  state.authState = payload.authState
}

export function hasLoginFirebase (state, payload) {
  state.hasLoginFirebase = payload.hasLoginFirebase
}

export function user (state, payload) {
  if (payload.user === null) {
    return
  }
  state.user.id = payload.user.id
  state.user.username = payload.user.username
  state.user.displayname = payload.user.displayname
  state.user.avatar = payload.user.avatar
}

export function oauthUser (state, payload) {
  if (payload.oauthUser === null) {
    return
  }
  state.oauthUser.displayname = payload.oauthUser.displayName
  state.oauthUser.avatar = payload.oauthUser.photoURL.replace('_normal', '') // refine twitter image
}
