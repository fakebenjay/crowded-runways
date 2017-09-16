function usMap() {
  d3.json("us-states.json", function(json) {
    //Bind data and create one path per GeoJSON feature
    svg.selectAll("path")
    .data(json.features)
    .enter()
    .append("path")
    .attr("d", path)
    .style("fill", "#3768B7");
  })
}
