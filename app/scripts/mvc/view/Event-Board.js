'use strict';

define([
	'underscore', 
	'Backbone', 
	'jquery',
	'EventCard'
	], function(_, Backbone, $, EventCard){
	
	//Constructor for the events board view
	var EventBoard = Backbone.View.extend({
		
		initialize: function(options){
			this.collection = options.collection;
			
			//Get all persisted events
			//Note this is not the best practise way to fetch a persisted collection
			//ideally this is done server side on page load
			//not with an additional GET request as is happening here
			this.collection.fetch({ reset: true });
			
			//Show only a specified count of cards on the events board
			this.maxEventsToShow = 4;

			//+++++++++++++++++++++++++++++++++++++++++
			//+ API event listeners
			//+++++++++++++++++++++++++++++++++++++++++
			//Callback for initial collection fetch
			this.listenTo(this.collection, 'reset', this.createEventCards);
			this.listenTo(this.collection, 'add', this.removeLastEventCard);
		},
		
		//Create an event card view for each model in the collection we want to show
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
				//Sort persisted events by created date, with most recently created first, 
				//then extract the most recent *n* for display
				var showEvents = this.collection.sortByCreatedDate().reverse().slice(0, this.maxEventsToShow),
					fragment = document.createDocumentFragment();
				//If collection has events, loop over each event and create a new event card
				//then append all event cards to the event board
				_.each(showEvents, function(model){
					var $eventCard = new EventCard({ model: model }).render().$el;
					$eventCard.appendTo(fragment);
				});
				$cardsContainer.append(fragment);
			}
		},

		//Remove the last card when we add a new one to the board
		//so to keep to our visible card limit
		removeLastEventCard: function(){
			console.log('removeLastEventCard called')
			$('[data-event-card]').last().remove();
		}
	});

	return EventBoard;
});