const formulariop = document.querySelector("#form");
formulariop.addEventListener('submit', (e) =>{
    e.preventDefault();
    const datos = new FormData(document.getElementById('form'));
    let nombre = datos.get('nombre');
    let apellidos = datos.get('apellidos');
    let tipo = datos.get('sexo');
    let mensajes =  document.querySelector("#mensajes");
    mensajes.innerHTML = "";
    if (nombre == "") {
        let tipo_mensaje = "Debes de ingresar un nombre";
        error(tipo_mensaje);
        return false;
    } else if(apellidos == "") {
        let tipo_mensaje = "Debes de ingresar tus apellidos";
        error(tipo_mensaje);
        return false;
    } else if(tipo  == ""){
         let tipo_mensaje = "Debes de seleccionar el tipo de sexo";
        error(tipo_mensaje);
        return false;
    }
    var url = "./modelo/ejecutarconsultas.php";
    fetch(url,{
        method:'post',
        body:datos
    })
    .then (data => data.json())
    .then (data => {
        console.log('success', data);
        pintar_tabla_resultados(data);
        formulariop.reset();

    })
    .catch(function(error){
        console.log('error',error);
    });
});

const error = (tipo_mensaje) => {
    mensajes.innerHTML +=`
    <div class="row">
        <div class="col-md-5 offset-md-3">
            <div class="alert alert-danger" role="alert">
                <h4 class="alert-heading">Error!</h4>
                <P> *${tipo_mensaje}</P>
            </div>
        </div>

    </div>

    `;
}

const pintar_tabla_resultados = (data) =>{
     let tab_datos = document.querySelector("#tabla_persona");
     tab_datos.innerHTML = "";
     for(let item of data){
         tab_datos.innerHTML +=`
         <tr>
         <td>${item.idpersona}</td>
         <td>${item.nombre}</td>
         <td>${item.apellidos}</td>
         <td>${item.sexo}</td>
         <td class="text-center">
         <button class="btn btn-primary btn-sm" onclick="editar(${item.idpersona})">Editar</button>
         <button class="btn btn-danger btn-sm" onclick="eliminar(${item.idpersona})">eliminar</button>
         </td>
         </tr>
         `;
     }
}

const eliminar = (id) =>{
    Swal.fire({
    title: 'Estas seguro de eliminar el registro',
    text: "Ya no se podra recuperar el registro",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Aceptar'
    }).then((result) => {
        if (result.isConfirmed) {
            var url = "./modelo/ejecutarconsultas.php";
            var formdata = new FormData();
            formdata.append('tipo_operacion', 'eliminar');
            formdata.append('id', id);
            fetch(url, {
                method: 'post',
                body: formdata
            }).then(data => data.json())
            .then(data => {
                console.log('Success:', data)
                pintar_tabla_resultados(data);
                Swal.fire(
                'Eliminado', 
                'El registro se elimino correctamente.',
                'success'
                )
            })
            .catch(error => console.error('Error:', error));
           
        }
    })
}

const editar = (id) => {

    //alert(id);
    var url = "./modelo/ejecutarconsultas.php";
    var formData = new FormData();
    formData.append('tipo_operacion','editar');
    formData.append('id',id);
    fetch(url,{
        method:'post',
        body:formData
    })
    .then(data => data.json())
    .then(data => {
        console.log('success', data);
        for(let item of data){
            var id = item.idpersona;
            var nom = item.nombre;
            var ape = item.apellidos;
            var sexo = item.sexo;
            if(sexo == 'Masculino'){
                var sex = `
                <select name="sexou" id="sexou" class="form-control">
                    <option value="Masculino" selected>Masculino</option>
                    <option value="Femenino">Femenino</option>
                </select>
                `;
            }else if(sexo == 'Femenino'){
                var sex = `
                <select name="sexou" id="sexou" class="form-control">
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino" selected>Femenino</option>
                </select>
                `;
            }
            
        }


        Swal.fire({
            title: 'Actualizar información',
            html: `
              <form id="update_form">
                <input type="text" value="update" name="tipo_operacion" hidden="true">
                <input type="number" value="${id}"   hidden="true" name="idu" class="form-control" placeholder="id de la persona">
                <hr>
                <input type="text" value="${nom}"   name="nombreu" class="form-control" placeholder="nombre">
                <hr>
                <input type="text" value="${ape}" name="apellidosu"  class="form-control" placeholder="apellidos">
                <hr>
                ${sex}
              </form>  
            
            `,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
            }).then((result) => {
            if (result.value) {
                const datos = document.querySelector("#update_form");
                const datos_actualizar = new FormData(datos);
                var url = "./modelo/ejecutarconsultas.php";
                fetch(url, {
                    method: 'post',
                    body: datos_actualizar
                })
                .then(data => data.json())
                .then(data =>{ 
                    console.log('Success:', data);
                    pintar_tabla_resultados(data);
                    Swal.fire(
                        'Exito',
                        'Se actualizo con exito',
                        'success'
                    )
                      
                })
                .catch(function(error){
                    console.error('Error:', error)
                }); 

            }
        })
             
    })
    .catch(function (error){
        console.error('error',error);
    }); 
}

