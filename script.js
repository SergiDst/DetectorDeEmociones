$(document).ready(function () {
    //Muestra la imagen seleccionada
    $('#file').on('change', function (e) {
        e.preventDefault()
        e.stopPropagation()
        var file = this.files[0];
        cargarImagen(file)
    });

    $('#imagen').on('dragover', function (e) {
        e.preventDefault();
        e.stopPropagation();
    });

    $('#imagen').on('drop', function (e) {
        e.preventDefault()
        e.stopPropagation()
    });

    $("#btnEliminar").on("click", function () {
        $("#imagen").attr("src", "./assets/images/default.png")
        $("#file").val("")
        $("#resultado").attr("src", "./assets/images/neutral.png")
        $("#txtResultado").html("<p>Neutral</p>")
        $("#btnEliminar").prop("disabled", true)
        $("#btnEnviar").prop("disabled", true)
        $(".fondo").removeClass("gifFeliz")
        $(".fondo").removeClass("gifTriste")
    })

    $("#btnEnviar").on("click", function () {
        var file = $("#file")[0].files[0]
        const formData = new FormData();
        formData.append("filetest", file);
        $.ajax({
            url: "http://127.0.0.1:8082/resultado",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                if (response == 0) {
                    $("#resultado").attr("src", "./assets/images/feliz.png")
                    $("#txtResultado").html("<p>Estas feliz</p>")
                    $(".fondo").addClass("gifFeliz")
                } else {
                    $("#resultado").attr("src", "./assets/images/triste.png")
                    $("#txtResultado").html("<p>Estas triste</p>")
                    $(".fondo").addClass("gifTriste")
                }
                console.log(response)
            }
        })
        $("#btnEnviar").prop("disabled", true)
    })

})

function cargarImagen(file) {
    var type = file.type;
    var reader = new FileReader();

    reader.onloadend = function () {
        $("#imagen").attr("src", reader.result);
    }

    if (type !== 'image/png' && type !== 'image/jpeg' && type !== 'image/jpg') {
        $('#modalError').modal('show')
        $("#file").val("")
        $("#imagen").attr("src", "./assets/images/default.png");
        return
    } else {
        reader.readAsDataURL(file);
        $("#btnEliminar").prop("disabled", false)
        $("#btnEnviar").prop("disabled", false)
    }
}
