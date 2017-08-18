var isPushEnabled = false;
var useNotifications = false;

window.addEventListener('load', function() {  
	// Check that service workers are supported, if so, progressively  
	// enhance and add push messaging support, otherwise continue without it.
	if ('serviceWorker' in navigator) {  
		navigator.serviceWorker.register('/service-worker.js')  
			.then(function(serviceWorkerRegistration) {
				if(serviceWorkerRegistration.installing) {
					console.log('Service worker installing');
				} else if(serviceWorkerRegistration.waiting) {
					console.log('Service worker installed');
				} else if(serviceWorkerRegistration.active) {
					console.log('Service worker active');
				}
				initialiseState(serviceWorkerRegistration);
			});  
	} else {  
		console.warn('Service workers aren\'t supported in this browser.');  
	}  
});

// Once the service worker is registered set the initial state  
function initialiseState(serviceWorkerRegistration) {  
	// Are Notifications supported in the service worker?  
	if (!(serviceWorkerRegistration.showNotification)) {  
		console.log('Notifications aren\'t supported on service workers.');  
		useNotifications = false;  
	} else {
		useNotifications = true; 
	}

	// Check the current Notification permission.  
	// If its denied, it's a permanent block until the  
	// user changes the permission  
	if (Notification.permission === 'denied') {  
		console.log('The user has blocked notifications.');  
		return;  
	}

	// Check if push messaging is supported  
	if (!('PushManager' in window)) {  
		console.log('Push messaging isn\'t supported.');  
		return;  
	}
	// We need the service worker registration to check for a subscription  
	navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {  
		// Do we already have a push message subscription?  
		serviceWorkerRegistration.pushManager.getSubscription()  
			.then(function(subscription) {  
				// Enable any UI which subscribes / unsubscribes from  
				// push messages.  
				if (!subscription) { 
					// We aren't subscribed to push, so set UI  
					// to allow the user to enable push  
					subscribe();
					return;  
				}

				// Keep your server in sync with the latest subscriptionId
				sendSubscriptionToServer(subscription);
			})  
		.catch(function(err) {  
			console.warn('Error during getSubscription()', err);  
		});  
	});
}
function subscribe() {  
	navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {  
		serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly: true})  
			.then(function(subscription) {  
				// The subscription was successful  
				isPushEnabled = true;  
				return sendSubscriptionToServer(subscription);  
			})  
		.catch(function(e) {  
			if (Notification.permission === 'denied') {  
				// The user denied the notification permission which  
				// means we failed to subscribe and the user will need  
				// to manually change the notification permission to  
				// subscribe to push messages  
				console.warn('Permission for Notifications was denied');  
			} else {  
				// A problem occurred with the subscription; common reasons  
				// include network errors, and lacking gcm_sender_id and/or  
				// gcm_user_visible_only in the manifest.  
				console.error('Unable to subscribe to push.', e);  
				pushButton.textContent = 'Enable Push Messages';  
			}  
		});  
	});  
}

function sendSubscriptionToServer(subscription){
	var storage = localStorage;
	var storage_data = JSON.parse(storage.getItem('push_notify')),
		now = new Date().getTime().toString();
	if((storage_data !== undefined && storage_data != null) && (storage_data.last_update !== undefined && storage_data.last_update != null) && (storage_data.last_update + 86400000) > now){
		return true;
	}
	fetch('https://iid.googleapis.com/v1/web/iid', {
		'method': 'POST',
		'headers': {
			'Authorization': 'key=AIzaSyAp7sG5Dkx2UMlG6awI41NtAw7oClQF4gY',
			'Content-Type': 'application/json'
		},
		'body': subscription.toJSON()
	}).then(function(response) {
		  console.log(response);
	}).catch(function(error) {
		  console.error(error);
	});
	/*
	$.ajax({
		method: "POST",
		url: 'https://iid.googleapis.com/v1/web/iid',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'key=AIzaSyAp7sG5Dkx2UMlG6awI41NtAw7oClQF4gY'
		},
		data: [subscription.toJSON()]
	}).done(function( response ) {
		console.log(response);
	});
	*/
	storage.setItem('push_notify', JSON.stringify({last_update: new Date().getTime()}));
	return true;
}
