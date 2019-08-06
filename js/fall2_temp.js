var sketch2 = function (s) {

  var data = [];
  var ready = false;


  var button;

  var dataSelection = [];

  const BAR_CHART_1 = "BAR_CHART_1";
  const BAR_CHART_2 = "BAR_CHART_2";
  var chartType = BAR_CHART_1;

  s.setup = function () {

    s.noLoop();
    d3.csv("csv/temperature.csv", function (d) {
      return {
        Year: +d.Year,
        Entity: d.Entity,
        median: +d.median,
      };
    }).then(function (csv) {
      data = csv;
      ready = true;
      s.redraw();
    });

    s.createCanvas(1400, 650);
    s.textSize(11);

    s.pixelDensity(10);

    // test button - Achsen tauschen
    button = s.createButton('Achsen tauschen');
    button.position(70, 500);
    button.mousePressed(s.achsentauschen);
  }

  s.draw = function () {
    if (!ready) {
      s.background(255, 0, 0);
      s.noStroke();
      return;
    } else {
      s.background(255,250,250);
    }

    if (chartType == BAR_CHART_1) {
      drawBarChart1();
    }
    else if (chartType == BAR_CHART_2) {
      drawBarChart2();
    }


  }

  function drawBarChart1() {
    // console.log('drawBarChart1');
    s.fill('#9dc79d');
    // stroke(0,0,0);
    // strokeWeight(0.2);

    s.noStroke();

    var medianMin = d3.min(data, function (d) {
      return d.median;
    });

    var medianMax = d3.max(data, function (d) {
      return d.median;
    })

    var medianCount = medianMax - medianMin;


    var yearMin = d3.min(data, function (d) {
      return d.Year;
    });

    var yearMax = d3.max(data, function (d) {
      return d.Year;
    });

    var yearCount = yearMax - yearMin;

    for (var i = 0; i < data.length; i++) {
      var d = data[i];

      //Höhe des Balkens
      //var h = 15;
      var barHeight = 1;

      //yearMin wird auf s.height gemappt
      //yearMax wird auf 0 gemappt
      var y = s.map(d.Year, yearMin, yearMax, s.height - barHeight, 0);

      //x ist immer null beim horizontal bar chart
      var x = 40;

      //ich nenne das mal barWidth damit es klar ist was gemeint ist
      var barWidth = s.map(d.median, medianMin, medianMax, 0, 640);

      s.push();
      s.rect(x, y-25, barWidth, barHeight);
      s.textAlign(s.LEFT, s.CENTER);
      // s.text(d.Year, x - 60, y + 0.5 * barHeight);
      s.textSize(16);
      s.text(yearMin,0, 640);
      s.text(yearMax,0, 10);
      s.textSize(13);
      s.text(medianMin, 40, 640);
      s.text(medianMax, 600, 640);
      // s.text(d.median, x - 30, y + 0.5 * barHeight);
      s.noStroke();
      s.pop();
    }
  }

  function drawBarChart2() {
    // console.log('drawBarChart2');
    var medianMin = d3.min(data, function (d) {
      return d.median;
    });

    var medianMax = d3.max(data, function (d) {
      return d.median;
    })

    var medianCount = medianMax - medianMin;

    var yearMin = d3.min(data, function (d) {
      return d.Year;
    });

    var yearMax = d3.max(data, function (d) {
      return d.Year;
    });

    var yearCount = yearMax - yearMin;

    for (var i = 0; i < data.length; i++) {
      var d = data[i];


      var y = s.map(d.median, medianMin, medianMax, 0, 640);

      //Mismanagedplasticwaste auf die y-Achse Mappen
      var x = s.map(d.Year, yearMin, yearMax, 0, 1400 - w);

      //Breite des Balkens
      var w = 3;
      s.push();                    // <- push a drawing context
      // translate(x, y);        // <- move to position

      s.rect(x+40, s.height - y-20, w, y);

      // text(d.Year, x,height-y-10);  // <- draw the label
      s.textAlign(s.CENTER);
      // s.text(d.median, x, s.height - y - 10);
      // s.text(d.Year, x, s.height - y - 30);
      s.textSize(13);
      s.text(yearMin, 48, 645);
      s.text(yearMax, 1385, 645);
      s.textSize(16);
      s.text(medianMin, 20, 630);
      s.text(medianMax, 20, 60);
      s.noStroke();
      s.pop();                     // <- reset the drawing context
    }
  }

  s.achsentauschen = function () {

    if (chartType == BAR_CHART_1) {
      chartType = BAR_CHART_2;
    }
    else {
      chartType = BAR_CHART_1;
    }

    s.redraw();

  }


}



new p5(sketch2, 'grafik2');
