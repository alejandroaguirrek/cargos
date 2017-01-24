function changebalance(data){
    total=0;
    dolares=0;
    ingresos=0;
    ingresosD=0;
    egresos=0;
    egresosD=0;
    $('#SolesBalance').html("0");
    $('#DolarBalance').html("0");
    var tipo="";
    $("#ingresos").html('');    
    $("#egresos").html('');
    console.log(data);
    (data.data).forEach(function(element) {
        if(!element.Olvido)
        {       
            tipo=element.Tipo;
            if(tipo=="Ingreso")
            {
                ci++;
                if(ci<=5)
                {
                    cambiar("ultimos5",{clear:false,id:"ingresos",Data: element,order:"last"});
                }
                if(element.Moneda==null || element.Moneda=="Soles")
                {

                    ingresos=ingresos+parseFloat(element.Monto);
                }else{
                    ingresosD=ingresosD+parseFloat(element.Monto);
                }
            }else
            {
                ce++;
                if(ce<=5)
                {
                    cambiar("ultimos5",{clear:false,id:"egresos",Data: element,order:"last"});
                }
                if(element.Moneda==null || element.Moneda=="Soles")
                {
                    egresos=egresos+parseFloat(element.Monto);
                }else{
                    egresosD=egresosD+parseFloat(element.Monto);
                }
            }
         }
    }, this);
    total = ingresos - egresos;
    total = Math.round(total * 100) / 100;
    dolares = ingresosD-egresosD;
    dolares = Math.round(dolares * 100) / 100;
    if(total > 0){
        $('#SolesBalance').html(dolares);
        $('#DolarBalance').html(total);
    }else{
        $('#DolarBalance').html(dolares);
        $('#SolesBalance').html(total);
    }    
}

var QueryString = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  } 
  return query_string;
}();