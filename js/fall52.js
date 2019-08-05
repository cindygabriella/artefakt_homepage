var fall52 = function (s) {

  var data = [];

  //variable die die gefilterten daten enthält
  // var dataSelection = [];

  var ready = false;
  var button;
  var button2;
  var button3;
  var button4;

  var yScale = d3.scalePoint();
  var xScale = d3.scaleLinear();

  var chartWidth = 1300;
  var chartHeight = 600;


  s.setup = function () {

    s.noLoop();
    d3.csv("csv/surface.csv", function (d) {
      return {
        Entity: d.﻿Entity,
        tonnes: +d.tonnes,
      };
    }).then(function (csv) {
      data = csv;
      ready = true;
      s.redraw();
    });

    s.createCanvas(1400, 700);
    s.textSize(12);
    //s.pixelDensity(8);

    // button4 = s.createButton('All Continents');
    // button4.position(70, 280);
    // button4.mousePressed(s.test4);
    //
    // button = s.createButton('Asia');
    // button.position(70, 330);
    // button.mousePressed(s.test);
    //
    // button2 = s.createButton('South America');
    // button2.position(70, 380);
    // button2.mousePressed(s.test2);
    //
    // button3 = s.createButton('Africa');
    // button3.position(70, 430);
    // button3.mousePressed(s.test3);



  }



  s.draw = function () {
    if (!ready) {
      s.background(255, 0, 0);
      s.noStroke();
      return;
    } else {
      s.background(255,250,250);
    }

    var maxPop = d3.max(data, function (d) {
      return d.tonnes;
    });

    xScale.domain([0, maxPop])
      .range([0, chartWidth]);

    var minPop = d3.min(data, function (d) {
      return d.tonnes;
    });

    // var river = d3.set(data, function (d) {
    //   return d.rivers;
    // }).values();
    var entity = d3.set(data, function (d) {
      return d.Entity;
    }).values();

    var barHeight = 30;
    var barGap = 4;
    chartHeight = entity.length * (barHeight + barGap);

    yScale.domain(entity)
      .range([0, chartHeight - barHeight - barGap]);

    for (var i = 0; i < data.length; i++) {

      var d = data[i];

      var barWidth = xScale(d.tonnes);

      var y = yScale(d.Entity);

      s.fill('#D8E5D8');

      s.noStroke();
      s.rect(0, y, barWidth, barHeight);


      s.fill('black');
      s.noStroke();
      s.textAlign(s.LEFT, s.CENTER);
      s.text(d.Entity, barWidth + 10, y + 0.5 * barHeight);
      s.text(maxPop, 1300, 690);
      s.text(minPop, 0, 690);

    }
  }


}

new p5(fall52, 'grafik52');
