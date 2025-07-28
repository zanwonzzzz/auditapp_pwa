importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js')

var firebaseConfig = {
    apiKey: "AIzaSyDSY7WtYkTK2ZMvYAnFM4n3FvgnlK9Boz8",
    authDomain: "auditapp-f1f2b.firebaseapp.com",
    projectId: "auditapp-f1f2b",
    storageBucket: "auditapp-f1f2b.firebasestorage.app",
    messagingSenderId: "780386068052",
    appId: "1:780386068052:web:c727a0cd98fa840f34efc1",
    measurementId: "G-B2CRM2N8L3"
}

const app = firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()

messaging.onBackgroundMessage(function(payload) {
    console.log('Mensaje recibido en segundo plano:', payload)
    
    const notificationTitle = payload.notification.title || 'Nueva notificación'
    const notificationOptions = {
        body: payload.notification.body || 'Tienes una nueva notificación',
        icon: '/auditap.png',
        badge: '/auditap.png',
        data: payload.data
    }

    return self.registration.showNotification(notificationTitle, notificationOptions)
})