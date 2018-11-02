var linearColors = ["#FF530D","#E82C0C","#FF0000","#E80C7A","#FF0DFF","#A40DFF","#0DFFF7","#0DFF10","#FFC700"];

$('.CommonAttribute').hide().slice( 0, 2 ).show();

var newArray = [];

var startTime;
var endTime; 

var currentIndex;

var times = {
    2:[],
    3:[],
    4:[],
    5:[],
    6:[],
    7:[],
    8:[],
};

var Atimes = {
    2:[],
    3:[],
    4:[],
    5:[],
    6:[],
    7:[],
    8:[],
};

var scatterTimes = [];

var scatterAvgTimes = [];

var avgLinearTime={};



$(".DropdownClass").change(function () {

    if ($(this).attr('name') == 'Count') {
        var number = $(this).val();
        currentIndex = number;

        $('.CommonAttribute').hide().slice( 0, number ).show();
        $('.CommonAttribute').each(function(index){
            $(this).css("fill", "black");
        });
    }
});

$(".linearButton").click(function(){



    $('.CommonAttribute').each(function(index){
        $(this).css("fill",'#'+(Math.random()*0xFFFFFF<<0).toString(16));
    });

        startTime = new Date().getTime();

});

$(".CommonAttribute").click(function(){
    something();
    endTime = new Date().getTime();

    scatterTimes.push({"x": currentIndex, "y": (endTime - startTime), "color": $(this).css("fill") });



    times[currentIndex].push((endTime - startTime));
    
    Atimes[currentIndex] = [];


    Atimes[currentIndex].push(average(times[currentIndex]).toFixed(2));
    avgLinearTime[currentIndex] = average(times[currentIndex]).toFixed(2);
    $('#timeLinear').text( "Time taken: " + (endTime - startTime) + " ms");
    $('#avgTimeLinear').text("Current average time for these number of choices is: " + average(times[currentIndex]).toFixed(2) );
    
    $('.CommonAttribute').each(function(index){
        $(this).css("fill", "black");
    });
    updateScatterPlot();

    
  

})


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }


var average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;

var scatterLinearX = [];
var scatterLinearY = [];

var something = function(){
    scatterLinearX = [];
    scatterLinearY = [];
    for(index in times){
        for( var i = 0 ; i < times[index].length ; i++){
            scatterLinearX.push(+index);
            scatterLinearY.push(times[index][i]);
        }
    }

}


$(document).ready(function() {
    makeScatterPlot();
});


var updateScatterPlot = () => {



 // Select the section we want to apply our changes to
 var svg = d3.select(".michart");

 // Make the changes
    //  svg.select(".line")   // change the line
    //      .duration(750)
    //      .attr("d", valueline(data));
    //  svg.select(".x.axis") // change the x axis
    //      .duration(750)
    //      .call(xAxis);
    //  svg.select(".y.axis") // change the y axis
    //      .duration(750)
    //      .call(yAxis);

    var margin = {top: 20, right: 20, bottom: 30, left: 70},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
    
    var xValue = function(d) { return d.x;}, // data -> value
    xScale = d3.scale.linear().range([0, width]), // value -> display
    xMap = function(d) { return xScale(xValue(d));}, // data -> display
    xAxis = d3.svg.axis().scale(xScale).orient("bottom");

// setup y
var yValue = function(d) { return d.y;}, // data -> value
    yScale = d3.scale.linear().range([height, 0]), // value -> display
    yMap = function(d) { return yScale(yValue(d));}, // data -> display
    yAxis = d3.svg.axis().scale(yScale).orient("left");




    svg.selectAll(".dot")
        .data(scatterTimes)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", xMap)
        .attr("cy", yMap)
        .style("fill", function(d) { return d.color;}) 
        .on("mouseover", function(d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html(d["x"] + "<br/> (" + xValue(d) 
                + ", " + yValue(d) + ")")
                .style("left", (d3.event.pageX + 5) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });

};


var makeScatterPlot = () => {
    
    var margin = {top: 20, right: 20, bottom: 30, left: 70},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    /* 
    * value accessor - returns the value to encode for a given data object.
    * scale - maps value to a visual display encoding, such as a pixel position.
    * map function - maps from data value to display value
    * axis - sets up axis
    */ 

    // setup x 
    var xValue = function(d) { return d.x;}, // data -> value
        xScale = d3.scale.linear().range([0, width]), // value -> display
        xMap = function(d) { return xScale(xValue(d));}, // data -> display
        xAxis = d3.svg.axis().scale(xScale).orient("bottom");

    // setup y
    var yValue = function(d) { return d.y;}, // data -> value
        yScale = d3.scale.linear().range([height, 0]), // value -> display
        yMap = function(d) { return yScale(yValue(d));}, // data -> display
        yAxis = d3.svg.axis().scale(yScale).orient("left");

    // setup fill color

    // var cValue = function(d) { return d.Manufacturer;},
    //     color = d3.scale.category10();


    

    // add the graph canvas to the body of the webpage
    var svg = d3.select("#linearAvgGraph").append("svg")
        .attr("class","michart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // add the tooltip area to the webpage
    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // load data
    // d3.csv("cereal.csv", function(error, data) {

    // // change string (from CSV) into number format
    // data.forEach(function(d) {
    //     d.Calories = +d.Calories;
    //     d["Protein (g)"] = +d["Protein (g)"];
    // //    console.log(d);
    // });



    // don't want dots overlapping axis, so add in buffer to data domain
    xScale.domain([2,10]);
    yScale.domain([300, 1500]);

    // x-axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("Number of Choices");

    // y-axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Time taken (ms)");

    // draw dots
    svg.selectAll(".dot")
        .data(scatterTimes)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", xMap)
        .attr("cy", yMap)
        .style("fill", function(d) { return d.color;}) 
        .on("mouseover", function(d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html(d["x"] + "<br/> (" + xValue(d) 
                + ", " + yValue(d) + ")")
                .style("left", (d3.event.pageX + 5) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });

    // draw legend
    var legend = svg.selectAll(".legend")
        .data(color.domain())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    // draw legend colored rectangles
    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    // draw legend text
    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d;});

}


var makeScatterPlot2 = () =>{
  
};

