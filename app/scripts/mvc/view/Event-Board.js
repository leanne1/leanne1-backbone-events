'use strict';

define([
	'underscore', 
	'Backbone', 
	'jquery',
	'EventCard'
	], function(_, Backbone, $, EventCard){
	
	var EventBoard = Backbone.View.extend({
		
		initialize: function(options){
			this.collection = options.collection;
			//Get all persisted events
			this.collection.fetch({ reset: true });
			this.maxToShow = 5;

			//+++++++++++++++++++++++++++++++++++++++++
			//+ API event listeners
			//+++++++++++++++++++++++++++++++++++++++++
			this.listenTo(this.collection, 'reset', this.createEventCards);
		},
		
		createEventCards: function(){
			var $cardsContainer = $('[data-event="show"]'), 
				$notice
				;
			//If collection is empty [no saved events], show notification message	
			if (!this.collection.length) {
				$notice = $('<li />')
							.text('You have no events yet. When events are added they will show up here.')
							.appendTo($cardsContainer);
			} else {
				//Sort persisted events by start date, with soonest first, 
				//then extract the top *n* we want to display
				var showEvents = this.collection.sortByStartDate().slice(0, this.maxToShow);
				
				//If collection has events loop over each event and create a new event card
				_.each(showEvents, function(model){
					var $eventCard = new EventCard({ model: model }).render().$el;
						$eventCard.appendTo($cardsContainer);
				});
			}
		}
	});

	return EventBoard;
});