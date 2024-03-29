var fall3 = function (s) {

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

    s.createCanvas(1200, 600);
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
      s.background(255, 250, 250);
    }


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

      var x = s.map(d.Year, yearMin, yearMax, 0, s.width - w - 60);

      //Breite des Balkens
      var w = 15;
      s.push();                    // <- push a drawing context
      //s.rect(x+35, s.height - y-30, w, y);

      s.fill('#c5e3d2');
      s.noStroke();
      s.rect(x, s.height - y - 10, w, y);


      s.pop();
    }

    s.textAlign(s.LEFT, s.CENTER);
    s.noStroke();
    s.fill('black');
    s.textSize(13);
    s.text(yearMin, 10, 590);
    s.text(yearMax, 1125, 590);
    // s.text(d.Year, x, s.height - y - 40);
    s.textSize(15);
    s.text(concentrationMin, 0, 570);
    s.text(concentrationMax, 10, 50);

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

      // var x = s.map(d.Year, yearMin, yearMax, 0, s.width - w - 60);
      var x = s.map(d.Year, yearMin, yearMax, 0, s.width - w - 60);

      //Breite des Balkens
      var w = 15;
      s.push();
      s.fill('#c5e3d2');
      s.noStroke();
      s.rect(x, s.height - y - 10, w, y);
      s.pop();
    }

          s.textAlign(s.LEFT, s.CENTER);
          s.fill('black');
          s.noStroke();
          s.textSize(13);
          s.text(yearMin, 10, 590);
          s.text(yearMax, 1125, 590);
          // s.text(d.Year, x, s.height - y - 10);
          s.textSize(15);
          s.text(concentrationMax, 0, 570);
          s.text(concentrationMin, 10, 50);
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


new p5(fall3, 'grafik3');
