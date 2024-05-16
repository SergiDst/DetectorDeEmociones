$(document).ready(function (){
    //Solo permite archivos de imagen
    $('#exampleInputEmail1').on('dragover', function (event) {
        event.preventDefault();
        var items = event.originalEvent.dataTransfer.items;
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item.kind === 'file') {
                var type = item.type;
                if (type !== 'image/png' && type !== 'image/jpeg' && type !== 'image/jpg') {
                    $('#modalError').modal('show');
                    return;
                }
            }
        }
    });

    //Muestra la imagen seleccionada
    $('#exampleInputEmail1').on('change', function() {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('.figure-img').attr('src', e.target.result);
        }
        reader.readAsDataURL(this.files[0]);
    });
    
})
    

