var fall5 = function (s) {

  var data = [];
  var ready = false;
  var rScale = d3.scaleLinear();

  s.setup = function () {
    d3.csv("csv/surface.csv", function (d) {
      return {
        ﻿Entity: d.﻿Entity,
        tonnes: +d.tonnes,
      };
    }).then(function (csv) {
      data = csv;
      ready = true;
      s.redraw();
    });

    s.createCanvas(700, 600);
    s.textSize(12);
    // s.pixelDensity(10);

  }

  s.draw = function () {
    if (!ready) {
      s.background(255, 0, 0);
      return;
    } else {
      s.background(255,250,250);
      s.pieChart(500, data);
    }
  }


  s.pieChart = function (diameter, data){

      var tonnesMin = d3.min(data, function(d){
      return d.tonnes;
      });

      var tonnesMax = d3.max(data, function(d){
      return d.tonnes;
      });

      rScale.domain([tonnesMin, tonnesMax]).range([1, 300]);

      var lastAngle = 0;

      for (var i = 0; i < data.length; i++) {
      var d = data[i];
      var r = rScale(d.tonnes);
      var green = s.map(i, 0, data.length, 0, 255);
      s.noStroke();
      s.fill(green, 140, 20);
      s.arc(
        s.width / 2,
        s.height / 2,
        diameter,
        diameter,
        lastAngle,
        lastAngle + s.radians(r)
      );

      lastAngle += s.radians(r);
      s.fill("black");
      s.text(d.tonnes, r, s.arc);

  }
}


}

new p5(fall5, 'grafik5');
