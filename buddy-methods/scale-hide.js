function scaleHide(tier) {
  d3.selectAll('circle')
    .attr('visibility', 'hidden')

  d3.selectAll(`.${tier}`)
    .attr('visibility', 'visible')
}

function scaleShow() {
  d3.selectAll('circle')
    .attr('visibility', 'visible')
}
