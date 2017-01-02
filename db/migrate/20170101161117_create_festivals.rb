class CreateFestivals < ActiveRecord::Migration
  def change
    create_table :festivals do |t|
      t.float :latitude
      t.float :longitude
      t.string :name
      t.string :address

      t.timestamps null: false
    end
  end
end
