function lgaSortAvgTaxiOut(data) {
  data.sort((a, b) => {
    return b.avg_taxi_out - a.avg_taxi_out
  })

  if (data[0].iata_faa === "LGA") {
    document.getElementById('lga-sign').innerHTML = `LGA is the worst.<br>${data[data.length - 1].iata_faa} is the best.<br>Safe flight! ✈`
    document.getElementById('lga-sign').className = 'worst'
  } else {
    document.getElementById('lga-sign').innerHTML = `LGA isn't the worst,<br>${data[0].iata_faa} is.<br>${data[data.length - 1].iata_faa} is the best.`
    document.getElementById('lga-sign').className = 'not-worst'
  }

  document.getElementById('lga-sign').addEventListener("mouseover", lgaMouseover)
  document.getElementById('lga-sign').addEventListener("mouseout", lgaMouseout)
}

function lgaSortAvgTaxiIn(data) {
  data.sort((a, b) => {
    return b.avg_taxi_in - a.avg_taxi_in
  })

  if (data[0].iata_faa === "LGA") {
    document.getElementById('lga-sign').innerHTML = `LGA is the worst.<br>${data[data.length - 1].iata_faa} is the best.<br>Safe flight! ✈`
    document.getElementById('lga-sign').className = 'worst'
  } else {
    document.getElementById('lga-sign').innerHTML = `LGA isn't the worst,<br>${data[0].iata_faa} is.<br>${data[data.length - 1].iata_faa} is the best.`
    document.getElementById('lga-sign').className = 'not-worst'
  }

  document.getElementById('lga-sign').addEventListener("mouseover", lgaMouseover)
  document.getElementById('lga-sign').addEventListener("mouseout", lgaMouseout)
}

function lgaSortLongTaxiOut(data) {
  data.sort((a, b) => {
    return b.longest_taxi_out - a.longest_taxi_out
  })

  if (data[0].iata_faa === "LGA") {
    document.getElementById('lga-sign').innerHTML = `LGA is the worst.<br>${data[data.length - 1].iata_faa} is the best.<br>Safe flight! ✈`
    document.getElementById('lga-sign').className = 'worst'
  } else {
    document.getElementById('lga-sign').innerHTML = `LGA isn't the worst,<br>${data[0].iata_faa} is.<br>${data[data.length - 1].iata_faa} is the best.`
    document.getElementById('lga-sign').className = 'not-worst'
  }

  document.getElementById('lga-sign').addEventListener("mouseover", lgaMouseover)
  document.getElementById('lga-sign').addEventListener("mouseout", lgaMouseout)
}

function lgaSortLongTaxiIn(data) {
  data.sort((a, b) => {
    return b.longest_taxi_in - a.longest_taxi_in
  })

  if (data[0].iata_faa === "LGA") {
    document.getElementById('lga-sign').innerHTML = `LGA is the worst.<br>${data[data.length - 1].iata_faa} is the best.<br>Safe flight! ✈`
    document.getElementById('lga-sign').className = 'worst'
  } else {
    document.getElementById('lga-sign').innerHTML = `LGA isn't the worst,<br>${data[0].iata_faa} is.<br>${data[data.length - 1].iata_faa} is the best.`
    document.getElementById('lga-sign').className = 'not-worst'
  }

  document.getElementById('lga-sign').addEventListener("mouseover", lgaMouseover)
  document.getElementById('lga-sign').addEventListener("mouseout", lgaMouseout)
}
