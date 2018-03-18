function post(url, data){
	$.ajax({
	    type: "POST",
	    url: url,
	    // The key needs to match your method's input parameter (case-sensitive).
	    data: JSON.stringify(data),
	    contentType: "application/json; charset=utf-8",
	    success: function(data){console.log(data)},
	    failure: function(errMsg) {
	        console.log(errMsg);
	    }
	});
}
