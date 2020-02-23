import { Platform } from 'quasar'
import { Plugins } from '@capacitor/core'
const { PushNotifications, StatusBar } = Plugins

export function ChangeStatusBar (context, { color }) { // routeはthis.$route
  const isApp = Platform.is.capacitor
  if (isApp) {
    console.log('change status bar')
    StatusBar.setStyle({ style: 'DARK' })
    StatusBar.setBackgroundColor({ color: color })
  }
}

export function InitializePushNotification (context) { // routeはthis.$route
  const isApp = Platform.is.capacitor
  if (isApp) {
    console.log('Initializing Push Notification')

    // Register with Apple / Google to receive push via APNS/FCM
    PushNotifications.register()

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token) => {
        context.commit('pushToken', { pushToken: token.value })
        // alert('Push registration success, token: ' + token.value)
        // console.log('Push registration success, token: ' + token.value)
      }
    )

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error) => {
        // alert('Error on registration: ' + JSON.stringify(error))
        console.log('Error on registration: ' + JSON.stringify(error))
      }
    )

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification) => {
        // alert('Push received: ' + JSON.stringify(notification))
        console.log('Push received: ' + JSON.stringify(notification))
      }
    )

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification) => {
        // alert('Push action performed: ' + JSON.stringify(notification))
        console.log('Push action performed: ' + JSON.stringify(notification))
      }
    )
  }
}
