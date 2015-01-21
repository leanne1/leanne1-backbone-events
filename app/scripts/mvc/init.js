var evts;
define([
	'jquery',
	'Evt',
	'Evts',
	'EventForm', 
	'EventCard', 
	'EventBoard'
	], function($, Evt, Evts, EventForm, EventCard, EventBoard) {
	
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
			evts = new Evts({
				userId: userId
			});
			
// 			evts.create({
// 	userId: '123456789',
// 	eventName: 'scuba-thon',
// 	startDate: new Date().getTime(),
// 	endDate: new Date().getTime(),
// 	startLocation: 'Egypt',
// 	open: true,
// 	description: 'lots of diving'
// });

// evts.create({
// 	userId: '123456789',
// 	eventName: 'marathon',
// 	startDate: new Date().getTime(),
// 	endDate: new Date().getTime(),
// 	startLocation: 'Surrey',
// 	open: true,
// 	description: 'run a long way!'
// });

			initFormView();
			initEventsBoard(evts);
		}

		//Initialise event form view
		function initFormView () {
			var $el = $('[data-event="configure"]');
			new EventForm({
				el: $el
			});
		}

		//Initialise events board with existing evens
		function initEventsBoard (evts) {
			var $el = $('[data-events-board]');
			new EventBoard({
				el: $el,
				collection: evts
			});
		}

		initCollection();
	}

	return api;
});