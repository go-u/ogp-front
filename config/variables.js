export default {
  domainsDev: [''],
  domainsStg: ['booost.app'],
  domainsPrd: ['ogp-gal.com'],
  AUTH_STATE_ON_EMAIL_VERIFYING: 'AUTH_STATE_ON_EMAIL_VERIFYING',
  AUTH_STATE_ON_REGISTRATION: 'AUTH_STATE_ON_REGISTRATION',
  AUTH_STATE_LOGIN: 'AUTH_STATE_LOGIN',
  AUTH_STATE_LOGOUT: 'AUTH_STATE_LOGOUT',
  langMap: {
    en: 'English',
    ja: '日本語',
    es: 'Espanol',
    fr: 'français',
    pt: 'Português'
  },
  PAGING_SIZE: 21,
  GetDefaultMeta
}

export function GetDefaultMeta (lang) {
  const DEFAULT_META = {
    ja: {
      title: 'OGP GAL | OGP ギャラリー',
      description: 'Web開発者におすすめのOGPデザイン集。ログインして気に入ったOGP画像をストックしよう！',
      ogpUrl: `https://${document.domain}/statics/images/ogp/feature.png`
    },
    en: {
      title: 'OGP GAL | OGP Gallery',
      description: 'The OGP image gallery for web developer',
      ogpUrl: `https://${document.domain}/statics/images/ogp/feature.png`
    }
  }
  const unCapableLang = DEFAULT_META[lang] === undefined
  if (unCapableLang) {
    return DEFAULT_META.ja
  } else {
    return DEFAULT_META[lang]
  }
}
