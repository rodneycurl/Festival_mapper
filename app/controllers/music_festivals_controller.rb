class MusicFestivalsController < ApplicationController
  helper_method :sort_column, :sort_direction
  def index
    if params[:state].present?
      @fetched_festivals = MusicFestival.state(params[:state]).order(sort_column + " " + sort_direction)
    else
      @fetched_festivals = MusicFestival.order(sort_column + " " + sort_direction)
    end
    @states = MusicFestival.find_by_sql("SELECT state FROM music_festivals GROUP BY state").map &:state
    @hash = Gmaps4rails.build_markers(@fetched_festivals) do |festival, marker|
      marker.lat festival["latitude"]
      marker.lng festival["longitude"]
      marker.infowindow festival["name"]
      marker.json({ :state => festival["state"], :start_date => festival["start_date"].strftime("%b-%d")})
      
    end    
    
    #add respond with js
    respond_to do |format|
      format.html
      format.js
    end
  end
  
  private
  
  def sort_column
    MusicFestival.column_names.include?(params[:sort]) ? params[:sort] : "name"
  end
  
  def sort_direction
    %w[asc desc].include?(params[:direction]) ? params[:direction] : "asc"
  end
  
end
