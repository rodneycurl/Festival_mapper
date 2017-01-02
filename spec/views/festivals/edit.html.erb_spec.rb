require 'rails_helper'

RSpec.describe "festivals/edit", type: :view do
  before(:each) do
    @festival = assign(:festival, Festival.create!(
      :latitude => 1.5,
      :longitude => 1.5,
      :name => "MyString",
      :address => "MyString"
    ))
  end

  it "renders the edit festival form" do
    render

    assert_select "form[action=?][method=?]", festival_path(@festival), "post" do

      assert_select "input#festival_latitude[name=?]", "festival[latitude]"

      assert_select "input#festival_longitude[name=?]", "festival[longitude]"

      assert_select "input#festival_name[name=?]", "festival[name]"

      assert_select "input#festival_address[name=?]", "festival[address]"
    end
  end
end
