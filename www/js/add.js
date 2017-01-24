$(document).ready(function () {
    $('select').material_select();
    $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 15
    });
});

$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};


function submit(url) {
    var rest = $('#send').serializeObject();
    console.log($('#send').serializeObject());
    $.post(domain + "/api/" + url, rest, function (data, status) {
        alert("Data: " + data + "\nStatus: " + status);
    });
}
$('#Programado_Body').hide();
$('#Programado').change(function () {
    if ($('#Programado').is(":checked")) {
        var ind = $('#Nueva_Fecha').data("index");
        cambiar("fecha", { clear: false, id: "Programado_Fecha", Data: { index: ind }, order: "last" });
        $('#Nueva_Fecha').data("index", (ind + 1));
        $('#Programado_Body').show();
        $('#totalProgramado').val("1");

    } else {
        $('#Nueva_Fecha').data("index", 1);
        $('#Programado_Body').hide();
        $('#Programado_Fecha').html('');
        $('#totalProgramado').val("0");
    }
});


$('#Nueva_Fecha').click(function () {
    if ($('#Programado').is(":checked")) {
        var ind = $('#Nueva_Fecha').data("index");
        cambiar("fecha", { clear: false, id: "Programado_Fecha", Data: { index: ind }, order: "last" });
        $('#Nueva_Fecha').data("index", (ind + 1));
        $('#totalProgramado').val("" + (ind));

    }
});
$('#Borrar_Fecha').click(function () {
    if ($('#Programado').is(":checked")) {
        var ind = $('#Nueva_Fecha').data("index");
        if (ind > 2) {
            $('#fecha_div_' + (ind - 1)).remove();
            $('#Nueva_Fecha').data("index", (ind - 1));
            $('#totalProgramado').val("" + (ind - 2));

        }
    }
});


$('#Periodico_Body').hide();
$('#Periodico').change(function () {
    if ($('#Periodico').is(":checked")) {
        $('#Periodico_Body').append('<input id="periodicos" name="periodico" type="text" class="validate white-text">\n<label for="periodicos" class="white-text">Días</label>');
        $('#Periodico_Body').show();
    } else {
        $('#Periodico_Body').hide();
        $('#Nueva_Fecha').data("index", 1);
        $('#Periodico_Body').html('');
    }
});