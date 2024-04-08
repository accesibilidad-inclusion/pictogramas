/**
 * Pictogramas

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