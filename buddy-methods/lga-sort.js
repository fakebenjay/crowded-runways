function lgaSortAvgTaxiOut(data) {
  data.sort((a, b) => {
    return b.avg_taxi_out - a.avg_taxi_out
  })

  if (data[0].iata_faa === "LGA") {
    document.getElementById('lga-sign').innerHTML = `LGA is the worst.<br>${data[data.length - 1].iata_faa} is the best.<br>Safe flight! ✈`
  } else {
    document.getElementById('lga-sign').innerHTML = `LGA isn't the worst,<br>${data[0].iata_faa} is.<br>${data[data.length - 1].iata_faa} is the best.`
  }
}

function lgaSortAvgTaxiIn(data) {
  data.sort((a, b) => {
    return b.avg_taxi_in - a.avg_taxi_in
  })

  if (data[0].iata_faa === "LGA") {
    document.getElementById('lga-sign').innerHTML = `LGA is the worst.<br>${data[data.length - 1].iata_faa} is the best.<br>Safe flight! ✈`
  } else {
    document.getElementById('lga-sign').innerHTML = `LGA isn't the worst,<br>${data[0].iata_faa} is.<br>${data[data.length - 1].iata_faa} is the best.`
  }
}

function lgaSortLongTaxiOut(data) {
  data.sort((a, b) => {
    return b.longest_taxi_out - a.longest_taxi_out
  })

  if (data[0].iata_faa === "LGA") {
    document.getElementById('lga-sign').innerHTML = `LGA is the worst.<br>${data[data.length - 1].iata_faa} is the best.<br>Safe flight! ✈`
  } else {
    document.getElementById('lga-sign').innerHTML = `LGA isn't the worst,<br>${data[0].iata_faa} is.<br>${data[data.length - 1].iata_faa} is the best.`
  }
}

function lgaSortLongTaxiIn(data) {
  data.sort((a, b) => {
    return b.longest_taxi_in - a.longest_taxi_in
  })

  if (data[0].iata_faa === "LGA") {
    document.getElementById('lga-sign').innerHTML = `LGA is the worst.<br>${data[data.length - 1].iata_faa} is the best.<br>Safe flight! ✈`
  } else {
    document.getElementById('lga-sign').innerHTML = `LGA isn't the worst,<br>${data[0].iata_faa} is.<br>${data[data.length - 1].iata_faa} is the best.`
  }
}
