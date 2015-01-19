define([
	'underscore', 
	'Backbone', 
	'jquery'], function(_, Backbone, $){
	
	var EventForm = Backbone.View.extend({
			
		initialize: function(){
			console.log('EventForm view initialized');
		}	
		// events: {
		// 	'' : ''
		// },
		
		// initialize: function(){
		// 	console.log('Logging EventForm view on init: ', this);
		// }
	
	});
	
	return EventForm;
});