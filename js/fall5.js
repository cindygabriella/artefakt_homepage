var fall5 = function (s) {

  var data = [];
  var ready = false;
  var rScale = d3.scaleLinear();

  var button;
  var button2;

  const KUCHEN = "kuchen";
  const BALKEN = "balken";
  var chartType = KUCHEN;

  var yScale = d3.scalePoint();
  var xScale = d3.scaleLinear();

  var chartWidth = 700;
  var chartHeight = 200;

  s.setup = function () {
    s.noLoop();
    d3.csv("csv/surface.csv", function (d) {
      return {
        Entity: d.Entity,
        tonnes: +d.tonnes,
      };
    }).then(function (csv) {
      data = csv;
      //calculate percentages
      var sum = 0;
      for (let i = 0; i < data.length; i++) {
        sum += data[i].tonnes;
      }
  
      for (let i = 0; i < data.length; i++) {
       var d = data[i];
       d.tonnesPerc = d.tonnes / sum;
      }

      

      ready = true;
      s.redraw();
    });

    s.createCanvas(850, 500);
    s.textSize(12);
    // s.pixelDensity(10);

    button = s.createButton('Kuchendiagramm');
    button.position(70, 400);
    button.mousePressed(s.kuchen);

    button2 = s.createButton('Balkendiagramm');
    button2.position(70, 450);
    button2.mousePressed(s.balken);
  }

  s.draw = function () {
    if (!ready) {
      s.background(255, 0, 0);
      return;
    } else {
      s.background(255, 250, 250);
    }

    if (chartType == KUCHEN) {
      drawkuchen(400, data);
    }
    else if (chartType == BALKEN) {
      drawbalken();
    }
  }

  function drawkuchen(diameter, data) {

    var tonnesMin = d3.min(data, function (d) {
      return d.tonnesPerc;
    });

    var tonnesMax = d3.max(data, function (d) {
      return d.tonnesPerc;
    });

    rScale.domain([0, 1]).range([0, 360]);

    var lastAngle = 0;

    for (var i = 0; i < data.length; i++) {
      var d = data[i];
      var r = rScale(d.tonnesPerc);
      var green = s.map(i, 0, data.length, 0, 255);
      s.noStroke();
      s.fill(green, 200, 140);
      s.stroke('white');

      s.arc(
        s.width / 2,
        s.height / 2,
        diameter,
        diameter,
        lastAngle,
        lastAngle + s.radians(r)
      );

      let v = p5.Vector.fromAngle(lastAngle+0.5*s.radians(r), 0.5*diameter+30);

      s.push();
      s.translate(s.width / 2,s.height / 2);
      s.textSize(14);
      s.fill("black");
      s.textAlign(s.CENTER,s.CENTER)
      s.text(d.tonnes, v.x, v.y);
      s.pop();
      lastAngle += s.radians(r);
    }
  }

  function drawbalken() {

    var maxPop = d3.max(data, function (d) {
      return d.tonnes;
    });

    xScale.domain([0, maxPop])
      .range([0, chartWidth]);

    var minPop = d3.min(data, function (d) {
      return d.tonnes;
    });

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
      s.rect(0, y + 30, barWidth, barHeight);

      s.fill('black');
      s.noStroke();
      s.textAlign(s.LEFT, s.CENTER);
      s.text(d.Entity, barWidth + 10, y + 0.5 * barHeight + 30);
      s.text(maxPop, 690, 10);
      s.text(minPop, 0, 10);
      // s.text(d.tonnes, 0, y + 0.5 * barHeight+30 )
    }
  }

  s.kuchen = function () {
    chartType = KUCHEN;
    s.redraw();
  }

  s.balken = function () {
    chartType = BALKEN;
    s.redraw();
  }

}

new p5(fall5, 'grafik5');
