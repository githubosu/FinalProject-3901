class PagesController < ApplicationController

  def index
    @tasks = Task.all
  end
	
end
