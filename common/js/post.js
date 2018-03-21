var Consulta = {
	post: function(url, data, callback){

		$.ajax({
		    type: "POST",
		    url: url,
		    // The key needs to match your method's input parameter (case-sensitive).
		    data: JSON.stringify(data),
		    contentType: "application/json; charset=utf-8",
		    success: function(data){callback(false);},
		    failure: function(errMsg) {
		        callback(true);
		    }
		});
	},


	get: function(url, callback){
		$.ajax({
		    url: url,
		    // The key needs to match your method's input parameter (case-sensitive).
		    datatype: "json",
		    contentType: "application/json; charset=utf-8",
		    success: function(data){
		    	callback(data);
		    },
		    failure: function(errMsg) {
		        callback({});
		    }
		});
	},

	delete: function(url, data, callback){
		$.ajax({
		    type: "DELETE",
		    url: url,
		    // The key needs to match your method's input parameter (case-sensitive).
		    data: JSON.stringify(data),
		    contentType: "application/json; charset=utf-8",
		    success: function(data){callback(false);},
		    failure: function(errMsg) {
		        callback(true);
		    }
		});
	},

	put: function(url, data, callback){
		$.ajax({
		    type: "PUT",
		    url: url,
		    // The key needs to match your method's input parameter (case-sensitive).
		    data: JSON.stringify(data),
		    contentType: "application/json; charset=utf-8",
		    success: function(data){callback(false);},
		    failure: function(errMsg) {
		        callback(true);
		    }
		});
	}
}