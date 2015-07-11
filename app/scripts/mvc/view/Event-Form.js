'use strict';

define([
	'underscore', 
	'Backbone', 
	'jquery',
	'EventCard', 
	'datepicker'
	], function(_, Backbone, $, EventCard, datepicker){

	//Constructor for event form view
	var EventForm = Backbone.View.extend({
		
		//Bind handlers to events on objects in the view
		events: {
			'click [data-event-config="submit"]' : 'createEvent',
			'click [data-event-config="addEnd"]' : 'toggleEndDateControl',
			'change [data-event-config="startDate"]' : 'populateEndDate',
			'keyup [data-button="open-info"]' : 'showOpenInfoPopup',
			'mouseover [data-button="open-info"]' : 'showOpenInfoPopup',
			'click [data-button="open-info"]' : 'showOpenInfoPopup'
		},

		initialize: function(options){
			this.collection = options.collection;
			
			//Initialize datepicker plugin
			//Uses American date format currently [month, date, year] as a UK format 
			//requires further processing to convert the string value to something a date object
			//can accept and i ran out of time to do this
			$('[data-datepicker]').datepicker();
			
			//Cache DOM elements
			this.$controls = $('[data-event-property]');
			this.$startDateControl = $('[data-event-config="startDate"]');
			this.$endDateControl = $('[data-event-config="endDate"]');
			this.$endDateToggle = $('[data-event-config="addEnd"]');
			this.$openInfoPopup = $('[data-popup="open-info"]');
			this.popupIsVisible = false;
		},
		//Create a new event model based on the values added by the user in the form
		//when the user clicks the submit input, preventing the default action
		//Run some validation against various form controls
		createEvent: function(e){
			e.preventDefault();
			var self = this, eventData = {}, isValid, isClean = [], canSubmit;
			
			//Remove any existing error messages
			$('[data-error-message]').remove();
			this.$controls.removeAttr('aria-invalid');

			//Loop over each control in the form field and get its property name
			//which is then used to augment the event model object
			this.$controls.each(function( i, control ){
				var $control = $(control), 
					property = $control.data('event-property'),
					required = $control.attr('required')
					;
				
				//Check if the input has a required flag, 
				//if so run validation against its value
				//if it passes note this in the isClesn check array and add the value 
				//to the event model object
				//If its not required we need to sanitize the open event radio value to a boolean
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
			//After running all necesary validation, check that all values pass [are 'clean']
			//then pass the newly populated objct to create a new event card view
			canSubmit = _.every(isClean, function(control){
				return (control === true);
			});
			canSubmit && this.createEventCard(eventData);
		},
		//Sanitize 'is event open' value to boolean
		setIsOpenValue: function ($control) {
			return $control.is(':checked');
		},

		//Basic validation method
		//Currently suports checking for empty fields, and invalid start and end dates
		//Trigger error messages for invalid fields. Could be refactored to return an 
		//array of failing inputs with error messages triggered elsewhere
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
		//Check input is not empty
		validateNotEmpty: function($control) {
			return $control.val() !== '';
		},
		//Check start date is today or in future -
		//assumption made here that start dates cannot be retrospectively added
		validateStartDate: function ($control) {
			if ($control.data('event-property') === 'startDate') {
				var startDate = new Date ($('[data-event-property="startDate"]').val()).getTime();	
				var today = new Date().setUTCHours(0,0,0,0);
				
				return today <= startDate;
			}
			return true;
		},
		//Check end date is on / after start date
		validateEndDate: function ($control) {
			if ($control.data('event-property') === 'endDate') {
				var startDate = new Date ($('[data-event-property="startDate"]').val()).getTime();
				var endDate = new Date ($control.val()).getTime();	
				return endDate >= startDate;
			}
			return true;
		},
		//Handle the display of relevant error message
		showErrorMEssage: function($control, error){
			var msg = $control.data('error-' + error),
				msgContainer = $('<span class="error-message" data-error-message />');
			msgContainer.text(msg).insertAfter($control);
			$control.attr('aria-invalid', 'true');
		},
		//Toggle the end date control based on whether the user has selected
		//to add different start / end dates
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
		//When the start date control is changed, if the end date toggler is unchecked,
		//duplicate the start date into end date field
		populateEndDate: function(){
			if (!this.$endDateToggle.is(':checked')) {
				// this.$endDateControl.removeAttr('disabled');
				this.$endDateControl.val(this.$startDateControl.val());	
				// this.$endDateControl.attr('disabled', 'disabled');
			}
		},
		//Initialise a new event card view based on the model passed in
		createEventCard: function(eventData){
			//TODO: plug in jquery date picker
			
			//Create new model and make a POST request to server and add to local collection
			var newEvent = this.collection.create(eventData);
			//Create a new event card view and prepend to events board
			var newEventCard = new EventCard({
				model: newEvent
			});
			//Render the view and prepend the returned object to the event board
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
				}, 2000);	
			}
		}		
	});
	
	return EventForm;
});