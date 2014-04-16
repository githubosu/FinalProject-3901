class EventsController < ApplicationController

before_action :set_event, only: ['move','edit']

respond_to :html, :json

def index
	@events = Event.all
	respond_with @events do |format|
      format.html # index.html.erb
      # format.json { render json: events }
 	end
end

def new
	@event = Event.new
end

def show
	@event = Event.find(params[:id])
end


def create
	@event = Event.new(event_params)
	
	if @event.save
		flash[:notice] = "Successfully created a new event"
		redirect_to events_path
	else 
		flash.now[:error] = "There was a problem"
		render "new"
	end	
end


def move

    if @event.update_attributes(event_params) 
    	respond_with @event do |format|
    		format.json
    	end
    end
end

	#binding.pry
  

    # if @event.update_attributes(event_params) 
    # 	respond_with @event do |format|
    # 		format.json
    # 	end

     #  @event.start = 
  	 # @event.end = 
     #  @event.allDay = params[:allDay]
     
    # end
    #render :nothing => true

def edit
    #render :json => { :new => render_to_string('new') } 
    @event= Event.find(params[:id])
end

def update
	@event= Event.find(params[:id])

	if @event.update(event_params)
		redirect_to @event
	else
		render "edit"
	end
end

def destroy
	@event = Event.find(params[:id])
	@event.destroy

	redirect_to events_path
end

private
	def event_params
		params.require(:event).permit(:title, :color, :start, :end, :commit, :allDay, :id, :dayDelta, :minuteDelta)
	end

	def set_event
		@event = Event.find(params[:id])
	end

end