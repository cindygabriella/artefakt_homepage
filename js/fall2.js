var sketch2 = function (s) {

var data = [];
var ready = false;

var button;

s.setup = function() {
  d3.csv("csv/recycling.csv", function (d) {
    return {
      Year: +d.Year,
      ﻿Entity: d.﻿Entity,
      plastic: +d.plastic,
    };
  }).then(function (csv) {
    data = csv;
    ready = true;
    s.redraw();
  });

  s.createCanvas(1400, 800);
  s.textSize(11);
  //pixelDensity(8);

  // test button - Achsen tauschen
  button = s.createButton('Achsen tauschen');
  button.position(100, 1400);
  button.mousePressed(s.achsentauschen);
}

  s.draw = function() {
  if (!ready) {
    s.background(255, 0, 0);
    s.noStroke();
    return;
  } else {
    s.background(255);
  }

  s.fill('#9dc79d');
  // stroke(0,0,0);
  // strokeWeight(0.2);

  s.noStroke();

}

    s.achsentauschen = function () {

        var plasticMin = d3.min(data, function (d) {
          return d.plastic;
        });

          //Maximum Mismanagedplasticwaste finden
        var plasticMax = d3.max(data, function (d) {
          return d.plastic;
        })

        var plasticCount = plasticMax - plasticMin;


        var yearMin = d3.min(data, function (d) {
           return d.Year;
        });

        var yearMax = d3.max(data, function (d) {
           return d.Year;
        });

        var yearCount = yearMax - yearMin;

        // Make a call to the custom function achsentauschen()

    if (s.mouseIsPressed){
      for (var i = 0; i < data.length; i++) {
        var d = data[i];

        //Höhe des Balkens
        //var h = 15;
        var barHeight = 15;

        //yearMin wird auf s.height gemappt
        //yearMax wird auf 0 gemappt
        var y = s.map(d.Year, yearMin, yearMax, s.height-barHeight, 0);

        //x ist immer null beim horizontal bar chart
        var x = 60;

        //ich nenne das mal barWidth damit es klar ist was gemeint ist
        var barWidth = s.map(d.plastic, plasticMin, plasticMax, 0, 750);

        s.push();                    // <- push a drawing context
        //s.rect(0 - y, s.height - x, x, h);
        s.rect(x,y, barWidth, barHeight);
        s.textAlign(s.LEFT,s.CENTER);
        s.text(d.Year, x-60, y+0.5*barHeight);
        s.text(d.plastic, x-30, y+0.5*barHeight);
        s.noStroke();
        s.pop();                     // <- reset the drawing context
      }
    } else {
      for (var i = 0; i < data.length; i++) {
      var d = data[i];

      var y = s.map(d.plastic, plasticMin, plasticMax, 0, 750);

     //Mismanagedplasticwaste auf die y-Achse Mappen
      var x = s.map(d.Year, yearMin, yearMax, 0, 1000-w);

       //Breite des Balkens
      var w = 15;
      s.push();                    // <- push a drawing context
      // translate(x, y);        // <- move to position

      s.rect(x, s.height-y, w, y);

      // text(d.Year, x,height-y-10);  // <- draw the label
      s.textAlign(s.CENTER);
      s.text(d.plastic, x,s.height-y-10);
      s.text(d.Year, x,s.height-y-30);
      s.noStroke();
      s.pop();                     // <- reset the drawing context
    }
    }
  };
}

new p5(sketch2,'grafik2');
