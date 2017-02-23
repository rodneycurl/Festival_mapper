class AddLatitudeAndLongitudeToMusicFestival < ActiveRecord::Migration
  def change
    add_column :music_festivals, :latitude, :float
    add_column :music_festivals, :longitude, :float
  end
end
