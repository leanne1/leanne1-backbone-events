'use strict';

define([
	'jquery',
	'Evts',
	'EventForm', 
	'EventBoard'
	], function($, Evts, EventForm, EventBoard) {
	
	//Creating an exposable api object 
	//for easy-to-read declarative initialisation
	var api = {
		init: init
	}
	
	//This is the app bootstrap function; it initialises everything  
	//needed to start the app
	function init () {
		//Get the unique [charity] userId so we know 
		//which url to used for the server-side API
		var userId = $('[data-event-config="userId"]').val();
		
		//Initialise events collection
		function initCollection () {
			var evts = new Evts({
				userId: userId
			});

			initFormView(evts);
			initEventsBoard(evts);
		}

		//Initialise event form view
		function initFormView (evts) {
			var $el = $('[data-event="configure"]');
			new EventForm({
				el: $el,
				collection: evts
			});
		}

		//Initialise events board with persisted events
		function initEventsBoard (evts) {
			var $el = $('[data-events-board]');
			new EventBoard({
				el: $el,
				collection: evts
			});
		}

		//Start up everything
		initCollection();
	}

	return api;
});