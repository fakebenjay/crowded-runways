function rangefinder(array) {
	var rangeArray = []
	var difference = array[1] - array[0]
	var increment = difference / 7

	rangeArray[0] = `${timer(array[0])}`
	rangeArray[1] = `${timer(array[0] + increment)}`
	rangeArray[2] = `${timer(array[0] + increment*2)}`
	rangeArray[3] = `${timer(array[0] + increment*3)}`
	rangeArray[4] = `${timer(array[0] + increment*4)}`
	rangeArray[5] = `${timer(array[0] + increment*5)}`
	rangeArray[6] = `${timer(array[0] + increment*6)}`
	rangeArray[7] = `${timer(array[1])}`

	document.getElementById('scale-1').innerHTML = `${rangeArray[0]} to ${rangeArray[1]}`
	document.getElementById('scale-1').style.backgroundColor = color.range()[0]
	document.getElementById('scale-1').addEventListener("mouseover", function () { scaleHide('tier-1') })
	document.getElementById('scale-1').addEventListener("mouseout", scaleShow)

	document.getElementById('scale-2').innerHTML = `${rangeArray[1]} to ${rangeArray[2]}`
	document.getElementById('scale-2').style.backgroundColor = color.range()[1]
	document.getElementById('scale-2').addEventListener("mouseover", function () { scaleHide('tier-2') })
	document.getElementById('scale-2').addEventListener("mouseout", scaleShow)

	document.getElementById('scale-3').innerHTML = `${rangeArray[2]} to ${rangeArray[3]}`
	document.getElementById('scale-3').style.backgroundColor = color.range()[2]
	document.getElementById('scale-3').addEventListener("mouseover", function () { scaleHide('tier-3') })
	document.getElementById('scale-3').addEventListener("mouseout", scaleShow)

	document.getElementById('scale-4').innerHTML = `${rangeArray[3]} to ${rangeArray[4]}`
	document.getElementById('scale-4').style.backgroundColor = color.range()[3]
	document.getElementById('scale-4').addEventListener("mouseover", function () { scaleHide('tier-4') })
	document.getElementById('scale-4').addEventListener("mouseout", scaleShow)

	document.getElementById('scale-5').innerHTML = `${rangeArray[4]} to ${rangeArray[5]}`
	document.getElementById('scale-5').style.backgroundColor = color.range()[4]
	document.getElementById('scale-5').addEventListener("mouseover", function () { scaleHide('tier-5') })
	document.getElementById('scale-5').addEventListener("mouseout", scaleShow)

	document.getElementById('scale-6').innerHTML = `${rangeArray[5]} to ${rangeArray[6]}`
	document.getElementById('scale-6').style.backgroundColor = color.range()[5]
	document.getElementById('scale-6').addEventListener("mouseover", function () { scaleHide('tier-6') })
	document.getElementById('scale-6').addEventListener("mouseout", scaleShow)

	document.getElementById('scale-7').innerHTML = `${rangeArray[6]} to ${rangeArray[7]}`
	document.getElementById('scale-7').style.backgroundColor = color.range()[6]
	document.getElementById('scale-7').addEventListener("mouseover", function () { scaleHide('tier-7') })
	document.getElementById('scale-7').addEventListener("mouseout", scaleShow)

	return rangeArray
}

// Halfassed broken refactor

// function rangeAssigner(data) {
// 	if (document.getElementById("avg-taxi-out-range").checked === true) {
// 		lgaSortAvgTaxiOut(data)
// 		var value = d.avg_taxi_out;
// 	} else if (document.getElementById("avg-taxi-in-range").checked === true) {
// 		lgaSortAvgTaxiIn(data)
// 		var value = d.avg_taxi_in;
// 	} else if (document.getElementById("long-taxi-out-range").checked === true) {
// 		lgaSortLongTaxiOut(data)
// 		var value = d.longest_taxi_out;
// 	} else if (document.getElementById("long-taxi-in-range").checked === true) {
// 		lgaSortLongTaxiIn(data)
// 		var value = d.longest_taxi_in;
// 	}
// 	return value
// }