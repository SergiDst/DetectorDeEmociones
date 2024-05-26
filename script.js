$(document).ready(function () {
    var foto
    $("#btnInfo").click(function(){
        $(".info").popover('show');
        setTimeout(function(){
            $(".info").popover('hide');
        }, 5000);
    });

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
        cargarImagen(e.originalEvent.dataTransfer.files[0])
        foto = e.originalEvent.dataTransfer.files[0]
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
        $(".fondo").removeClass("gifError")
    })

    $("#btnEnviar").on("click", function () {
        var file = $("#file")[0].files[0]
        const formData = new FormData()
        if (file === undefined) {
            formData.append("filetest", foto)
            cargarFile(formData)
        } else {
            formData.append("filetest", file)
            cargarFile(formData)
        }
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

function cargarFile(formData) {
    $.ajax({
        url: "http://127.0.0.1:8082/archivo",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            Resultado(response)
        }
    })
}


function Resultado(response) {
    if (response == 0) {
        $("#resultado").attr("src", "./assets/images/feliz.png")
        $("#txtResultado").html("<p>Estas feliz</p>")
        $(".fondo").addClass("gifFeliz")
    } else if (response == 1) {
        $("#resultado").attr("src", "./assets/images/triste.png")
        $("#txtResultado").html("<p>Estas triste</p>")
        $(".fondo").addClass("gifTriste")
    } else {
        $("#resultado").attr("src", "./assets/images/Error.png")
        $("#txtResultado").html("<p>No se pudo detectar la emoción</p>")
        $(".fondo").addClass("gifError")
    }
    console.log(response)
}
