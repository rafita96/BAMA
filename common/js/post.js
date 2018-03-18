function post(url, data){

	var error = true;
	$.ajax({
	    type: "POST",
	    url: url,
	    // The key needs to match your method's input parameter (case-sensitive).
	    data: JSON.stringify(data),
	    contentType: "application/json; charset=utf-8",
	    success: function(data){error = false;},
	    failure: function(errMsg) {
	        error = true;
	    }
	});

	return error;
}
