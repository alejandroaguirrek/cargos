var ci=0;
var ce=0;
var Pci=0;
var Pce=0;
var PciP=0;
var PceP=0;
function getdata(){

    $.get(domain + "/api/balance", function (data, status) {
        addData(data);
    });

    $.get(domain + "/api/balance/today", function (data, status) {
        addNeue(data);
    });
    $.get(domain + "/api/balance/today_Programer", function (data, status) {
        addNeueProx(data);
    });
}
function addData(data){
    var total=0;
    var tipo="";
    var egresos=0;
    var ingresos=0;

    (data.data).forEach(function(element) {
        tipo=element.Tipo;
        if(tipo=="Ingreso")
        {
            ci++;
            if(ci<=5)
            {
                cambiar("ultimos5",{clear:false,id:"ingresos",Data: element,order:"last"});
            }
            ingresos=ingresos+parseFloat(element.Monto);
        }else
        {
            ce++;
            if(ce<=5)
            {
                cambiar("ultimos5",{clear:false,id:"egresos",Data: element,order:"last"});
            }
            egresos=egresos+parseFloat(element.Monto);
        }
    }, this);
    total= ingresos - egresos;
    total = Math.round(total * 100) / 100;
    if(total > 0){
        $("#TexTitlulo").html('<h5>Balance</h5><h3 class="green-text">S/. '+total.toFixed(2)+"</h3><br><br>");
    }else{
        $("#TexTitlulo").html('<h5>Balance</h5><h3 class="red-text">S/. '+total.toFixed(2)+"</h3><br><br>");
    }
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
        }, this);

        
        
    }
}