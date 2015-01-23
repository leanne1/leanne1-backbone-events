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
			'click [data-event-config="submit"]' : 'createEvent',
			'click [data-event-config="addEnd"]' : 'toggleEndDateControl',
			'blur [data-event-config="startDate"]' : 'populateEndDate',
			'keyup [data-button="open-info"]' : 'showOpenInfoPopup',
			'mouseover [data-button="open-info"]' : 'showOpenInfoPopup',
			'click [data-button="open-info"]' : 'showOpenInfoPopup'
		},

		initialize: function(options){
			this.collection = options.collection;
			
			//Cache DOM elements
			this.$controls = $('[data-event-property]');
			this.$startDateControl = $('[data-event-config="startDate"]');
			this.$endDateControl = $('[data-event-config="endDate"]');
			this.$endDateToggle = $('[data-event-config="addEnd"]');
			this.$openInfoPopup = $('[data-popup="open-info"]');
			this.popupIsVisible = false;
		},

		createEvent: function(e){
			e.preventDefault();
			var self = this, eventData = {}, isValid, isClean = [], canSubmit;
			
			//Remove existing error messages
			$('[data-error-message]').remove();
			this.$controls.removeAttr('aria-invalid');

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
				return today <= startDate;
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
			$control.attr('aria-invalid', 'true');
		},

		toggleEndDateControl: function(){
			var isChecked = this.$endDateToggle.is(':checked');
			
			//[Dis]able the end date field when add end date toggle is [un]checked
			this.$endDateControl.attr('disabled', !isChecked);
			this.$endDateControl.attr('aria-disabled', !isChecked)
			
			//When the toggler is unchecked, if start date has a value, 
			//duplicate it into end date field
			if (!isChecked && this.validateNotEmpty(this.$startDateControl)) {
				this.$endDateControl.val(this.$startDateControl.val());
			}
		},
		//When the start date control is blurred, if the toggler is unchecked,
		//duplicate the start date into end date field
		populateEndDate: function(){
			if (!this.$endDateToggle.is(':checked')) {
				this.$endDateControl.val(this.$startDateControl.val());	
			}
		},

		createEventCard: function(eventData){
			//TODO: plug in jquery date picker
			
			//Create new model and make a POST request to server and add to local collection
			var newEvent = this.collection.create(eventData);
			//Create a new event card view and prepend to events board
			var newEventCard = new EventCard({
				model: newEvent
			});
			$('[data-event="show"]').prepend(newEventCard.render().$el);
		},

		//If the 'open info' popup is not already showing,
		//show the popup and start a timer to remove it after 2 seconds
		showOpenInfoPopup: function(e){
			e.preventDefault();
			var self = this;
			if (!this.popupIsVisible) {
				this.$openInfoPopup
					.addClass('js-visible')
					.removeClass('js-hidden');
				this.popupIsVisible = true;	

				setTimeout(function(){
					self.$openInfoPopup
						.addClass('js-hidden')
						.removeClass('js-visible');
					self.popupIsVisible = false;	
				}, 400000);	
			}
		}		
	});
	
	return EventForm;
});