/* let contactos = "José Rojas, Banco de Chile, Pepe, 11223344 | María Pérez, Banco Santander, Mari, 22334455 | Luis Gómez, Banco Estado, Lucho, 33445566 | José Fuentes, Banco de Chile, JR, 44556677 | Ana Soto, Banco Santander, Ani, 55667788 | María López, Banco Estado, Maru, 66778899 | Pedro Cáceres, Banco de Chile, Pety, 77889900 | Carlos Reyes, Banco Santander, Carlitos, 88990011 | Ana Paredes, Banco Estado, Anita, 99001122 | José Morales, Banco de Chile, Cheché, 10111213 | Luis Herrera, Banco Santander, Luigi, 12131415 | María Contreras, Banco Estado, Mapé, 13141516 | Pedro Vargas, Banco de Chile, Pedri, 14151617 | Carla Núñez, Banco Santander, Carlix, 15161718 | Luis Torres, Banco Estado, Lutox, 16171819 | Ana Rivera, Banco de Chile, Any, 17181920 | José Castillo, Banco Santander, Jos, 18192021 | Carlos Medina, Banco Estado, Carl, 19202122 | María Silva, Banco de Chile, Masi, 20212223 | Pedro Hidalgo, Banco Santander, Perico, 21222324"; */

let contactosArray = [
  { nombre: "José", apellido: "Rojas", banco: "Banco de Chile", apodo: "Pepe", cbu: "11223344" },
  { nombre: "María", apellido: "Pérez", banco: "Banco Santander", apodo: "Mari", cbu: "22334455" },
  { nombre: "Luis", apellido: "Gómez", banco: "Banco Estado", apodo: "Lucho", cbu: "33445566" },
  { nombre: "José", apellido: "Fuentes", banco: "Banco de Chile", apodo: "JR", cbu: "44556677" },
  { nombre: "Ana", apellido: "Soto", banco: "Banco Santander", apodo: "Ani", cbu: "55667788" },
  { nombre: "María", apellido: "López", banco: "Banco Estado", apodo: "Maru", cbu: "66778899" },
  { nombre: "Pedro", apellido: "Cáceres", banco: "Banco de Chile", apodo: "Pety", cbu: "77889900" },
  { nombre: "Carlos", apellido: "Reyes", banco: "Banco Santander", apodo: "Carlitos", cbu: "88990011" },
  { nombre: "Ana", apellido: "Paredes", banco: "Banco Estado", apodo: "Anita", cbu: "99001122" },
  { nombre: "José", apellido: "Morales", banco: "Banco de Chile", apodo: "Cheché",cbu: "10111213" },
  { nombre: "Luis", apellido: "Herrera", banco: "Banco Santander", apodo: "Luigi", cbu: "12131415" },
  { nombre: "María", apellido: "Contreras", banco: "Banco Estado", apodo: "Mapé", cbu: "13141516" },
  { nombre: "Pedro", apellido: "Vargas", banco: "Banco de Chile", apodo: "Pedri", cbu: "14151617" },
  { nombre: "Carla", apellido: "Núñez", banco: "Banco Santander", apodo: "Carlix", cbu: "15161718" },
  { nombre: "Luis", apellido: "Torres", banco: "Banco Estado", apodo: "Lutox", cbu: "16171819" },
  { nombre: "Ana", apellido: "Rivera", banco: "Banco de Chile", apodo: "Any", cbu: "17181920" },
  { nombre: "José", apellido: "Castillo", banco: "Banco Santander", apodo: "Jos", cbu: "18192021" },
  { nombre: "Carlos", apellido: "Medina", banco: "Banco Estado", apodo: "Carl", cbu: "19202122" },
  { nombre: "María", apellido: "Silva", banco: "Banco de Chile", apodo: "Masi", cbu: "20212223" },
  { nombre: "Pedro", apellido: "Hidalgo", banco: "Banco Santander", apodo: "Perico", cbu: "21222324" }
];
/* Por practicidad, usaré JSON y contactos en formato array de objetos, la forma
que tenia pensado inicialmente era un string como en el trabajo anterior y luego pasarlo a listas (array)*/

if (!localStorage.getItem('contactos')) {
    localStorage.setItem('contactos', JSON.stringify(contactosArray));
}

if (!localStorage.getItem("transaccionesNuevas")) { 
    localStorage.setItem("transaccionesNuevas", JSON.stringify([]));    
}

let saldoActual = Number(localStorage.getItem("saldoTotal"));
$('#saldo_actual').text(`Saldo actual: $${saldoActual.toLocaleString()}`);

//Cargar contactos al iniciar la pagina
$(document).ready(function() {
    let contactos = JSON.parse(localStorage.getItem('contactos')) || [];            
    const listaContactos = document.getElementById('lista_contactos');

    contactos.forEach(({ nombre, apellido, banco, apodo, cbu }, index) => {        
        const nuevoContacto = document.createElement('li');
        nuevoContacto.classList.add('mb-2', 'rounded', 'border', 'p-2', 'bg-light');
        nuevoContacto.innerHTML = `
                        <input type="radio" id="contacto${index}" name="contactos" value="${index}">
                        <label for="contacto${index}"> 
                            <span>${nombre} ${apellido}</span> |
                            <span class="text-secondary">${banco}</span> |
                            <span>${apodo}</span> |             
                            <span class="text-secondary">${cbu}</span>
                        </label>`;
        listaContactos.appendChild(nuevoContacto);
    });

     $('#transferirBtn').hide();
});

