var data = [];
var ready = false;

var projection = null;
var rScale = d3.scaleLinear();

var one;
var hover = false;

function setup() {
  createCanvas(1700, 600);
  textSize(11);
  //noLoop();
  pixelDensity(8);
  uxNoStroke();

  projection = d3.geoMercator() //Projektionsart, Auflistung von Projektionen:https://github.com/d3/d3-geo#projections
  .center([16.62878166, 9.995240903]) //Kartenmittelpunkt
  .translate([width / 2, height / 2]) //Screen Position des Kartenmittelpunktes
  .scale(160);

  d3.csv("csv/waste.csv", function (d) {
    return {
      Entity: d.Entity,
      waste: +d.waste,
      capital: d.capital,
      lat: +d.lat,
      long: +d.long,
    };
  }).then(function (csv) {
    data = csv;
    ready = true;
    redraw();
  });
}

function draw() {
  if (!ready) {
    background(255, 0, 0);
    noStroke();
    return;
  } else {
    background(255);
  }

  var wasteMax = d3.max(data, function(d){
  return d.waste;
  });

  rScale.domain([0, wasteMax]).range([1, 100]);

  //fill('#9dc79d');
  stroke(0,0,0);

  for (var i = 0; i < data.length; i++) {
  var d = data[i];
  var lon = data[i].long;
  var lat = data[i].lat;
  var pos = projection([lon, lat]);
  var rot = map(d.waste, 0, 300, 255, 0);
  fill(255, rot, rot);
  noStroke();

  if(d.waste < 0.2){
  var r = rScale(d.waste);
  ellipse(pos[0], pos[1], r, r);
  }

  if(d.waste > 0.2){
  var r = rScale(d.waste);
  ellipse(pos[0], pos[1], r, r);
  }

  text(d.Entity, pos[0], pos[1]);

}

    one = uxRect(100, 100, 100, 100);
    one.uxEvent('hover', trigger);


    if (hover) {
      for (var i = 0; i < data.length; i++) {
      var d = data[i];
      var lon = data[i].long;
      var lat = data[i].lat;
      var pos = projection([lon, lat]);
      var rot = map(d.waste, 0, 300, 255, 0);

      if(d.waste < 0.2){
      var r = rScale(d.waste);
      fill(255,0,0, 200);
      //stroke("black");
      ellipse(pos[0], pos[1], r, r);
      }

      if(d.waste > 0.2){
      var r = rScale(d.waste);
      fill(255,0,0, 80);
          //stroke("black");
      ellipse(pos[0], pos[1], r, r);
      }
    }
    one.uxFill = '#79c65d';
     hover = false;
    } else {
      for (var i = 0; i < data.length; i++) {
      var d = data[i];
      var lon = data[i].long;
      var lat = data[i].lat;
      var pos = projection([lon, lat]);
      var rot = map(d.waste, 0, 300, 255, 0);

      if(d.waste < 0.2){
      var r = rScale(d.waste);
      fill(85,107,47, 200);
      //stroke("black");
      ellipse(pos[0], pos[1], r, r);
      }

      if(d.waste > 0.2){
      var r = rScale(d.waste);
      fill(85,107,47, 80);
      //stroke("black");
      ellipse(pos[0], pos[1], r, r);
      }
    }
     one.uxFill = '#C65D5D';
      }

}

function trigger() {
  hover = true;
}
