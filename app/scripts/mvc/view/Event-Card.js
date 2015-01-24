'use strict';

define([
	'Backbone',
	'jquery',
	'Handlebars',
	'text!tmplEventCard'
	], function(Backbone, $, Handlebars, tmplEventCard){
	
	//Constructor for event card view
	var EventCard = Backbone.View.extend({
		
		tagName: 'li',

		className: 'card card-event clearfix',

		eventCardTemplate: Handlebars.compile(tmplEventCard),

		attributes: {
			'data-event-card' : ''
		},
		
		initialize: function(options){
			this.model = options.model;
		},
		
		//+++++++++++++++++++++++++++++++++++++++++
		//+ Render
		//+++++++++++++++++++++++++++++++++++++++++
		//Render event card view, with escaped model values for security
		//Return it so the rendered view can be used by the method that called it
		render: function(){
			this.$el.html(this.eventCardTemplate({
				startDate: this.model.escape('startDate'),
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