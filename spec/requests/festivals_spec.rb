require 'rails_helper'

RSpec.describe "Festivals", type: :request do
  describe "GET /festivals" do
    it "works! (now write some real specs)" do
      get festivals_path
      expect(response).to have_http_status(200)
    end
  end
end
