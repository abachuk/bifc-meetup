
//https://api.meetup.com/2/events?group_urlname=stamfordwp&key=1b4548224d397e28111d791128524d2f

var Event = Backbone.Model.extend({});
var Events = Backbone.Collection.extend({
	model: Event,  
		url: "https://api.meetup.com/2/events?group_urlname=builtinfairco&key=1b4548224d397e28111d791128524d2f",  
		sync: function(method, model, options){  
		    options.timeout = 10000;  
		    options.dataType = "jsonp";  
		    return Backbone.sync(method, model, options);  
		  } 	
});

var Member = Backbone.Model.extend({});
var Members = Backbone.Collection.extend({	 
		url: "https://api.meetup.com/2/rsvps",
		sync: function(method, model, options){  
		    options.timeout = 10000;  
		    options.dataType = "jsonp";  
		    return Backbone.sync(method, model, options);
		  }
});

var EventsView = Backbone.View.extend({
    
    initialize: function() {
        _.bindAll(this, 'render');
        this.collection.bind('reset', this.render);
    },
    
    events: {
	    "click #event-members" : "evMembers"
    },
    
    evMembers: function() {
	    alert('df');
	    members.fetch({
			data: {
				"event_id" : "qjqwhfyrdbhc",
				"key" : "1b4548224d397e28111d791128524d2f"
			}
		})
    },   
    
    template: _.template( $("#events_template").html()),
    
    render: function(){
       console.log(this.collection.toJSON());
       var viewAllEvens = this.template(this.collection.toJSON());
       
       $(this.el).html(viewAllEvens);
       return this;

       //return $(this.el).append( template(items) );
    },
   
    
});



var events = new Events;
var eventsView = new EventsView({
		el: $('#events'),
		collection: events
});
var members = new Members({
	//url: "https://api.meetup.com/2/rsvps?event_id=&key=1b4548224d397e28111d791128524d2f"
})




$('a').click(function(){
	events.fetch({

	});
});


//console.log(events);


