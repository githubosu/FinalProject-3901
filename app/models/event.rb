class Event < ActiveRecord::Base
	belongs_to :user
	validates :title, presence: true, length: { minimum: 1}
	validates :start, presence: true
	validates :end, presence: true
end
