$(document).ready(function () {
    //Muestra la imagen seleccionada
    $('#file').on('change', function () {
        var file = this.files[0];
        var type = file.type;
        var reader = new FileReader();

        reader.onloadend = function () {
            $("#imagen").attr("src", reader.result);
        }

        if (file) {
            reader.readAsDataURL(file);
            $("#btnEliminar").prop("disabled", false)
        } else {
            $("#imagen").attr("src", "");
        }

        if (type !== 'image/png' && type !== 'image/jpeg' && type !== 'image/jpg') {
            $('#modalError').modal('show')
            $("#file").val("")
            return
        }
    });

    $("#btnEliminar").on("click", function () {
        $("#imagen").attr("src", "")
        $("#file").val("")
        $("#btnEliminar").prop("disabled", true)
    })

})


