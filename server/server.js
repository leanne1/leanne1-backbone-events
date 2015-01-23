var application_root = __dirname,
    express = require( 'express' ), 
    path = require( 'path' ),
    mongoose = require( 'mongoose' ); 

var app = express();

app.configure( function() {
    app.use( express.bodyParser() );
    app.use( express.methodOverride() );
    app.use( app.router );
    app.use( express.static( path.join( application_root, '../app') ) );    
    app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
});

//Routes
app.get( '/api/v1/userevents/123456789', function(request, response){
    response.send( 'Events API is now running' );    
});

//Connect to database
mongoose.connect( 'mongodb://localhost/events_database' );

//Schemas
var Evt = new mongoose.Schema({
    userId: String,
    eventName: String,
    startDate: String,
    endDate: String,
    startLocation: String,
    open: Boolean,
    description: String,
    startDateTimeStamp: Number,
    createdTimeStamp: Number
});

//Models
var EventModel = mongoose.model( 'Evt', Evt );

//Get a list of all events
app.get( '/api/v1/userevents/123456789/events', function( request, response ) {
    return EventModel.find( function( err, evts ) {
        if( !err ) {
            return response.send( evts );
        } else {
            return console.log( err );
        }
    });
});

//Create a new event
app.post( '/api/v1/userevents/123456789/events', function( request, response ) {
    var evt = new EventModel({
        userId: request.body.userId,
        eventName: request.body.eventName,
        startDate: request.body.startDate,
        endDate: request.body.endDate,
        startLocation: request.body.startLocation,
        open: request.body.open,
        description: request.body.description,
        startDateTimeStamp: request.body.startDatetimeStamp,
        createdTimeStamp: request.body.createdTimeStamp
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
app.get( '/api/v1/userevents/123456789/events/:id', function( request, response ) {
    return EventModel.findById( request.params.id, function( err, evt ) {
        if( !err ) {
            return response.send( evt );
        } else {
            return console.log( err );
        }
    });
});

//Delete an event
app.delete( '/api/v1/userevents/123456789/events/:id', function( request, response ) {
    console.log( 'Deleting event with id: ' + request.params.id );
    return EventModel.findById( request.params.id, function( err, evt ) {
        return evt.remove( function( err ) {
            if( !err ) {
                console.log( 'Event removed' );
                return response.send( '' );
            } else {
                console.log( err );
            }
        });
    });
});

//Start server
var port = 3001;
app.listen( port, function() {
    console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
}); 