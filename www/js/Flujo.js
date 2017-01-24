function getdata(url){

    $.get(domain + "/api/" + url, function (data, status) {
        addData(data);
    });
}
function addData(data){
    var total=0;
    var tipo="";
    (data.data).forEach(function(element) {
        tipo=element.Tipo;
        total=total+parseFloat(element.Monto);
        cambiar("flujo",{clear:false,id:"data_container",Data: element,order:"last"});
    }, this);
    $("#TexTitlulo").html('<h5>'+tipo+"</h5><h3 class='blue-text'>S/. "+total.toFixed(2)+"</h3><br><br>");
}