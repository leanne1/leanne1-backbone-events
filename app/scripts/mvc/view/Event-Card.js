'use strict';

define([
	'underscore',
	'Backbone',
	'jquery',
	'Handlebars',
	'text!tmplEventCard'
	], function(_, Backbone, $, Handlebars, tmplEventCard){
	
	var EventCard = Backbone.View.extend({
		
		tagName: 'li',

		className: 'card card-event',

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