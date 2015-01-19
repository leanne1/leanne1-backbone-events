define(['underscore', 'Backbone', 'jquery', 'Handlebars'], function(_, Backbone, $, Handlebars){
	var EventCard = Backbone.View.extend({
		
		tagName: 'li',

		className: 'card card-event',

		eventCardTemplate: Handlebars.compile($('#eventcard-template').html()),

		events: {
			'' : ''
		},
		
		initialize: function(){
			console.log('this.model in Event Card initialize', this.model);
			//+++++++++++++++++++++++++++++++++++++++++
			//+ API event listeners
			//+++++++++++++++++++++++++++++++++++++++++
			
			//this.listenTo(this.model, 'change:status', this.showNotification);

		},
		
		//+++++++++++++++++++++++++++++++++++++++++
		//+ Render
		//+++++++++++++++++++++++++++++++++++++++++

		render: function(){
			this.$el.html(this.eventCardTemplate({
				prettyStartMonth: this.model.escape('prettyStartMonth'),
				prettyStartDate: this.model.escape('prettyStartDate'),
				prettyStartYear: this.model.escape('prettyStartYear'),
				eventId: this.model.escape('eventId'),
				eventName: this.model.escape('eventName')
			}));	
			
			return this;
		}
	});

	return EventCard;
});