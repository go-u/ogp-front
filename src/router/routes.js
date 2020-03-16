
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'top', path: '', component: () => import('pages/Index.vue') },
      { name: 'detail', path: 'detail/:fqdn', component: () => import('pages/Detail.vue') },
      { name: 'bookmarks', path: 'bookmarks', component: () => import('pages/Bookmarks.vue') },
      // auth
      { name: 'auth', path: 'auth', component: () => import('pages/auth/Auth.vue') },
      { name: 'signup', path: 'signup', component: () => import('pages/auth/Login.vue') },
      { name: 'login', path: 'login', component: () => import('pages/auth/Login.vue') },
      { name: 'registration', path: 'registration', component: () => import('pages/auth/Registration.vue') },
      { name: 'email-verify', path: 'email-verify', component: () => import('pages/auth/VerifyEmail.vue') },
      { name: 'email-already-in-use', path: 'email-already-in-use', component: () => import('pages/auth/EmailAlreadyInUse.vue') },
      { name: 'reset-password', path: 'reset-password', component: () => import('pages/auth/ResetPassword.vue') },
      // edit // 簡易版のため省略
      // { name: 'menu', path: 'menu', component: () => import('pages/edit/Menu.vue') },
      // { name: 'edit-username', path: 'edit-username', component: () => import('pages/edit/EditName.vue') },
      // { name: 'edit-profile', path: 'edit-profile', component: () => import('pages/edit/EditProfile.vue') },
      // { name: 'edit-avatar', path: 'edit-avatar', component: () => import('pages/edit/EditProfileImage.vue') },
      // info
      { name: 'about', path: 'about', component: () => import('pages/Info.vue') },
      { name: 'tos', path: 'tos', component: () => import('pages/Info.vue') },
      { name: 'privacy-policy', path: 'privacy-policy', component: () => import('pages/Info.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
