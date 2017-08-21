
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

firebase.initializeApp({
	'messagingSenderId': '924764175560'
});

const messaging = firebase.messaging();
/*
messaging.onMessage(function(payload) {
  console.log("Message received. ");
  console.log(payload);
});
*/
messaging.setBackgroundMessageHandler(function(payload) {
	// Customize notification here
	const notificationTitle = 'Background Message Title';
	const notificationOptions = {
		body: 'Background Message body.',
		icon: '/firebase-logo.png'
	};

	return self.registration.showNotification(notificationTitle,
		notificationOptions);
});


		/*
self.addEventListener('push', function(event) {

	event.waitUntil(
		fetch('https://pubsub.googleapis.com/v1/projects//subscriptions/mysubscription:pull').then(function(response) {
			console.log(response);
		});
		self.registration.showNotification(title, {
			body: body,
			icon: icon,
			tag: tag,
			data: data
		})
	);

	var notification = event.data.json();

	var title = notification.title;
	var body = notification.body;
	var icon = 'img/logo-eloplay.svg';
	var tag = notification.tag;
	var data = notification.data;

	event.waitUntil(
		self.registration.showNotification(title, {
			body: body,
			icon: icon,
			tag: tag,
			data: data
		})
	);
});

self.addEventListener('notificationclick', function(event) {
//	console.log('On notification click: ', event);
	if (Notification.prototype.hasOwnProperty('data')) {
//		console.log('Using Data');
		var url = event.notification.data.url;
		if(url != undefined && url != ''){
			event.waitUntil(clients.openWindow(url));
		}
	} else {
		console.log('url not provided');
	}
});

		*/
