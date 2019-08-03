var fall3 = function (s) {

  var data = [];

  //variable die die gefilterten daten enthält
  var dataSelection = [];

  var ready = false;
  var button;
  var button2;
  var button3;
  var button4;

  var yScale = d3.scalePoint();
  var xScale = d3.scaleLinear();

  var chartWidth = 1300;
  var chartHeight = 700;


  s.setup = function () {

    s.noLoop();
    d3.csv("csv/rivers.csv", function (d) {
      return {
        Code: +d.Code,
        rivers: d.rivers,
        plastictonnes: +d.plastictonnes,
        Country1: d.Country1,
        Country2: d.Country2,
        Country3: d.Country3,
        Country4: d.Country4,
        Country5: d.Country5,
        Country6: d.Country6,
      };
    }).then(function (csv) {
      data = csv;
      dataSelection = data;
      ready = true;
      s.redraw();
    });

    s.createCanvas(1400, 800);
    s.textSize(12);
    //s.pixelDensity(8);

    button = s.createButton('Asia');
    button.position(70, 3050);
    button.mousePressed(s.test);

    button2 = s.createButton('South America');
    button2.position(70, 3100);
    button2.mousePressed(s.test2);

    button3 = s.createButton('Africa');
    button3.position(70, 3150);
    button3.mousePressed(s.test3);

    button4 = s.createButton('All Continents');
    button4.position(70, 3000);
    button4.mousePressed(s.test4);

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
      return d.plastictonnes;
    });

    xScale.domain([0, maxPop])
      .range([0, chartWidth]);

    var minPop = d3.min(data, function (d) {
      return d.plastictonnes;
    });

    // var river = d3.set(data, function (d) {
    //   return d.rivers;
    // }).values();
    var river = d3.set(dataSelection, function (d) {
      return d.rivers;
    }).values();

    console.log('river');
    console.log(river);

    var barHeight = 30;
    var barGap = 5;
    chartHeight = river.length * (barHeight + barGap);

    yScale.domain(river)
      .range([0, chartHeight - barHeight - barGap]);

    for (var i = 0; i < dataSelection.length; i++) {

      var d = dataSelection[i];

      var barWidth = xScale(d.plastictonnes);

      var y = yScale(d.rivers);

      s.fill('#D8E5D8');

      s.noStroke();
      s.rect(0, y, barWidth, barHeight);


      s.fill('black');
      s.noStroke();
      s.textAlign(s.LEFT, s.CENTER);
      s.text(d.rivers, barWidth + 10, y + 0.5 * barHeight);
      s.text(maxPop, 1300, 730);
      s.text(minPop, 0, 730);

    }
  }

  s.test = function () {
    dataSelection = data.filter(function (d) {
      return d.Country1 == 'Asia';

    });
    s.redraw();
  }

  s.test2 = function () {
    dataSelection = data.filter(function (d) {
      return d.Country1 == 'South America';

    });
    s.redraw();
  }

  s.test3 = function () {
    dataSelection = data.filter(function (d) {
      return d.Country1 == 'Africa';

    });
    s.redraw();
  }

  s.test4 = function () {
    dataSelection = data.filter(function (d) {
      return d.Country1;

    });
    s.redraw();
  }

}

new p5(fall3, 'grafik3');
