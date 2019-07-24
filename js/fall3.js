var fall3 = function (s) {

  var data = [];
  var ready = false;
  var button;
  // var button2;
  // var button3;

  var yScale = d3.scalePoint();
  var xScale = d3.scaleLinear();

  var chartWidth = 1300;
  var chartHeight = 700;

  s.setup = function() {
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
      ready = true;
      s.redraw();
    });

    s.createCanvas(1400, 800);
    s.textSize(12);
    //s.pixelDensity(8);

    button = s.createButton('Remove Brantas (Indonesia)');
    button.position(50, 2200);
    button.mousePressed(s.test);
    //
    // button2 = s.createButton('Brazil');
    // button2.position(100, 3230);
    // button2.mousePressed();
    //
    // button3 = s.createButton('China');
    // button3.position(100, 3260);
    // button3.mousePressed();

}



  s.draw = function() {
  if (!ready) {
    s.background(255, 0, 0);
    s.noStroke();
    return;
  } else {
    s.background(255);
  }

  // textures.js
    var svg = d3.select("#grafik");
    var t = textures.paths().d("waves").thicker().stroke("#D8E5D8");
    svg.call(t);

    var kreis1 = d3.select("#kreis1");
    kreis1.style("fill", t.url());

  var maxPop = d3.max(data,function(d){
  return d.plastictonnes;
    });

  xScale.domain([0,maxPop])
      .range([0,chartWidth]);

      var minPop = d3.min(data,function(d){
      return d.plastictonnes;
        });

  var river = d3.set(data,function(d){
      return d.rivers;
    }).values();


    var barHeight = 30;

    yScale.domain(river)
   .range([0,chartHeight-barHeight]);

  for (var i = 0; i < data.length; i++){
    var d = data[i];
    //data.filter(function(d){return d.rivers != "Brantas (Indonesia)"});
    //var dataFilter = data.filter(function(d){return d.rivers != "Brantas (Indonesia)"});
    var barWidth = xScale(d.plastictonnes);
    var y = yScale(d.rivers);

    s.fill('#D8E5D8');

    s.noStroke();
    s.rect(0,y,barWidth,barHeight);


    s.fill('black');
    s.noStroke();
    s.textAlign(s.LEFT,s.CENTER);
    s.text(d.rivers,barWidth+10,y+0.5*barHeight);
    s.text(maxPop, 1300, 730);
    s.text(minPop, 0, 730);

        // test textures.js
        // var test = d3.select("#defaultCanvas2");
        // var t = textures.paths().d("waves").thicker().stroke("#D8E5D8");
        // test.call(t);
        //
        // var rect = d3.select(rect);
        // rect.style("fill", t.url());
    }
}

  s.test = function() {
    var dataFilter = data.filter(function(d){
      return d.rivers!= "Brantas (Indonesia)"
      s.redraw();
    });
  }

}

new p5(fall3,'grafik3');
