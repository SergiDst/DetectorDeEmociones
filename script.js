$(document).ready(function () {
    var foto

    //$("#btnEnviar").popover('hide')
    //$("#btnEliminar").popover('hide')

    $('#btnInfo').on('click', function () {
        $('#modalInfo').modal('show')
    })

    $('#btnFoto').on('click', function () {
        $('#modalVideo').modal('show')
        video()
    })

    $('#snap').on('click', function () {
        snapShot()
    })

    $('#clsInfo').on('click', function () {
        $(".info").popover('show')
        setTimeout(function () {
            $(".info").popover('hide');
            $("#btnEnviar").popover('show')
            $("#btnEliminar").popover('show')
        }, 4000);
    })

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
        $("#btnEnviar").popover('hide')
        $("#btnEliminar").popover('hide')
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
        $("#btnEnviar").popover('hide')
        $("#btnEliminar").popover('hide')
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

function snapShot() {
    $.ajax({
        url: "http://127.0.0.1:8082/foto",
        type: "POST",
        success: function (response) {
            cargarImagen(response)
            // Aquí puedes manejar la respuesta. Por ejemplo, podrías mostrar la imagen en un elemento de imagen:
            /* var image = document.createElement('img');
            image.src = "data:image/jpeg;base64," + btoa(response);
            $('.img').html(image); */
        }
    });
}


function video() {
    var video = $('.video-stream')[0];
    video.src = "http://127.0.0.1:8082/video"
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
