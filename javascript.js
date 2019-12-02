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
setupCrime(dataA)
    changeMap(dataA)
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
    d3.scaleSequential(d3.interpolateGreens)
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
    
var crimeLegend=function(geodata) {

var width="100";
var height="25";
    
var svg=d3.select("#legend")
.attr("width", "700")
.attr("height", "100")

var colors=d3.scaleSequential(d3.interpolateBlues)
.domain([100,600])
var boxes=["100","200","300","400","500","600"]
svg.selectAll("rect")
    .data(boxes)
    .enter()
    .append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("x", function(d,i) {
    return (width*i+75)
})
    .attr("y", function(d,i) {
    return "10"
})
    .attr("fill", function(d) {
    return colors(d)
})
    svg.selectAll("text")
    .data(boxes)
    .enter()
    .append("text")
    .attr("id", "crimerate")
    .attr("x", function(d,i) {
        return (width*i+85)
    })
    .attr("y", function(d,i) {
        return"65"
    }) 
    .text(function(d) {
    return d+ " people"})
    .attr("fill", "black")
}
crimeLegend(geodata)
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
    d3.scaleSequential(d3.interpolateGreens)
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
    
var incarcerationLegend=function(geodata) {

var width="100";
var height="25";
    
var svg=d3.select("#legend")
.attr("width", "700")
.attr("height", "100")

var colors=d3.scaleSequential(d3.interpolateGreens)
.domain([100,600])
var boxes=["100","200","300","400","500","600"]
svg.selectAll("rect")
    .data(boxes)
    .enter()
    .append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("x", function(d,i) {
    return (width*i+75)
})
    .attr("y", function(d,i) {
    return "10"
})
    .attr("fill", function(d) {
    return colors(d)
})
    svg.selectAll("text")
    .data(boxes)
    .enter()
    .append("text")
    .attr("id", "crimerate")
    .attr("x", function(d,i) {
        return (width*i+85)
    })
    .attr("y", function(d,i) {
        return"65"
    }) 
    .text(function(d) {
    return d+ " people"})
    .attr("fill", "black")
}
incarcerationLegend(geodata)       
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
    d3.scaleSequential(d3.interpolateGreens)
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
    
var wageLegend=function(geodata) {

var width="100";
var height="25";
    
var svg=d3.select("#legend")
.attr("width", "900")
.attr("height", "100")

var colors=d3.scaleSequential(d3.interpolatePurples)
.domain([7,14])
var boxes=["7","8","9","10","11","12","13","14"]
svg.selectAll("rect")
    .data(boxes)
    .enter()
    .append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("x", function(d,i) {
    return (width*i+75)
})
    .attr("y", function(d,i) {
    return "10"
})
    .attr("fill", function(d) {
    return colors(d)
})
    svg.selectAll("text")
    .data(boxes)
    .enter()
    .append("text")
    .attr("id", "crimerate")
    .attr("x", function(d,i) {
        return (width*i+85)
    })
    .attr("y", function(d,i) {
        return"65"
    }) 
    .text(function(d) {
    return "$"+ d})
    .attr("fill", "black")
}
wageLegend(geodata)
drawMap(geodata,"Wage", pathgenerator, crimecolor,incarcerationcolor,wagecolor,incomecolor)

}

