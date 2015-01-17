define(['underscore', 'Backbone', 'Event'], function(_, Backbone, Event){
	var Events = Backbone.Collection.extend({
		
		//URL is set at collection instantiation as '/api/v1/' + userId+ '/events';

		model: Event, 

		initialize:function(){
			//TODO:
			//come to think of it, we need a user id in the API url
			//to handle collections specific to that charity!!!!
			this.pollRemote();
		},

		//++++++++++++++++++++++++++++++++++
		//+ Remote collection polling
		//++++++++++++++++++++++++++++++++++
		//Continually poll server for collection updates
		//so if events are added concurrently, they will show up on the page
		//leave a good poll interval so as not to unnecesarily employ the JS event stack
		pollRemote: function(){
			var self = this;
			this.poll = window.setInterval(function(){
				self.fetch();
			},30000);
		},
	)};
	return Events;
});