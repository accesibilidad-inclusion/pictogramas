document.addEventListener('DOMContentLoaded', function() {
  // Utilidad para obtener un elemento por id
  const getById = function(id) {
    return document.getElementById(id);
  };

  // Instancias de los selectores de cada capa
  const subjectSwitch  = getById('sel-subject');
  const landmarkSwitch = getById('sel-landmark');
  const contextSwitch  = getById('sel-context');
  const actionSwitch   = getById('sel-icon');

  // Asociación entre el número de capa y su select correspondiente
  const layersToSwitches = {
    1: subjectSwitch,   // capa de acción (subject)
    2: landmarkSwitch,  // capa de hito/elemento (landmarks)
    3: contextSwitch,   // capa de contexto
    4: actionSwitch     // capa del ícono de refuerzo
  };

  // Cargar el manifest de pictogramas y poblar los selectores
  fetch('./public/es/manifest.json')
    .then(resp => resp.ok ? resp.json() : Promise.reject(new Error('No se pudo cargar el manifest')))
    .then(data => {
      if (!data || !data.properties || !Array.isArray(data.properties.pictos)) {
        console.warn('[pictogramas] Manifest con formato inesperado');
        return;
      }
      // Ordenar pictogramas por etiqueta (o por ruta si no hay etiqueta)
      const sortedPictos = data.properties.pictos.slice().sort((a, b) => {
        const labelA = a.label ? a.label : a.path.split('/')[1];
        const labelB = b.label ? b.label : b.path.split('/')[1];
        return labelA.localeCompare(labelB);
      });
      sortedPictos.forEach(pictogram => {
        const selectEl = layersToSwitches[pictogram.layer];
        if (!selectEl) {
          return;
        }
        const newOption = document.createElement('option');
        newOption.value = pictogram.path;
        newOption.innerHTML = pictogram.label ? pictogram.label : pictogram.path.split('/')[1];
        selectEl.append(newOption);
      });
    })
    .catch(err => {
      console.warn('[pictogramas] Error cargando manifest:', err);
    });

  document.addEventListener('change', event => {
    if (event.target.classList.contains('layer-switch')) {
      const targetElement = event.target.dataset.target;
      const val = event.target.value || '';
      const newSrc = val.startsWith('http://') || val.startsWith('https://')
        ? val
        : (val ? 'src/' + val : '');
      const targetImg = getById(targetElement);
      if (targetImg) {
        targetImg.src = newSrc;
      }
    }
  });

  // === PICTOS DEMO autoplay ===
  (function() {
    // Helper: establece un valor en el select y dispara change,
    // añadiendo una opción temporal si no existe.
    function setLayer(selectId, value) {
      const selectEl = document.getElementById(selectId);
      if (!selectEl) return;
      if (value && !Array.from(selectEl.options).some(opt => opt.value === value)) {
        const opt = document.createElement('option');
        opt.value = value;
        const baseName = value.split('/').pop() || value;
        opt.textContent = '[demo] ' + baseName.replace(/[-_]/g, ' ').replace(/\.svg$/i, '');
        opt.dataset.demo = 'true';
        selectEl.appendChild(opt);
      }
      selectEl.value = value || '';
      selectEl.dispatchEvent(new Event('change', { bubbles: true }));
    }

    // Crear botón y leyenda
    const demoBtn = document.createElement('button');
    demoBtn.id = 'pictos-demo-toggle';
    demoBtn.textContent = 'DEMO';
    demoBtn.className = 'pictos-demo-toggle';
    document.body.appendChild(demoBtn);

    const caption = document.createElement('div');
    caption.id = 'pictos-demo-caption';
    caption.className = 'pictos-demo-caption is-hidden';
    document.body.appendChild(caption);

    let demoData = [];
    let demoIndex = 0;
    let timerId = null;
    let running = false;

    function applyPicto(picto) {
      if (!picto) return;
      setLayer('sel-subject',  picto.action  || '');
      setLayer('sel-landmark', picto.element || '');
      setLayer('sel-context',  picto.context || '');
      setLayer('sel-icon',     picto.icon    || '');
      // Actualizar textarea con la instrucción. En el nuevo JSON,
      // picto.text puede ser una cadena simple o un objeto con idiomas.
      const textarea = document.getElementById('type');
      let text;
      if (typeof picto.text === 'string') {
        text = picto.text;
      } else if (picto.text && (picto.text.es || picto.text.en)) {
        text = picto.text.es || picto.text.en;
      } else {
        text = '';
      }
      // Asegurar que empiece en mayúscula
      if (text) {
        text = text.charAt(0).toUpperCase() + text.slice(1);
      }
      if (textarea) {
        textarea.value = text;
      }
      // Actualizar leyenda
      caption.textContent = text;
      caption.classList.toggle('is-hidden', !running);
    }

    function nextPicto() {
      if (!demoData.length) return;
      applyPicto(demoData[demoIndex % demoData.length]);
      demoIndex = (demoIndex + 1) % demoData.length;
    }

    function startDemo() {
      if (!demoData.length) return;
      running = true;
      // Añadir clase al body para ocultar selectores y etiquetas durante el autoplay
      document.body.classList.add('autoplay-running');
      demoBtn.classList.remove('is-paused');
      caption.classList.remove('is-hidden');
      nextPicto();
      timerId = setInterval(nextPicto, 2100);
    }

    function stopDemo() {
      running = false;
      // Quitar la clase del body cuando se detiene el autoplay
      document.body.classList.remove('autoplay-running');
      demoBtn.classList.add('is-paused');
      caption.classList.add('is-hidden');
      if (timerId) {
        clearInterval(timerId);
        timerId = null;
      }
    }

    demoBtn.addEventListener('click', () => {
      running ? stopDemo() : startDemo();
    });

    // Cargar el JSON de ejemplos y arrancar demo
    fetch('./examples.json')
      .then(resp => {
        if (!resp.ok) throw new Error('No se pudo cargar examples.json');
        return resp.json();
      })
      .then(json => {
        if (Array.isArray(json)) {
          demoData = json;
        } else if (Array.isArray(json.items)) {
          demoData = json.items;
        } else {
          console.warn('[PICTOS DEMO] Formato JSON no reconocido.');
        }
        if (demoData.length) {
          startDemo();
        }
      })
      .catch(err => {
        console.warn('[PICTOS DEMO] Error cargando ejemplos:', err);
      });
  })();
});