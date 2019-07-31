var fall5 = function (s) {

  var data = [];

  var ready = false;

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

    s.createCanvas(1400, 800);
    s.textSize(12);
    //s.pixelDensity(8);

  }

  s.draw = function () {
    if (!ready) {
      s.background(255, 0, 0);
      return;
    } else {
      s.background(255);
      s.pieChart(500, data);
    }
  }


  s.pieChart = function (diameter, data){

      var lastAngle = 0;

      for (var i = 0; i < data.length; i++) {
      var d = data[i];
      var gray = s.map(i, 0, data.length, 0, 255);
      s.fill(gray);
      s.noStroke();
      s.arc(
        s.width / 2,
        s.height / 2,
        diameter,
        diameter,
        lastAngle,
        lastAngle + s.radians(d.tonnes)
      );
    lastAngle += s.radians(d.tonnes);
  }
}


}

new p5(fall5, 'grafik5');
