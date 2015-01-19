define([
	'jquery',
	'Event',
	'Events',
	'EventForm', 
	'EventCard'
	], function($, Event, Events, EventForm, EventCard) {
	
	//TODO: This is our eventBuilder module. This script should contain everything
	//we need to build the eventBuilder, including templates, CSS and JS
	//All the deps should be 'required' in here or the relevant sub module
	//so that ONLY if the eventBuilder is used on the page are these assets
	//ever called into the site

	//TODO: This will execute on page load via main.js
	//So we need to bootstrap the app:
	//Get all the collection and render them into the card view
	//the main form view has no BB in it [yet ... rollover?]


	//Creating an exposable api object 
	//for easy-to-read declarative initialisation
	var api = {
		init: init
	}
	
	//TODO: This function eventually bootstraps the whole app
	function init () {
		var userId = $('[data-event-config="userId"]').val();
		
		//Initialise events collection
		function initCollection () {
			var events = new Events([], {
				userId: userId
			});
			//FOR DEV
			events.create({
				eventName: 'Charity event',
        		startDate: new Date(),
        		endDate: new Date(),
        		startLocation: 'Egypt',
        		open: true,
        		description: 'Scuba dive for Charity!'
			});
			events.create({
				eventName: 'Fun run',
        		startDate: new Date(),
        		endDate: new Date(),
        		startLocation: 'London',
        		open: false,
        		description: 'Run a long way!'
			});

			events.fetch({ reset: true });
			console.log('events after create a fetch:', events);
			
			initFormView();
			initEventsBoard(events);
		}

		//Initialise event form view
		function initFormView () {
			var $el = $('[data-event="configure"]');
			new EventForm({
				el: $el
			});
		}

		//Initialise events board with existing evens
		function initEventsBoard (events) {
			var $cardsContainer = $('[data-event="show"]'), 
				eventList = events,
				eventsCount = eventList.length,
				$notice
				;
			
			if (!eventsCount) {
				$notice = $('<li />')
							.text('You have no events yet. When events are added they will show up here.')
							.appendTo($cardsContainer);
			}  else {
				eventList.forEach(function(model){
					var $eventCard = new EventCard({ model: model }).render().$el;
						$eventCard.appendTo($cardsContainer);
				});
			}
		}

		initCollection();
	}

	return api;
});