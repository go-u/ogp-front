import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'

export default async ({ app, Vue }) => {
  Sentry.init({
    dsn: 'https://9dbbd27f3b0d44ef91e27a6fdcfc0ddc@sentry.io/2819758',
    integrations: [new Integrations.Vue({ Vue, attachProps: true, logErrors: true })]
  })
}
