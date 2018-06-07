/**
* @author   Rafael Peralta Blanco <rafael.peralta.blanco@gmail.com>
*/

// Objeto json que permite hacer consultas utilizando Ajax
var Consulta = {
/**
* 	Consulta http con el método POST
* 
*  	@param 	{string}	url 		- Url a la que se quiere hacer el post
*  	@param 	{json}		data 		- Objeto json con la información que se quiere enviar
*  	@param 	{function}	callback 	- Función a la que se avisa si hubo error
*/
	post: function(url, data, callback){

		$.ajax({
		    type: "POST",
		    url: url,
		    data: JSON.stringify(data),
		    contentType: "application/json; charset=utf-8",
		    xhrFields: {
		       withCredentials: true
		    },
		    success: function(data){callback(false);},
		    failure: function(errMsg) {
		        callback(true);
		    }
		});
	},

/**
* 	Consulta http con el método GET
*
* 	@param 	{string} 	url 		- Url a la que se quiere hacer la petición
* 	@param	{function}	callback 	- Función a la que se le envía la información consultada
*/
	get: function(url, callback){

		$.ajax({
		    url: url,
		    datatype: "json",
		    contentType: "application/json; charset=utf-8",
		    xhrFields: {
		       withCredentials: true
		    },
		    success: function(data){
		    	callback(data);
		    },
		    failure: function(errMsg) {
		        callback({});
		    }
		});
	},

/**
* 	Consulta http con el método DELETE
*
* 	@param	{string}	url 		- Url a la que se quiere hacer la consulta
* 	@param	{json}		data 		- Objeto json con los criterios para eliminar
* 	@param	{function}	callback 	- Función a la que se avisa que la consulta ya termino
*/
	delete: function(url, data, callback){
		$.ajax({
		    type: "DELETE",
		    url: url,
		    data: JSON.stringify(data),
		    contentType: "application/json; charset=utf-8",
		    xhrFields: {
		       withCredentials: true
		    },
		    success: function(data){callback(false);},
		    failure: function(errMsg) {
		        callback(true);
		    }
		});
	},

/**
* 	Consulta http con el método PUT
*
*	@param	{string}	url 		- Url a la que se quiere hacer la consulta
*	@param	{json}		data 		- Objeto json con los criterios para actualizar
*	@param	{function}	callback 	- Función a la que se avisa cuando la consulta ya termino.
*/
	put: function(url, data, callback){
		$.ajax({
		    type: "PUT",
		    url: url,
		    data: JSON.stringify(data),
		    contentType: "application/json; charset=utf-8",
		    xhrFields: {
		       withCredentials: true
		    },
		    success: function(data){callback(false);},
		    failure: function(errMsg) {
		        callback(true);
		    }
		});
	}
}