
function iadd(url){
	_.templateSettings.variable = "rc";
	var template;
	$.ajax({
		url: "templates/"+url+".html",
		method: 'GET',
		async: false,
		dataType: 'html',
		success: function(data2) {

			template =  _.template(data2);
		}
	});
	return template;
}
function routelist() {

    this.addRoute = function (data,url) {
        this[data] =   url;
    }
}

var iroute ={};


