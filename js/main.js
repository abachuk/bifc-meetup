
//https://api.meetup.com/2/events?group_urlname=stamfordwp&key=1b4548224d397e28111d791128524d2f

var Event = Backbone.Model.extend({});
var Events = Backbone.Collection.extend({
	model: Event,  
		url: "https://api.meetup.com/2/events",  
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

var allMembersPhotos;

var EventsView = Backbone.View.extend({
    
    initialize: function(attrs) {
        _.bindAll(this, 'render');
        this.options = attrs;
        //this.members = new Members();
        this.collection.bind('reset', this.render);
    },
    
    events: {
	    "click #event-members" : "evMembers"
    },
    
    evMembers: function(e) {
    	e.preventDefault();
	    var id = $(e.currentTarget).data("id");
	    console.log(id);
	    members.fetch({
			data: {
				"event_id" : id,
				"key" : "1b4548224d397e28111d791128524d2f"
			},
			success: function(response) {
				console.log(response);
				rsvpMembers = response.models[0].attributes.results;
				var tmpl = _.template($('#rsvpTemplate').html())
				$('#photos div').html(tmpl(rsvpMembers));
				$('#photos').fadeIn();
				$('#photos a').click(function(){
					$('#photos').fadeOut();
				});
			}
		});
		
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
		collection: events,
		some: "something"
});
var members = new Members({});




$('a').click(function(){
	events.fetch({
		data:{
			"group_urlname" : $('#group-name').val(),
			"key" : "1b4548224d397e28111d791128524d2f"
		}
	});
});


//console.log(events);


