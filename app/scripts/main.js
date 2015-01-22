'use strict';

//TODO: This should be moved out of here into own file???
require.config({
    shim: {
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        underscore: '../bower_components/lodash/dist/lodash',
        Handlebars: '../bower_components/handlebars/handlebars',
        Backbone: '../bower_components/backbone/backbone',
        Evt: '../scripts/mvc/model/Event',
        Evts: '../scripts/mvc/collection/Events',
        EventBoard: '../scripts/mvc/view/Event-Board',
        EventCard: '../scripts/mvc/view/Event-Card',
        EventForm: '../scripts/mvc/view/Event-Form',
        tmplEventCard: '../scripts/mvc/template/event-card',
        datepicker: '../bower_components/datetimepicker/jquery.datetimepicker',
        eventBuilder: '../scripts/mvc/init'
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
