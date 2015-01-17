define(['underscore', 'Backbone', 'jQuery'], function(_, Backbone, $){
	var EventCard = Backbone.View.extend({
		
	tagName: '',

	className: '',

	id: '',
	
	bookingTemplate: Handlebars.compile($("#bookingview-template").html()),
	
	events: {
		'' : ''
	},
	
	initialize: function(){
		
		this.render();

		//+++++++++++++++++++++++++++++++++++++++++
		//+ API event listeners
		//+++++++++++++++++++++++++++++++++++++++++
		
		
		this.listenTo(this.model, 'change:status', this.showNotification);

	},
	
	//+++++++++++++++++++++++++++++++++++++++++
	//+ Render
	//+++++++++++++++++++++++++++++++++++++++++

	render: function(){
		var bookingView = this.$el.html(this.bookingTemplate({
			context: this.context,
			autoConfirm: this.autoConfirm, 
			adId: this.adId,
			prettyDate: this.model.escape('prettyDate'),
			prettyTime: this.model.escape('prettyTime'),
			msgRequired: this.msgRequired,
			msgSubject: this.msgSubject,
			name: this.$('[id^="name-"]').val(),
			email: this.$('[id^="email-"]').val()
		}));	

		$('body').prepend(bookingView);	
	}
	
	return EventCard;
});