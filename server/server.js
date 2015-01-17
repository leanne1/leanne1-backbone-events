var application_root = __dirname,
    express = require( 'express' ), 
    path = require( 'path' ),
    mongoose = require( 'mongoose' ); 

var app = express();

//TODO: express has no configure method - find new one:(
//The below is middleware and must be installed separately now!!!
//app.use( express.bodyParser() );
//app.use( express.methodOverride() );
//app.use( app.router );//this is deprecated
app.use( express.static( path.join( application_root, '../app') ) );
//app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));

//Routes
app.get( '/api/v1/userevents', function(request, response){
    response.send( 'Events API is now running' );    
});

//Connect to database
mongoose.connect( 'mongodb://localhost/events_database' );

//Schemas
var Event = new mongoose.Schema({
    name: String,
    startDate: Number,
    endDate: Number,
    startLocation: String,
    open: Boolean,
    description: String
});

//Models
var EventModel = mongoose.model( 'Event', Event );

//Get a list of all events
app.get( '/api/v1/userevents/events', function( request, response ) {
    return EventModel.find( function( err, evts ) {
        if( !err ) {
            return response.send( evts );
        } else {
            return console.log( err );
        }
    });
});

//Create a new event
app.post( '/api/v1/userevents/events', function( request, response ) {
    var evt = new EventModel({
        name: String,
        startDate: Number,
        endDate: Number,
        startLocation: String,
        open: Boolean,
        description: String
    });
    
    return evt.save( function( err ) {
        if( !err ) {
            console.log( 'Event created' );
            return response.send( evt );
        } else {
            console.log( err );
        }
    });
});

//Get a single event by id
app.get( '/api/v1/userevents/events/:id', function( request, response ) {
    return EventModel.findById( request.params.id, function( err, evt ) {
        if( !err ) {
            return response.send( evt );
        } else {
            return console.log( err );
        }
    });
});

//Start server
var port = 3001;
app.listen( port, function() {
    console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
}); 