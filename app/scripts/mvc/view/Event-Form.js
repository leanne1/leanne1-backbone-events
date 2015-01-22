'use strict';

define([
	'underscore', 
	'Backbone', 
	'jquery',
	'Evts',
	'EventCard'
	], function(_, Backbone, $, Evts, EventCard){

	var EventForm = Backbone.View.extend({
		
		events: {
			'click [data-event-config="submit"]' : 'createEvent'
		},

		initialize: function(options){
			this.collection = options.collection;
			this.$controls = $('[data-event-property]');
		},

		createEvent: function(e){
			e.preventDefault();
			var self = this, eventData = {}, isValid, isClean = [], canSubmit;
			
			//Remove existing error messages
			$('[data-error-message]').remove();
			
			this.$controls.each(function( i, control ){
				var $control = $(control), 
					property = $control.data('event-property'),
					required = $control.attr('required')
					;
				
				if (required) {
					isValid = self.validate($control);
					if (isValid) {
						eventData[property] = $control.val();	
					} 
					isClean.push(isValid);
				} else {
					if (property === 'open') {
						eventData[property] = self.setIsOpenValue($control);
					}  else {
						eventData[property] = $control.val();	
					}
				};
			});
	
			canSubmit = _.every(isClean, function(control){
				return (control === true);
			});
			canSubmit && this.createEventCard(eventData);
		},

		setIsOpenValue: function ($control) {
			return $control.is(':checked');
		},

		validate: function ($control) {
			var isValid = true,
				empty = !this.validateNotEmpty($control),
				inValidStartDate = !this.validateStartDate($control),
				inValidEndDate = !this.validateEndDate($control)
			;
			if (empty) {
				this.showErrorMEssage($control, 'empty');	
				isValid = false;
			} else if (inValidStartDate) {
				this.showErrorMEssage($control, 'start-date');	
				isValid = false;
			} else if (inValidEndDate) {
				this.showErrorMEssage($control, 'end-date');	
				isValid = false;
			} 
			return isValid;
		},

		validateNotEmpty: function($control) {
			return $control.val() !== '';
		},

		validateStartDate: function ($control) {
			if ($control.data('event-property') === 'startDate') {
				var startDate = new Date ($('[data-event-property="startDate"]').val()).getTime();	
				var today = new Date().setUTCHours(0,0,0,0);
				return today < startDate;
			}
			return true;
		},

		validateEndDate: function ($control) {
			if ($control.data('event-property') === 'endDate') {
				var startDate = new Date ($('[data-event-property="startDate"]').val()).getTime();
				var endDate = new Date ($control.val()).getTime();	
				return endDate >= startDate;
			}
			return true;
		},

		showErrorMEssage: function($control, error){
			var msg = $control.data('error-' + error),
				msgContainer = $('<span class="error-message" data-error-message />');
			msgContainer.text(msg).insertAfter($control);
		},

		createEventCard: function(eventData){
			
			//TODO: plug in jquery date picker and process dates sent from form as necessary
			//for to UNIX time stamp
			console.log('createEvent called');
			console.log('eventData', eventData);
			
			//Create new model and make a POST request to server and add to local collection
			var newEvent = this.collection.create(eventData);
			//Create a new event card view and append to events board
			var newEventCard = new EventCard({
				model: newEvent
			});
			$('[data-events-board]').prepend(newEventCard.render().$el);
		}	
	});
	
	return EventForm;
});