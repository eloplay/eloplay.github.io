//var CLIENT_ID = '360396386092-brlch566ifd681ncmkuboqnf05itfchv.apps.googleusercontent.com'; // my test client_id
var CLIENT_ID = '82833938-o9dgbcu490eafj0h3voq694ubr4hipl5.apps.googleusercontent.com';

var SCOPES = "https://www.googleapis.com/auth/calendar";
var authorizeButton = document.getElementById('watch-update-btn');
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
	gapi.load('client:auth2', initClient);
}
/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
	gapi.client.init({
		discoveryDocs: DISCOVERY_DOCS,
		clientId: CLIENT_ID,
		scope: SCOPES
	}).then(function () {
		// Listen for sign-in state changes.
		gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
		// Handle the initial sign-in state.
		updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
		authorizeButton.onclick = handleAuthClick;
	}, function(error) {
		  console.log(error);
	});
}
/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
	if (isSignedIn) {
		CreateNewEvent();
	}
}
/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
	gapi.auth2.getAuthInstance().signIn();
}
function CreateNewEvent() {
	var event = {
		'summary': 'Eloplay ICO',
		'description': 'Eloplay ICO',
		'start': {
			'dateTime': '2017-08-21T12:00:00',
			'timeZone': 'UTC'
		},
		'end': {
			'dateTime': '2017-09-04T12:00:00',
			'timeZone': 'UTC'
		},
		'recurrence': [
			'RRULE:FREQ=WEEKLY;COUNT=1'
		],
		'reminders': {
			'useDefault': false,
			'overrides': [
				{'method': 'email', 'minutes': 24 * 60},
				{'method': 'popup', 'minutes': 10}
			]
		}
	};
	var event_exists = false;
	gapi.client.calendar.events.list({
		'calendarId': 'primary',
		'timeMin': (new Date()).toISOString(),
		'showDeleted': false,
		'singleEvents': true,
		'maxResults': 10,
		'orderBy': 'startTime'
	}).then(function(response) {
		var events = response.result.items;
		if (events.length > 0) {
			for (i = 0; i < events.length; i++) {
				var calendar_event = events[i];
				if(calendar_event.summary == event.summary){
					event_exists = true;
					break;
				}
			}
		}
		if(event_exists === true){
			return false;
		}

		var request = gapi.client.calendar.events.insert({
			'calendarId': 'primary',
			'resource': event
		});
		request.execute(function(event) {
			console.log('Event created: ' + event.htmlLink);
		});
	});
}


