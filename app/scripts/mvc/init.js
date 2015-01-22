'use strict';

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

	//Creating an exposable api object 
	//for easy-to-read declarative initialisation
	var api = {
		init: init
	}
	
	//This is the app bootstrap function; it initialises everything we 
	//need to start the app
	function init () {
		//Get the unique [charity] userId so we know which url to for our server-side API
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

		//Initialise events board with persisted event
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