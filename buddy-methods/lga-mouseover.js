function lgaMouseover() {
	var row = document.getElementById('lga-sign').innerHTML.split('<br>')
	var airport1 = row[0].split(' ')[0]
	var airport2 = row[1].split(' ')[0]

	if (document.getElementById('lga-sign').className.includes("not-worst")) {
		var airport3 = row[2].split(' ')[0]
	}

	d3.selectAll('circle')
		.attr('visibility', 'hidden')

	d3.select(`#${airport1}`)
		.attr('visibility', 'visible')
		.attr('r', 10)
		.style('opacity', 1)

	d3.select(`#${airport2}`)
		.attr('visibility', 'visible')
		.attr('r', 10)
		.style('opacity', 1)

	d3.select(`#${airport3}`)
		.attr('visibility', 'visible')
		.attr('r', 10)
		.style('opacity', 1)
}

function lgaMouseout() {
	d3.selectAll('circle')
		.attr('visibility', 'visible')
		.attr("r", function () {
			var width = document.querySelector('svg').getBoundingClientRect().width
			return width / 250
		})
		.style('opacity', 0.85)
}