define([
	'underscore', 
	'Backbone', 
	'jquery',
	'EventCard'], function(_, Backbone, $, EventCard){
	
	var EventForm = Backbone.View.extend({
		
		events: {
			'click [data-event-config="submit"]' : 'createEvent'
		},

		initialize: function(){
			this.$controls = $('[data-event-property]');
		},

		createEvent: function(e){
			e.preventDefault();
			var self = this, eventData = {}, isValid, isClean = [], canSubmit;
			this.$controls.each(function( i, control ){
				$control = $(control);
				if ($control.attr('required')) {
					isValid = self.validate($control);
					if (isValid) {
						eventData[$control.data('event-propety')] = $control.val();
					} 
					isClean.push(isValid);
				} else {
					eventData[$control.data('event-propety')] = $control.val();
				};
			});
			
			canSubmit = _.every(isClean, function(control){
				return (control === true);
			});
			canSubmit && this.createEventCard(eventData);
		},

		validate: function ($control) {
			var isValid = $control.val() !== '';
			if (!isValid) {
				this.showErrorMEssage($control);	
			} 
			return isValid;
		},

		showErrorMEssage: function($control){
			var msg = $control.data('error'),
				msgContainer = $('<span class="error-message" data-error-message />');
				msgContainer.text(msg).insertAfter($control);
		},

		createEventCard: function(eventData){
			$('[data-error-message]').remove();
			var newEventCard = new EventCard({
				model: eventData
			});
			$('[data-events-board]').append(newEventCard.render().$el);
		}	
	});
	
	return EventForm;
});