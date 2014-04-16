# this is the event class that is used to store infomation for an event
class Event < ActiveRecord::Base
	belongs_to :user
	validates :title, presence: true, length: { minimum: 1}
	validates :start, presence: true
	validates :end, presence: true
end
