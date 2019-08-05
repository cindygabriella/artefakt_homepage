var fall4 = function (s) {

  var data = [];
  var ready = false;

  var button;

  const BAR_CHART_1 = "BAR_CHART_1";
  const BAR_CHART_2 = "BAR_CHART_2";
  var chartType = BAR_CHART_1;

  s.setup = function () {

    s.noLoop();
    d3.csv("csv/global-co-concentration-ppm.csv", function (d) {
      return {
        Year: +d.Year,
        concentration: +d.concentration,
      };
    }).then(function (csv) {
      data = csv;
      ready = true;
      s.redraw();
    });

    s.createCanvas(1400, 600);
    s.textSize(12);
    //s.pixelDensity(15);

    button = s.createButton('Achsenwerte drehen');
    button.position(70, 400);
    button.mousePressed(s.achsendrehen);

  }

  s.draw = function () {
    if (!ready) {
      s.background(255, 0, 0);
      s.noStroke();
      return;
    } else {
      s.background(255,250,250);
    }

    s.fill('#c5e3d2');
    s.noStroke();

    if (chartType == BAR_CHART_1) {
      drawBarChart1();
    }
    else if (chartType == BAR_CHART_2) {
      drawBarChart2();
    }
  }

function drawBarChart1() {

    var concentrationMin = d3.min(data, function (d) {
      return d.concentration;
    });

    var concentrationMax = d3.max(data, function (d) {
      return d.concentration;
    })

    var concentrationCount = concentrationMax - concentrationMin;


    var yearMin = d3.min(data, function (d) {
      return d.Year;
    });

    var yearMax = d3.max(data, function (d) {
      return d.Year;
    });

    var yearCount = yearMax - yearMin;

    for (var i = 0; i < data.length; i++) {
      var d = data[i];

      var y = s.map(d.concentration, concentrationMin, concentrationMax, 0, 520);

      var x = s.map(d.Year, yearMin, yearMax, 0, 1360 - w);

      //Breite des Balkens
      var w = 15;
      s.push();                    // <- push a drawing context
      s.rect(x+35, s.height - y-30, w, y);

      s.textAlign(s.LEFT, s.CENTER);
      // s.text(d.Year, x - 60, y + 0.5 * barHeight);
      s.fill("black");
      s.noStroke();
      s.textSize(12);
      s.text(yearMin, 45, 580);
      s.text(yearMax, 1374, 580);
      s.textSize(16);
      s.text(concentrationMin, 0, 570);
      s.text(concentrationMax, 10, 30);

      s.pop();
    }
  }


  function drawBarChart2() {

    var concentrationMin = d3.min(data, function (d) {
      return d.concentration;
    });

    var concentrationMax = d3.max(data, function (d) {
      return d.concentration;
    })

    var concentrationCount = concentrationMax - concentrationMin;


    var yearMin = d3.min(data, function (d) {
      return d.Year;
    });

    var yearMax = d3.max(data, function (d) {
      return d.Year;
    });

    var yearCount = yearMax - yearMin;

    for (var i = 0; i < data.length; i++) {
      var d = data[i];

      var y = s.map(d.concentration, concentrationMin, concentrationMax, 520, 0);

      var x = s.map(d.Year, yearMin, yearMax, 0, 1360 - w);

      //Breite des Balkens
      var w = 15;
      s.push();                    // <- push a drawing context
      s.rect(x+35, s.height - y-30, w, y);

      s.textAlign(s.LEFT, s.CENTER);
      // s.text(d.Year, x - 60, y + 0.5 * barHeight);
      s.fill("black");
      s.noStroke();
      s.textSize(12);
      s.text(yearMin, 45, 580);
      s.text(yearMax, 1374, 580);
      s.textSize(16);
      s.text(concentrationMax, 0, 570);
      s.text(concentrationMin, 10, 30);

      s.pop();
    }

  }

  s.achsendrehen = function () {

    if (chartType == BAR_CHART_1) {
      chartType = BAR_CHART_2;
    }
    else {
      chartType = BAR_CHART_1;
    }

    s.redraw();

  }


}


new p5(fall4, 'grafik4');
