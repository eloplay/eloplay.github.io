importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

firebase.initializeApp({
	'messagingSenderId': '924764175560'
});

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
	// Customize notification here
	const notificationTitle = 'Eloplay';
	const notificationOptions = {
		body: 'Elo Tokens for eSports Smart Tournaments',
		icon: '/logo-eloplay.svg',
		tag: 'eloplay ico',
		url: 'https://ico.eloplay.com/'
	};
	return self.registration.showNotification(notificationTitle,
		notificationOptions);
});

self.addEventListener('notificationclick', function(event) {
	if (Notification.prototype.hasOwnProperty('data')) {
		var url = event.notification.data.url;
		if(url != undefined && url != ''){
			event.waitUntil(clients.openWindow(url));
		}
	} else {
		console.log('url not provided');
	}
});
