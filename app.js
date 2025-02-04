// Controlla se le notifiche sono supportate
function isNotificationSupported() {
    return 'Notification' in window && 'serviceWorker' in navigator;
}

// Richiede il permesso per le notifiche
function requestPermission() {
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            console.log('Permesso per notifiche concesso!');
        } else {
            alert('Permesso per notifiche negato. Abilitalo nelle impostazioni.');
        }
    });
}

// Invia una notifica tramite il Service Worker
function sendNotification() {
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(registration => {
            registration.showNotification('Ciao!', {
                body: 'Questa è una notifica inviata tramite WebKit!',
                icon: 'icon-192x192.png',
                vibrate: [200, 100, 200],
                tag: 'pwa-webkit-notification'
            });
        });
    } else {
        alert('Non hai abilitato le notifiche.');
    }
}

// Evento per il bottone
document.getElementById('notifyButton').addEventListener('click', () => {
    if (Notification.permission === 'default') {
        requestPermission();
    } else {
        sendNotification();
    }
});

// Registra il Service Worker
if (isNotificationSupported()) {
    navigator.serviceWorker.register('/sw.js').then(() => {
        console.log('Service Worker registrato');
    }).catch(err => {
        console.error('Errore nella registrazione del Service Worker:', err);
    });
} else {
    alert('Le notifiche non sono supportate sul tuo dispositivo.');
}