class MusicFestival < ActiveRecord::Base
  validates_uniqueness_of :name
  geocoded_by :location   
  after_validation :geocode       
  
  scope :state, -> (state) { where state: state }

end
