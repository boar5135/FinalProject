var width = 900;
var height = 700;

var dataPromise=d3.csv("data.csv")

var mapPromise = d3.json("us-states.json")

Promise.all([mapPromise, dataPromise]).then(
   
function(data) {
    console.log("works", data)
    combine(data[0].features,data[1])
    changeMap(data)
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
    setupCrime(dataA)
}

var setupCrime = function(geodata)
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
   
    var incomecolor = d3.scaleSequential(d3.interpolateReds)
    .domain([0,d3.max(geodata,function(d) {    
        var value = d.data
       
        if(value) {
            return value.Income
        }
        else {
            return 0
        }
    })])
    
    console.log("hi")
    
    var incarcerationcolor= 
    d3.scaleSequential(d3.interpolateOranges)
    .domain([0,d3.max(geodata,function(d) {    
        var value = d.data
       
        if(value) {
            return value.Incarceration
        }
        else {
            return 0
        }
    })])
    
    var wagecolor=
       d3.scaleSequential(d3.interpolatePurples)
    .domain([7.25, d3.max(geodata,function(d){    
        var value = d.data
       
        if(value) {
            return value.Wage
        }
        else {
            return 0
        }
    })])
    
    //console.log(color.domain())

   
    var projection = d3.geoAlbersUsa()
    .translate([width/2, height/2])
    .scale([500])
   
    var pathgenerator=d3.geoPath()
        .projection(d3.geoAlbersUsa())
   
   
    var svg = d3.select("svg")
    .attr("width", 900)
    .attr("height", 700)
        console.log(incomecolor(5))
drawMap(geodata,"Crime", pathgenerator, crimecolor,incarcerationcolor,wagecolor,incomecolor)

}

var setupIncarceration = function(geodata)
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
   
    var incomecolor = d3.scaleSequential(d3.interpolateReds)
    .domain([0,d3.max(geodata,function(d) {    
        var value = d.data
       
        if(value) {
            return value.Income
        }
        else {
            return 0
        }
    })])
    
    console.log("hi")
    
    var incarcerationcolor= 
    d3.scaleSequential(d3.interpolateOranges)
    .domain([0,d3.max(geodata,function(d) {    
        var value = d.data
       
        if(value) {
            return value.Incarceration
        }
        else {
            return 0
        }
    })])
    
    var wagecolor=
       d3.scaleSequential(d3.interpolatePurples)
    .domain([7.25, d3.max(geodata,function(d){    
        var value = d.data
       
        if(value) {
            return value.Wage
        }
        else {
            return 0
        }
    })])
    
    //console.log(color.domain())

   
    var projection = d3.geoAlbersUsa()
    .translate([width/2, height/2])
    .scale([500])
   
    var pathgenerator=d3.geoPath()
        .projection(d3.geoAlbersUsa())
   
   
    var svg = d3.select("svg")
    .attr("width", 900)
    .attr("height", 700)
        console.log(incomecolor(5))
drawMap(geodata,"Incarceration", pathgenerator, crimecolor,incarcerationcolor,wagecolor,incomecolor)

}

var setupWage = function(geodata)
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
   
    var incomecolor = d3.scaleSequential(d3.interpolateReds)
    .domain([0,d3.max(geodata,function(d) {    
        var value = d.data
       
        if(value) {
            return value.Income
        }
        else {
            return 0
        }
    })])
    
    console.log("hi")
    
    var incarcerationcolor= 
    d3.scaleSequential(d3.interpolateOranges)
    .domain([0,d3.max(geodata,function(d) {    
        var value = d.data
       
        if(value) {
            return value.Incarceration
        }
        else {
            return 0
        }
    })])
    
    var wagecolor=
       d3.scaleSequential(d3.interpolatePurples)
    .domain([7.25, d3.max(geodata,function(d){    
        var value = d.data
       
        if(value) {
            return value.Wage
        }
        else {
            return 0
        }
    })])
    
    //console.log(color.domain())

   
    var projection = d3.geoAlbersUsa()
    .translate([width/2, height/2])
    .scale([500])
   
    var pathgenerator=d3.geoPath()
        .projection(d3.geoAlbersUsa())
   
   
    var svg = d3.select("svg")
    .attr("width", 900)
    .attr("height", 700)
        console.log(incomecolor(5))
drawMap(geodata,"Wage", pathgenerator, crimecolor,incarcerationcolor,wagecolor,incomecolor)

}

var drawMap = function(geodata, whichstring, pathgenerator, crimecolor, incarcerationcolor, wagecolor, incomecolor)
{
        console.log(incomecolor(5))
    var map = d3.select("svg").selectAll("path")
    .data(geodata)
    .enter()
    .append("path")
    .attr("d", pathgenerator)
    .attr("fill", function(d) {
        var value = d.data
        console.log(d.data)
       
        if(whichstring=="Crime") 
        {
            if(value) {
                return crimecolor(value.Crime)
            }
            
            else {
                return "#ccc"
            }
        }
        else if(whichstring=="Incarceration")
        {
            if(value) {
            return incarcerationcolor(value.Incarceration)
            }
            
            else {
                return "#ccc"
            }
        }
        else if(whichstring=="Wage") 
                {
                    if(value) {
                return wagecolor(value.Wage)
                }
                else {
                    return "ccc"
                }
    }})
     
    d3.select("svg").selectAll("path")
    .attr("d", pathgenerator)
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

    
   /* .on("mouseover", function(d) {
    d3.select(this)
    svg.append("text")
    .attr("id","tooltip")
    .attr("x", 30)
    .attr("y", 40)
    .attr("font-size", "25px")
    .attr("fill", "black")
    .text("Crime Rate Per 100,000 People: "+ value.Crime)
})*/

var changeMap = function(geodata) {
    d3.select("#changeMap")
    .on("click", function()
    {
        d3.select("path")
        .remove()
        return displayData(geodata)
    }
)}

   

var displayData = function(geodata) {
var filterParameter=d3.select("#geoSelect")
    .property("value")

var filterData= geodata.filter(function()
 {
if (filterParameter == "Crime Rate")
{
return setupCrime(geodata)
   
}
   
else if (filterParameter == "Incarceration Rate")
   
{
    return setupIncarceration(geodata)
}

else if (filterParameter == "Minimum Wage")

    {
         return setupWage(geodata)
    }
    return filterData
})}


