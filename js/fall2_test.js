var sketch2_test = function (s) {

  var data = [];
  var ready = false;

  var button;

  s.setup = function () {
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

    // test button - Achsen tauschen
    button = s.createButton('Achsen tauschen');
    button.position(100, 2200);
    button.mousePressed(achsentauschen);
  }

  s.draw = function () {
    if (!ready) {
      s.background(255, 0, 0);
      s.noStroke();
      return;
    } else {
      s.background(250);
    }

    s.fill('#9dc79d');

    //Mismanagedplasticwaste als y-Achse, Entity als X-Achse.
    //Minimum Mismanagedplasticwaste finden
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

    // "falsch"
    for (var i = 0; i < data.length; i++) {
      var d = data[i];

      //Jahre auf die y-Achse Mappen
      //var y = s.map(d.Year, yearMin, yearMax, 0, s.height - 700);
      var y = s.map(d.Year, yearMin, yearMax, s.height, 0);
      var x = s.map(d.plastic, plasticMin, plasticMax, 0, 750);

      //Breite des Balkens
      var h = 15;

      s.push();                    // <- push a drawing context
      s.rect(0 - y, s.height - x, x, h);
      s.text(d.Year, x, y);
      s.noStroke();
      s.pop();                     // <- reset the drawing context
    }

    // Make a call to the custom function achsentauschen()
    achsentauschen()

  };

  function achsentauschen() {

  }

}

new p5(sketch2_test, 'grafik2_test');
