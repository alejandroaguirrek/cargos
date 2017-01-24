var ci=0;
var ce=0;
var Pci=0;
var Pce=0;
var PciP=0;
var PceP=0;

/*
*
*
*DOLARES VARIABLES
*
*
*/

var ciD=0;
var ceD=0;
var PciD=0;
var PceD=0;
var PciPD=0;
var PcePD=0;

function getNextURL(url,method,parameter={}){

    $.get(url,parameter, function (data, status) {
        eval(method+'(data)');
    });
}

function getURL(url,method,parameters={}){

    $.get(domain + "/api/"+url,parameters, function (data, status) {
        eval(method+'(data)');
    });
}


function getdata(parameters={}){

    $.get(domain + "/api/balance",parameters, function (data, status) {
        addData(data);
    });

    $.get(domain + "/api/balance/today",parameters, function (data, status) {
        addNeue(data);
    });
    $.get(domain + "/api/balance/today_Programer",parameters, function (data, status) {
        addNeueProx(data);
    });
}
var total=0;
var egresos=0;
var ingresos=0;
var dolares=0;
var egresosD=0;
var ingresosD=0;
function addData(data){
    var tipo="";

    console.log(data);
    (data.data).forEach(function(element) {
        if(typeof element.Olvido == "undefined"){
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
    total= ingresos - egresos;
    total = Math.round(total * 100) / 100;
    dolares=ingresosD-egresosD;
    dolares = Math.round(dolares * 100) / 100;
    if(total > 0){
        $("#TexTitlulo").html('');
        $("#TexTitlulo").append('<h5>Balance</h5><div class="row"> <div class="input-field col s6"> <input type="date"id="desdeDate" name="desde" class="datepicker"><label for="fecha" class="">desde</label><span class="text-size:1.3em">US Dolar</span><br><h5 id="DolarBalance" class="green-text">$ '+dolares.toFixed(2)+'</h5></div> <div class="input-field col s6"><input type="date"id="hastaDate" name="hasta" class="datepicker "><label for="fecha" class="">hasta</label><span class="text-size:1.3em">Soles</span><br><h5 id="SolesBalance" class="green-text">S/. '+total.toFixed(2)+'</h5></div></div><br><br>');
    }else{
        $("#TexTitlulo").html('');
        $("#TexTitlulo").append('<h5>Balance</h5><div class="row"> <div class="input-field col s6"> <input type="date"id="desdeDate" name="desde" class="datepicker"><label for="fecha" class="">desde</label><span class="text-size:1.3em">US Dolar</span><br><h5 id="DolarBalance" class="green-text">$ '+dolares.toFixed(2)+'</h5></div> <div class="input-field col s6"><input type="date"id="hastaDate" name="hasta" class="datepicker"><label for="fecha" class="">hasta</label><span class="text-size:1.3em">Soles</span><br><h5 id="SolesBalance" class="red-text">S/. '+total.toFixed(2)+'</h5> </div></div><br><br>');
    }
    $("#desdeDate").pickadate({
        selectMonths: true,
        selectYears: 15,
        
    });
    $("#hastaDate").pickadate({
        selectMonths: true,
        selectYears: 15
    });

    var picker = $('#hastaDate').pickadate('picker');
    var picker1 = $('#desdeDate').pickadate('picker');
    if(pickdate)
    {
        picker1.set('select', d2);
        picker.set('select', d1);
    }else{
    //    var date = new Date();
    //    picker.set('select', date);
    }

    picker.on("close", function(thingSet) {enviar("Hasta",$('#hastaDate').val()) });
    picker1.on("close", function(thingSet) {enviar("Desde",$('#desdeDate').val())  });
    if(data.next_page_url){
        getNextURL(data.next_page_url,'addData');
    }
}
function enviar(tipo,value)
{
    var parametros={};
    if($('#hastaDate').val()!="")
    {
        parametros.Hasta=$('#hastaDate').val();
    }else{
        parametros.Hasta="No";
    }
    if($('#desdeDate').val()!="")
    {
        parametros.Desde=$('#desdeDate').val();
    }else{
        parametros.Desde="No";  
    }
    $(location).attr('href', 'indexBalance.html?Desde='+parametros.Desde+'&Hasta='+parametros.Hasta);
    //getURL("balance","changebalance",parametros);
}

function addNeue(data){

    var total=0;
    var tipo="";
    var egresos=0;
    var ingresos=0;
    if((data.data).length<1){
        $("#proxNeue").html('');
    }else{
        (data.data).forEach(function(element) {
            if(typeof element.Olvido == "undefined"){
                tipo=element.Tipo;
                if(tipo=="Ingreso")
                {
                    Pci++;
                    if(Pci<=5)
                    {
                        cambiar("balanceProx",{clear:false,id:"Proxingresos",Data: element,order:"last"});
                    }
                    ingresos=ingresos+parseFloat(element.Monto);
                }else{
                    Pce++;
                    if(Pce<=5)
                    {
                        cambiar("balanceProx",{clear:false,id:"Proxegresos",Data: element,order:"last"});
                    }
                    egresos=egresos+parseFloat(element.Monto);
                }
            }
        }, this);

       
        
    }
}

function addNeueProx(data){

    var total=0;
    var tipo="";
    var egresos=0;
    var ingresos=0;
    if((data.data).length<1){
        $("#proxNeueProx").html('');
    }else{
        (data.data).forEach(function(element) {
            if(typeof element.Olvido == "undefined"){
                tipo=element.ingreso.Tipo;
                if(tipo=="Ingreso"){
                    PciP++;
                    if(PciP<=5){
                        if ( $( "#balance_prox_"+element.id ).length ) {
                            PciP--;
                        }else{
                            cambiar("balanceProx",{clear:false,id:"Proxingresos",Data: element,order:"last"});
                        }
                        
                    }
                    ingresos=ingresos+parseFloat(element.ingreso.Monto);
                }else{
                    PceP++;
                    if(PceP<=5){
                        if ( $( "#balance_prox_"+element.ingreso.id ).length ) {
                            PceP--;
                        }else{
                            cambiar("balanceProx",{clear:false,id:"Proxegresos",Data: element,order:"last"});
                        }
                    }
                    egresos=egresos+parseFloat(element.ingreso.Monto);
                }
            }
        }, this);

        
        
    }
}