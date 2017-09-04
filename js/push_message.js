firebase.initializeApp({
	'messagingSenderId': '924764175560'
});

const messaging = firebase.messaging();

messaging.onMessage(function(payload) {
	var data = payload.notification;
	new PNotify({
		title: data.title,
		text: data.body,
		addclass: 'custom',
		desktop: {
			desktop: true
		}
	});
});
/********************************************************************************************/
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
			}  
		});  
	});  
}

function sendSubscriptionToServer(subscription){
	var key = 'AAAA11A9fMg:APA91bGdPQJfbOOvSrFEbZHDJCp134BfylSgMv6lWKfNC-J7Oa2AlEtpCzVyB16e1kA7f8I-MT5WQEmArURBryezKesGU7srF39sDxjG6JkAXQCVLuKd_N_44mCU5PnKuMQuuD0OnzVK';
	var topic = 'eloplay_ico';
	var storage = localStorage;
	var storage_data = JSON.parse(storage.getItem('push_notify'));
	if((storage_data !== undefined && storage_data != null) && (storage_data.token !== undefined && storage_data.token != null)){
		return true;
	}
	var subscription_data = subscription.toJSON();
	if(typeof subscription_data.expirationTime !== "undefined"){
		delete subscription_data.expirationTime;
	}
	fetch('https://iid.googleapis.com/v1/web/iid', {
		'method': 'POST',
		'headers': {
			'Authorization': 'key=' + key,
			'Content-Type': 'application/json'
		},
		'body': JSON.stringify(subscription_data)
	}).then(function(response) {
		return response.json().then(function(data) {
			if(typeof data.token !== "undefined"){
				fetch('https://iid.googleapis.com/iid/v1/' + data.token + '/rel/topics/' + topic, {
					'method': 'POST',
					'headers': {
						'Authorization': 'key=' + key,
						'Content-Type': 'application/json'
					}
				});
				storage.setItem('push_notify', JSON.stringify({token: data.token}));
			}
		});
	}).catch(function(error) {
		  console.error(error);
	});
	return true;
}
