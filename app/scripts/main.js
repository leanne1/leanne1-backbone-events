'use strict';

//TODO: This should be moved out of here into own file???
require.config({
    shim: {
    },
    paths: {
        Handlebars: '../bower_components/handlebars/handlebars',
        jquery: '../bower_components/jquery/dist/jquery',
        Backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/lodash/dist/lodash',
        Event: '../scripts/mvc/model/Event',
        EventCard: '../scripts/mvc/view/Event-Card',
        Events: '../scripts/mvc/collection/Events',
        tmplEventCard: '../scripts/mvc/template/event-card',
        eventBuilder: '../scripts/mvc/init',
    }
});

require([
    'eventBuilder'
], function (eventBuilder) {
	
	//Bootstrap eventBuilder application for the page.
	//We can add this module and its dependencies anywhere on the site 
	//by simply requiring it and calling its init method:
	eventBuilder.init();
});
