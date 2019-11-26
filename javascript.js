var width = 900;
var height = 700;

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
    drawMap(dataA)
}

var setup = function(geodata)
{
    var crimecolor = d3.scaleSequential(d3.interpolateBlues)
    .domain([0,d3.max(geodata,function(d) {    
        var value = d.data
       
        if(value) {
            return value.Crime
        }
        else {
            return 0
        }
    })])
    //console.log(color.domain())
   
    var incomecolor = d3.scaleSequential(d3.interpolateGreens)
    .domain([0,d3.max(geodata,function(d) {    
        var value = d.data
       
        if(value) {
            return value.Income
        }
        else {
            return 0
        }
    })])
    //console.log(color.domain())

   
    var projection = d3.geoAlbersUsa()
    .translate([width/2, height/2])
    .scale([500])
   
    var path=d3.geoPath()
        .projection(d3.geoAlbersUsa())
   
   
    var svg = d3.select("svg")
    .attr("width", 900)
    .attr("height", 700)
   
    svg.selectAll("path")
    .data(geodata)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("fill", function(d) {
        var value = d.data
        console.log(d.data)
       
        if(value) {
            return crimecolor(value.Crime)
        }
        else {
            return "#ccc"
        }})
     
    svg.selectAll("path")
    .attr("d", path)
    .attr("stroke", function(d) {
        var value= d.data
        console.log(d.data)
       
        if (value)
        {
            console.log(value.Income)
            console.log(incomecolor(value.Income))
            return incomecolor(value.Income)
        }
        else 
        {
            return "#ccc"
        }
   
    })
    .attr("stroke-width", 3)

}



/*on("mouseover", function(d) {
    d3.select(this)
    svg.append("text")
    .attr("id","tooltip")
    .attr("x", 30)
    .attr("y", 40)
    .attr("font-size", "25px")
    .attr("fill", "black")
    .text("Crime Rate Per 100,000 People: "+ value.Crime)
})

   
}



var displayData = function(geodata) {
var filterParameter=d3.select("#geoSelect")
    .property("value")

var filterData= geodata.filter(function()
 {
if (filterParameter == "Crime")
{
   
return (createCrime)
   
}
   
else if (filterParameter == "Incarceration")
   
{
    return (createIncarceration)
}

else if (filterParameter == "Minimum Wage")

    {
        return (createWage)
    }
    return filterData
})}*/
