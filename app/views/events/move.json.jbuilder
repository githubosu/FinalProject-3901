json.event do |event|
	json.id @event.id
	json.title @event.title
	json.start @event.start
	json.end @event.end
	json.allDay @event.allDay
	json.color @event.color
end