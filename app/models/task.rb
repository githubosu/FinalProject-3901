class Task < ActiveRecord::Base 

#validation!
  validates_presence_of :title 
  validate :future_completed_date 


  private 
  #the complete date should not be in future
  def future_completed_date 
    if !completed.blank? && completed > Date.today 
      self.errors.add(:completed, "can't be in the future") 
    end   
  end 
end 
