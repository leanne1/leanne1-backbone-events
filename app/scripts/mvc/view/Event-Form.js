define([
	'underscore', 
	'Backbone', 
	'jquery'], function(_, Backbone, $){
	
	var EventForm = Backbone.View.extend({
		events: {
			'click [data-event-config="submit"]' : 'createEvent'
		},

		initialize: function(){
			this.$controls = $('[data-event-property]');

			//LISTEN FOR click on submit
			//loop over form and for each field:
			//	1. validate / show error message
			//	2. get data
			//use date to build up a new model
			// pass the new model to an event card view and initialise it
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

		showErrorMEssage: function(){
			console.log('form not valid message');
		},

		createEventCard: function(){
			console.log('All clear - ready to create new event card!');
		}	
	});
	
	return EventForm;
});