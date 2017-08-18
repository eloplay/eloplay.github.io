self.addEventListener('push', function(event) {
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
