class MusicFestivalsController < ApplicationController
  def index
    @fetched_festivals = MusicFestival.all
    @hash = Gmaps4rails.build_markers(@fetched_festivals) do |festival, marker|
      marker.lat festival["latitude"]
      marker.lng festival["longitude"]
      marker.infowindow festival["name"]
      marker.json({ :state => festival["state"]})
    end    
  end
end
