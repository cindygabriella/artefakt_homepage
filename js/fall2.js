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
    d3.csv("csv/recycling.csv", function (d) {
      return {
        Year: +d.Year,
        Entity: d.Entity,
        plastic: +d.plastic,
      };
    }).then(function (csv) {
      data = csv;
      ready = true;
      s.redraw();
    });

    s.createCanvas(1400, 800);
    s.textSize(11);

    //warum machst du die pixel density so hoch?
    //s.pixelDensity(8);

    // test button - Achsen tauschen
    button = s.createButton('Achsen tauschen');
    button.position(70, 700);
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
    console.log('drawBarChart1');
    s.fill('#9dc79d');
    // stroke(0,0,0);
    // strokeWeight(0.2);

    s.noStroke();

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

    for (var i = 0; i < data.length; i++) {
      var d = data[i];

      //Höhe des Balkens
      //var h = 15;
      var barHeight = 15;

      //yearMin wird auf s.height gemappt
      //yearMax wird auf 0 gemappt
      var y = s.map(d.Year, yearMin, yearMax, s.height - barHeight, 0);

      //x ist immer null beim horizontal bar chart
      var x = 60;

      //ich nenne das mal barWidth damit es klar ist was gemeint ist
      var barWidth = s.map(d.plastic, plasticMin, plasticMax, 0, 750);

      s.push();                    // <- push a drawing context
      //s.rect(0 - y, s.height - x, x, h);
      s.rect(x, y, barWidth, barHeight);
      s.textAlign(s.LEFT, s.CENTER);
      s.text(d.Year, x - 60, y + 0.5 * barHeight);
      s.text(d.plastic, x - 30, y + 0.5 * barHeight);
      s.noStroke();
      s.pop();                     // <- reset the drawing context
    }
  }

  function drawBarChart2() {
    console.log('drawBarChart2');
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

    //console.log(dataSelection);
    for (var i = 0; i < data.length; i++) {
      var d = data[i];


      var y = s.map(d.plastic, plasticMin, plasticMax, 0, 750);

      //Mismanagedplasticwaste auf die y-Achse Mappen
      var x = s.map(d.Year, yearMin, yearMax, 0, 1000 - w);

      //Breite des Balkens
      var w = 15;
      s.push();                    // <- push a drawing context
      // translate(x, y);        // <- move to position

      s.rect(x, s.height - y, w, y);

      // text(d.Year, x,height-y-10);  // <- draw the label
      s.textAlign(s.CENTER);
      s.text(d.plastic, x, s.height - y - 10);
      s.text(d.Year, x, s.height - y - 30);
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
