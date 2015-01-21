define([
	'underscore', 
	'Backbone', 
	'jquery',
	'EventCard'
	], function(_, Backbone, $, EventCard){
	
	var EventBoard = Backbone.View.extend({
		
		events: {
			'' : ''
		},
		
		initialize: function(options){
			this.collection = options.collection;
			this.collection.fetch({ reset: true });
			
			//+++++++++++++++++++++++++++++++++++++++++
			//+ API event listeners
			//+++++++++++++++++++++++++++++++++++++++++
			
			this.listenTo(this.collection, 'reset', this.createEventCards);
		},
		
		createEventCards: function(){
			var $cardsContainer = $('[data-event="show"]'), 
				$notice
				;
			if (!this.collection.length) {
				$notice = $('<li />')
							.text('You have no events yet. When events are added they will show up here.')
							.appendTo($cardsContainer);
			} else {
				_.each(this.collection.models, function(model){
					var $eventCard = new EventCard({ model: model }).render().$el;
						$eventCard.appendTo($cardsContainer);
				});
			}
		}
	});

	return EventBoard;
});