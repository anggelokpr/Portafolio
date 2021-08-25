const grid = new Muuri('.grid', {
	  layout: {	  	
	    rounding: false,
  	   }
});

window.addEventListener('load', () => {
	grid.refreshItems().layout();
	document.getElementById('grid').classList.add('imagenes-cargadas');

// agregamos lis listener de los enlaces para obtener las categorias
	const enlaces = document.querySelectorAll('#categorias a')
	enlaces.forEach( (elemento) => {
		elemento.addEventListener('click', (evento) => {
			evento.preventDefault();
			enlaces.forEach((enlace) => enlace.classList.remove('activo'));
			evento.target.classList.add('activo');

			const categoria = evento.target.innerHTML.toLowerCase();
			categoria === 'todo' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`);
		});
	});	

		// Agregar listener en la barra de busqueda
		document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {
			const busqueda = evento.target.value;
			grid.filter( (item) => item.getElement().dataset.etiquetas.includes(busqueda) );
		});

		// Listener de las imagenes
		const overlay = document.getElementById('overlay');
		document.querySelectorAll('.grid .item img').forEach( (elemento) =>{

			elemento.addEventListener('click', () => {
				const ruta = elemento.getAttribute('src');
				const descripcion = elemento.parentNode.parentNode.dataset.descripcion;

				overlay.classList.add('activo');
				document.querySelector('#overlay img').src = ruta;
				document.querySelector('#overlay .descripcion').innerHTML = descripcion;
			})
		});

		// EVENT LISTENER DE BTN CERRAR
		document.querySelector('#btn-cerrar-popup').addEventListener('click', () => {
			overlay.classList.remove('activo');
		})
		// EVENT LISTENER DEL OVERLAY
		overlay.addEventListener('click', (evento) => {
			evento.target.id === 'overlay' ? overlay.classList.remove('activo'): '';
		});
});