function lgaSortAvgTaxiOut(airports) {
	airports.sort((a, b) => {
		return b.avg_taxi_out - a.avg_taxi_out
	})

	if (airports[0].iata_faa === "LGA") {
		document.getElementById('lga-sign').innerHTML = `LGA is the worst.<br>${airports[airports.length - 1].iata_faa} is the best.<br>Safe flight! ✈`
		document.getElementById('lga-sign').className = 'worst'
	} else {
		document.getElementById('lga-sign').innerHTML = `LGA isn't the worst,<br>${airports[0].iata_faa} is.<br>${airports[airports.length - 1].iata_faa} is the best.`
		document.getElementById('lga-sign').className = 'not-worst'
	}

	document.getElementById('lga-sign').addEventListener("mouseover", lgaMouseover)
	document.getElementById('lga-sign').addEventListener("mouseout", lgaMouseout)
}

function lgaSortAvgTaxiIn(airports) {
	airports.sort((a, b) => {
		return b.avg_taxi_in - a.avg_taxi_in
	})

	if (airports[0].iata_faa === "LGA") {
		document.getElementById('lga-sign').innerHTML = `LGA is the worst.<br>${airports[airports.length - 1].iata_faa} is the best.<br>Safe flight! ✈`
		document.getElementById('lga-sign').className = 'worst'
	} else {
		document.getElementById('lga-sign').innerHTML = `LGA isn't the worst,<br>${airports[0].iata_faa} is.<br>${airports[airports.length - 1].iata_faa} is the best.`
		document.getElementById('lga-sign').className = 'not-worst'
	}

	document.getElementById('lga-sign').addEventListener("mouseover", lgaMouseover)
	document.getElementById('lga-sign').addEventListener("mouseout", lgaMouseout)
}

function lgaSortLongTaxiOut(airports) {
	airports.sort((a, b) => {
		return b.longest_taxi_out - a.longest_taxi_out
	})

	if (airports[0].iata_faa === "LGA") {
		document.getElementById('lga-sign').innerHTML = `LGA is the worst.<br>${airports[airports.length - 1].iata_faa} is the best.<br>Safe flight! ✈`
		document.getElementById('lga-sign').className = 'worst'
	} else {
		document.getElementById('lga-sign').innerHTML = `LGA isn't the worst,<br>${airports[0].iata_faa} is.<br>${airports[airports.length - 1].iata_faa} is the best.`
		document.getElementById('lga-sign').className = 'not-worst'
	}

	document.getElementById('lga-sign').addEventListener("mouseover", lgaMouseover)
	document.getElementById('lga-sign').addEventListener("mouseout", lgaMouseout)
}

function lgaSortLongTaxiIn(airports) {
	airports.sort((a, b) => {
		return b.longest_taxi_in - a.longest_taxi_in
	})

	if (airports[0].iata_faa === "LGA") {
		document.getElementById('lga-sign').innerHTML = `LGA is the worst.<br>${airports[airports.length - 1].iata_faa} is the best.<br>Safe flight! ✈`
		document.getElementById('lga-sign').className = 'worst'
	} else {
		document.getElementById('lga-sign').innerHTML = `LGA isn't the worst,<br>${airports[0].iata_faa} is.<br>${airports[airports.length - 1].iata_faa} is the best.`
		document.getElementById('lga-sign').className = 'not-worst'
	}

	document.getElementById('lga-sign').addEventListener("mouseover", lgaMouseover)
	document.getElementById('lga-sign').addEventListener("mouseout", lgaMouseout)
}