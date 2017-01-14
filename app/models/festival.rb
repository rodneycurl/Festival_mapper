class Festival < ActiveRecord::Base
    include HTTParty
    geocoded_by :address
    after_validation :geocode
    base_uri 'http://api.eventful.com/rest/events' 
    
      def self.eventful_festivals
        dclatitude = "38.9072"
        dclongitude = "-77.0369"
        houstonlatitude = "29.7604"
        houstonlongitude = "-95.3698"
        latlong = houstonlatitude + "," + houstonlongitude
        @options = { query: { app_key: ENV["EVENTFUL_API_KEY"], q: "music", l: latlong, within: "10", units: "miles", page_number: "1"} }
        self.get("/search", @options)['search']['events']['event']
      end
      
      # def self.old_eventful_festivals
      #   dclatitude= "38.9072"
      #   dclongitude= "-77.0369"
      #   accessURL = "http://api.eventful.com/rest/events/search?app_key="+ ENV["EVENTFUL_API_KEY"]+"&q=music" + "&l="+dclatitude + "," + dclongitude + "&within=10&units=miles"
      #   response = HTTParty.get(accessURL)
      #   parsed_response=response.parsed_response
      #   parsed_response['search']["events"]["event"]
      #   #response['search']['events']['event'].first\
      # end
      
      def self.near_zip zip
        @options = { query: { app_key: ENV["EVENTFUL_API_KEY"], q: "music", l: zip, within: "10", units: "miles", page_number: "1"} }
        self.get("/search", @options)['search']["events"]["event"]
      end
      
      def self.near_latlong lat, long
          latlong = lat + "," + long
          @options = { query: { app_key: ENV["EVENTFUL_API_KEY"], q: "music", l: latlong, within: "10", units: "miles", page_number: "1"} }
          self.get("/search", @options)['search']["events"]["event"]
      end
      
    
end
