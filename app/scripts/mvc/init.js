define([], function(){
	//TODO: This is our eventBuilder module. This script should contain everything
	//we need to build the eventBuilder, including templates, CSS and JS
	//All the deps should be 'required' in here or the relevant sub component
	//so that ONLY if the eventBuilder is used on the page are these assets
	//ever called into the site


	//TODO: This will execute on page load via main.js
	//So we need tp bootstrap the app:
	//Get all the collection and render them into the card view
	//the main form view has no BB in it [yet ... rollover?]

	//Creating an exposable api object 
	//for easy-to-read declarative initialisation
	var api = {
		init: init
	}


	//TODO: This function eventually bootstraps the whole app
	function init () {
		console.log('I\'m an app boostrap function!!');
	}
	return api;
});