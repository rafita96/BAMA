function guardar() {
	post('/database/crear/usuario/', { 
		nombre: $('#nombre').val(),
		aPaterno: $('#aPaterno').val(),
		aMaterno: $('#aMaterno').val(),
		fechaNacimiento: new Date($('#fechaNacimiento').val()),
	});
}