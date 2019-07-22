var fall3 = function (s) {

  var data = [];
  var ready = false;
  var button;
  var button2;
  var button3;

  s.setup = function() {
    d3.csv("csv/rivers.csv", function (d) {
      return {
        Code: +d.Code,
        Entity: d.Entity,
        Plastictonnes: +d.Plastictonnes,
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

    s.createCanvas(1300, 800);
    s.textSize(11);
    //pixelDensity(8);

    button = s.createButton('Alle Länder');
    button.position(100, 3200);
    button.mousePressed();

    button2 = s.createButton('Brazil');
    button2.position(100, 3230);
    button2.mousePressed();

    button3 = s.createButton('China');
    button3.position(100, 3260);
    button3.mousePressed();


  }



  s.draw = function() {
  if (!ready) {
    s.background(255, 0, 0);
    s.noStroke();
    return;
  } else {
    s.background(255);
  }

  var d, x, y, w, h, land;

  s.fill('black');

  var tonnesMin = d3.min(data, function (d) {
    return d.Plastictonnes;
  });

    //Maximum Mismanagedplasticwaste finden
  var tonnesMax = d3.max(data, function (d) {
    return d.Plastictonnes;
  })

  var tonnesCount = tonnesMax - tonnesMin;
  // 321100

  var codeMin = d3.min(data, function (d) {
    return d.Code;
  });

  var codeMax = d3.max(data, function (d) {
    return d.Code;
  });


  for (var i = 0; i < data.length; i++){
    var d = data[i];
    var w = s.width / tonnesCount;
    var x = s.map(d.Plastictonnes, tonnesMin, tonnesMax, 0, s.width - w - 60);
    var y = [d.﻿Entity];
    //var y = s.map(d.Code, codeMin, codeMax, 0, 600);
    s.push();
    s.rect(x, s.height - y, w, y);
    s.pop();
    }






}









}

new p5(fall3,'grafik3');
