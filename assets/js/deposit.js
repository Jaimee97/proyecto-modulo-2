
document.getElementById("depositBtn").addEventListener("click", function(event) {
    event.preventDefault();

    let monto = Number(document.getElementById("deposit_input").value);

    if (monto <= 0 || isNaN(monto)) {
        alert("El monto ingresado no es válido.");
        return;
    }

    let saldoActual = Number(localStorage.getItem("saldoTotal"));

    let nuevoSaldo = saldoActual + monto;

    localStorage.setItem("saldoTotal", nuevoSaldo);

//Guardar movimiento en un string para luego pasarlo a array    
    let datos = localStorage.getItem("movimientos");
    
    const nuevoMovimiento = monto + ",Depósito";
    
    if (datos) {
        datos += "|" + nuevoMovimiento;
    }
    else {
        datos = nuevoMovimiento;
    }
    
    localStorage.setItem("movimientos", datos);
    
    alert("Deposito exitoso");
    window.location.href = "/menu.html";
});


