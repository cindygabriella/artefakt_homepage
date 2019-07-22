var sketch1 = function (s) {

  var data = [];
  var ready = false;

  var slider;
  var slider2;

  s.setup = function() {

    s.createCanvas(1700, 500);
    s.textSize(11);
    s.pixelDensity(6);
    slider = s.createSlider(400000000, 700000000, 400000000);
    //slider.position(110, 600);
    slider.position(100, 100);
    slider2 = s.createSlider(1950, 2015, 1950);
    slider2.position(100, 180);

    d3.csv("csv/globalplasticsproduction.csv", function (d) {
      return {
        Year: +d.Year,
        Entity: d.Entity,
        Globalplasticsproduction: +d.Globalplasticsproduction,
      };
    }).then(function (csv) {
      data = csv;
      ready = true;
      s.redraw();
    });




  }

  s.draw = function() {
    if (!ready) {
      s.background(255, 0, 0);
      s.noStroke();
      return;
    } else {
      s.background(255);
    }

    var d, x, y, w, h;

    s.fill('#96B396');
    s.stroke(255);


    //Globalplasticsproduction als Y-Achse, Year als X-Achse.
    // Minimum Globalplasticsproduction finden
    var plasticsMin = d3.min(data, function (d) {
      return d.Globalplasticsproduction;
    });

    //Maximum Globalplasticsproduction finden
    var plasticsMax = d3.max(data, function (d) {
      return d.Globalplasticsproduction;
    })

    //Kleinses Jahr finden
    var yearMin = d3.min(data, function (d) {
      return d.Year;
    });

    //Grösstes Jahr finden
    var yearMax = d3.max(data, function (d) {
      return d.Year;
    });

    var val = slider.value();
    var val2 = slider2.value();
    // console.log(val);


    //Anzahl Jahre rechnen
    var yearCount = yearMax - yearMin;
    for (var i = 0; i < data.length; i++) {
      var d = data[i];

      //Breite des Balkens
      var w = s.width / yearCount;

      //Jahr auf die x-Achse mappen
      //nach width-w mappen damit die breite des letzten balkens noch im canvas platz hat
      var x = s.map(d.Year, val2, yearMax, 0, s.width - w - 60);

      //y = (height / d.year) + 10;
      //Globalplasticsproduction auf die y-Achse Mappen
      var y = s.map(d.Globalplasticsproduction, plasticsMin, val, 0, 470);

      s.push();                    // <- push a drawing context
      // translate(x, y);        // <- move to position
      // rect(0, 0, w, h);
      // rect(x, 0, w, y);           // <- draw a rectangle

      s.rect(x, s.height - y, w, y);

      s.text(d.Year, x, s.height - y - 10);  // <- draw the label
      s.text("Skala der Y-Achse: 2000000 - " + slider.value(), 40, 140);
      s.text("Skala der X-Achse: " + slider2.value() + " - 2015", 40, 220);
      s.text(slider.value(), 1640, 10)
      s.text("2000000", 1650, 495)
      slider.style('background', 'red');
      s.noStroke();
      s.pop();                     // <- reset the drawing context
    }

  };

};


new p5(sketch1,'grafik1');
