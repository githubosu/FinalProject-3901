// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require twitter/bootstrap
//= require jquery.ui.all
//= require bootstrap
//= require fullcalendar
//= require_tree .
//= require bootstrap-datepicker
//= require bootstrap-datetimepicker

$(document).ready(function(){

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $('#calendar').fullCalendar({
        
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay',
            ignoreTimezone: false
        },
        selectable: true,
        selectHelper: true,
    
        select: function(start, end, allDay)
                {
                   
                    var title = prompt('Event Title:');
                    if (title)
                    {
                        calendar.fullCalendar('renderEvent',
                            {
                                title: title,
                                start: start,
                                end: end,
                                allDay: allDay
                            },
                            true 
                        );
                    }
                    calendar.fullCalendar('unselect');
                },
                

        
        defaultView: 'agendaWeek',

        editable: true,
      
        eventSources: [

        // your event source
            {
            url: '/events.json',
            type: 'GET'
            
            }
        ],

        
        dragOpacity: "0.5",
        eventDrop: function(event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view){
            console.log('eventDrop called');
            console.log(event);
            console.log(dayDelta);
            console.log(minuteDelta);

            var new_event = {
            	id: event.id,
                dayDelta: dayDelta,
                minuteDelta: minuteDelta
            }

            $.ajax({
                type: "POST",
                dataType: 'json',
                url: '/events/' + event.id +'/move',
                data: {
                    id: new_event.id,
                    event: new_event,
                }
                // success: function (data, textStatus, jqXHR) {
                //     console.log('success');
                // },
                // error: function ( xhr, status, error ) {
                //     console.log('error');
                //  }

              }); 

        },

        eventClick: function(calEvent, jsEvent, view) {
            $.ajax({
                type:"POST", 
                dataType: 'json',
                url:'/events/'+ calEvent.id + '/update'
            })
        // alert('Event: ' + calEvent.title);
        // alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
        // alert('View: ' + view.name);

        // // change the border color just for fun
        // $(this).css('border-color', 'red');

        }

      
    });
});
