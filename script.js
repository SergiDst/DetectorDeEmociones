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
            $("#btnEnviar").prop("disabled", false)
        } else if (type !== 'image/png' && type !== 'image/jpeg' && type !== 'image/jpg') {
            $('#modalError').modal('show')
            $("#file").val("")
            $("#imagen").attr("src", "");
            return
        }
    });

    $("#btnEliminar").on("click", function () {
        $("#imagen").attr("src", "")
        $("#file").val("")
        $("#btnEliminar").prop("disabled", true)
    })

    $("#btnEnviar").on("click", function () {
        var imagenUrl = $("#imagen").attr("src");
            $.ajax({
            url: "miapi",
            type: "POST",
            data: imagenUrl,
            processData: false,
            contentType: false,
            success: function (response) {
                console.log(response)
                /* $("#resultado").attr("src", "")
                $("#btnEnviar").prop("disabled", true) */
            }
        })

    })

})


