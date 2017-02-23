class CreateMusicFestivals < ActiveRecord::Migration
  def change
    create_table :music_festivals do |t|
      t.string :name
      t.string :location
      t.string :city
      t.string :state
      t.date :start_date
      t.date :end_date

      t.timestamps null: false
    end
  end
end
