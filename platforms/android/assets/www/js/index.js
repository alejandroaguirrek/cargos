var domain = "http://192.168.1.50:8000";
cambiar("menu",{clear:false,id:"body",order:"first"});
function cambiar(url,data={clear:true,Data:{},id:"body",order:"last"}){
    if(data.clear==true)
    {
        $( "#"+data.id ).html("");
    }
     BodyTemplate   =  iadd(url);
     if(data.order=="last")
     {
        $( "#"+data.id ).append(
                BodyTemplate( data.Data )
        );
     }
     if(data.order=="first")
     {
         $( "#"+data.id ).prepend(
                BodyTemplate( data.Data )
        );
     }
 }