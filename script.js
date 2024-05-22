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
            $("#imagen").attr("src", "")
            return
        }
    });

    $("#btnEliminar").on("click", function () {
        $("#imagen").attr("src", "")
        $("#file").val("")
        $("#resultado").attr("src", "./assets/images/neutral.png")
        $("#txtResultado").html("<p>Neutral</p>")
        $("#btnEliminar").prop("disabled", true)
    })

    $("#btnEnviar").on("click", function () {
        var file = $("#file")[0].files[0]
        const formData = new FormData();
        formData.append("filetest", file);
        $.ajax({
            url: "http://127.0.0.1:8082/resultado",
            type: "POST",
            data: formData,
            processData: false,  // tell jQuery not to process the data
            contentType: false,  // tell jQuery not to set contentType
            success: function (response) {
                console.log(response)
            }
        })
        $("#resultado").attr("src", "./assets/images/feliz.png")
        $("#txtResultado").html("<p>Estas feliz</p>")
        $("#btnEnviar").prop("disabled", true)
    })

})


