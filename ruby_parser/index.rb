require 'csv'
require 'pry'

airports = CSV.read("../global_airports.csv")
flights = CSV.read("../109439354_T_ONTIME.csv")

condensed_data = {}

CSV.foreach('../109439354_T_ONTIME.csv', headers:true) do |row|
  origin_airport = row[10]
  taxi_out = row[19].to_f
  airport_city = row[11]

  if condensed_data[origin_airport] && (taxi_out > 0)
    condensed_data[origin_airport][:avg_able_takeoffs] += 1
    condensed_data[origin_airport][:total_takeoffs] += 1
    condensed_data[origin_airport][:avg_taxi_out] = (condensed_data[origin_airport][:avg_taxi_out] * (condensed_data[origin_airport][:avg_able_takeoffs] - 1) + taxi_out) / condensed_data[origin_airport][:avg_able_takeoffs]
    if taxi_out > condensed_data[origin_airport][:longest_taxi_out]
      condensed_data[origin_airport][:longest_taxi_out] = taxi_out
    end
  elsif !condensed_data[origin_airport] && (taxi_out > 0)
    condensed_data[origin_airport] = {
      avg_able_takeoffs: 1,
      total_takeoffs: 1,
      longest_taxi_out: taxi_out,
      avg_taxi_out: taxi_out,
      city_state: airport_city
    }
  elsif !condensed_data[origin_airport] && !(taxi_out > 0)
    condensed_data[origin_airport] = {
      avg_able_takeoffs: 0,
      total_takeoffs: 1,
      longest_taxi_out: 0,
      avg_taxi_out: 0,
      city_state: airport_city
    }
  elsif condensed_data[origin_airport] && !(taxi_out > 0)
    condensed_data[origin_airport][:total_takeoffs] += 1
  end
end

CSV.foreach('../109439354_T_ONTIME.csv', headers:true) do |row|
  destination_airport = row[16]
  taxi_in = row[20].to_f
  airport_city = row[17]

  if condensed_data[destination_airport][:total_landings] && (taxi_in > 0)
    condensed_data[destination_airport][:avg_able_landings] += 1
    condensed_data[destination_airport][:total_landings] += 1
    condensed_data[destination_airport][:avg_taxi_in] = (condensed_data[destination_airport][:avg_taxi_in] * (condensed_data[destination_airport][:avg_able_landings] - 1) + taxi_in) / condensed_data[destination_airport][:avg_able_landings]
    if taxi_in > condensed_data[destination_airport][:longest_taxi_in]
      condensed_data[destination_airport][:longest_taxi_in] = taxi_in
    end
  elsif !condensed_data[destination_airport][:total_landings] && (taxi_in > 0)
    condensed_data[destination_airport][:avg_able_landings] = 1
    condensed_data[destination_airport][:total_landings] = 1
    condensed_data[destination_airport][:longest_taxi_in] = taxi_in
    condensed_data[destination_airport][:avg_taxi_in] = taxi_in
    condensed_data[destination_airport][:city_state] = airport_city
  elsif !condensed_data[destination_airport][:total_landings] && !(taxi_in > 0)
    condensed_data[destination_airport][:avg_able_landings] = 0
    condensed_data[destination_airport][:total_landings] = 1
    condensed_data[destination_airport][:longest_taxi_in] = 0
    condensed_data[destination_airport][:avg_taxi_in] = 0
    condensed_data[destination_airport][:city_state] = airport_city
  elsif condensed_data[destination_airport][:total_landings] && !(taxi_in > 0)
    condensed_data[destination_airport][:total_landings] += 1
  end
end

CSV.open("../global_airports.csv", "w") do |f|
  puts f
end

# CSV.foreach('../global_airports.csv', headers:true) do |row|
#   airport_code = row[4]
#   airport_name = row[1]
#   latitude = row[6]
#   longitude = row[7]
#
#   if condensed_data[airport_code]
#     condensed_data[airport_code][:name] = airport_name
#     condensed_data[airport_code][:lat] = latitude
#     condensed_data[airport_code][:lng] = longitude
#   end
# end

# puts condensed_data

# condensed_data.each do |airport|
# end
