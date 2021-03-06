function loadData(fileDate) {
	var yearNumber = document.getElementById('year').value
	var monthName = document.getElementById('month').value
	var monthNumber = document.getElementById('month').selectedIndex + 1
	monthNumber = ("0" + monthNumber).slice(-2);

	var fileDate = `${yearNumber}_${monthNumber}`

	d3.csv(`monthly_data/${fileDate}.csv`, (data) => {
		var avgTaxiOutRange = data.map((d) => { return parseFloat(d.avg_taxi_out) })
		var avgTaxiInRange = data.map((d) => { return parseFloat(d.avg_taxi_in) })
		var longTaxiOutRange = data.map((d) => { return parseFloat(d.longest_taxi_out) })
		var longTaxiInRange = data.map((d) => { return parseFloat(d.longest_taxi_in) })

		//Set domain
		if (document.getElementById("avg-taxi-out-range").checked === true) {
			lgaSortAvgTaxiOut(data)
			color.domain([
        d3.min(avgTaxiOutRange, function (d) { return d; }),
        d3.max(avgTaxiOutRange, function (d) { return d; })
      ]);
		} else if (document.getElementById("avg-taxi-in-range").checked === true) {
			lgaSortAvgTaxiIn(data)
			color.domain([
        d3.min(avgTaxiInRange, function (d) { return d; }),
        d3.max(avgTaxiInRange, function (d) { return d; })
      ]);
		} else if (document.getElementById("long-taxi-out-range").checked === true) {
			lgaSortLongTaxiOut(data)
			color.domain([
        d3.min(longTaxiOutRange, function (d) { return d; }),
        d3.max(longTaxiOutRange, function (d) { return d; })
      ]);
		} else if (document.getElementById("long-taxi-in-range").checked === true) {
			lgaSortLongTaxiIn(data)
			color.domain([
        d3.min(longTaxiInRange, function (d) { return d; }),
        d3.max(longTaxiInRange, function (d) { return d; })
      ]);
		}

		//Transition debugger here

		rangefinder(color.domain())

		d3.json("us-states.json", function (json) {
			//Bind data and create one path per GeoJSON feature
			svg.selectAll("path")
				.data(json.features)
				.enter()
				.append("path")
				.attr("d", path)
				.style("fill", "#3768B7")

			data.sort((a, b) => { return a.total_takeoffs - b.total_takeoffs })

			svg.selectAll("circle").remove();

			svg.selectAll("circle")
				.data(data)
				.enter()
				.append("circle")
				.attr("id", function (d) {
					return d.iata_faa
				})
				.attr("cx", function (d) {
					return projection([d.longitude, d.latitude])[0];
				})
				.attr("cy", function (d) {
					return projection([d.longitude, d.latitude])[1];
				})
				.attr("r", function () {
					var width = document.querySelector('svg').getBoundingClientRect().width
					return width / 250
				})
				.style("fill", (d) => {
					if (document.getElementById("avg-taxi-out-range").checked === true) {
						lgaSortAvgTaxiOut(data)
						var value = d.avg_taxi_out;
					} else if (document.getElementById("avg-taxi-in-range").checked === true) {
						lgaSortAvgTaxiIn(data)
						var value = d.avg_taxi_in;
					} else if (document.getElementById("long-taxi-out-range").checked === true) {
						lgaSortLongTaxiOut(data)
						var value = d.longest_taxi_out;
					} else if (document.getElementById("long-taxi-in-range").checked === true) {
						lgaSortLongTaxiIn(data)
						var value = d.longest_taxi_in;
					}
					return color(value)
				})
				.attr('class', (d) => {
					if (document.getElementById("avg-taxi-out-range").checked === true) {
						lgaSortAvgTaxiOut(data)
						var value = d.avg_taxi_out;
					} else if (document.getElementById("avg-taxi-in-range").checked === true) {
						lgaSortAvgTaxiIn(data)
						var value = d.avg_taxi_in;
					} else if (document.getElementById("long-taxi-out-range").checked === true) {
						lgaSortLongTaxiOut(data)
						var value = d.longest_taxi_out;
					} else if (document.getElementById("long-taxi-in-range").checked === true) {
						lgaSortLongTaxiIn(data)
						var value = d.longest_taxi_in;
					}
					return `tier-${color.range().indexOf(color(value))+1}`
				})
				.style("stroke", "gray")
				.style("stroke-width", 0.25)
				.style("opacity", 0.85)
				.on("mouseover", (d) => {
					var airportCode = `${d.iata_faa}`
					var airport = `${d.name}`
					var cityState = `${d.city_state}`
					var avgTaxiOut = `Average Taxi Out: ${secondizer(d.avg_taxi_out)}`
					var avgTaxiIn = `Average Taxi In: ${secondizer(d.avg_taxi_in)}`
					var longestTaxiOut = `Longest Taxi Out: ${secondizer(d.longest_taxi_out)} (${d.lng_tx_out_date})`
					var longestTaxiIn = `Longest Taxi In: ${secondizer(d.longest_taxi_in)} (${d.lng_tx_in_date})`
					var takeoffsLandings = `Total Takeoffs: ${d.total_takeoffs}, Total Landings: ${d.total_landings}`

					var coordinates = [d3.event.clientX, d3.event.clientY]
					var divVertOffset = document.querySelector('svg').getBoundingClientRect().height / 2.42
					var divHorizOffset = document.querySelector('svg').getBoundingClientRect().width / 4.8
					var windowHeight = document.getElementById('right').clientHeight
					var windowWidth = document.getElementById('right').clientWidth

					if (coordinates[1] + divVertOffset > windowHeight) {
						d3.select("#tooltip")
							.style("top", (coordinates[1] - divVertOffset) + "px")
					} else {
						d3.select("#tooltip")
							.style("top", coordinates[1] + "px")
					}

					if (coordinates[0] + divHorizOffset > windowWidth) {
						d3.select("#tooltip")
							.style("left", (coordinates[0] - divHorizOffset) + "px")
					} else {
						d3.select("#tooltip")
							.style("left", coordinates[0] + "px")
					}


					d3.select("#tooltip")
						.select("h1#airport-code")
						.text(airportCode)

					d3.select("#tooltip")
						.select("h3#location")
						.text(airport)

					d3.select("#tooltip")
						.select("h4#city-state")
						.text(cityState)

					d3.select("#tooltip")
						.select("span#text-1")
						.text(avgTaxiOut)

					d3.select("#tooltip")
						.select("span#text-2")
						.text(avgTaxiIn)

					d3.select("#tooltip")
						.select("span#text-3")
						.text(longestTaxiOut)

					d3.select("#tooltip")
						.select("span#text-4")
						.text(longestTaxiIn)

					d3.select("#tooltip")
						.select("small#text-5")
						.text(takeoffsLandings)

					//Show the tooltip
					d3.select("#tooltip").classed("hidden", false);
				})
				.on("mouseout", (d) => {
					d3.select("#tooltip").classed("hidden", true);
				})
			d3.selectAll("input.radio").on("change", () => {
				var avgTaxiOutRange = data.map((d) => { return parseFloat(d.avg_taxi_out) })
				var avgTaxiInRange = data.map((d) => { return parseFloat(d.avg_taxi_in) })
				var longTaxiOutRange = data.map((d) => { return parseFloat(d.longest_taxi_out) })
				var longTaxiInRange = data.map((d) => { return parseFloat(d.longest_taxi_in) })

				//Set domain
				if (document.getElementById("avg-taxi-out-range").checked === true) {
					color.domain([
            d3.min(avgTaxiOutRange, function (d) { return d; }),
            d3.max(avgTaxiOutRange, function (d) { return d; })
          ])
					rangefinder(color.domain())
					lgaSortAvgTaxiOut(data)
					svg.selectAll("circle")
						.style("fill", (d) => {
							var value = d.avg_taxi_out;
							return color(value)
						})
						.attr('class', (d) => {
							var value = d.avg_taxi_out;
							return `tier-${color.range().indexOf(color(value))+1}`
						});
				} else if (document.getElementById("avg-taxi-in-range").checked === true) {
					color.domain([
            d3.min(avgTaxiInRange, function (d) { return d; }),
            d3.max(avgTaxiInRange, function (d) { return d; })
          ])
					rangefinder(color.domain())
					lgaSortAvgTaxiIn(data)
					svg.selectAll("circle")
						.style("fill", (d) => {
							var value = d.avg_taxi_in;
							return color(value)
						})
						.attr('class', (d) => {
							var value = d.avg_taxi_in;
							return `tier-${color.range().indexOf(color(value))+1}`
						});;
				} else if (document.getElementById("long-taxi-out-range").checked === true) {
					color.domain([
            d3.min(longTaxiOutRange, function (d) { return d; }),
            d3.max(longTaxiOutRange, function (d) { return d; })
          ])
					rangefinder(color.domain())
					lgaSortLongTaxiOut(data)
					svg.selectAll("circle")
						.style("fill", (d) => {
							var value = d.longest_taxi_out;
							return color(value)
						})
						.attr('class', (d) => {
							var value = d.longest_taxi_out;
							return `tier-${color.range().indexOf(color(value))+1}`
						});
				} else if (document.getElementById("long-taxi-in-range").checked === true) {
					color.domain([
            d3.min(longTaxiInRange, function (d) { return d; }),
            d3.max(longTaxiInRange, function (d) { return d; })
          ])
					rangefinder(color.domain())
					lgaSortLongTaxiIn(data)
					svg.selectAll("circle")
						.style("fill", (d) => {
							var value = d.longest_taxi_in;
							return color(value)
						})
						.attr('class', (d) => {
							var value = d.longest_taxi_in;
							return `tier-${color.range().indexOf(color(value))+1}`
						});
				}
			})
			d3.selectAll("select#year").on("change", () => {
				if (document.getElementById("year-2019").selected === true) {
					d3.select("option#month-03").classed("hidden", true);
					d3.select("option#month-04").classed("hidden", true);
					d3.select("option#month-05").classed("hidden", true);
					d3.select("option#month-06").classed("hidden", true);
					d3.select("option#month-07").classed("hidden", true);
					d3.select("option#month-08").classed("hidden", true);
					d3.select("option#month-09").classed("hidden", true);
					d3.select("option#month-10").classed("hidden", true);
					d3.select("option#month-11").classed("hidden", true);
					d3.select("option#month-12").classed("hidden", true);
				} else if (document.getElementById("year-2019").selected === false) {
					d3.select("option#month-03").classed("hidden", false);
					d3.select("option#month-04").classed("hidden", false);
					d3.select("option#month-05").classed("hidden", false);
					d3.select("option#month-06").classed("hidden", false);
					d3.select("option#month-07").classed("hidden", false);
					d3.select("option#month-08").classed("hidden", false);
					d3.select("option#month-09").classed("hidden", false);
					d3.select("option#month-10").classed("hidden", false);
					d3.select("option#month-11").classed("hidden", false);
					d3.select("option#month-12").classed("hidden", false);
				}
			})
		})
	})
};