var drawMap = function(geodata, whichstring, pathgenerator, crimecolor, incarcerationcolor, wagecolor, incomecolor) {
    
        var svg = d3.select("svg")
    .attr("width", 900)
    .attr("height", 700)
 
    var map = d3.select("svg").selectAll("path")
    .data(geodata)
    .enter()
    .append("path")
    .attr("d", pathgenerator)
     .attr("fill", function(d) {
        var value = d.data
        //console.log(d.data)
       
        if(whichstring=="Crime") 
        {
            if(value) 
            {
                return crimecolor(value.Crime)
            }
            
            else 
            {
                return "#ccc"
            }
        }
        else if(whichstring=="Incarceration")
        {
            if(value)
            {
            return incarcerationcolor(value.Incarceration)
            }
            
            else 
            {
                return "#ccc"
            }
        }
        else if(whichstring=="Wage") 
        {
                    if(value) 
                {
                return wagecolor(value.Wage)
                }
                else 
                {
                    return "ccc"
                }
       
        }
     })

.on("mouseover", function(d)
 {
    console.log("Crime")
     if (whichstring == "Crime") 
{
    console.log("Crime")
     d3.selectAll("path")
    svg.append("text")
    .attr("id","tooltip")
     .attr("x", 650)
     .attr("y", 20)
     .attr("font-size", "25px")
     .attr("fill","black")
.text(d.properties.NAME)
    
    svg.append("text")
    .attr("id", "tooltip")
    .attr("x", 650)
    .attr("y", 50)
    .attr("font-size", "11px")
    .text("Crime Per 100,000 People:  " +  d.data.Crime)
    
    svg.append("text")
    .attr("id", "tooltip")
    .attr("x", 650)
    .attr("y", 80)
    .attr("font-size", "11px")
    .text("Median Household Income:  " + "$" + d.data.Income)
 }
     else if (whichstring=="Incarceration") 
{
d3.select("path")
    svg.append("text")
    .attr("id","tooltip")
     .attr("x", 645)
     .attr("y", 20)
     .attr("font-size", "25px")
     .attr("fill","black")
.text(d.properties.NAME)
         
    svg.append("text")
    .attr("id", "tooltip")
    .attr("x", 645)
    .attr("y", 50)
    .attr("font-size", "11px")
    .text("Incarceration Per 100,000 People:  " + d.data.Incarceration) 
    
    svg.append("text")
    .attr("id", "tooltip")
    .attr("x", 645)
    .attr("y", 80)
    .attr("font-size", "11px")
    .text("Median Household Income:  " + "$" + d.data.Income)

}
 
else if (whichstring=="Wage") 
    {
    d3.select("path")
    svg.append("text")
    .attr("id","tooltip")
     .attr("x", 645)
     .attr("y", 20)
     .attr("font-size", "25px")
     .attr("fill","black")
.text(d.properties.NAME)
    svg.append("text")
    .attr("id", "tooltip")
    .attr("x", 645)
    .attr("y", 50)
    .attr("font-size", "11px")
    .text("Average Minimum Wage:  " + "$" + d.data.Wage)
     svg.append("text")
    .attr("id", "tooltip")
    .attr("x", 645)
    .attr("y", 80)
    .attr("font-size", "11px")
    .text("Median Household Income:  " + "$" + d.data.Income)
    }})
.on("mouseout", function() {
    d3.selectAll("#tooltip").remove()
})


 d3.select("svg").selectAll("path")
    .attr("d", pathgenerator)
    .attr("stroke", function(d) {
        var value= d.data
        //console.log(d.data)
       
        if (value)
        {
            return incomecolor(value.Income)
        }
        else 
        {
            return "#ccc"
        }})
    .attr("stroke-width", 4)
    .on("mouseover", function (d) {
     d3.select(this)
     .attr("stroke-width", function (d) {
         {return 5}
     })
 })
    .on("mouseout", function(d) {
     d3.select(this)
     .attr("stroke-width", function (d) {
         {return 3}
   
})})}
    

var changeMap = function(geodata) {
    d3.select("#changeMap")
    .on("click", function()
    {
        d3.select("#map").selectAll("*").remove()
        d3.select("#legend").selectAll("*").remove()
        return displayData(geodata)
    }
)}

   

var displayData = function(geodata) {
var filterParameter=d3.select("#geoSelect")
    .property("value")
console.log(filterParameter)
{
if (filterParameter == "Crime Rate per 100,000 people")
{
return setupCrime(geodata)
   
}
   
else if (filterParameter == "Incarceration Rate per 100,000 people")
   
{
    return setupIncarceration(geodata)
}

else if (filterParameter == "Minimum Wage")

    {
         return setupWage(geodata)
    }
    return filterData
}}
