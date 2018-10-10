require 'csv'
require 'pry'
require 'date'
require 'fileutils'
require 'tempfile'

Dir.foreach('../raw_data/') do |item|
  next if item == '.' or item == '..' or item == '.DS_Store'
  condensed_data = {}

  CSV.foreach("../raw_data/#{item}", headers:true) do |row|
    origin_airport = row[10]
    taxi_out = row[19].to_f
    airport_city = row[11]
    lng_tx_out_date = Date.new(row[0].to_i, row[1].to_i, row[2].to_i).strftime('%a, %b %e, %Y')

    if condensed_data[origin_airport] && (taxi_out > 0)
      condensed_data[origin_airport][:avg_able_takeoffs] += 1
      condensed_data[origin_airport][:total_takeoffs] += 1
      condensed_data[origin_airport][:avg_taxi_out] = (condensed_data[origin_airport][:avg_taxi_out] * (condensed_data[origin_airport][:avg_able_takeoffs] - 1) + taxi_out) / condensed_data[origin_airport][:avg_able_takeoffs]
      if taxi_out > condensed_data[origin_airport][:longest_taxi_out]
        condensed_data[origin_airport][:longest_taxi_out] = taxi_out
        condensed_data[origin_airport][:lng_tx_out_date] = lng_tx_out_date
      end
    elsif !condensed_data[origin_airport] && (taxi_out > 0)
      condensed_data[origin_airport] = {
        avg_able_takeoffs: 1,
        total_takeoffs: 1,
        longest_taxi_out: taxi_out,
        avg_taxi_out: taxi_out,
        lng_tx_out_date: lng_tx_out_date,
        city_state: airport_city
      }
    elsif !condensed_data[origin_airport] && !(taxi_out > 0)
      condensed_data[origin_airport] = {
        avg_able_takeoffs: 0,
        total_takeoffs: 1,
        longest_taxi_out: 0,
        avg_taxi_out: 0,
        lng_tx_out_date: lng_tx_out_date,
        city_state: airport_city
      }
    elsif condensed_data[origin_airport] && !(taxi_out > 0)
      condensed_data[origin_airport][:total_takeoffs] += 1
    end
  end

  CSV.foreach("../raw_data/#{item}", headers:true) do |row|
    destination_airport = row[16]
    taxi_in = row[20].to_f
    airport_city = row[17]
    lng_tx_in_date = Date.new(row[0].to_i, row[1].to_i, row[2].to_i).strftime('%a, %b %e, %Y')

    next if !condensed_data[destination_airport]

    if condensed_data[destination_airport][:total_landings] && (taxi_in > 0)
      condensed_data[destination_airport][:avg_able_landings] += 1
      condensed_data[destination_airport][:total_landings] += 1
      condensed_data[destination_airport][:avg_taxi_in] = (condensed_data[destination_airport][:avg_taxi_in] * (condensed_data[destination_airport][:avg_able_landings] - 1) + taxi_in) / condensed_data[destination_airport][:avg_able_landings]
      if taxi_in > condensed_data[destination_airport][:longest_taxi_in]
        condensed_data[destination_airport][:longest_taxi_in] = taxi_in
        condensed_data[destination_airport][:lng_tx_in_date] = lng_tx_in_date
      end
    elsif !condensed_data[destination_airport][:total_landings] && (taxi_in > 0)
      condensed_data[destination_airport][:avg_able_landings] = 1
      condensed_data[destination_airport][:total_landings] = 1
      condensed_data[destination_airport][:longest_taxi_in] = taxi_in
      condensed_data[destination_airport][:avg_taxi_in] = taxi_in
      condensed_data[destination_airport][:lng_tx_in_date] = lng_tx_in_date
      condensed_data[destination_airport][:city_state] = airport_city
    elsif !condensed_data[destination_airport][:total_landings] && !(taxi_in > 0)
      condensed_data[destination_airport][:avg_able_landings] = 0
      condensed_data[destination_airport][:total_landings] = 1
      condensed_data[destination_airport][:longest_taxi_in] = 0
      condensed_data[destination_airport][:avg_taxi_in] = 0
      condensed_data[destination_airport][:lng_tx_in_date] = lng_tx_in_date
      condensed_data[destination_airport][:city_state] = airport_city
    elsif condensed_data[destination_airport][:total_landings] && !(taxi_in > 0)
      condensed_data[destination_airport][:total_landings] += 1
    end
  end

  counter = 0

  CSV.open("../monthly_data/#{item.split('_RAW.').join('.')}", 'w') do |temp_csv|
    CSV.foreach("../global_airports.csv") do |orig|
      airport = orig[4]

      if counter == 0
        temp_csv << orig + ['city_state', 'avg_able_landings', 'avg_able_takeoffs', 'total_landings', 'total_takeoffs', 'avg_taxi_in', 'avg_taxi_out', 'longest_taxi_in', 'longest_taxi_out', 'lng_tx_in_date', 'lng_tx_out_date']
      elsif counter > 0 && orig[4] == condensed_data.key(condensed_data[airport]) && condensed_data[airport][:total_landings] && condensed_data[airport][:total_takeoffs] ## Ensures that every airport has and a landing and a takeoff, filters out TKI
        temp_csv << orig + [condensed_data[airport][:city_state], condensed_data[airport][:avg_able_landings], condensed_data[airport][:avg_able_takeoffs], condensed_data[airport][:total_landings], condensed_data[airport][:total_takeoffs], condensed_data[airport][:avg_taxi_in], condensed_data[airport][:avg_taxi_out], condensed_data[airport][:longest_taxi_in], condensed_data[airport][:longest_taxi_out], condensed_data[airport][:lng_tx_in_date], condensed_data[airport][:lng_tx_out_date]]
      end
      counter += 1
    end
  end
  puts "#{item} done!"
end
