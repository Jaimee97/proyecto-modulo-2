//validacion y agregado de nuevos contactos
document.querySelector('#guardarBtn').addEventListener('click', function(event) {
    event.preventDefault(); 
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const banco = document.getElementById('banco').value;
    const numeroCuenta = document.getElementById('numeroCuenta').value.trim();
    const alias = document.getElementById('alias').value.trim();

//Expresiones regulares para validacion
    const validacionTexto = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/;
    const validacionNumero = /^\d{8}$/;

    if (!nombre || !apellido || banco === "Seleccione el banco" || !alias || !numeroCuenta) {
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

    if (!validacionTexto.test(alias)) {
        alert('El alias solo puede contener letras.');
        return;
    }

    if (!validacionNumero.test(numeroCuenta)) {
        alert('El número de cuenta debe tener 8 dígitos.');
        return;
    }

    const listaContactos = document.getElementById('container_contactos');

    const nuevoContacto = document.createElement('div');
    nuevoContacto.className = 'form-check';
    nuevoContacto.innerHTML += `<input class="form-check-input" type="radio" name="contactos" id="${numeroCuenta}">
                        <label class="form-check-label" for="${numeroCuenta}">
                            <span>${nombre} ${apellido}</span> |
                            <span>${banco}</span> |
                            <span>${alias}</span> |
                            <span>${numeroCuenta}</span>
                        </label>`;
    listaContactos.appendChild(nuevoContacto);
    

    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('banco').selectedIndex = 0;
    document.getElementById('alias').value = '';
    document.getElementById('numeroCuenta').value = '';
})

//Parte para mostrar el destinatario seleccionado

const containerContactos = document.getElementById('container_contactos');
const contactoDestino = document.getElementById('contactoDestino');

function actualizarDestinatario() {
    const seleccionado = document.querySelector('input[name="contactos"]:checked');
    if (seleccionado) {
        
        const label = seleccionado.nextElementSibling; 
        contactoDestino.textContent = label.textContent; 
    } else {
        contactoDestino.textContent = '';
    }
}

containerContactos.addEventListener('change', actualizarDestinatario);

actualizarDestinatario();

//Actualizar saldo al transferir

const transferirBtn = document.getElementById('transferirBtn');
const transferirInput = document.getElementById('transferir_input');

transferirBtn.addEventListener('click', function(event) {
    event.preventDefault();     
    let monto = Number(transferirInput.value);

    if (monto <= 0 || isNaN(monto)) {
        alert("El monto ingresado no es válido.");
        return;
    } 

    let saldoActual = Number(localStorage.getItem("saldoTotal"));   
    if (monto > saldoActual) {
        alert("No tienes saldo suficiente para realizar esta transferencia.");
        return;
    }

    let nuevoSaldo = saldoActual - monto;

    localStorage.setItem("saldoTotal", nuevoSaldo);

 //Guardar movimiento en un string para luego pasarlo a array (mismo que en deposito)   
    let datos = localStorage.getItem("movimientos");
    
    const nuevoMovimiento = monto + ",Transferencia realizada";
    
    if (datos) {
        datos += "|" + nuevoMovimiento;
    }
    else {
        datos = nuevoMovimiento;
    }
    
    localStorage.setItem("movimientos", datos);
    
    alert("Transferencia exitosa");
    window.location.href = "/menu.html";
});


