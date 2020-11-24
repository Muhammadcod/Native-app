import { AsyncStorage } from 'react-native'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'
import { NOTIFICATION_KEY } from './keys'

// setting notification
export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync,
  )
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync()

            const trigger = new Date()
            trigger.setDate(trigger.getDate() + 1)
            trigger.setHours(20)
            trigger.setMinutes(0)

            Notifications.scheduleNotificationAsync({
              content: {
                title: 'Study!',
                body: "👋 don't forget to study today!",
                ios: {
                  sound: true,
                },
                android: {
                  sound: true,
                  priority: 'high',
                  sticky: false,
                  vibrate: true,
                },
              },
              trigger,
            })

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
          }
        })
      }
    })
}
