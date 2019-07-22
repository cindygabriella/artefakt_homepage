var fall3 = function (s) {

  var data = [];
  var ready = false;

  s.setup = function() {
    d3.csv("csv/rivers.csv", function (d) {
      return {
        ﻿Entity: d.﻿Entity,
        Plastictonnes: +d.Plastictonnes,
        Country1: d.Country1,
        Country2: d.Country2,
        Country3: d.Country3,
        Country4: d.Country4,
        Country5: d.Country5,
        Country6: d.Country6,
      };
    }).then(function (csv) {
      data = csv;
      ready = true;
      s.redraw();
    });

    s.createCanvas(1300, 800);
    s.textSize(11);
    //pixelDensity(8);
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

  for (var i = 0; i < data.length; i++){


    }




}









}

new p5(fall3,'grafik3');
