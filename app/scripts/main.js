/*global require*/
'use strict';

//This should be moved out of here into own file???
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
    }
});

require([
    'underscore', 'Backbone', 'Handlebars', 'Event'
], function (_, Backbone, Handlebars, Event) {



});
