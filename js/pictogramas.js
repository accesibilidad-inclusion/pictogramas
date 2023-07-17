/**
 * Pictogramas
<<<<<<< HEAD
 *
 */

let data;
let layer1, layer2, layer3, layer4;
let sel1, sel2, sel3, sel4;
let img1, img2, img3, img4;

function setup() {
    layer1 = [];
    layer2 = [];
    layer3 = [];
    layer4 = [];

    img1 = document.getElementById("1-subject");
    img2 = document.getElementById("2-landmarks");
    img3 = document.getElementById("3-context");
    img4 = document.getElementById("4-actions");

    data = loadJSON("public/es/manifest.json", gotData, "json");

    let h = img1.offsetHeight;
    let p = document.getElementById("pictos");
    p.setAttribute('height', h);
}

function draw() {}

function gotData() {
    sel1 = createSelect();
    sel2 = createSelect();
    sel3 = createSelect();
    sel4 = createSelect();

    sel1.id('sel-action');
    sel2.id('sel-element');
    sel3.id('sel-context');
    sel4.id('sel-icon');

    sel1.parent("#control-action");
    sel2.parent("#control-element");
    sel3.parent("#control-context");
    sel4.parent("#control-icon");

    sel1.changed(swap1);
    sel2.changed(swap2);
    sel3.changed(swap3);
    sel4.changed(swap4);

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
            case 4:
                layer4.push(picto);
                sel4.option(picto.label);
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

function swap4() {
    let current = sel4.value();
    for (let i in layer4) {
        if (current === layer4[i].label) {
            img4.src = "src/" + layer4[i].path;
        }
    }
}
=======
 */

const id = function( id ){
	return document.getElementById( id );
}

document.addEventListener(
	'DOMContentLoaded',
	function() {
		const subjectSwitch  = id('sel-subject');
		const landmarkSwitch = id('sel-landmark');
		const contextSwitch  = id('sel-context');
		const actionSwitch   = id('sel-icon');
		const layersToSwitches = {
			1: subjectSwitch,
			2: landmarkSwitch,
			3: contextSwitch,
			4: actionSwitch
		};
		window.fetch(
			'./public/es/manifest.json'
		).then(
			resp => resp.json()
		).then(
			data => {
				const sortedPictos = data.properties.pictos.sort(
					(a, b) => {
						const labelA = a.label ? a.label : a.path.split('/')[1];
						const labelB = b.label ? b.label : b.path.split('/')[1];
						return labelA.localeCompare( labelB );
					}
				);
				sortedPictos.forEach(
					pictogram => {
						const newOption = document.createElement('option');
						newOption.value = pictogram.path;
						newOption.innerHTML =
							pictogram.label ?
							pictogram.label :
							pictogram.path.split('/')[1];
						layersToSwitches[ pictogram.layer ].append( newOption );
					}
				);
			}
		);
		document
			.addEventListener('change', event => {
				if ( event.target.classList.contains('layer-switch') ) {
					const targetElement = event.target.dataset.target;
					id(targetElement).src = event.target.value ? 'src/'+event.target.value : '';
				}
			});
	}
);
>>>>>>> qa
