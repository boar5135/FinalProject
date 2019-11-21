var width = 2000;
var height = 1000;

var dataPromise=d3.csv("data.csv")

var mapPromise = d3.json("us-states.json")

Promise.all([mapPromise, dataPromise]).then(
    
function(data) {
    console.log("works", data)
    combine(data[0].features,data[1])
    //d3.select("#banner".text("Final Project"));

},
    
function(err) {
    console.log("err", err)
})

var combine = function(dataA, dataB) {
      var hash = {} 
    
    dataA.forEach(function(element) 
    {
    hash[element.properties.NAME]=element;              
    })
    
    dataB.forEach(function(e2)
    {
        hash[e2.NAME].data=e2;
    })
    console.log(dataA)
    createMap(dataA)
}


var createMap = function(geodata)
{
    var projection = d3.geoAlbersUsa()
    .translate([width/2, height/2])
    .scale([500])
    
    var path=d3.geoPath()
                .projection(d3.geoAlbersUsa())
    
    
    var svg = d3.select("svg")
    .attr("width", 2000)
    .attr("height", 1000)
    
    svg.selectAll("path")
    .data(geodata)
    .enter()
    .append("path")
    .attr("d", path)
    .style("fill", function(d)) {
           var value = d3.
           }
    
    var color = d3.scaleQuantize()
                  .range(["rgb(237,248,233)", "rgb(186,228,179)", "rgb(116,196,118)", "rgb949,163,84", "rgb(0,109,44)"])
    color.domain([
        d3.min(data, function(d))
    ])
}
