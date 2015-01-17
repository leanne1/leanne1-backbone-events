define(['underscore', 'Backbone', 'Event'], function(_, Backbone, Event){
	var Events = Backbone.Collection.extend({
		
		//URL is set at collection instantiation as '/api/v1/' + userId+ '/events';

		model: Event, 

		initialize:function(){
			//TODO:
			//We will want to listen to the collection change event
			//and re-render the view, adding the latest events
			//in case someone else adds some concurrently.
			//TODO:
			//come to think of it, we need a user id in the API url
			//to handle collections specific to that charity!!!!
		}
	)};
	return Events;
});