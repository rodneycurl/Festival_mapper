class Festival < ActiveRecord::Base
    include HTTParty
    geocoded_by :address
    after_validation :geocode
    base_uri 'http://api.eventful.com/rest/events' 
    
      def self.eventful_festivals
        dclatitude = "38.9072"
        dclongitude = "-77.0369"
        latlong = dclatitude + "," + dclongitude
        @options = { query: { app_key: ENV["EVENTFUL_API_KEY"], q: "music", l: latlong, within: "10", units: "miles"} }
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
      
      #stopped here and need to figure out how to get this to work
      def self.festivals lat,lng
          default_params q: "music"
          format :json
          get("", query: {l:lat+","+lng})['search']["events"]["event"]
          
      end
end
