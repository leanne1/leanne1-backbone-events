define(['underscore', 'Backbone'], function(_, Backbone){
	var Event = Backbone.Model.extend({
		// TODO: do we need a defaults?
		//All the values we need should be given in the form...?
		//or for handling optional values?
		defaults: {
			startLocation: undefined,
			open: undefined,
			description: undefined
		},

		idAttribute: '_id',
		
		initialize: function(){
			//Add human-readable date strings to model for use in view
			this.extendModel();
		},
		
		//+++++++++++++++++++++++++++++++++++++++++
		//+ Extend model
		//+++++++++++++++++++++++++++++++++++++++++
		extendModel: function() {
			this.prettyStartDate = this.getPrettyDate(this.get('startDate'));
			this.prettyStartMonth = this.getPrettyMonth(this.get('startDate'));
			this.prettyStartYear = this.getPrettyYear(this.get('startDate'));

		},

		//+++++++++++++++++++++++++++++++++++++++++
		//+ Extend model - pretty date strings
		//+++++++++++++++++++++++++++++++++++++++++
		// From the provided start date, find the date, month and year
		// and return them as human-readable strings to be added to the model
		getPrettyDate: function(date){
			return date.getDate();
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
			return months[date.getMonth()];
		},

		getPrettyYear: function(date){
			return date.getFullYear();
		}
		
	});
	
	return Event;
});