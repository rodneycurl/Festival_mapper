require 'rails_helper'

RSpec.describe "festivals/new", type: :view do
  before(:each) do
    assign(:festival, Festival.new(
      :latitude => 1.5,
      :longitude => 1.5,
      :name => "MyString",
      :address => "MyString"
    ))
  end

  it "renders new festival form" do
    render

    assert_select "form[action=?][method=?]", festivals_path, "post" do

      assert_select "input#festival_latitude[name=?]", "festival[latitude]"

      assert_select "input#festival_longitude[name=?]", "festival[longitude]"

      assert_select "input#festival_name[name=?]", "festival[name]"

      assert_select "input#festival_address[name=?]", "festival[address]"
    end
  end
end
