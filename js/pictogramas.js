/**
 * Pictogramas
 *
 */

let data;
let layer1, layer2, layer3;
let sel1, sel2, sel3;
let img1, img2, img3;

function setup() {
  layer1 = [];
  layer2 = [];
  layer3 = [];

  img1 = document.getElementById("1-subject");
  img2 = document.getElementById("2-landmarks");
  img3 = document.getElementById("3-context");

  data = loadJSON("public/en/manifest.json", gotData, "json");
}

function draw() {}

function gotData() {
  sel1 = createSelect();
  sel2 = createSelect();
  sel3 = createSelect();

  sel1.parent("#controls");
  sel2.parent("#controls");
  sel3.parent("#controls");

  sel1.changed(swap1);
  sel2.changed(swap2);
  sel3.changed(swap3);

  for (let key in data.properties.pictos) {
    let picto = data.properties.pictos[key];
    switch (picto.layer) {
      case 1:
        layer1.push(picto);
        sel1.option(picto.label);
        break;
      case 2:
        layer2.push(picto);
        sel2.option(picto.label);
        break;
      case 3:
        layer3.push(picto);
        sel3.option(picto.label);
        break;
    }
  }
}

function swap1() {
  let current = sel1.value();
  for (let i in layer1) {
    if (current === layer1[i].label) {
      img1.src = "src/" + layer1[i].path;
    }
  }
}

function swap2() {
  let current = sel2.value();
  for (let i in layer2) {
    if (current === layer2[i].label) {
      img2.src = "src/" + layer2[i].path;
    }
  }
}

function swap3() {
  let current = sel3.value();
  for (let i in layer3) {
    if (current === layer3[i].label) {
      img3.src = "src/" + layer3[i].path;
    }
  }
}
