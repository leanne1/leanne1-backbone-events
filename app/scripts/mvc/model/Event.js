define([
	'underscore', 
	'Backbone'
	], function(_, Backbone){
	var Evt = Backbone.Model.extend({
		
		idAttribute: '_id',

		initialize: function(){
			this.extendModel();
			
			//FOR DEV - delete all events in db
			//this.destroy();
		},
		
		//+++++++++++++++++++++++++++++++++++++++++
		//+ Extend model
		//+++++++++++++++++++++++++++++++++++++++++
		
		//Add human-readable date strings to model for use in view
		extendModel: function() {
			this.set('prettyStartDate', this.getPrettyDate(this.get('startDate')));
			this.set('prettyStartMonth', this.getPrettyMonth(this.get('startDate')));
			this.set('prettyStartYear', this.getPrettyYear(this.get('startDate')));
			this.set('eventId', this.get('userId') + '_' + this.cid);
		},

		//+++++++++++++++++++++++++++++++++++++++++
		//+ Extend model - pretty date strings
		//+++++++++++++++++++++++++++++++++++++++++
		// From the provided start date, find the date, month and year
		// and return them as human-readable strings to be added to the model
		getPrettyDate: function(date){
			return new Date(date).getDate();
		},

		getPrettyMonth: function(date){
			var months = [
				'Jan',
				'Feb',
				'Mar',
				'Apr',
				'May',
				'Jun',
				'Jul',
				'Aug',
				'Sep',
				'Oct',
				'Nov',
				'Dec'
			];
			return months[new Date(date).getMonth()];
		},

		getPrettyYear: function(date){
			return new Date(date).getFullYear();
		}
		
	});
	
	return Evt;
});