importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

firebase.initializeApp({
	'messagingSenderId': '924764175560'
});

const messaging = firebase.messaging();

messaging.onMessage(function(payload) {
  console.log("Message received. ");
  console.log(payload);
});

messaging.setBackgroundMessageHandler(function(payload) {
	console.log('background message ', payload);
	console.log(payload);
	// Customize notification here
	const notificationTitle = 'Background Message Title';
	const notificationOptions = {
		body: 'Background Message body.',
		icon: '/firebase-logo.png'
	};

	return self.registration.showNotification(notificationTitle,
		notificationOptions);
});



