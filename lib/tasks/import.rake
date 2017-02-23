require 'csv'
namespace :import do
  desc "Import music festivals from csv"
  task music_festivals: :environment do
    filename = File.join Rails.root, "Music_Festivals.csv"
    counter = 0
    CSV.foreach(filename, headers: true) do |row|
      musicfestival = MusicFestival.create(name: row["Name"], location: row["Location"], city: row["City"], state: row["State"], start_date: row["StartDate"], end_date: row["EndDate"])
      puts "#{musicfestival.name} - #{musicfestival.errors.full_messages.join(row["Name"])}" if musicfestival.errors.any?
      counter +=1 if musicfestival.persisted?
     end
    puts "Imported #{counter} festivals"
  end
  
end