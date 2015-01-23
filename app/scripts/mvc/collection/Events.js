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
		},

		//Sort events by created date, with most recently created first
		sortByCreatedDate: function () {
			var collection = _.sortBy(this.models, function(evt){
				return evt.get('createdTimeStamp');
			});
			return collection;
		}
	});
	
	return Evts;
});