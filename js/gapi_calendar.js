var CLIENT_ID = '360396386092-brlch566ifd681ncmkuboqnf05itfchv.apps.googleusercontent.com'; // my test client_id
//var CLIENT_ID = '82833938-o9dgbcu490eafj0h3voq694ubr4hipl5.apps.googleusercontent.com';

var SCOPES = "https://www.googleapis.com/auth/calendar";
var authorizeButton = document.getElementById('subscribeBtn');
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
	var check_calendar = $('#calendar_event').prop( "checked" );
	if(check_calendar == true){
		gapi.auth2.getAuthInstance().signIn();
	}else{
		var is_modal = $('#subscriptionModal').is(':visible');
		if(is_modal == true){
			$( "#subscribeNews" ).submit();
		}
	}
}
function CreateNewEvent() {
	var storage = localStorage;
	var storage_data = JSON.parse(storage.getItem('calendar_event'));
	if((storage_data !== undefined && storage_data != null) && (storage_data.id !== undefined && storage_data.id != null)){
		var event_request = gapi.client.calendar.events.get({
			'calendarId': 'primary',
			'eventId': storage_data.id
		});
		event_request.execute(function(resp) {
			if(resp.htmlLink !== undefined){
				return true;
			}else{
				sendEvent();
			}
		});
	}else{
		sendEvent();
	}
	return true;
}

function sendEvent(){
	var event = {
		'summary': 'Eloplay ICO',
		'description': 'Eloplay ICO',
		'start': {
			'dateTime': '2017-10-09T12:00:00',
			'timeZone': 'UTC'
		},
		'end': {
			'dateTime': '2017-11-08T12:00:00',
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
	var request = gapi.client.calendar.events.insert({
		'calendarId': 'primary',
		'resource': event
	});
	request.execute(function(event) {
		storage.setItem('calendar_event', JSON.stringify({id: event.id}));
		var is_modal = $('#subscriptionModal').is(':visible');
		if(is_modal == true){
			$( "#subscribeNews" ).submit();
		}
	});
}
