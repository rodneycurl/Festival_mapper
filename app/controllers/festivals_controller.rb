class FestivalsController < ApplicationController
  require 'json'
  #before_action :set_festival, only: [:show, :edit, :update, :destroy]

  # GET /festivals
  # GET /festivals.json
  #respond_to :json, only: [:near_zip, :near_latlong]
  #respond_to :html
    
  def fetch
    @fetched_festivals = Festival.eventful_festivals
    respond_with @json
  end
  
  def index
    
    @fetched_festivals ||= Festival.eventful_festivals
    @hash = Gmaps4rails.build_markers(@fetched_festivals) do |festival, marker|
      marker.lat festival["latitude"]
      marker.lng festival["longitude"]
      marker.infowindow festival["title"]
    end    
  end

  # GET /festivals/1
  # GET /festivals/1.json
  def show
  end

  # GET /festivals/new
  def new
    @festival = Festival.new
  end

  # GET /festivals/1/edit
  def edit
  end

  # POST /festivals
  # POST /festivals.json
  def create
    @festival = Festival.new(festival_params)

    respond_to do |format|
      if @festival.save
        format.html { redirect_to @festival, notice: 'Festival was successfully created.' }
        format.json { render :show, status: :created, location: @festival }
      else
        format.html { render :new }
        format.json { render json: @festival.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /festivals/1
  # PATCH/PUT /festivals/1.json
  def update
    respond_to do |format|
      if @festival.update(festival_params)
        format.html { redirect_to @festival, notice: 'Festival was successfully updated.' }
        format.json { render :show, status: :ok, location: @festival }
      else
        format.html { render :edit }
        format.json { render json: @festival.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /festivals/1
  # DELETE /festivals/1.json
  def destroy
    @festival.destroy
    respond_to do |format|
      format.html { redirect_to festivals_url, notice: 'Festival was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def near_zip
      @zip = params[:textZip]
      @fetched_festivals = Festival.near_zip(@zip)
      @hash = Gmaps4rails.build_markers(@fetched_festivals) do |festival, marker|
        marker.lat festival["latitude"].to_f
        marker.lng festival["longitude"].to_f
        marker.infowindow festival["title"]
      end 
       respond_to do |format|
         format.js
       end
  end
  
  
  def near_latlong
      @lat = params[:lat]
      @long = params[:long]
      @fetched_festivals = Festival.near_latlong(@lat, @long)
  	  @hash = Gmaps4rails.build_markers(@fetched_festivals) do |festival, marker|
        marker.lat festival["latitude"].to_f
        marker.lng festival["longitude"].to_f
        marker.infowindow festival["title"]
      end    
       Rails.logger.debug "fetched festivals #{@fetched_festivals}" 
       Rails.logger.debug "hash #{@hash}" 
       respond_to do |format|
        format.js { render :file => "../views/festivals/near_zip.js.erb" }
       end
  end

  
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_festival
      @festival = Festival.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def festival_params
      params.require(:festival).permit(:latitude, :longitude, :name, :address)
    end
end
