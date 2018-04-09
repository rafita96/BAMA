$(document).ready(function(){
    $("#nombre").val($("#nombre").val().capitalize());
    $("#aPaterno").val($("#aPaterno").val().capitalize());
    $("#aMaterno").val($("#aMaterno").val().capitalize());

    $( "#guardar" ).click(function() {
        $("form#target :input").each(function(){
            this.value = this.value.toLowerCase();;
        });
        $( "#target" ).submit();
    });

    $('#datepicker').datepicker({
        format: 'dd/mm/yyyy',
        disableTouchKeyboard: true,
        language: 'es'
    });
});