require 'rails_helper'

RSpec.describe "festivals/show", type: :view do
  before(:each) do
    @festival = assign(:festival, Festival.create!(
      :latitude => 2.5,
      :longitude => 3.5,
      :name => "Name",
      :address => "Address"
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/2.5/)
    expect(rendered).to match(/3.5/)
    expect(rendered).to match(/Name/)
    expect(rendered).to match(/Address/)
  end
end
