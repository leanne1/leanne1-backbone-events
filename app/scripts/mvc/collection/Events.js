'use strict';

define([
	'underscore', 
	'Backbone',
	'Evt'
	], function(_, Backbone, Evt){
	var Evts = Backbone.Collection.extend({
		
		model: Evt, 

		initialize:function(options){
			//Set url to be events collection of the charity, based on a unique userId
			this.url = '/api/v1/userevents/' + options.userId + '/events';
			
			//Regularly poll remote server to check for new events added by another user
			this.pollRemote();
		},

		//++++++++++++++++++++++++++++++++++
		//+ Remote collection polling
		//++++++++++++++++++++++++++++++++++
		//Continually poll server for collection updates
		//so if new events are added by another user concurrently, they will show up.
		//Leave a good poll interval so as not to unnecesarily fill the event stack
		pollRemote: function(){
			var self = this;
			this.poll = window.setInterval(function(){
				self.fetch();
			}, 30000);
		},
		
		//Sort events by start date, with soonest first
		sortByStartDate: function () {
			var collection = _.sortBy(this.models, function(evt){
				return evt.get('timeStamp');
			});
			return collection;
		}
	});
	
	return Evts;
});