//Agregar nuevo contacto
const agregarContactoBtn = document.getElementById('guardarBtn');   
agregarContactoBtn.addEventListener('click', function(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const banco = document.getElementById('banco').value;
    const apodo = document.getElementById('alias').value.trim();
    const cbu = document.getElementById('numeroCuenta').value.trim();
    
    //Expresiones regulares para validacion creadas con chatgpt
    //permite letras (mayusculas, minusculas, tildes y ñ) y espacios en blanco
    const validacionTexto = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/; 
    //permite solo numeros y exactamente 8 digitos
    const validacionNumero = /^\d{8}$/; 

    if (!nombre || !apellido || banco === "Seleccione el banco" || !apodo || !cbu) {
        alert('Por favor, completa todos los campos.');
        return;
    }
    if (!validacionTexto.test(nombre)) {
        alert('El nombre solo puede contener letras.');
        return;
    }
    if (!validacionTexto.test(apellido)) {
        alert('El apellido solo puede contener letras.');
        return;
    }
    if (!validacionTexto.test(apodo)) {
        alert('El alias solo puede contener letras.');
        return;
    }
    if (!validacionNumero.test(cbu)) {
        alert('El número de cuenta debe tener 8 dígitos.');
        return;
    }

    let contactos = JSON.parse(localStorage.getItem('contactos')) || [];
    contactos.push({ nombre, apellido, banco, apodo, cbu });
    localStorage.setItem('contactos', JSON.stringify(contactos));
    alert("Contacto agregado exitosamente.");
    location.reload();
});

// Filtrar contactos por nombre o apellido
$("#buscarBtn").on("click", function () {
    const filtro = $("#inputBuscar").val().trim().toLowerCase();
    const contactos = JSON.parse(localStorage.getItem('contactos')) || [];

    $("#lista_contactos").empty();

    const filtrados = contactos.filter(c =>
        c.nombre.toLowerCase().includes(filtro) ||
        c.apellido.toLowerCase().includes(filtro)
    );

    if (filtrados.length === 0) {
        $("#lista_contactos").html("<li>No se encontraron resultados.</li>");
        return;
    }

    filtrados.forEach((c, index) => {
        $("#lista_contactos").append(`
            <li>
                <input type="radio" id="contacto${index}" name="contactos" value="${index}">
                <label for="contacto${index}">
                    <span>${c.nombre} ${c.apellido}</span> |
                    <span class="text-secondary">${c.banco}</span> |
                    <span>${c.apodo}</span> |
                    <span class="text-secondary">${c.cbu}</span>
                </label>
            </li>
        `);
    });
});


//Mostrar destinatario seleccionado
$('#lista_contactos').on('change', 'input[name="contactos"]', function() {
    const selectedIndex = $(this).val();
    const contactos = JSON.parse(localStorage.getItem('contactos')) || [];
    const contactoSeleccionado = contactos[selectedIndex];  
    if (contactoSeleccionado) {
        $('#destinatarioSeleccionado').html(`
            <p class="text-roboto d-inline">Destinatario seleccionado:</p>
            <h5 class="text-roboto text-secondary d-inline fs-6">
                ${contactoSeleccionado.nombre} ${contactoSeleccionado.apellido} |
                ${contactoSeleccionado.banco} |
                ${contactoSeleccionado.apodo} | 
                ${contactoSeleccionado.cbu}
            </h5>
        `);
    }           
});


//Validacion y transferencia de dinero, actualizacion de saldo
$('#transferirForm').submit(function(event) {
    event.preventDefault();
    const monto = $('#transferir_input').val().trim();
    const selectedContactoIndex = $('input[name="contactos"]:checked').val();
    const contactos = JSON.parse(localStorage.getItem('contactos')) || [];
    const contactoSeleccionado = contactos[selectedContactoIndex];  
    if (!monto || isNaN(monto) || Number(monto) <= 0) {
        alert('Por favor, ingresa un monto válido para transferir.');
        return;
    }   
    if (!contactoSeleccionado) {
        alert('Por favor, selecciona un destinatario para la transferencia.');
        return;
    }   
    
    $("#alert-container").append(`
                <div class="alert alert-warning mt-3 text-roboto alert-dismissible fade show" role="alert">
                    <strong>Transferencia exitosa!</strong> Haz enviado $${Number(monto).toLocaleString()} a ${contactoSeleccionado.nombre} ${contactoSeleccionado.apellido}.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`);

    let saldoNuevo = saldoActual - Number(monto);
    localStorage.setItem("saldoTotal", saldoNuevo);
    saldoActual = saldoNuevo;
    $('#saldo_actual').text(`Saldo actual: $${saldoNuevo.toLocaleString()}`);

    let transacciones = JSON.parse(localStorage.getItem('transaccionesNuevas')) || [];
    transacciones.push({ detalle: "transferencia realizada", monto: -Number(monto), descripcion: `Transferencia a ${contactoSeleccionado.nombre} ${contactoSeleccionado.apellido}` });
    localStorage.setItem('transaccionesNuevas', JSON.stringify(transacciones));

    $('#transferir_input').val('');
});


// Mostrar boton transferir
$('#lista_contactos').on('change', 'input[name="contactos"]', function () {

    const selectedContactoIndex = $('input[name="contactos"]:checked').val();

    if (selectedContactoIndex !== undefined) {
        $('#transferirBtn').show();
    } else {
        $('#transferirBtn').hide();
    }
});






